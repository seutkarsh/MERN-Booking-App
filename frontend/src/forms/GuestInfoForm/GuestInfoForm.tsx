import React from 'react'
import { useForm } from 'react-hook-form'
import ReactDatePicker from 'react-datepicker'
import { useSearchContext } from '../../contexts/SearchContext'
import { useAppContext } from '../../contexts/AppContext'
import { useLocation, useNavigate } from 'react-router-dom'
import { Simulate } from 'react-dom/test-utils'
import submit = Simulate.submit

interface IProps {
    hotelId: string
    pricePerNight: number
}
const GuestInfoForm = ({
    hotelId,
    pricePerNight,
}: IProps): React.ReactElement => {
    const searchContext = useSearchContext()
    const { isLoggedIn } = useAppContext()
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const {
        register,
        watch,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<IGuestFormData>({
        defaultValues: {
            checkIn: searchContext.checkIn,
            checkOut: searchContext.checkOut,
            adultCount: searchContext.adultCount,
            childCount: searchContext.childCount,
        },
    })

    const checkIn = watch('checkIn')
    const checkOut = watch('checkOut')
    const minDate = new Date()
    const maxDate = new Date()
    maxDate.setFullYear(maxDate.getFullYear() + 1)

    const onSignInClick = (data: IGuestFormData): void => {
        searchContext.saveSearchValues(
            '',
            data.checkIn,
            data.checkOut,
            data.adultCount,
            data.childCount
        )
        navigate('/login', { state: { from: { pathname } } })
    }
    const onSubmit = (data: IGuestFormData): void => {
        searchContext.saveSearchValues(
            '',
            data.checkIn,
            data.checkOut,
            data.adultCount,
            data.childCount
        )
        navigate(`/hotel/${hotelId}/booking`, { state: { from: pathname } })
    }
    return (
        <div className="flex flex-col p-4 bg-blue-200 gap-4">
            <h3 className="text-md font-bold">₹ {pricePerNight} per night</h3>
            <form
                onSubmit={
                    isLoggedIn
                        ? handleSubmit(onSubmit)
                        : handleSubmit(onSignInClick)
                }
            >
                <div className="grid grid-cols-1 gap-4 items-center">
                    <div>
                        <ReactDatePicker
                            required
                            selected={checkIn}
                            onChange={(date) =>
                                setValue('checkIn', date as Date)
                            }
                            selectsStart={true}
                            startDate={checkIn}
                            endDate={checkOut}
                            minDate={minDate}
                            maxDate={maxDate}
                            placeholderText="Check-in Date"
                            className="min-w-full bg-white p-2 focus:outline-none"
                            wrapperClassName="min-w-full"
                        />
                    </div>
                    <div>
                        <ReactDatePicker
                            required
                            selected={checkOut}
                            onChange={(date) =>
                                setValue('checkOut', date as Date)
                            }
                            selectsStart={true}
                            startDate={checkIn}
                            endDate={checkOut}
                            minDate={minDate}
                            maxDate={maxDate}
                            placeholderText="Check-out Date"
                            className="min-w-full bg-white p-2 focus:outline-none"
                            wrapperClassName="min-w-full"
                        />
                    </div>
                    <div className="flex bg-white px-2 py-1 gap-2">
                        <label className="items-center flex">
                            Adults:
                            <input
                                className="w-full p-1 focus:outline-none font-bold"
                                type="number"
                                min={1}
                                max={20}
                                {...register('adultCount', {
                                    required: 'This field is required',
                                    min: {
                                        value: 1,
                                        message:
                                            'There must be at least one adult',
                                    },
                                    valueAsNumber: true,
                                })}
                            />
                        </label>
                        <label className="items-center flex">
                            Children:
                            <input
                                className="w-full p-1 focus:outline-none font-bold"
                                type="number"
                                min={0}
                                max={20}
                                {...register('childCount', {
                                    valueAsNumber: true,
                                })}
                            />
                        </label>
                        {errors.adultCount && (
                            <span className="text-sm text-red-500 font-semibold">
                                {errors.adultCount.message}
                            </span>
                        )}
                    </div>
                    {isLoggedIn ? (
                        <button className="bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-500 text-xl">
                            Book Now
                        </button>
                    ) : (
                        <button className="bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-500 text-xl">
                            Sign In to Book
                        </button>
                    )}
                </div>
            </form>
        </div>
    )
}

interface IGuestFormData {
    checkIn: Date
    checkOut: Date
    adultCount: number
    childCount: number
}

export default GuestInfoForm
