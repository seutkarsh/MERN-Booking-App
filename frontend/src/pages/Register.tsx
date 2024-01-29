import React, { ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { postRequest, Request } from '../api/request'
import { useAppContext } from '../contexts/AppContext'
import { Link, useNavigate } from 'react-router-dom'
import { useQueryClient } from 'react-query'

const Register = (): ReactElement => {
    const { showToast } = useAppContext()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm<IRegisterFormData>()

    const onSubmit = handleSubmit(async (data) => {
        const request = new Request<IRegisterFormData>('/register')
        request.setBody(data)
        const response = await postRequest(request)

        if (response.success) {
            showToast({ message: 'Registration Successful', type: 'SUCCESS' })
            await queryClient.invalidateQueries('validateToken')
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
            <h2 className="text-3xl font-bold">Create an Account</h2>
            <div className="flex flex-col md:flex-row gap-5">
                <label className="text-gray-700 text-sm font-bold flex-1">
                    First Name
                    <input
                        className="border rounded w-full py-1 px-2 font-normal"
                        {...register('firstName', {
                            required: 'This field is required',
                        })}
                    />
                    {errors.firstName && (
                        <span className="text-red-500">
                            {errors.firstName.message}
                        </span>
                    )}
                </label>
                <label className="text-gray-700 text-sm font-bold flex-1">
                    Last Name
                    <input
                        className="border rounded w-full py-1 px-2 font-normal"
                        {...register('lastName', {
                            required: 'This field is required',
                        })}
                    />
                    {errors.lastName && (
                        <span className="text-red-500">
                            {errors.lastName.message}
                        </span>
                    )}
                </label>
            </div>
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
                            message: 'Password must be at least 6 characters',
                        },
                    })}
                />
                {errors.password && (
                    <span className="text-red-500">
                        {errors.password.message}
                    </span>
                )}
            </label>
            <label className="text-gray-700 text-sm font-bold flex-1">
                Confirm Password
                <input
                    type="password"
                    className="border rounded w-full py-1 px-2 font-normal"
                    {...register('confirmPassword', {
                        validate: (value) => {
                            if (!value) {
                                return 'This field is required'
                            } else if (watch('password') !== value) {
                                return 'Your password do not match'
                            }
                        },
                    })}
                />
                {errors.confirmPassword && (
                    <span className="text-red-500">
                        {errors.confirmPassword.message}
                    </span>
                )}
            </label>

            <div className="flex flex-row justify-between items-center">
                <span className="text-sm ">
                    Already Registered?{' '}
                    <Link to="/login" className="underline">
                        Sign in here
                    </Link>
                </span>
                <span>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 rounded-xl"
                    >
                        Create Account
                    </button>
                </span>
            </div>
        </form>
    )
}

interface IRegisterFormData {
    firstName: string
    lastName: string
    email: string
    password: string
    confirmPassword: string
}
export default Register
