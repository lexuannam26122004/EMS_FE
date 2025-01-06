import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ITimeOffCreate, ITimeOffUpdate } from '@/models/TimeOff'
import { ITotalEventsByMonth } from '@/models/Event'

interface TimeOffResponse {
    Success: boolean
    Data: any
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

        getTimeOffStatistics: builder.query<TimeOffResponse, ITotalEventsByMonth>({
            query: params => `GetTimeOffStatistics/time-off-statistics?month=${params.Month}&year=${params.Year}`
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
    useGetTimeOffStatisticsQuery,
    useChangeStatusTimeOffsMutation
} = TimeOffApi
