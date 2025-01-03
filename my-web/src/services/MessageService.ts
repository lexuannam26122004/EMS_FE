import { IMessageCreate } from '@/models/Message'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface IMessageResponse {
    Success: boolean
    Data: any
}

const apiPath = 'https://localhost:44381/api/admin/Message'
export const messageApi = createApi({
    reducerPath: 'messageApi',
    baseQuery: fetchBaseQuery({ baseUrl: apiPath }),
    tagTypes: ['Message'],
    endpoints: builder => ({
        getAllMessage: builder.query<IMessageResponse, void>({
            query: () => 'GetAll',
            providesTags: ['Message']
        }),
        createMessage: builder.mutation<void, IMessageCreate>({
            query: message => ({
                url: 'Create',
                method: 'Post',
                body: message
            }),
            invalidatesTags: ['Message']
        })
    })
})

export const { useGetAllMessageQuery, useCreateMessageMutation } = messageApi
