export interface ITimekeeping {
    Id: number
    UserId: string
    Date: Date
    CheckInTime: string // Sử dụng string để đại diện cho TimeSpan
    CheckOutTime: string // Sử dụng string để đại diện cho TimeSpan
    CheckInIP: string
    Note: string
    Agent: string
    IsValid: boolean
    Overtime: string
    WorkingHours: string
}

export interface IFilterTimekeepingForUser {
    Id: number
    StartDate: Date
    EndDate: Date
    IsValid: boolean
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

export interface IFilterAttendance {
    isHoliday?: boolean
    pageSize?: number
    pageNumber?: number
    sortBy?: string
    isDescending?: boolean
    departmentId?: number
    startDate?: string
    endDate?: string
    keyword?: string
}
