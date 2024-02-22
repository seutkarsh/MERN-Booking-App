import React, { useEffect, useState } from 'react'
import { IUserData } from '../../pages/Booking'
import { useForm } from 'react-hook-form'
import { useSearchContext } from '../../contexts/SearchContext'
import { getRequest, Request } from '../../api/request'
import { IHotelData } from '../../pages/MyHotels'
import { useParams } from 'react-router-dom'
import { useAppContext } from '../../contexts/AppContext'

interface IProps {
    currentUser: IUserData
}

interface IBookingFormData {
    firstName: string
    lastName: string
    email: string
}
const BookingForm = ({ currentUser }: IProps): React.ReactElement => {
    const { showToast } = useAppContext()

    const { handleSubmit, register } = useForm<IBookingFormData>({
        defaultValues: {
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            email: currentUser.email,
        },
    })

    return (
        <form className="grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-5">
            <span className="text-3xl font-bold">Confirm Your Details</span>
            <div className="grid grid-cols-2 gap-6">
                <label className="text-gray-700 text-sm font-bold flex-1">
                    First Name
                    <input
                        className="mt-1 border rounded w-full py-2 text-gray-700 bg-gray-200"
                        type="text"
                        readOnly
                        disabled
                        {...register('firstName')}
                    />
                </label>
                <label className="text-gray-700 text-sm font-bold flex-1">
                    Last Name
                    <input
                        className="mt-1 border rounded w-full py-2 text-gray-700 bg-gray-200"
                        type="text"
                        readOnly
                        disabled
                        {...register('lastName')}
                    />
                </label>
                <label className="text-gray-700 text-sm font-bold flex-1">
                    Email
                    <input
                        className="mt-1 border rounded w-full py-2 text-gray-700 bg-gray-200"
                        type="text"
                        readOnly
                        disabled
                        {...register('email')}
                    />
                </label>
            </div>
        </form>
    )
}

export default BookingForm
