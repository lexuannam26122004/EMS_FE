import { ISalaryGetAll } from '@/models/salary'
import { IFilterSysConfiguration } from '@/models/SysConfiguration'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { METHODS } from 'http'

interface SalaryResponse {
    Success: boolean
    Data: any
}

interface SalaryGetAll {
    filter: IFilterSysConfiguration
    period: string
}

const apiPath = 'https://localhost:44381/api/admin/Salary'

export const salaryApi = createApi({
    reducerPath: 'salaryApi',
    baseQuery: fetchBaseQuery({ baseUrl: apiPath }),
    tagTypes: ['Salary'],
    endpoints: builder => ({
        getAllSalaries: builder.query<SalaryResponse, SalaryGetAll>({
            query: ({ filter, period }) => {
                const params = new URLSearchParams()

                if (filter) {
                    if (filter.createdBy) params.append('CreatedBy', filter.createdBy)
                    if (filter.createdDate) params.append('CreatedDate', filter.createdDate.toISOString())
                    if (filter.pageSize) params.append('PageSize', filter.pageSize.toString())
                    if (filter.pageNumber) params.append('PageNumber', filter.pageNumber.toString())
                    if (filter.isActive !== undefined) params.append('IsActive', filter.isActive.toString())
                    if (filter.keyword) params.append('Keyword', filter.keyword)
                    if (filter.isDescending !== undefined) params.append('IsDescending', filter.isDescending.toString())
                    if (filter.sortBy) params.append('SortBy', filter.sortBy)
                }

                params.append('period', period)

                return `GetAll?${params.toString()}`
            },
            providesTags: ['Salary']
        }),
        updateSalary: builder.mutation<void, ISalaryGetAll>({
            query: salary => ({
                url: 'Update',
                method: 'Put',
                body: salary
            }),
            invalidatesTags: ['Salary']
        }),
        getInfoForDepartmentChart: builder.query<SalaryResponse, void>({
            query: () => 'GetInfoForDepartmentChart',
            providesTags: ['Salary']
        }),
        getSalaryByLevel: builder.query<SalaryResponse, void>({
            query: () => 'GetSalaryByLevel',
            providesTags: ['Salary']
        }),
        createSalary: builder.mutation<void, void>({
            query: () => ({
                url: 'Create',
                method: 'Post'
            }),
            invalidatesTags: ['Salary']
        }),
        getInfoForSalarySummary: builder.query<SalaryResponse, void>({
            query: () => 'GetInfoForSalarySummary',
            providesTags: ['Salary']
        })
    })
})

export const {
    useGetAllSalariesQuery,
    useUpdateSalaryMutation,
    useGetInfoForDepartmentChartQuery,
    useGetSalaryByLevelQuery,
    useCreateSalaryMutation,
    useGetInfoForSalarySummaryQuery
} = salaryApi
