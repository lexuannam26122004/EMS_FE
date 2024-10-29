import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface RoleResponse {
    Success: boolean
    Data: any
}

const apiPath = 'https://localhost:44381/api/admin/AspNetRole'

export const roleApi = createApi({
    reducerPath: 'roleApi',
    baseQuery: fetchBaseQuery({ baseUrl: apiPath }),
    endpoints: builder => ({
        getAllRoles: builder.query<RoleResponse, void>({
            query: () => 'GetAll'
        }),
        getJsonRoleHasFunctions: builder.query<RoleResponse, string>({
            query: id => `GetJsonRoleHasFunctions?roleId=${id}`
        }),
        updateJsonRoleHasFunctions: builder.mutation<RoleResponse, any>({
            query: data => ({
                url: '/UpdateJsonRoleHasFunctions',
                method: 'PUT',
                body: data
            })
        })
    })
})

export const { useGetAllRolesQuery, useGetJsonRoleHasFunctionsQuery, useUpdateJsonRoleHasFunctionsMutation } = roleApi
