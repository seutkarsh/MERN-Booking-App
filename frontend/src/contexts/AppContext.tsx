import React, { useContext, useState } from 'react'
import Toast from '../components/Toast'
import { validationRequest, Request } from '../api/request'
import { useQuery } from 'react-query'

export interface IToastMessage {
    message: string
    type: 'SUCCESS' | 'ERROR'
    onClose?: () => void
}
interface IAppContext {
    showToast: (toastMessage: IToastMessage) => void
    isLoggedIn: boolean
}

const AppContext = React.createContext<IAppContext | undefined>(undefined)

export const AppContextProvider = ({
    children,
}: {
    children: React.ReactElement
}): React.ReactElement => {
    const [toast, setToast] = useState<IToastMessage | undefined>(undefined)

    const requestData = new Request('/validate-token')

    const { isError } = useQuery('validateToken', validationRequest, {
        retry: false,
    })

    return (
        <AppContext.Provider
            value={{
                showToast: (toastMessage) => {
                    setToast(toastMessage)
                },
                isLoggedIn: !isError,
            }}
        >
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(undefined)}
                />
            )}
            {children}
        </AppContext.Provider>
    )
}
export const useAppContext = (): IAppContext => {
    const context = useContext(AppContext)
    return context as IAppContext
}
