import dotenv from 'dotenv'
import * as process from 'process'

const envFound = dotenv.config()

if (!envFound) {
    // This error should crash whole process
    throw new Error("⚠️  Couldn't find .env file  ⚠️")
}
export default {
    port: parseInt(process.env.PORT || '3000', 10) || 3000,
    salt: process.env.SALT || 'abcdefgthladnlan',
    jwt: {
        secretKey:
            process.env.JWT_SECRET_KEY ||
            'kasbdjasbdbasdbasjdbjasbdbsajbdasbjdbajbd',
    },
    mongo: {
        uri: process.env.MONGODB_CONNECTION_URI || 'mongodb://localhost:27017/',
    },
}
