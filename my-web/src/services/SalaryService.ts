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
        getAllSalaries: builder.query<SalaryResponse, IFilterSysConfiguration>({
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
