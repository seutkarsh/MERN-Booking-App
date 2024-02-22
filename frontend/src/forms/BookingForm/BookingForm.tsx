import React, { useEffect, useState } from 'react'
import { IPaymentIntentData, IUserData } from '../../pages/Booking'
import { useForm } from 'react-hook-form'
import { useSearchContext } from '../../contexts/SearchContext'
import { getRequest, postRequest, Request } from '../../api/request'
import { IHotelData } from '../../pages/MyHotels'
import { useParams } from 'react-router-dom'
import { useAppContext } from '../../contexts/AppContext'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { StripeCardElement } from '@stripe/stripe-js'

interface IProps {
    currentUser: IUserData
    paymentIntent: IPaymentIntentData
}

interface IBookingFormData {
    firstName: string
    lastName: string
    email: string
    adultCount: number
    childCount: number
    checkIn: string
    checkOut: string
    hotelId: string
    paymentIntentId: string
    totalCost: number
}
const BookingForm = ({
    currentUser,
    paymentIntent,
}: IProps): React.ReactElement => {
    const stripe = useStripe()
    const elements = useElements()
    const searchContext = useSearchContext()
    const { id } = useParams()
    const { showToast } = useAppContext()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { handleSubmit, register } = useForm<IBookingFormData>({
        defaultValues: {
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            email: currentUser.email,
            adultCount: searchContext.adultCount,
            childCount: searchContext.childCount,
            checkIn: searchContext.checkIn.toISOString(),
            checkOut: searchContext.checkOut.toISOString(),
            hotelId: id,
            totalCost: paymentIntent.totalCost,
        },
    })

    const onSubmit = async (formData: IBookingFormData): Promise<void> => {
        setIsLoading(true)
        if (!stripe || !elements) {
            return
        }
        const result = await stripe?.confirmCardPayment(
            paymentIntent.clientSecret,
            {
                payment_method: {
                    card: elements.getElement(CardElement) as StripeCardElement,
                },
            }
        )

        console.log(result)
        if (result.paymentIntent?.status === 'succeeded') {
            console.log('Here in Booking Request')
            const request = new Request(`/hotels/${id}/bookings`)
            request.setBody({
                ...formData,
                paymentIntentId: result.paymentIntent.id,
            })
            const response = await postRequest(request)
            if (response.errors) {
                showToast({
                    message: response.errors
                        ? response.errors.toString()
                        : 'Something Went Wrong',
                    type: 'ERROR',
                })
            }
            if (response.success) {
                showToast({ message: 'Booking Done!', type: 'SUCCESS' })
            }
        }
        setIsLoading(false)
    }

    return (
        <form
            className="grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-5"
            onSubmit={handleSubmit(onSubmit)}
        >
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
            <div className="space-y-2">
                <h2 className="text-xl font-semibold">Your Price Summary</h2>
                <div className="bg-blue-200 p-4 rounded-md">
                    <div className="font-semibold text-lg">
                        Total Cost: ₹ {paymentIntent.totalCost.toFixed(2)}
                    </div>
                    <div className="text-ss">
                        Inclusive of Taxes and Charges
                    </div>
                </div>
            </div>
            <div className="space-y-2">
                <h3 className="text-xl font-semibold">Payment Details</h3>
                <CardElement
                    id="payment-element"
                    className="border rounded-md p-2 text-sm"
                />
            </div>
            <div className="flex justify-end">
                <button
                    className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-md disabled:bg-gray-500"
                    disabled={isLoading}
                    type="submit"
                >
                    {isLoading ? 'Saving Booking' : 'Confirm Booking'}
                </button>
            </div>
        </form>
    )
}

export default BookingForm
