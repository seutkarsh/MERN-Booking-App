import mongoose from 'mongoose'
import UserSchema from './user'
import HotelSchema from './hotel'
import BookingSchema from './hotel'

export const models: Array<{
    name: string
    model: mongoose.Model<mongoose.Document>
}> = [UserSchema, HotelSchema]
