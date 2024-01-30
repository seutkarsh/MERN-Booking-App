import { Router } from 'express'
import userRoutes from './routes/users'
import myHotelRoutes from './routes/myHotels'

export default () => {
    const router = Router()

    userRoutes(router)
    myHotelRoutes(router)

    return router
}
