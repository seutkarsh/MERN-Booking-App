import React, { useContext } from 'react'

interface IToastMessage {
    message: string
    type: 'SUCCESS' | 'ERROR'
}
interface IAppContext {
    showToast: (toastMessage: IToastMessage) => void
}

const AppContext = React.createContext<IAppContext | undefined>(undefined)

export const AppContextProvider = ({
    children,
}: {
    children: React.ReactNode
}): React.ReactNode => {
    return (
        <AppContext.Provider
            value={{
                showToast: (toastMessage) => {
                    console.log(toastMessage)
                },
            }}
        >
            {children}
        </AppContext.Provider>
    )
}
export const useAppContext = () => {
    const context = useContext(AppContext)
    return context as IAppContext
}
