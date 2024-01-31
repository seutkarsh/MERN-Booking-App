import React from 'react'
import { useFormContext } from 'react-hook-form'
import { HotelFormData } from './ManageHotelForm'

const ImagesSection = (): React.ReactElement => {
    const {
        register,
        formState: { errors },
    } = useFormContext<HotelFormData>()

    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">Images</h2>
            <div className="border rounded p-4 flex flex-col gap-4">
                <input
                    className=" w-full text-gray-700 font-normal"
                    type="file"
                    multiple
                    accept="image/*"
                    {...register('imageFiles', {
                        validate: (imageFiles) => {
                            const totalLenght = imageFiles.length

                            if (totalLenght === 0) {
                                return 'At least one image file should be added'
                            }

                            if (totalLenght > 6) {
                                return 'Total number of images cannot be more than 6'
                            }
                        },
                    })}
                />
            </div>
            {errors.imageFiles && (
                <span className="text-sm text-red-500 font-bold">
                    {errors.imageFiles.message}
                </span>
            )}
        </div>
    )
}

export default ImagesSection
