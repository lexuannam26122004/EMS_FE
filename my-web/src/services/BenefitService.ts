import { IBenefitCreate, IBenefitGetAll, IBenefitGetAllType } from '@/models/Benefit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IFilterSysConfiguration } from '@/models/SysConfiguration'


interface BenefitResponse {
    Success: boolean
    Data: any
}

const apiPath = 'https://localhost:44381/api/admin/Benefit'

export const benefitApi = createApi({
    reducerPath: 'benefitApi',
    baseQuery: fetchBaseQuery({ baseUrl: apiPath }),
    tagTypes: ['Benefit'],
    endpoints: builder => ({
        createBenefit: builder.mutation<void, IBenefitCreate>({
            query: benefit => ({
                url: 'Create',
                method: 'POST',
                body: benefit
            }),
            invalidatesTags: ['Benefit']
        }),
        ChangeStatusBenefit: builder.mutation<void, string>({
            query: id => ({
                url: `ChangeStatus/${id}`,
                method: 'PUT'
            })
        }),

        updateBenefit: builder.mutation<void, IBenefitGetAll>({
            query: benefit => ({
                url: 'Update',
                method: 'PUT',
                body: benefit
            }),
            invalidatesTags: ['Benefit']
        }),
        ChangeStatusManyBenefit: builder.mutation<void, string[]>({
            query: ids => ({
                url: `ChangeStatusMany`,
                method: 'PUT',
                body: { Ids: ids }
            })
        }),
        getAllBenefits: builder.query<BenefitResponse, IFilterSysConfiguration>({
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
            providesTags: ['Benefit'] // Thêm providesTags để cập nhật cache
        }),
        getAllBenefitsType: builder.query<BenefitResponse, IBenefitGetAllType | void>({
            query: filter => {

                return `GetAllBenefitType?`
            }
        })

    })
})

export const {
    useGetAllBenefitsQuery,
    useCreateBenefitMutation,
    useChangeStatusBenefitMutation,
    useUpdateBenefitMutation,
    useChangeStatusManyBenefitMutation,
    useGetAllBenefitsTypeQuery
} = benefitApi
