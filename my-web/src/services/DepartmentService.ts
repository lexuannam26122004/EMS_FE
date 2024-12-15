import { IDepartmentCreate, IDepartmentGetAll } from '@/models/Department'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface DepartmentResponse {
    Success: boolean
    Data: any
}

const apiPath = 'https://localhost:44381/api/admin/Department'

export const departmentApi = createApi({
    reducerPath: 'departmentApi',
    baseQuery: fetchBaseQuery({ baseUrl: apiPath }),
    tagTypes: ['Department'],
    endpoints: builder => ({
        getAllDepartments: builder.query<DepartmentResponse, void>({
            query: () => 'GetAll',
            providesTags: ['Department']
        }),
        createDepartment: builder.mutation<void, IDepartmentCreate>({
            query: department => ({
                url: 'Create',
                method: 'POST',
                body: department
            }),
            invalidatesTags: ['Department']
        }),
        updateDepartment: builder.mutation<void, IDepartmentGetAll>({
            query: department => ({
                url: 'Update',
                method: 'PUT',
                body: department
            }),
            invalidatesTags: ['Department']
        }),
        deleteDepartment: builder.mutation<void, number>({
            query: id => ({
                url: `Remove/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Department']
        }),
        deleteManyDepartments: builder.mutation<void, number[]>({
            query: ids => ({
                url: 'DeleteMany',
                method: 'DELETE',
                body: { Ids: ids }
            }),
            invalidatesTags: ['Department']
        })
    })
})

export const {
    useGetAllDepartmentsQuery,
    useCreateDepartmentMutation,
    useUpdateDepartmentMutation,
    useDeleteDepartmentMutation,
    useDeleteManyDepartmentsMutation
} = departmentApi
