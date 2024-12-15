import { ISalaryGetAll } from '@/models/Salary'
import { IFilterSysConfiguration } from '@/models/SysConfiguration'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface SalaryResponse {
    Success: boolean
    Data: any
}

const apiPath = 'https://localhost:44381/api/admin/Salary'

export const salaryApi = createApi({
    reducerPath: 'salaryApi',
    baseQuery: fetchBaseQuery({ baseUrl: apiPath }),
    tagTypes: ['Salary'],
    endpoints: builder => ({
        getAllSalaries: builder.query<SalaryResponse, void>({
            query: () => 'GetAll',
            providesTags: ['Salary']
        }),
        updateSalary: builder.mutation<void, ISalaryGetAll>({
            query: salary => ({
                url: 'Update',
                method: 'Put',
                body: salary
            }),
            invalidatesTags: ['Salary']
        })
    })
})

export const { useGetAllSalariesQuery, useUpdateSalaryMutation } = salaryApi
