import { Request, Response, Router } from 'express'
import { Container } from 'typedi'
import {
    IRegistrationFromDetails,
    UserService,
} from '../../services/UserService'
import { ResponseWrappper } from '../response/ResponseWrapper'

export default (router: Router) => {
    const userService = Container.get(UserService)
    router.post('/register', async (req: Request, res: Response) => {
        const response = new ResponseWrappper()
        try {
            const registrationDetails: IRegistrationFromDetails = {
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: req.body.password,
            }
            const data = await userService.registerUser(registrationDetails)
            response.setData(data)
        } catch (e) {
            response.setError(e.message)
        }
        res.json(response)
    })
}
