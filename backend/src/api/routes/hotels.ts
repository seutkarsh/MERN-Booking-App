import { Router, Request, Response } from 'express'
import { Container } from 'typedi'
import { HotelService, ISearchQueryParams } from '../../services/HotelService'
import { ResponseWrappper } from '../responses/ResponseWrapper'
import { ISearchResponse } from '../responses/hotel'

export default (router: Router) => {
    const hotelService = Container.get(HotelService)

    router.get('/hotels/search', async (req: Request, res: Response) => {
        const response = new ResponseWrappper<ISearchResponse>()
        try {
            const queryParams: ISearchQueryParams = {
                pageNumber: req.query.pageNumber?.toString(),
                destination: req.query.destination?.toString(),
                checkIn: req.query.checkIn?.toString(),
                checkOut: req.query.checkOut?.toString(),
                adultCount: req.query.adultCount?.toString(),
                childCount: req.query.childCount?.toString(),
                facilities: req.query.facilities as string[],
                stars: req.query.stars as string[],
                types: req.query.types as string[],
                maxPrice: req.query.maxPrice as string,
                sortOption: req.query.sortOption?.toString(),
            }

            console.log(queryParams)
            const data: ISearchResponse =
                await hotelService.getSearchHotels(queryParams)
            response.setData(data)
        } catch (e) {
            response.setError(e.message)
        }
        res.json(response)
    })
}
