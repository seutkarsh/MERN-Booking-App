import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getRequest, postFormRequest, Request } from '../api/request'
import { useQueryClient } from 'react-query'
import { useAppContext } from '../contexts/AppContext'
import { IHotelData } from './MyHotels'
import ManageHotelForm from '../forms/ManageHotelForm/ManageHotelForm'

const EditHotel = (): React.ReactElement => {
    const queryClient = useQueryClient()
    const { showToast } = useAppContext()
    const { hotelId } = useParams()

    const [hotel, setHotel] = useState<IHotelData | undefined>(undefined)

    useEffect(() => {
        const getHotelById = async (): Promise<void> => {
            if (hotelId) {
                const request = new Request(`/my-hotels/${hotelId}`)
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
                setHotel(response.data as IHotelData)
            }
        }

        getHotelById()
    }, [hotelId])

    const handleSave = async (data: FormData): Promise<void> => {
        const request = new Request<FormData>('/my-hotels')
        request.setBody(data)
        const response = await postFormRequest(request)
        console.log(request)
        if (response.success) {
            showToast({
                message: 'Hotel Updated Successfully',
                type: 'SUCCESS',
            })
            await queryClient.invalidateQueries('validateToken')
            // navigate('/')
        } else {
            showToast({
                message: response.errors
                    ? response.errors.toString()
                    : 'Something Went Wrong',
                type: 'ERROR',
            })
        }
    }

    if (hotel) {
        return <ManageHotelForm onSave={handleSave} hotel={hotel} />
    } else {
        return (
            <div className="mx-auto my-auto">
                <h1>Loading Hotel</h1>
            </div>
        )
    }
}

export default EditHotel
