interface Column {
    id: 'Id' | 'FullName' | 'Roles' | 'Action'
    label: string
    sortable?: boolean
    width?: string
    minWidth?: number
    maxWidth?: string
    align?: 'left' | 'center' | 'right'
    format?: (value: number) => string
}
export const Columns: readonly Column[] = [
    {
        id: 'Id',
        label: 'COMMON.TABLE.COMMON.ID',
        align: 'center',
        format: (value: number) => value.toString(),
        width: '10%',
        maxWidth: '10%'
    },
    {
        id: 'FullName',
        label: 'COMMON.TABLE.PERMISSION.USER.FULLNAME',
        align: 'left',
        width: '35%',
        maxWidth: '35%',
        sortable: true
    },
    {
        id: 'Roles',
        label: 'COMMON.TABLE.PERMISSION.USER.ROLE',
        align: 'left',
        width: '35%',
        maxWidth: '35%',
        sortable: true
    },
    {
        id: 'Action',
        label: 'COMMON.TABLE.COMMON.ACTION',
        width: '15%',
        maxWidth: '15%',
        align: 'center'
    }
]
