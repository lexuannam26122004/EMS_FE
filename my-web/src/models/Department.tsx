export interface IDepartmentGetAll {
    Id: number
    Name: string
    DepartmentHeadName: string | null
}

export interface IDepartmentCreate {
    Name: string
    DepartmentHeadId : string | null
}
