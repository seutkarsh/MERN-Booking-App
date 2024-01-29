import { Application } from 'express'
import expressLoader from './express'
import mongooseLoader from './mongoose'
import { Connection } from 'mongoose'
import dependencyInjector from './dependencyInjector'

export default async ({
    expressApp,
}: {
    expressApp: Application
}): Promise<void> => {
    const database: Connection = await mongooseLoader()
    console.log(`Database Load Complete`)

    await dependencyInjector({ database })

    expressLoader({ app: expressApp })
}
