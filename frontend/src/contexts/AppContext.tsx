import React, { useContext, useState } from 'react'
import Toast from '../components/Toast'

export interface IToastMessage {
    message: string
    type: 'SUCCESS' | 'ERROR'
    onClose?: () => void
}
interface IAppContext {
    showToast: (toastMessage: IToastMessage) => void
}

const AppContext = React.createContext<IAppContext | undefined>(undefined)

export const AppContextProvider = ({
    children,
}: {
    children: React.ReactElement
}): React.ReactElement => {
    const [toast, setToast] = useState<IToastMessage | undefined>(undefined)

    return (
        <AppContext.Provider
            value={{
                showToast: (toastMessage) => {
                    setToast(toastMessage)
                },
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
