import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getRequest, Request } from '../api/request'
import { IHotelData } from './MyHotels'
import { useAppContext } from '../contexts/AppContext'
import { AiFillStar } from 'react-icons/ai'
import GuestInfoForm from '../forms/GuestInfoForm/GuestInfoForm'

const Detail = (): React.ReactElement => {
    const { showToast } = useAppContext()
    const { id } = useParams()

    const [hotel, setHotel] = useState<IHotelData | undefined>(undefined)
    useEffect(() => {
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
        getHotelById()
    })
    return (
        <>
            {hotel && (
                <div className="space-y-6">
                    <div>
                        <span className="flex">
                            {Array.from({ length: hotel.starRating }).map(
                                (value, index) => (
                                    <AiFillStar
                                        className="fill-yellow-400"
                                        key={index}
                                    />
                                )
                            )}
                        </span>
                        <h1 className="text-3xl font-bold">{hotel.name}</h1>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        {hotel.imageUrls.map((image) => (
                            <div key={image} className="h-[300px]">
                                <img
                                    src={image}
                                    alt={hotel.name}
                                    className="rounded-md w-full h-full object-cover object-center"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
                        {hotel.facilities.map((facility) => (
                            <div
                                key={facility}
                                className="border border-slate-300 rounded-sm p-3"
                            >
                                {facility}
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
                        <div className="whitespace-pre-line">
                            {hotel.description}
                        </div>
                        <div className="h-fit">
                            <GuestInfoForm
                                hotelId={hotel._id}
                                pricePerNight={hotel.pricePerNight}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Detail
