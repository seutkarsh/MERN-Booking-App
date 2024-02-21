import { Container, Service } from 'typedi'
import mongoose, { Model } from 'mongoose'
import { IHotel } from '../models/hotel'
import { ISearchResponse } from '../api/responses/hotel'

@Service()
export class HotelService {
    private hotelSchema: Model<IHotel & mongoose.Document> =
        Container.get('HotelSchema')
    async getSearchHotels(
        queryParams: ISearchQueryParams
    ): Promise<ISearchResponse> {
        const pageSize = 5
        const pageNo = parseInt(
            queryParams.pageNumber ? queryParams.pageNumber.toString() : '1'
        )

        const query: Record<string, unknown> =
            this.createSearchQuery(queryParams)

        let sortOptions = {}
        switch (queryParams.sortOption) {
            case 'starRating':
                sortOptions = { starRating: -1 }
                break
            case 'pricePerNightAsc':
                sortOptions = { pricePerNight: 1 }
                break
            case 'pricePerNightDesc':
                sortOptions = { pricePerNight: -1 }
                break
        }
        const hotels: IHotel[] = await this.hotelSchema
            .find(query)
            .sort(sortOptions)
            .skip((pageNo - 1) * pageSize)
            .limit(pageSize)
        return {
            hotels: hotels,
            pagination: {
                total: hotels.length,
                page: pageNo,
                pages: Math.ceil(hotels.length / pageSize),
            },
        }
    }

    private createSearchQuery(
        queryParams: ISearchQueryParams
    ): Record<string, unknown> {
        let query: Record<string, unknown> = {}

        if (queryParams.destination) {
            query['$or'] = [
                { city: new RegExp(queryParams.destination, 'i') },
                { country: new RegExp(queryParams.destination, 'i') },
            ]
        }
        if (queryParams.adultCount) {
            query['adultCount'] = {
                $gte: parseInt(queryParams.adultCount),
            }
        }

        if (queryParams.childCount) {
            query['childCount'] = {
                $gte: parseInt(queryParams.childCount),
            }
        }
        if (queryParams.facilities) {
            query['facilities'] = {
                $all: queryParams.facilities,
            }
        }
        if (queryParams.types) {
            query['type'] = {
                $in: queryParams.types,
            }
        }

        if (queryParams.stars) {
            const starRatings = Array.isArray(queryParams.stars)
                ? queryParams.stars.map((star) => parseInt(star))
                : parseInt(queryParams.stars)
            query['starRating'] = {
                $in: starRatings,
            }
        }

        if (queryParams.maxPrice) {
            query['pricePerNight'] = {
                $lte: parseInt(queryParams.maxPrice),
            }
        }

        return query
    }
}

export interface ISearchQueryParams {
    destination?: string
    checkIn?: string
    pageNumber?: string
    checkOut?: string
    adultCount?: string
    childCount?: string
    facilities?: string[]
    types?: string[]
    stars?: string[]
    maxPrice?: string
    sortOption?: string
}
