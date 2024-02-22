import React, { useEffect, useState } from 'react'
import { useSearchContext } from '../contexts/SearchContext'
import { getRequest, Request } from '../api/request'
import { useQueryClient } from 'react-query'
import { useAppContext } from '../contexts/AppContext'
import { IHotelData } from './MyHotels'
import SearchResultsCard from '../components/SearchResultsCard'
import Pagination from '../components/Pagination'
import StarRatingFilter from '../components/StarRatingFilter'
import HotelTypeFilter from '../components/HotelTypeFilter'
import FacilityFilter from '../components/FacilityFilter'
import PriceFilter from '../components/PriceFilter'

const Search = (): React.ReactElement => {
    const searchContext = useSearchContext()
    const queryClient = useQueryClient()
    const { showToast } = useAppContext()
    const [page, setPage] = useState<number>(1)
    const [data, setData] = useState<ISearchResults | undefined>(undefined)

    const [selectedStars, setSelectedStars] = useState<string[]>([])
    const [selectedTypes, setSelectedTypes] = useState<string[]>([])
    const [selectedFacilities, setSelectedFacilities] = useState<string[]>([])
    const [selectedPrice, setSelectedPrice] = useState<number | undefined>()

    const [sortOptions, setSortOptions] = useState<string>('')

    const handleStarsChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const starRating = event.target.value
        setSelectedStars((prevState) =>
            event.target.checked
                ? [...prevState, starRating]
                : prevState.filter((star) => star !== starRating)
        )
    }

    const handleTypesChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const hotelType = event.target.value
        setSelectedTypes((prevState) =>
            event.target.checked
                ? [...prevState, hotelType]
                : prevState.filter((type) => type !== hotelType)
        )
    }

    const handleFacilitiesChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const hotelFacilities = event.target.value
        setSelectedFacilities((prevState) =>
            event.target.checked
                ? [...prevState, hotelFacilities]
                : prevState.filter((facility) => facility !== hotelFacilities)
        )
    }

    useEffect(() => {
        const getSearchResults = async (): Promise<void> => {
            const request = new Request('/hotels/search')
            const queryParams = new URLSearchParams()
            queryParams.append('destination', searchContext.destination || '')
            queryParams.append(' ', searchContext.checkIn.toISOString() || '')
            queryParams.append(
                'checkOut',
                searchContext.checkOut.toISOString() || ''
            )
            queryParams.append(
                'adultCount',
                searchContext.adultCount.toString() || ''
            )
            queryParams.append(
                'childCount',
                searchContext.childCount.toString() || ''
            )
            queryParams.append('pageNumber', page.toString() || '')
            selectedStars.forEach((star) => queryParams.append('stars', star))
            selectedTypes.forEach((type) => queryParams.append('types', type))
            selectedFacilities.forEach((facility) =>
                queryParams.append('facilities', facility)
            )
            queryParams.append('maxPrice', selectedPrice?.toString() || '')
            queryParams.append('sortOption', sortOptions)
            request.setQueryParams(queryParams)

            const response = await getRequest(request)
            if (response.errors) {
                showToast({
                    message: response.errors
                        ? response.errors.toString()
                        : 'Something Went Wrong',
                    type: 'ERROR',
                })

                // await queryClient.invalidateQueries('validateToken')
                // // navigate('/')
            }
            setData(response.data as ISearchResults)
        }
        getSearchResults()
    }, [
        selectedPrice,
        selectedStars,
        selectedFacilities,
        selectedTypes,
        sortOptions,
    ])
    return (
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
                <div className="space-y-5">
                    <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
                        Filter by:
                    </h3>
                    <StarRatingFilter
                        selectedStars={selectedStars}
                        onChange={handleStarsChange}
                    />
                    <HotelTypeFilter
                        selectedTypes={selectedTypes}
                        onChange={handleTypesChange}
                    />
                    <FacilityFilter
                        selectedFacilities={selectedFacilities}
                        onChange={handleFacilitiesChange}
                    />
                    <PriceFilter
                        selectedPrice={selectedPrice}
                        onChange={(value?: number) => setSelectedPrice(value)}
                    />
                </div>
            </div>
            <div className="flex flex-col gap-5">
                <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">
                        {data?.pagination.total} Hotels found
                        {searchContext.destination
                            ? ` in ${searchContext.destination}`
                            : ''}
                    </span>
                    <select
                        value={sortOptions}
                        onChange={(event) => setSortOptions(event.target.value)}
                        className="p-2 border rounded-md"
                    >
                        <option value="">Sort By</option>
                        <option value="starRating">Star Rating</option>
                        <option value="pricePerNightAsc">
                            Price Per Night (low to high)
                        </option>
                        <option value="pricePerNightDesc">
                            Price Per Night (high to low)
                        </option>
                    </select>
                </div>
                {data?.hotels.map((hotel) => {
                    return <SearchResultsCard key={hotel._id} hotel={hotel} />
                })}
                <div>
                    <Pagination
                        page={data?.pagination.page || 1}
                        pages={data?.pagination.pages || 1}
                        onPageChange={(pageNum) => setPage(pageNum)}
                    />
                </div>
            </div>
        </div>
    )
}

export interface ISearchResults {
    hotels: IHotelData[]
    pagination: {
        total: number
        page: number
        pages: number
    }
}

export default Search
