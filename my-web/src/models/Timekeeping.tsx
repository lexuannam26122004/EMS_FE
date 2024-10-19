export interface ITimekeeping {
    Id: number
    UserId: string
    Date: Date
    CheckInTime: string // Sử dụng string để đại diện cho TimeSpan
    CheckOutTime: string // Sử dụng string để đại diện cho TimeSpan
    CheckInIP: string
}

export interface ITimekeepingCreate {
    UserId: string
    Date: Date
    CheckInTime: string
    CheckOutTime: string
    CheckInIP: string
}

export interface ITimekeepingUpdate extends ITimekeepingCreate {
    Id: number
}

export interface ITimekeepingGetById extends ITimekeepingUpdate {
    FullName: string
}

export interface IFilterTimekeeping {
    Month: number
    Year: number
}
