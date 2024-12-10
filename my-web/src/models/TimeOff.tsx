export interface ITimeOffSearch {
    Id: number
    IsActive: boolean
    CreatedBy?: string
    CreatedDate?: Date
    UpdatedBy?: string
    UpdatedDate?: Date
    Reason?: string
    UserId: string
    Date: Date
    Content: string
    IsAccepted: boolean
}


export interface ITimeOffCreate {
    Reason?: string
    UserId: string
    Date: Date
    Content: string
    IsAccepted: boolean
    IsActive: boolean
}

export interface ITimeOffUpdate {
    Id: number
    Reason?: string
    UserId: string
    Date: Date
    Content: string
    IsAccepted: boolean
    IsActive: boolean
}
