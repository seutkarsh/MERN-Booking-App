import { Container, Service } from 'typedi'
import { IUser } from '../models/user'
import mongoose, { Model } from 'mongoose'
import bcryptjs from 'bcryptjs'
import config from '../config'
import jwt from 'jsonwebtoken'

@Service()
export class UserService {
    private userSchema: Model<IUser & mongoose.Document> =
        Container.get('UserSchema')
    async registerUser(formFields: IRegistrationFromDetails) {
        const user = await this.getUserByEmail(formFields.email)
        if (user) {
            throw new Error(Errors.USER_ALREADY_EXISTS)
        }
        const userDetails: IRegistrationFromDetails = {
            ...formFields,
            password: await this.hashPassword(formFields.password),
        }

        const createdUser = await this.userSchema.create(userDetails)
        const token: string = jwt.sign(
            { userId: createdUser.id },
            config.jwt.secretKey
        )
    }

    private async getUserByEmail(email: string): Promise<IUser | null> {
        return this.userSchema.findOne({ email: email })
    }

    private hashPassword(password: string) {
        return bcryptjs.hash(password, config.salt)
    }
}

enum Errors {
    USER_ALREADY_EXISTS = 'User Already Exists',
}
export interface IRegistrationFromDetails {
    password: string
    email: string
    firstName: string
    lastName: string
}
