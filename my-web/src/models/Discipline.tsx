export interface IDisciplineGetAll {
    Id: number
    FullName: string
    AvatarPath: string
    UserId: string
    Department: string
    Money?: number
    CreatedDate: string
    Reason?: string
    Note?: string
    IsReceived: boolean
}
export interface IDiscipline extends IDisciplineGetAll {
    Date: string
}
