import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../../config'
import { AppError, ResponseWrappper } from '../responses/ResponseWrapper'

declare global {
    namespace Express {
        interface Request {
            userId: string
        }
    }
}
const validateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies['auth_token']
    const response = new ResponseWrappper()

    if (!token) {
        const err = new AppError('Unauthorized Access')
        response.setError(err)
        return res.status(401).json(response)
    }

    try {
        const decoded = jwt.verify(token, config.jwt.secretKey)
        req.userId = (decoded as JwtPayload).userId
        next()
    } catch (e) {
        const err = new AppError('Unauthorized Access')
        response.setError(err)
        return res.status(401).json(response)
    }
}

export default validateToken
