import { useForm } from 'react-hook-form'
import { postRequest, Request } from '../api/request'
import { useAppContext } from '../contexts/AppContext'
import { useNavigate } from 'react-router-dom'
import React from 'react'

const Login = (): React.ReactElement => {
    const { showToast } = useAppContext()
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ILoginFormData>()

    const onSubmit = handleSubmit(async (data) => {
        const request = new Request<ILoginFormData>('/login')
        request.setBody(data)
        const response = await postRequest(request)

        if (response.success) {
            showToast({
                message: 'Login Successful',
                type: 'SUCCESS',
            })
            navigate('/')
        } else {
            showToast({
                message: response.errors
                    ? response.errors.toString()
                    : 'Something Went Wrong',
                type: 'ERROR',
            })
        }
    })

    return (
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            <h2 className="text-3xl font-bold">Login Into Your Account</h2>
            <label className="text-gray-700 text-sm font-bold flex-1">
                Email
                <input
                    type="email"
                    className="border rounded w-full py-1 px-2 font-normal"
                    {...register('email', {
                        required: 'This field is required',
                    })}
                />
                {errors.email && (
                    <span className="text-red-500">{errors.email.message}</span>
                )}
            </label>
            <label className="text-gray-700 text-sm font-bold flex-1">
                Password
                <input
                    type="password"
                    className="border rounded w-full py-1 px-2 font-normal"
                    {...register('password', {
                        required: 'This field is required',
                        minLength: {
                            value: 6,
                            message:
                                'Password should be at least 6 characters long',
                        },
                    })}
                />
                {errors.email && (
                    <span className="text-red-500">{errors.email.message}</span>
                )}
            </label>
            <span>
                <button
                    type="submit"
                    className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500"
                >
                    Login
                </button>
            </span>
        </form>
    )
}

interface ILoginFormData {
    email: string
    password: string
}

export default Login
