import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ITimeOffCreate, ITimeOffUpdate } from '@/models/TimeOff'
interface TimeOffResponse {
    Success: boolean
    Data: any
}
interface IMonthAndYear {
    Month: number
    Year: number
}
const apiPath = 'https://localhost:44381/api/admin/TimeOff'

export const TimeOffApi = createApi({
    reducerPath: 'TimeOffApi',
    baseQuery: fetchBaseQuery({ baseUrl: apiPath }),
    endpoints: builder => ({
        searchTimeOff: builder.query<TimeOffResponse, void>({
            query: () => 'Search/search'
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
    useCreateTimeOffsMutation,
    useUpdateTimeOffsMutation,
    useGetByIdTimeOffsQuery,
    useGetTimeOffStatisticsByMonthAndYearQuery,
    useGetPendingFutureTimeOffsQuery,
    useChangeStatusTimeOffsMutation
} = TimeOffApi
