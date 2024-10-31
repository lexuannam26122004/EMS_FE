import { Paper, SxProps, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Theme } from '@mui/material'
import { memo, useCallback, useMemo } from 'react'
import { ITablePermission } from '@/models/TablePermissionModel'
import { getPermissionForRoleSelector } from '@/redux/slices/tablePermissionSlice'
import { useSelector } from 'react-redux'
import TableList from './TableList'

interface Props {
    height?: number | string
    sx?: SxProps<Theme> | undefined
}

const funcList = ['Tất cả', 'Chỉ xem', 'Chỉnh sửa', 'Thêm mới', 'In ấn', ' Xóa']

function TablePermission({ height, sx }: Props) {
    const flatData = useSelector(getPermissionForRoleSelector)

    const organizeData = useCallback((data: ITablePermission[], ParentId: number | null): ITablePermission[] => {
        return data
            .filter((item: ITablePermission) => item.ParentId === ParentId)
            .map((child: ITablePermission) => ({
                ...child,
                Children: organizeData(data, child.Id)
            }))
    }, [])

    const data = useMemo(() => organizeData(flatData, null), [flatData, organizeData])

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', ...sx }}>
            <TableContainer
                sx={{
                    maxHeight: height || 600,
                    '&::-webkit-scrollbar': {
                        width: '8px',
                        height: '8px'
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#919292',
                        borderRadius: '10px'
                    }
                }}
            >
                <Table
                    size='small'
                    stickyHeader
                    sx={{
                        minWidth: 650,
                        '& .MuiTableCell-root': {
                            borderRight: '1px solid',
                            borderColor: 'divider'
                        }
                    }}
                    aria-label='sticky table'
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>Tên trang quản lý</TableCell>

                            {funcList.map((item, index) => (
                                <TableCell key={index} align='center' sx={{ maxWidth: 30, minWidth: 30 }}>
                                    {item}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableList data={data} />
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}

export default memo(TablePermission)
