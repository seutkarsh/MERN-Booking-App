import { Router, Request, Response } from 'express'
import { upload } from '../middlewares/storage'
import { ResponseWrappper } from '../responses/ResponseWrapper'
import {
    IAddHotelFormDetails,
    MyHotelService,
} from '../../services/MyHotelService'
import { Container } from 'typedi'
import { IHotel } from '../../models/hotel'
import validateToken from '../middlewares/authentication'
import { addHotelValidators } from '../validators/myHotels'
export { addHotelValidators } from '../validators/myHotels'

export default (router: Router) => {
    const myHotelService = Container.get(MyHotelService)
    router.post(
        '/my-hotels',
        validateToken,
        addHotelValidators,
        upload.array('imageFiles', 6),
        async (req: Request, res: Response) => {
            const response = new ResponseWrappper<IHotel>()
            try {
                const imageFiles = req.files as Express.Multer.File[]
                const hotelDetails: IAddHotelFormDetails = req.body

                const data: IHotel = await myHotelService.addHotel(
                    imageFiles,
                    hotelDetails,
                    req.userId
                )
                response.setData(data)
            } catch (e) {
                response.setError(e.message)
            }
            res.json(response)
        }
    )
}
