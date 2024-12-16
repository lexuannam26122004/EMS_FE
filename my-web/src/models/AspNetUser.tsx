export interface IAspNetUserGetAll {
    Id: string
    FullName: string
    UserName: string
    Email: string
    PhoneNumber: string | null
    AvatarFileId: number | null
    Sex: number | null
    Address: string
    Note: string
    Birthday: Date | null
    Roles?: string[] | null
    AvatarPath: string | null
    DepartmentName: string
}

export interface IUserByAgeGetAllDashboard {
    LessThan32: number
    Between32And45: number
    GreaterThan45: number
    LessThan32Percentage: number
    Between32And45Percentage: number
    GreaterThan45Percentage: number
}

export interface IAspNetUserCreate {
    FullName: string
    UserName: string
    Email: string
    PhoneNumber: string
    StartDateWork: Date
    AvatarFileId: number
    Sex: number
    Address: string
    Note: string
    Birthday: Date
    DepartmentId: number
    Password: string
    Roles: string[]
    IsActive: boolean
}

export interface IAspNetUserUpdate {
    Id: string
    FullName: string | null
    UserName: string
    Email: string
    PhoneNumber: string | null
    AvatarFileId: number | null
    Sex: number | null
    Address: string
    Note: string
    Birthday: Date | null
    Roles?: string[] | null
    StartDateWork: Date
    DepartmentId: number
    IsActive: boolean
}
