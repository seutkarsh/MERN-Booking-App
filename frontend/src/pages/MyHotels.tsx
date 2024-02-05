import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getRequest, Request } from '../api/request'
import { useAppContext } from '../contexts/AppContext'
import { useQueryClient } from 'react-query'
import { BsBuilding, BsMap } from 'react-icons/bs'
import { BiHotel, BiMoney, BiStar } from 'react-icons/bi'

const MyHotels = (): React.ReactElement => {
    const queryClient = useQueryClient()
    const { showToast } = useAppContext()

    const [hotels, setHotels] = useState<IHotelData[] | undefined>(undefined)

    useEffect(() => {
        const getHotels = async (): Promise<void> => {
            const request = new Request<FormData>('/my-hotels')
            const response = await getRequest(request)
            if (response.errors) {
                showToast({
                    message: response.errors
                        ? response.errors.toString()
                        : 'Something Went Wrong',
                    type: 'ERROR',
                })

                await queryClient.invalidateQueries('validateToken')
                // navigate('/')
            }
            setHotels(response.data as IHotelData[])
        }

        getHotels()
    }, [])

    return (
        <div className="space-y-5 ">
            <span className="flex justify-between">
                <h1 className="text-3xl font-bold">My Hotels</h1>
                <Link
                    to="/add-hotel"
                    className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500"
                >
                    Add Hotel
                </Link>
            </span>

            <div className="grid-cols-1 gap-8">
                {hotels &&
                    hotels.map((hotel) => {
                        return (
                            <div
                                key={hotel._id}
                                className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5"
                            >
                                <h2 className="text-2xl font-bold">
                                    {hotel.name}
                                </h2>
                                <div className="whitespace-pre-line">
                                    {hotel.description}
                                </div>
                                <div className="grid grid-cols-5 gap-2">
                                    <div className="border border=slate-300 rounded-sm p-3 flex items-center">
                                        <BsMap className="mr-1" />
                                        {hotel.city}, {hotel.country}
                                    </div>
                                    <div className="border border=slate-300 rounded-sm p-3 flex items-center">
                                        <BsBuilding className="mr-1" />
                                        {hotel.type}
                                    </div>
                                    <div className="border border=slate-300 rounded-sm p-3 flex items-center">
                                        <BiMoney className="mr-1" />
                                        {hotel.pricePerNight} per night
                                    </div>
                                    <div className="border border=slate-300 rounded-sm p-3 flex items-center">
                                        <BiHotel className="mr-1" />
                                        {hotel.adultCount} adults,{' '}
                                        {hotel.childCount} children
                                    </div>
                                    <div className="border border=slate-300 rounded-sm p-3 flex items-center">
                                        <BiStar className="mr-1" />
                                        {hotel.starRating} star rating
                                    </div>
                                </div>
                                <span className="flex justify-end">
                                    <Link
                                        className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500"
                                        to={`/edit-hotel/${hotel._id}`}
                                    >
                                        View Details
                                    </Link>
                                </span>
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}

interface IHotelData {
    _id: string
    userId: string
    name: string
    city: string
    country: string
    description: string
    type: string
    adultCount: number
    childCount: number
    facilities: string[]
    pricePerNight: number
    starRating: number
    imageUrls: string[]
    lastUpdated: Date
}

export default MyHotels
