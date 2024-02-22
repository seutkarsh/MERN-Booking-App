import { Router, Request, Response } from 'express'
import { Container } from 'typedi'
import {
    HotelService,
    IBookingBody,
    ISearchQueryParams,
} from '../../services/HotelService'
import { ResponseWrappper } from '../responses/ResponseWrapper'
import { IPaymentIntentResponse, ISearchResponse } from '../responses/hotel'
import { IBooking, IHotel } from '../../models/hotel'
import validateToken from '../middlewares/authentication'

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
            const data: ISearchResponse =
                await hotelService.getSearchHotels(queryParams)
            response.setData(data)
        } catch (e) {
            response.setError(e.message)
        }
        res.json(response)
    })

    router.get('/hotels/:id', async (req: Request, res: Response) => {
        const response = new ResponseWrappper<IHotel>()
        try {
            const id = req.params.id.toString()
            const data: IHotel = await hotelService.getHotelById(id)
            response.setData(data)
        } catch (e) {
            response.setError(e.message)
        }
        res.json(response)
    })

    router.post(
        '/hotels/:id/booking/payment-intent',
        validateToken,
        async (req: Request, res: Response) => {
            const response = new ResponseWrappper<IPaymentIntentResponse>()
            try {
                const numberOfNights = parseInt(req.body.numberOfNights)
                const hotelId: string = req.params.id
                const userId: string = req.userId

                const data: IPaymentIntentResponse =
                    await hotelService.generatePaymentIntent(
                        numberOfNights,
                        hotelId,
                        userId
                    )
                response.setData(data)
            } catch (e) {
                response.setError(e.message)
            }
            res.json(response)
        }
    )

    router.post(
        '/hotels/:id/bookings',
        validateToken,
        async (req: Request, res: Response) => {
            const response = new ResponseWrappper<IBooking>()
            try {
                const requestData: IBookingBody = req.body
                const hotelId: string = req.params.id
                const userId: string = req.userId
                const data: IBooking = await hotelService.confirmBooking(
                    requestData,
                    hotelId,
                    userId
                )
                response.setData(data)
            } catch (e) {
                response.setError(e.message)
            }
            res.json(response)
        }
    )
}
