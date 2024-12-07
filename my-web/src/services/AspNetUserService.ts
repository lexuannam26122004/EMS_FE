import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IAspNetUserCreate } from '@/models/AspNetUser'
interface ApiResponse {
    Success: boolean
    Data: any
}

const apiPath = 'https://localhost:44381/api/admin/AspNetUser'

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: apiPath }),
    endpoints: builder => ({
        getAllUsers: builder.query<ApiResponse, void>({
            query: () => 'GetAll'
        }),

        createUsers: builder.mutation<void, IAspNetUserCreate>({
            query: body => ({
                url: `Create`,
                method: 'POST',
                body: body
            })
        }),
        

    })
})

export const { useGetAllUsersQuery, useCreateUsersMutation } = userApi
