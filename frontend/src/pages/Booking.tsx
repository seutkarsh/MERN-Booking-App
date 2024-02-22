import React, { useEffect, useState } from 'react'
import { getRequest, Request } from '../api/request'
import { useAppContext } from '../contexts/AppContext'
import BookingForm from '../forms/BookingForm/BookingForm'
import { IHotelData } from './MyHotels'
import { useParams } from 'react-router-dom'
import { useSearchContext } from '../contexts/SearchContext'
import BookingDetailsSummary from '../components/BookingDetailsSummary'

const Booking = (): React.ReactElement => {
    const { showToast } = useAppContext()
    const searchContext = useSearchContext()

    const { id } = useParams()
    const [user, setUser] = useState<IUserData | undefined>(undefined)
    const [hotel, setHotel] = useState<IHotelData | undefined>(undefined)
    const [numberOfNights, setNumberOfNights] = useState<number>(0)

    useEffect(() => {
        const getCurrentUser = async (): Promise<void> => {
            const request = new Request(`/me`)
            const response = await getRequest(request)
            if (response.errors) {
                showToast({
                    message: response.errors
                        ? response.errors.toString()
                        : 'Something Went Wrong',
                    type: 'ERROR',
                })
            }
            setUser(response.data as IUserData)
        }

        const getHotelById = async (): Promise<void> => {
            if (id) {
                const request = new Request(`/hotels/${id}`)
                const response = await getRequest(request)
                if (response.errors) {
                    showToast({
                        message: response.errors
                            ? response.errors.toString()
                            : 'Something Went Wrong',
                        type: 'ERROR',
                    })
                }
                setHotel(response.data as IHotelData)
            }
        }

        if (searchContext.checkIn && searchContext.checkOut) {
            const nights = Math.ceil(
                Math.abs(
                    (searchContext.checkOut.getTime() -
                        searchContext.checkIn.getTime()) /
                        (1000 * 60 * 60 * 24)
                )
            )
            setNumberOfNights(nights)
        }
        getHotelById()
        getCurrentUser()
    }, [searchContext.checkIn, searchContext.checkOut])
    return (
        <>
            {user && (
                <div className="grid md:grid-cols-[1fr_2fr]">
                    {hotel && (
                        <BookingDetailsSummary
                            hotel={hotel}
                            adultCount={searchContext.adultCount}
                            childCount={searchContext.childCount}
                            checkOut={searchContext.checkOut}
                            checkIn={searchContext.checkIn}
                            numberOfNights={numberOfNights}
                        />
                    )}
                    <BookingForm currentUser={user} />
                </div>
            )}
        </>
    )
}

export interface IUserData {
    _id: string
    firstName: string
    lastName: string
    email: string
}
export default Booking
