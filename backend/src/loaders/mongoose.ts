import mongoose, { Connection } from 'mongoose'
import config from '../config'

export default async (): Promise<Connection> => {
    console.log(`URI: ${config.mongo.uri}`)
    return mongoose.createConnection(config.mongo.uri)
}
