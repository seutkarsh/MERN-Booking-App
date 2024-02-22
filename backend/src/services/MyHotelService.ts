import { Container, Service } from 'typedi'
import mongoose, { Model } from 'mongoose'
import { IHotel } from '../models/hotel'
import { v2 as cloudinary } from 'cloudinary'

@Service()
export class MyHotelService {
    // private cloudinary: ConfigOptions = Container.get('CloudinaryClient')
    private hotelSchema: Model<IHotel & mongoose.Document> =
        Container.get('HotelSchema')

    private async uploadImages(
        imageFiles: Express.Multer.File[]
    ): Promise<string[]> {
        const uploadPromises: Promise<string>[] = imageFiles.map(
            async (image) => {
                const b64 = Buffer.from(image.buffer).toString('base64')
                const dataURI = `data:${image.mimetype};base64,${b64}`
                const res = await cloudinary.uploader.upload(dataURI)
                return res.url
            }
        )

        return await Promise.all(uploadPromises)
    }

    async addHotel(
        imageFiles: Express.Multer.File[],
        hotelDetails: IAddHotelFormDetails,
        userId: string
    ): Promise<IHotel> {
        const imageUrls = await this.uploadImages(imageFiles)
        const hotelData: IHotelData = {
            ...hotelDetails,
            imageUrls: imageUrls,
            lastUpdated: new Date(),
            userId: userId,
        }

        return await this.hotelSchema.create(hotelData)
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

    async updateHotel(
        id: string,
        imageFiles: Express.Multer.File[],
        hotelDetails: IUpdateHotelFormDetails,
        userId: string
    ): Promise<IHotel> {
        await this.getHotelById(id, userId)
        const updatedImageUrls = await this.uploadImages(imageFiles)
        const updatedHotelData: IHotelData = {
            ...hotelDetails,
            imageUrls: [...updatedImageUrls, ...(hotelDetails.imageUrls || [])],
            lastUpdated: new Date(),
            userId: userId,
        }

        const hotel = await this.hotelSchema.findOneAndUpdate(
            { _id: id, userId: userId },
            updatedHotelData,
            { new: true }
        )
        if (!hotel) throw new Error(Errors.UPDATE_FAILED_FOR_SOME_REASON)
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
export interface IUpdateHotelFormDetails extends IAddHotelFormDetails {
    imageUrls: string[]
}
export interface IHotelData extends IAddHotelFormDetails {
    imageUrls: string[]
    lastUpdated: Date
    userId: string
}

enum Errors {
    HOTEL_NOT_FOUND_FOR_USER = 'No hotel found with this ID on logged in user',
    UPDATE_FAILED_FOR_SOME_REASON = 'Update failed for some reason',
}
