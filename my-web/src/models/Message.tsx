export interface IMessageCreate {
    Content: string
    Type: boolean
    UserId: string
}
export interface IMessageGetAll extends IMessageCreate {
    CreatedAt: Date
}
