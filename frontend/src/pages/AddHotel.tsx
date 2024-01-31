import React from 'react'
import ManageHotelForm from '../forms/ManageHotelForm/ManageHotelForm'
import { useMutation, useQueryClient } from 'react-query'
import { postFormRequest, postRequest, Request } from '../api/request'
import { useAppContext } from '../contexts/AppContext'
import { useNavigate } from 'react-router-dom'

const AddHotel = (): React.ReactElement => {
    const queryClient = useQueryClient()
    const { showToast } = useAppContext()
    const navigate = useNavigate()
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
    return <ManageHotelForm onSave={handleSave} />
}

export default AddHotel
