export interface INotificationsForUser {
    Id: number
    UserId: string
    Title: string
    Content: string
    SentTime: string
    Type: string
    IsRead: boolean
    NotificationId: number
}

export interface INotificationCreateVModel {
    Title: string
    Content: string
    ListUser: string[]
    ListFile?: number[]
    ListRole: string[]
    ListDept: number[]
    Type: string
    UserId: string
    TypeToNotify: number
}

export interface INotificationUpdateVModel extends INotificationCreateVModel {
    Id: number
}

export interface IFilterNotificationsForUserVModel {
    userId: string
    type?: string
    pageSize?: number
    pageNumber?: number
    isActive?: boolean
    isRead?: boolean
    sentDate?: Date
}

export interface IFilterReadNotificationsForUserVModel {
    userId?: string
    type?: string
    pageSize?: number
    pageNumber?: number
}

export interface INotificationGetById {
    Id: number
    Title: string
    Content: string
    SentTime: string
    Type: string
    UserId: string
    FullName: string
    AvatarPath?: string
    Role: string
    ListFile?: string[]
    ListUser?: string[]
    ListUserRead?: string[]
}
