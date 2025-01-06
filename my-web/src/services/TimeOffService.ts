import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ITimeOffCreate, ITimeOffUpdate } from '@/models/TimeOff'
import { ITotalEventsByMonth } from '@/models/Event'

interface TimeOffResponse {
    Success: boolean
    Data: any
}
interface IMonthAndYear {
    Month: number
    Year: number
}

interface IFilter {
    isActive?: boolean
    createdDate?: Date
    pageSize?: number
    pageNumber?: number
    sortBy?: string
    isDescending?: boolean
    keyword?: string
}

const apiPath = 'https://localhost:44381/api/admin/TimeOff'

export const TimeOffApi = createApi({
    reducerPath: 'TimeOffApi',
    baseQuery: fetchBaseQuery({ baseUrl: apiPath }),
    endpoints: builder => ({
        searchTimeOff: builder.query<TimeOffResponse, IFilter>({
            query: filter => {
                const params = new URLSearchParams()

                if (filter) {
                    if (filter.createdDate) params.append('CreatedDate', filter.createdDate.toDateString())
                    if (filter.pageSize) params.append('PageSize', filter.pageSize.toString())
                    if (filter.pageNumber) params.append('PageNumber', filter.pageNumber.toString())
                    if (filter.isActive !== undefined) params.append('IsActive', filter.isActive.toString())
                    if (filter.keyword) params.append('Keyword', filter.keyword)
                    if (filter.isDescending !== undefined) params.append('IsDescending', filter.isDescending.toString())
                    if (filter.sortBy) params.append('SortBy', filter.sortBy)
                }

                return `Search/search?${params.toString()}`
            }
        }),

        searchByUserId: builder.query<TimeOffResponse, { userId: string; filter: IFilter }>({
            query: ({ userId, filter }) => {
                const params = new URLSearchParams()

                if (filter) {
                    if (filter.createdDate) params.append('CreatedDate', filter.createdDate.toDateString())
                    if (filter.pageSize) params.append('PageSize', filter.pageSize.toString())
                    if (filter.pageNumber) params.append('PageNumber', filter.pageNumber.toString())
                    if (filter.isActive !== undefined) params.append('IsActive', filter.isActive.toString())
                    if (filter.keyword) params.append('Keyword', filter.keyword)
                    if (filter.isDescending !== undefined) params.append('IsDescending', filter.isDescending.toString())
                    if (filter.sortBy) params.append('SortBy', filter.sortBy)
                }

                return `SearchByUserId?${params.toString()}&UserId=${userId}`
            }
        }),

        createTimeOffs: builder.mutation<void, ITimeOffCreate>({
            query: body => ({
                url: `Create`,
                method: 'POST',
                body: body
            })
        }),
        updateTimeOffs: builder.mutation<void, ITimeOffUpdate>({
            query: body => ({
                url: `Update`,
                method: 'PUT',
                body: body
            })
        }),

        getTimeOffStatistics: builder.query<TimeOffResponse, ITotalEventsByMonth>({
            query: params => `GetTimeOffStatistics/time-off-statistics?month=${params.Month}&year=${params.Year}`

        getTimeOffStatisticsByMonthAndYear: builder.query<TimeOffResponse, IMonthAndYear>({
            query: params => `GetTimeOffStatistics/time-off-statistics?year=${params.Year}&month=${params.Month}`
        }),

        getPendingFutureTimeOffs: builder.query<TimeOffResponse, void>({
            query: () => `GetPendingFutureTimeOffs/pending-future-timeoffs`
        }),

        getByIdTimeOffs: builder.query<TimeOffResponse, number>({
            query: id => `GetById/${id}`
        }),

        changeStatusTimeOffs: builder.mutation<void, number>({
            query: id => ({
                url: `ChangeStatus/${id}/status`,
                method: 'PUT'
            })
        })
    })
})

export const {
    useSearchTimeOffQuery,
    useSearchByUserIdQuery,
    useCreateTimeOffsMutation,
    useUpdateTimeOffsMutation,
    useGetByIdTimeOffsQuery,
    useGetTimeOffStatisticsQuery,
    useGetTimeOffStatisticsByMonthAndYearQuery,
    useGetPendingFutureTimeOffsQuery,
    useChangeStatusTimeOffsMutation
} = TimeOffApi
