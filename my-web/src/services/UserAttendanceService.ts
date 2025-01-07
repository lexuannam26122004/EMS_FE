import { createApi } from '@reduxjs/toolkit/query/react'
import { IFilterTimekeepingForUser } from '@/models/Timekeeping'
import { createBaseQuery } from './api'

interface AttendanceResponse {
    Success: boolean
    Data: any
}

const apiPath = 'https://localhost:44381/api/user/UserAttendance'

export const userAttendanceApi = createApi({
    reducerPath: 'userAttendanceApi',
    baseQuery: createBaseQuery(apiPath),
    endpoints: builder => ({
        searchAttendanceForUser: builder.query<AttendanceResponse, IFilterTimekeepingForUser>({
            query: filter => {
                const params = new URLSearchParams()

                if (filter) {
                    // if (filter.isActive !== undefined) params.append('IsActive', filter.isActive.toString())
                    // if (filter.isRead !== undefined) params.append('IsRead', filter.isRead.toString())
                    // if (filter.sentDate) params.append('SentDate', filter.sentDate.toISOString())
                }

                return `SearchForUser?${params.toString()}`
            }
        }),
        getCountIsNew: builder.query<AttendanceResponse, void>({
            query: () => `GetCountIsNew`
        }),
        createAttendanceUser: builder.mutation<AttendanceResponse, string>({
            query: value => ({
                url: `CreateUser`,
                method: 'POST',
                body: { IPAddress: value }
            })
        }),
        updateIsNew: builder.mutation<AttendanceResponse, void>({
            query: () => ({
                url: `UpdateIsNew`,
                method: 'PUT'
            })
        })
    })
})

export const {
    useSearchAttendanceForUserQuery,
    useCreateAttendanceUserMutation,
    useGetCountIsNewQuery,
    useUpdateIsNewMutation
} = userAttendanceApi
