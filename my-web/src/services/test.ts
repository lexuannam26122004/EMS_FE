import { IAspNetUserGetAll } from '@/models/AspNetUser'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface ApiResponse {
    Success: boolean
    Data: any
}

const apiPath = 'https://localhost:44381/api/admin/AspNetUser'

export const aspNetUserApi = createApi({
    reducerPath: 'aspNetUserApi',
    baseQuery: fetchBaseQuery({ baseUrl: apiPath }),
    endpoints: builder => ({
        getAll: builder.query<ApiResponse, void>({
            query: () => 'GetAll'
        })
    })
})

export const { useGetAllQuery } = aspNetUserApi
