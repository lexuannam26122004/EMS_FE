export interface IDepartmentGetAll {
    Id: number
    Name: string
    CreateDate: string | null
    CreateBy: string | null
    UpdateBy: string | null
    UpdateDate: string | null
    CountDepartment: number
    DepartmentHeadName: string | null
    DepartmentHeadId: string | null
}

export interface IDepartmentCreate {
    Name: string
    DepartmentHeadId: string | null
}

export interface IDepartmentGetAllDashboard {
    Department: string
    Count: number
}
