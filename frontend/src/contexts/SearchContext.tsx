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
    const [destination, setDestination] = useState<string>(
        () => sessionStorage.getItem('destination') || ''
    )
    const [checkIn, setCheckIn] = useState<Date>(
        () =>
            new Date(
                sessionStorage.getItem('checkIn') || new Date().toISOString()
            )
    )
    const [checkOut, setCheckOut] = useState<Date>(
        () =>
            new Date(
                sessionStorage.getItem('checkOut') || new Date().toISOString()
            )
    )
    const [adultCount, setAdultCount] = useState<number>(() =>
        parseInt(sessionStorage.getItem('adultCount') || '1')
    )
    const [childCount, setChildCount] = useState<number>(() =>
        parseInt(sessionStorage.getItem('childCount') || '0')
    )
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
            sessionStorage.setItem('hotelId', hotelId)
        }

        sessionStorage.setItem('destination', destination)
        sessionStorage.setItem('checkIn', checkIn.toISOString())
        sessionStorage.setItem('checkOut', checkOut.toISOString())
        sessionStorage.setItem('adultCount', adultCount.toString())
        sessionStorage.setItem('childCount', childCount.toString())
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
