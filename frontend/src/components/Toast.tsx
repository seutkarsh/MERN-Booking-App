import { IToastMessage } from '../contexts/AppContext'
import React, { useEffect } from 'react'

const Toast = ({
    message,
    type,
    onClose,
}: IToastMessage): React.ReactElement => {
    useEffect(() => {
        const timer = setTimeout(() => {
            if (onClose) {
                onClose()
            }
        }, 3000)

        return () => {
            clearTimeout(timer)
        }
    }, [])

    const styles = type === 'SUCCESS' ? 'bg-green-600' : 'bg-red-600'
    return (
        <div
            className={`fixed top-4 right-4 z-50 p-4 rounded-md text-white max-w-md ${styles}`}
        >
            <div className="flex justify-center items-center">
                <span className="text-lg font-semibold">{message}</span>
            </div>
        </div>
    )
}

export default Toast
