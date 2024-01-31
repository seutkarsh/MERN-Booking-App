import { v2 as cloudinary, ConfigOptions } from 'cloudinary'
import config from '../config'

export default (): ConfigOptions => {
    const cloudinaryClient: ConfigOptions = cloudinary.config({
        cloud_name: config.cloudinary.cloudName,
        api_key: config.cloudinary.apiKey,
        api_secret: config.cloudinary.apiSecret,
    })
    return cloudinaryClient
}
