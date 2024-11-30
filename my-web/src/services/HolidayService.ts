import HolidayPage from '@/app/holiday/page'
import { IHolidayCreate, IHolidayGetAll } from '@/models/Holiday'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface HolidayResponse {
    Success: boolean
    Data: any
}

const apiPath = 'https://localhost:44381/api/admin/Holiday'

export const holidayApi = createApi({
    // Defines unique name for this API slice in the Redux store
    reducerPath: 'holidayApi',

    // Configures the base query with the API URL
    baseQuery: fetchBaseQuery({ baseUrl: apiPath }),

    // Tags are used for cache invalidation
    tagTypes: ['Holiday'],

    // Define the API endpoints
    endpoints: builder => ({
        // Query endpoint to get all holidays
        getAllHolidays: builder.query<HolidayResponse, void>({
            // Makes GET request to /GetAll
            query: () => 'GetAll',
            // Marks response with 'Holiday' tag for cache updates
            providesTags: ['Holiday']
        }),

        // Mutation endpoint to create a new holiday
        createHoliday: builder.mutation<void, IHolidayCreate>({
            // Makes POST request to /Create with holiday data
            query: holiday => ({
                url: 'Create',
                method: 'POST',
                body: holiday
            }),
            // Invalidates 'Holiday' cache so list refreshes
            invalidatesTags: ['Holiday']
        }),

        // Mutation endpoint to delete a holiday by ID
        deleteHoliday: builder.mutation<void, number>({
            // Makes DELETE request to /Remove/{id}
            query: id => ({
                url: `Remove/${id}`,
                method: 'DELETE'
            }),
            // Invalidates 'Holiday' cache so list refreshes
            invalidatesTags: ['Holiday']
        }),
        updateHoliday: builder.mutation<void, IHolidayCreate>({
            query: holiday => ({
                url: 'Update',
                method: 'Put',
                body: holiday
            }),
            invalidatesTags: ['Holiday']
        })
    })
})

export const { useGetAllHolidaysQuery, useCreateHolidayMutation, useDeleteHolidayMutation, useUpdateHolidayMutation } =
    holidayApi
