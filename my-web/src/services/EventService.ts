import { IEventCreate, IFilterEvent, IEventUpdate } from '@/models/Event'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface IEventResponse {
    Success: boolean
    Data: any
}

const apiPath = 'https://localhost:44381/api/admin/Event'

export const eventApi = createApi({
    reducerPath: 'EventApis',
    baseQuery: fetchBaseQuery({ baseUrl: apiPath }),
    endpoints: builder => ({
        searchEvent: builder.query<IEventResponse, IFilterEvent>({
            query: filter => {
                const params = new URLSearchParams()

                if (filter) {
                    if (filter.pageSize != null) params.append('PageSize', filter.pageSize.toString())
                    if (filter.pageNumber != null) params.append('PageNumber', filter.pageNumber.toString())
                    if (filter.keyword != null) params.append('Keyword', filter.keyword)
                    if (filter.startDate != null) params.append('StartDate', filter.startDate)
                    if (filter.endDate != null) params.append('EndDate', filter.endDate)
                    if (filter.isHoliday != null) params.append('IsHoliday', filter.isHoliday.toString())
                }

                return `GetAll?${params.toString()}`
            }
        }),

        createEvent: builder.mutation<void, IEventCreate>({
            query: body => ({
                url: `Create`,
                method: 'POST',
                body: body
            })
        }),

        updateEvent: builder.mutation<void, IEventUpdate>({
            query: body => ({
                url: `Update`,
                method: 'PUT',
                body: body
            })
        }),

        getByIdEvent: builder.query<IEventResponse, number>({
            query: id => `GetById?id=${id}`
        }),

        deleteEvent: builder.mutation<void, number>({
            query: id => ({
                url: `Remove/${id}`,
                method: 'DELETE'
            })
        })
    })
})

export const {
    useCreateEventMutation,
    useGetByIdEventQuery,
    useSearchEventQuery,
    useUpdateEventMutation,
    useDeleteEventMutation
} = eventApi
