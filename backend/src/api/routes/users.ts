import { Request, Response, Router } from 'express'
import { Container } from 'typedi'
import {
    ILoginFromDetails,
    IRegistrationFromDetails,
    UserService,
} from '../../services/UserService'
import { ResponseWrappper } from '../responses/ResponseWrapper'
import { IUserRegistration } from '../responses/user'
import {
    userRegistrationValidator,
    userLoginValidator,
} from '../validators/user'
import { validationResult } from 'express-validator'
import config from '../../config'
import validateToken from '../middlewares/authentication'

export default (router: Router) => {
    const userService = Container.get(UserService)
    router.post(
        '/register',
        userRegistrationValidator,
        async (req: Request, res: Response) => {
            const response = new ResponseWrappper<IUserRegistration>()
            try {
                const validationErrors = validationResult(req)
                if (!validationErrors.isEmpty()) {
                    return res
                        .status(400)
                        .json({ message: validationErrors.array() })
                }
                const registrationDetails: IRegistrationFromDetails = {
                    email: req.body.email,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    password: req.body.password,
                }
                const data = await userService.registerUser(registrationDetails)
                response.setData(data)
                res.cookie('auth_token', data.authToken, {
                    httpOnly: true,
                    maxAge: 86400000,
                    secure: config.environment.production,
                })
            } catch (e) {
                response.setError(e.message)
            }
            res.json(response)
        }
    )

    router.post(
        '/login',
        userLoginValidator,
        async (req: Request, res: Response) => {
            const response = new ResponseWrappper<IUserRegistration>()

            try {
                const validationErrors = validationResult(req)
                if (!validationErrors.isEmpty()) {
                    return res
                        .status(400)
                        .json({ message: validationErrors.array() })
                }

                const loginDetails: ILoginFromDetails = {
                    email: req.body.email,
                    password: req.body.password,
                }

                const data = await userService.userLogin(loginDetails)
                response.setData(data)
                res.cookie('auth_token', data.authToken, {
                    httpOnly: true,
                    maxAge: 86400000,
                    secure: config.environment.production,
                })
            } catch (e) {
                response.setError(e.message)
            }
            res.json(response)
        }
    )

    router.post('/logout', (req: Request, res: Response) => {
        const response = new ResponseWrappper()
        res.cookie('auth_token', '', {
            expires: new Date(0),
        })
        res.json(response)
    })

    router.get(
        '/validate-token',
        validateToken,
        (req: Request, res: Response) => {
            const response = new ResponseWrappper()
            response.setData({ userId: req.userId })
            res.status(200).json(response)
        }
    )
}
