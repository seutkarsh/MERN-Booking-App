import React, { useEffect, useState } from 'react'
import { useSearchContext } from '../contexts/SearchContext'
import { getRequest, Request } from '../api/request'
import { useQueryClient } from 'react-query'
import { useAppContext } from '../contexts/AppContext'
import { IHotelData } from './MyHotels'
import SearchResultsCard from '../components/SearchResultsCard'
import Pagination from '../components/Pagination'

const Search = (): React.ReactElement => {
    const searchContext = useSearchContext()
    const queryClient = useQueryClient()
    const { showToast } = useAppContext()
    const [page, setPage] = useState<number>(1)
    const [data, setData] = useState<ISearchResults | undefined>(undefined)

    useEffect(() => {
        const getSearchResults = async (): Promise<void> => {
            const request = new Request('/hotels/search')
            const queryParams = new URLSearchParams()
            queryParams.append('destination', searchContext.destination || '')
            queryParams.append(
                'checkIn',
                searchContext.checkIn.toISOString() || ''
            )
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
            queryParams.append('page', page.toString() || '')
            request.setQueryParams(queryParams)

            const response = await getRequest(request)
            console.log(response)
            if (response.errors) {
                showToast({
                    message: response.errors
                        ? response.errors.toString()
                        : 'Something Went Wrong',
                    type: 'ERROR',
                })

                await queryClient.invalidateQueries('validateToken')
                // navigate('/')
            }
            setData(response.data as ISearchResults)
        }
        getSearchResults()
    })
    return (
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
                <div className="space-y-5">
                    <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
                        Filter by:
                    </h3>
                    {/*filters here*/}
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
                    {/*Sort Options*/}
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
