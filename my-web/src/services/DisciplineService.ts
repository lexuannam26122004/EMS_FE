//import { IRewardGetAll } from "@/models/Reward";
import { IFilterSysConfiguration } from '@/models/SysConfiguration'
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { createApi } from '@reduxjs/toolkit/query/react'
import { createBaseQuery } from './api'

interface DisciplineResponse {
    Success: boolean
    Data: any
}
const apiPath = 'https://localhost:44381/api/admin/Discipline'

export const disciplineApi = createApi({
    reducerPath: 'disciplineApi',
    baseQuery: createBaseQuery(apiPath),
    tagTypes: ['Discipline'],
    endpoints: builder => ({
        getAllDisciplines: builder.query<DisciplineResponse, IFilterSysConfiguration>({
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

                return `Search?${params.toString()}`
            },
            providesTags: ['Discipline'] // Thêm providesTags để cập nhật cache
        })
    })
})

export const { useGetAllDisciplinesQuery } = disciplineApi
