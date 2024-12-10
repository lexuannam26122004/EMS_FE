import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface DepartmentResponse {
    Success: boolean
    Data: any
}

const apiPath = 'https://localhost:44381/api/admin/Department'

export const departmentApi = createApi({
    reducerPath: 'departmentApi',
    baseQuery: fetchBaseQuery({ baseUrl: apiPath }),
    endpoints: builder => ({
        getAllDepartments: builder.query<DepartmentResponse, void>({
            query: () => 'Search'
        })
    })
})

export const { useGetAllDepartmentsQuery } = departmentApi
