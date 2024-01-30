import { Application } from 'express'
import expressLoader from './express'
import mongooseLoader from './mongoose'
import cloudinaryLoader from './cloudinary'
import { Connection } from 'mongoose'
import dependencyInjector from './dependencyInjector'
import { ConfigOptions } from 'cloudinary'

export default async ({
    expressApp,
}: {
    expressApp: Application
}): Promise<void> => {
    const database: Connection = await mongooseLoader()
    console.log(`Database Load Complete`)

    const cloudinaryClient: ConfigOptions = cloudinaryLoader()
    console.log(`Cloudinary Load Complete`)

    await dependencyInjector({ database, cloudinaryClient })

    expressLoader({ app: expressApp })
}
