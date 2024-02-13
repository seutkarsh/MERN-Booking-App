import { Container, Service } from 'typedi'
import mongoose, { Model } from 'mongoose'
import { IHotel } from '../models/hotel'
import { ISearchResponse } from '../api/responses/hotel'

@Service()
export class HotelService {
    private hotelSchema: Model<IHotel & mongoose.Document> =
        Container.get('HotelSchema')
    async getHotels(pageNumber: string | undefined): Promise<ISearchResponse> {
        const pageSize = 5
        const pageNo = parseInt(pageNumber ? pageNumber.toString() : '1')

        const hotels: IHotel[] = await this.hotelSchema
            .find()
            .skip((pageNo - 1) * pageSize)
            .limit(pageSize)
        const total: number = await this.hotelSchema.countDocuments()
        return {
            hotels: hotels,
            pagination: {
                total,
                page: pageNo,
                pages: Math.ceil(total / pageSize),
            },
        }
    }
}
