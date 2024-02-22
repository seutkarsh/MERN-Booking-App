import React from 'react'
import ManageHotelForm from '../forms/ManageHotelForm/ManageHotelForm'
import { useQueryClient } from 'react-query'
import { postFormRequest, Request } from '../api/request'
import { useAppContext } from '../contexts/AppContext'

const AddHotel = (): React.ReactElement => {
    const queryClient = useQueryClient()
    const { showToast } = useAppContext()
    const handleSave = async (data: FormData): Promise<void> => {
        const request = new Request<FormData>('/my-hotels')
        request.setBody(data)
        const response = await postFormRequest(request)
        console.log(request)
        if (response.success) {
            showToast({
                message: 'Hotel Added Successfully',
                type: 'SUCCESS',
            })
            await queryClient.invalidateQueries('validateToken')
        } else {
            showToast({
                message: response.errors
                    ? response.errors.toString()
                    : 'Something Went Wrong',
                type: 'ERROR',
            })
        }
    }
    return <ManageHotelForm onSave={handleSave} />
}

export default AddHotel
