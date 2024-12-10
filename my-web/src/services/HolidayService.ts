import { IHolidayCreate, IHolidayGetAll } from '@/models/Holiday'
import { IFilterSysConfiguration } from '@/models/SysConfiguration'
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
        // getAllHolidays: builder.query<HolidayResponse, IFilterSysConfiguration>({
        //     // Makes GET request to /GetAll
        //     query: () => 'GetAll',
        //     // Marks response with 'Holiday' tag for cache updates
        //     providesTags: ['Holiday']
        // }),

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
        updateHoliday: builder.mutation<void, IHolidayGetAll>({
            query: holiday => ({
                url: 'Update',
                method: 'Put',
                body: holiday
            }),
            invalidatesTags: ['Holiday']
        }),
        getAllHoliday: builder.query<HolidayResponse, IFilterSysConfiguration>({
            query: filter => {
                const params = new URLSearchParams()

                if (filter) {
                    if (filter.createdBy) params.append('CreatedBy', filter.createdBy)
                    if (filter.createdDate) params.append('CreatedDate', filter.createdDate.toDateString())
                    if (filter.pageSize) params.append('PageSize', filter.pageSize.toString())
                    if (filter.pageNumber) params.append('PageNumber', filter.pageNumber.toString())
                    if (filter.isActive !== undefined) params.append('IsActive', filter.isActive.toString())
                    if (filter.keyword) params.append('Keyword', filter.keyword)
                    if (filter.isDescending !== undefined) params.append('IsDescending', filter.isDescending.toString())
                    if (filter.sortBy) params.append('SortBy', filter.sortBy)
                }

                return `GetAll?${params.toString()}`
            },
            providesTags: ['Holiday'] // Thêm providesTags để cập nhật cache
        })
    })
})

export const { useGetAllHolidayQuery, useCreateHolidayMutation, useDeleteHolidayMutation, useUpdateHolidayMutation } =
    holidayApi
