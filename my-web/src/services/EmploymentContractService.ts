import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IEmploymentContractCreate, IEmploymentContractUpdate } from '@/models/EmploymentContract'
interface EmploymentContractResponse {
    Success: boolean
    Data: any
}

const apiPath = 'https://localhost:44381/api/admin/EmploymentContract'

export const EmploymentContractApi = createApi({
    reducerPath: 'EmploymentContractApi',
    baseQuery: fetchBaseQuery({ baseUrl: apiPath }),
    endpoints: builder => ({
        searchEmploymentContracts: builder.query<EmploymentContractResponse, void>({
            query: () => 'Search/search'
        }),

        createEmploymentContracts: builder.mutation<void, IEmploymentContractCreate>({
            query: body => ({
                url: `Create`,
                method: 'POST',
                body: body
            })
        }),

        updateEmploymentContracts: builder.mutation<void, IEmploymentContractUpdate>({
            query: body => ({
                url: `Update`,
                method: 'PUT',
                body: body
            })
        }),

        getByIdEmploymentContracts: builder.query<EmploymentContractResponse, string>({
            query: id => `GetById/${id}`
        })
    })
})

export const {
    useSearchEmploymentContractsQuery,
    useCreateEmploymentContractsMutation,
    useGetByIdEmploymentContractsQuery,
    useUpdateEmploymentContractsMutation
} = EmploymentContractApi
