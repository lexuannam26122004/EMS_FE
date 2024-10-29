export interface ITablePermission {
    Id: number
    Name: string
    ParentId: number | null
    Sort: number
    PathTo: string
    PathIcon: null | string
    Function?: IFunctions
    Children?: ITablePermission[]
    data?: IFunctions
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ITableAPIFunction {}
export interface IFunctions {
    IsAllowAll?: boolean
    IsAllowView?: boolean
    IsAllowCreate?: boolean
    IsAllowEdit?: boolean
    IsAllowPrint?: boolean
    IsAllowDelete?: boolean
}

export interface ITableTempData {
    id: number
    data?: IFunctions
}
export interface ISysFile {
    Id: number
    Name: string
    ParentId: number | null
    Sort: number
    PathTo: string
    PathIcon: null | string
}

export interface ITableTempData {
    id: number
}
