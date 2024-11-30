export interface IHolidayCreate {
    Name: string
    StartDate: Date
    EndDate: Date
    Note: string
}

export interface IHolidayGetAll extends IHolidayCreate {
    Id: number
}
