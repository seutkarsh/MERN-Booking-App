import { Router } from 'express'
import userRoutes from './routes/users'

export default () => {
    const router = Router()

    userRoutes(router)

    return router
}
