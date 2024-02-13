import { Router, Request, Response } from 'express'
import { Container } from 'typedi'
import { HotelService } from '../../services/HotelService'
import { ResponseWrappper } from '../responses/ResponseWrapper'
import { ISearchResponse } from '../responses/hotel'

export default (router: Router) => {
    const hotelService = Container.get(HotelService)

    router.get('/hotels/search', async (req: Request, res: Response) => {
        const response = new ResponseWrappper<ISearchResponse>()
        try {
            const pageNumber = req.query.pageNumber?.toString()
            const data: ISearchResponse =
                await hotelService.getHotels(pageNumber)
            response.setData(data)
        } catch (e) {
            response.setError(e.message)
        }
        res.json(response)
    })
}
