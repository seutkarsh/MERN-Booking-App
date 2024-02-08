import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import DetailsSection from './DetailsSection'
import TypeSection from './TypeSection'
import FacilitiesSection from './FacilitiesSection'
import GuestsSection from './GuestsSection'
import ImagesSection from './ImagesSection'
import { IHotelData } from '../../pages/MyHotels'

export interface HotelFormData {
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
    imageFiles: FileList
    imageUrls: string[]
}

export interface Props {
    onSave: (data: FormData) => Promise<void>
    hotel?: IHotelData | undefined
}
const ManageHotelForm = ({ onSave, hotel }: Props): React.ReactElement => {
    const formMethods = useForm<HotelFormData>()
    const { handleSubmit, reset } = formMethods

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        reset(hotel)
    }, [hotel, reset])

    const onSubmit = handleSubmit(async (formDataJson: HotelFormData) => {
        setIsLoading(true)
        const formData = new FormData()
        formData.append('name', formDataJson.name)
        formData.append('city', formDataJson.city)
        formData.append('country', formDataJson.country)
        formData.append('description', formDataJson.description)
        formData.append('type', formDataJson.type)
        formData.append('pricePerNight', formDataJson.pricePerNight.toString())
        formData.append('starRating', formDataJson.starRating.toString())
        formData.append('adultCount', formDataJson.adultCount.toString())
        formData.append('childCount', formDataJson.childCount.toString())

        formDataJson.facilities.forEach((facility, index) => {
            formData.append(`facilities[${index}]`, facility)
        })

        Array.from(formDataJson.imageFiles).forEach((imageFile) => {
            formData.append('imageFiles', imageFile)
        })

        await onSave(formData)
        setIsLoading(false)
    })

    return (
        <FormProvider {...formMethods}>
            <form className="flex flex-col gap-10" onSubmit={onSubmit}>
                <DetailsSection />
                <TypeSection />
                <FacilitiesSection />
                <GuestsSection />
                <ImagesSection />
                <span className="flex justify-end">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 rounded-xl"
                    >
                        Save
                    </button>
                </span>
            </form>
        </FormProvider>
    )
}

export default ManageHotelForm
