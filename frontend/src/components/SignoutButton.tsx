import React from 'react'
import { postRequest, Request } from '../api/request'
import { useQueryClient } from 'react-query'

const SignoutButton = (): React.ReactElement => {
    const queryClient = useQueryClient()
    const clickHandle = async (): Promise<void> => {
        console.log('Sign out clicked')
        const requestData = new Request('/logout')
        await postRequest(requestData)
        await queryClient.invalidateQueries('validateToken')
    }
    return (
        <button
            onClick={clickHandle}
            className="text-blue-600 px-3 font-bold hover:bg-gray-100 bg-white"
        >
            Sign Out
        </button>
    )
}

export default SignoutButton
