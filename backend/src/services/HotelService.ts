import { Container, Service } from 'typedi'
import mongoose, { Model } from 'mongoose'
import { IBooking, IHotel } from '../models/hotel'
import { IPaymentIntentResponse, ISearchResponse } from '../api/responses/hotel'
import { Stripe } from 'stripe'
import config from '../config'

@Service()
export class HotelService {
    private hotelSchema: Model<IHotel & mongoose.Document> =
        Container.get('HotelSchema')

    private stripe = new Stripe(config.payment.stripe.apiKey)
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

    async confirmBooking(
        requestData: IBookingBody,
        hotelId: string,
        userId: string
    ) {
        const paymentIntent = await this.stripe.paymentIntents.retrieve(
            requestData.paymentIntentId
        )
        if (!paymentIntent) throw new Error(Errors.PAYMENT_INTENT_NOT_FOUND)
        if (
            paymentIntent.metadata.hotelId !== hotelId ||
            paymentIntent.metadata.userId !== userId
        )
            throw new Error(Errors.PAYMENT_INTENT_DETAILS_NOT_MATCH)
        if (paymentIntent.status !== 'succeeded')
            throw new Error(
                `Payment Intent not succeeded. Status: ${paymentIntent.status}`
            )
        const bookingData: IBooking = {
            childCount: requestData.childCount,
            totalCost: requestData.totalCost,
            adultCount: requestData.adultCount,
            lastName: requestData.lastName,
            firstName: requestData.firstName,
            checkIn: new Date(requestData.checkIn),
            checkOut: new Date(requestData.checkOut),
            email: requestData.email,
            userId: userId,
            _id: requestData.paymentIntentId,
        }
        const hotel: IHotel | null = await this.hotelSchema.findByIdAndUpdate(
            hotelId,
            {
                $push: { bookings: bookingData },
            }
        )
        if (!hotel) throw new Error(Errors.HOTEL_NOT_FOUND)
        return bookingData
    }

    async getHotelById(id: string): Promise<IHotel> {
        const hotel: IHotel | null = await this.hotelSchema.findById(id)
        if (!hotel) throw new Error(Errors.HOTEL_NOT_FOUND)
        return hotel
    }

    async generatePaymentIntent(
        numberOfNights: number,
        hotelId: string,
        userId: string
    ): Promise<IPaymentIntentResponse> {
        const hotel: IHotel | null = await this.hotelSchema.findById(hotelId)
        if (!hotel) throw new Error(Errors.HOTEL_NOT_FOUND)

        const totalCost = hotel.pricePerNight * numberOfNights
        const paymentIntent = await this.stripe.paymentIntents.create({
            amount: totalCost,
            currency: 'INR',
            metadata: {
                hotelId,
                userId: userId,
            },
            description: 'This is for testing Payment Integration',
        })

        if (!paymentIntent.client_secret)
            throw new Error(Errors.PAYMENT_INTENT_CREATION)

        return {
            paymentIntentId: paymentIntent.id,
            clientSecret: paymentIntent.client_secret,
            totalCost: totalCost,
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

export interface IBookingBody {
    firstName: string
    lastName: string
    email: string
    adultCount: number
    childCount: number
    checkIn: string
    checkOut: string
    hotelId: string
    paymentIntentId: string
    totalCost: number
}

enum Errors {
    HOTEL_NOT_FOUND = 'Hotel Not Found',
    PAYMENT_INTENT_CREATION = 'Error while creating payment intent',
    PAYMENT_INTENT_NOT_FOUND = 'Payment Intent not found',
    PAYMENT_INTENT_DETAILS_NOT_MATCH = "Payment Intent Details doesn't match",
}
