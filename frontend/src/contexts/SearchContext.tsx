/* eslint-disable @typescript-eslint/no-shadow */
import React, { useContext, useState } from 'react'

export interface ISearchContext {
    destination: string
    checkIn: Date
    checkOut: Date
    adultCount: number
    childCount: number
    hotelId: string
    saveSearchValues: (
        destination: string,
        checkIn: Date,
        checkOut: Date,
        adultCount: number,
        childCount: number
    ) => void
}

const SearchContext = React.createContext<ISearchContext | undefined>(undefined)

export const SearchContextProvider = ({
    children,
}: {
    children: React.ReactElement
}): React.ReactElement => {
    const [destination, setDestination] = useState<string>('')
    const [checkIn, setCheckIn] = useState<Date>(new Date())
    const [checkOut, setCheckOut] = useState<Date>(new Date())
    const [adultCount, setAdultCount] = useState<number>(1)
    const [childCount, setChildCount] = useState<number>(0)
    const [hotelId, setHotelId] = useState<string>('')

    const saveSearchValues = (
        destination: string,
        checkIn: Date,
        checkOut: Date,
        adultCount: number,
        childCount: number
    ): void => {
        setDestination(destination)
        setCheckIn(checkIn)
        setCheckOut(checkOut)
        setAdultCount(adultCount)
        setChildCount(childCount)
        if (hotelId) {
            setHotelId(hotelId)
        }
    }
    return (
        <SearchContext.Provider
            value={{
                destination,
                checkIn,
                checkOut,
                adultCount,
                childCount,
                saveSearchValues,
                hotelId,
            }}
        >
            {children}
        </SearchContext.Provider>
    )
}

export const useSearchContext = (): ISearchContext => {
    const context = useContext(SearchContext)
    return context as ISearchContext
}
