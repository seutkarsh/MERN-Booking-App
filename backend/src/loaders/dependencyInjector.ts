import { Connection } from 'mongoose'
import { Container } from 'typedi'
import { ConfigOptions } from 'cloudinary'

export default async ({
    database,
    cloudinaryClient,
}: {
    database: Connection
    cloudinaryClient: ConfigOptions
}) => {
    try {
        Container.set('Database', database)
        Container.set('CloudinaryClient', cloudinaryClient)
        ;(await import('../models')).models.forEach((m) => {
            Container.set(m.name, m.model)
        })

        console.log(`Dependency Injector Loaded`)
    } catch (e) {
        console.log(e.message)
    }
}
