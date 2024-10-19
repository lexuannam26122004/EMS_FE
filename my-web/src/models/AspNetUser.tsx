export interface IAspNetUserGetAll {
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
    AvatarPath: string | null
    DepartmentName: string
}
