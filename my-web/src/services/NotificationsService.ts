import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IFilterNotificationsForUserVModel } from '@/models/Notifications'
import axios from './axios'

interface NotificationsResponse {
    Success: boolean
    Data: any
}

const apiPath = 'https://localhost:44381/api/admin/Notifications'

export const SearchForUser = async (filter: IFilterNotificationsForUserVModel): Promise<NotificationsResponse> => {
    try {
        const response = await axios.get<NotificationsResponse>('Notifications/SearchForUser', {
            params: filter
        })
        return response.data
    } catch (error) {
        console.error('Error while fetching notifications:', error)
        throw error
    }
}

export const notificationsApi = createApi({
    reducerPath: 'notificationsApi',
    baseQuery: fetchBaseQuery({ baseUrl: apiPath }),
    endpoints: builder => ({
        searchNotificationsForUser: builder.query<NotificationsResponse, IFilterNotificationsForUserVModel>({
            query: filter => {
                const params = new URLSearchParams()

                if (filter) {
                    if (filter.userId) params.append('UserId', filter.userId)
                    if (filter.type) params.append('Type', filter.type)
                    if (filter.pageSize) params.append('PageSize', filter.pageSize.toString())
                    if (filter.pageNumber) params.append('PageNumber', filter.pageNumber.toString())
                    if (filter.isActive !== undefined) params.append('IsActive', filter.isActive.toString())
                    if (filter.isRead !== undefined) params.append('IsRead', filter.isRead.toString())
                    if (filter.sentDate) params.append('SentDate', filter.sentDate.toISOString())
                }

                return `SearchForUser?${params.toString()}`
            }
        }),
        getNotificationById: builder.query<NotificationsResponse, number>({
            query: id => `GetById?id=${id}`
        }),
        getCountIsNew: builder.query<NotificationsResponse, string>({
            query: userId => `GetCountIsNew?UserId=${userId}`
        }),
        changeAllRead: builder.mutation<NotificationsResponse, string>({
            query: userId => ({ url: `ChangeAllRead`, method: 'PUT', body: { UserId: userId } })
        }),
        updateIsNew: builder.mutation<NotificationsResponse, string>({
            query: userId => ({
                url: `UpdateIsNew`,
                method: 'PUT',
                body: { UserId: userId }
            })
        }),
        changeNotificationRead: builder.mutation<NotificationsResponse, number>({
            query: id => ({
                url: `ChangeRead`,
                method: 'PUT',
                body: { Id: id }
            })
        }),
        deleteNotification: builder.mutation<NotificationsResponse, number>({
            query: id => ({
                url: `ChangeStatusForUser`,
                method: 'PUT',
                body: { Id: id }
            })
        })
    })
})

export const {
    useSearchNotificationsForUserQuery,
    useChangeAllReadMutation,
    useChangeNotificationReadMutation,
    useDeleteNotificationMutation,
    useGetNotificationByIdQuery,
    useGetCountIsNewQuery,
    useUpdateIsNewMutation
} = notificationsApi
