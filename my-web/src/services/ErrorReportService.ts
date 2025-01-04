import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IErrorReportCreate, IErrorReportUpdate } from '@/models/ErrorReport'
interface ErrorReportResponse {
    Success: boolean
    Data: any
}

const apiPath = 'https://localhost:44381/api/admin/ErrorReport'

export const ErrorReportApi = createApi({
    reducerPath: 'ErrorReportApi',
    baseQuery: fetchBaseQuery({ baseUrl: apiPath }),
    endpoints: builder => ({
        searchErrorReport: builder.query<ErrorReportResponse, void>({
            query: () => 'Search/search'
        }),

        createErrorReports: builder.mutation<void, IErrorReportCreate>({
            query: body => ({
                url: `Create`,
                method: 'POST',
                body: body
            })
        }),
        updateErrorReports: builder.mutation<void, IErrorReportUpdate>({
            query: body => ({
                url: `Update`,
                method: 'PUT',
                body: body
            })
        }),

        getByIdErrorReports: builder.query<ErrorReportResponse, number>({
            query: id => `GetById/${id}`
        }),

        changeStatusErrorReports: builder.mutation<void, number>({
            query: id => ({
                url: `ChangeStatus/${id}/status`,
                method: 'PUT'
            })
        })
    })
})

export const {
    useSearchErrorReportQuery,
    useCreateErrorReportsMutation,
    useUpdateErrorReportsMutation,
    useGetByIdErrorReportsQuery,
    useChangeStatusErrorReportsMutation
} = ErrorReportApi