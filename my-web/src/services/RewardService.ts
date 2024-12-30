//import { IRewardGetAll } from "@/models/Reward";
import { IFilterSysConfiguration } from '@/models/SysConfiguration'
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { createApi } from '@reduxjs/toolkit/query/react'

interface RewardResponse {
    Success: boolean
    Data: any
}
const apiPath = 'https://localhost:44381/api/admin/Reward'

export const rewardApi = createApi({
    reducerPath: 'rewardApi',
    baseQuery: fetchBaseQuery({ baseUrl: apiPath }),
    tagTypes: ['Reward'],
    endpoints: builder => ({
        getAllRewards: builder.query<RewardResponse, IFilterSysConfiguration>({
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
            providesTags: ['Reward'] // Thêm providesTags để cập nhật cache
        })
    })
})

export const { useGetAllRewardsQuery } = rewardApi
