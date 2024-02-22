import { Document } from 'mongodb'
import mongoose, { Connection } from 'mongoose'
import { Container } from 'typedi'

export interface IHotel extends Document {
    _id: string
    userId: string
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
    imageUrls: string[]
    lastUpdated: Date
    bookings: IBooking[]
}

export interface IBooking extends Document {
    _id: string
    userId: string
    firstName: string
    lastName: string
    email: string
    adultCount: number
    childCount: number
    checkIn: Date
    checkOut: Date
    totalCost: number
}

const bookingSchema = new mongoose.Schema<IBooking>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    adultCount: { type: Number, required: true },
    childCount: { type: Number, required: true },
    userId: { type: String, required: true },
    totalCost: { type: Number, required: true },
})

const hotelSchema = new mongoose.Schema<IHotel>({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    adultCount: { type: Number, required: true },
    childCount: { type: Number, required: true },
    facilities: { type: Array(String), required: true },
    pricePerNight: { type: Number, required: true },
    starRating: { type: Number, required: true, min: 1, max: 5 },
    imageUrls: { type: Array(String), required: true },
    bookings: [bookingSchema],
})

export default {
    name: 'HotelSchema',
    model: Container.get<Connection>('Database').model<mongoose.Document>(
        'Hotel',
        hotelSchema,
        'hotels'
    ),
}
