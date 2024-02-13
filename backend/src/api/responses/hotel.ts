import { IHotel } from '../../models/hotel'

export interface ISearchResponse {
    hotels: IHotel[]
    pagination: {
        total: number
        page: number
        pages: number
    }
}
