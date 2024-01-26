import mongoose, { Connection } from 'mongoose'
import { Container } from 'typedi'
import { Document } from 'mongodb'

export interface IUser extends Document {
    _id: string
    firstName: string
    lastName: string
    email: string
    password: string
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
    firstName: {
        type: String,
        required: true,
        unique: true,
    },
    lastName: {
        type: String,
        required: true,
        unique: true,
    },
})

// const User = mongoose.model<TUser>('User', userSchema)

export default {
    name: 'UserSchema',
    model: Container.get<Connection>('Database').model<mongoose.Document>(
        'User',
        userSchema,
        'users'
    ),
}
