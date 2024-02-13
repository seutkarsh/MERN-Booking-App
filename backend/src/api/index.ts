import { Router } from 'express'
import userRoutes from './routes/users'
import myHotelRoutes from './routes/myHotels'
import hotelRoutes from './routes/hotels'

export default () => {
    const router = Router()

    userRoutes(router)
    myHotelRoutes(router)
    hotelRoutes(router)

    return router
}
