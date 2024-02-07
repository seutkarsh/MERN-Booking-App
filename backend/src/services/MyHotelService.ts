import { Container, Service } from 'typedi'
import mongoose, { Model } from 'mongoose'
import { IHotel } from '../models/hotel'
import { v2 as cloudinary } from 'cloudinary'

@Service()
export class MyHotelService {
    // private cloudinary: ConfigOptions = Container.get('CloudinaryClient')
    private hotelSchema: Model<IHotel & mongoose.Document> =
        Container.get('HotelSchema')
    async addHotel(
        imageFiles: Express.Multer.File[],
        hotelDetails: IAddHotelFormDetails,
        userId: string
    ): Promise<IHotel> {
        const uploadPromises: Promise<string>[] = imageFiles.map(
            async (image) => {
                const b64 = Buffer.from(image.buffer).toString('base64')
                const dataURI = `data:${image.mimetype};base64,${b64}`
                const res = await cloudinary.uploader.upload(dataURI)
                return res.url
            }
        )

        const imageUrls: string[] = await Promise.all(uploadPromises)

        const hotelData: IHotelData = {
            ...hotelDetails,
            imageUrls: imageUrls,
            lastUpdated: new Date(),
            userId: userId,
        }

        const createdHotel: IHotel = await this.hotelSchema.create(hotelData)
        return createdHotel
    }

    async getAllHotels(userId: string): Promise<IHotel[]> {
        return this.hotelSchema.find({ userId: userId })
    }

    async getHotelById(id: string, userId: string): Promise<IHotel> {
        const hotel: IHotel | null = await this.hotelSchema.findOne({
            _id: id,
            userId: userId,
        })
        if (!hotel) {
            throw new Error(Errors.HOTEL_NOT_FOUND_FOR_USER)
        }
        return hotel
    }
}

export interface IAddHotelFormDetails {
    name: string
    city: string
    country: string
    description: string
    type: string
    adultCount: number
    childCount: number
    facilities: string[]
    pricePerNight: number
    starRating: number
}
export interface IHotelData extends IAddHotelFormDetails {
    imageUrls: string[]
    lastUpdated: Date
    userId: string
}

enum Errors {
    HOTEL_NOT_FOUND_FOR_USER = 'No hotel found with this ID on logged in user',
}
