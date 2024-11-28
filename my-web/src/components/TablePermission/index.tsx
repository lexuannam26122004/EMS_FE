import { Paper, SxProps, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Theme } from '@mui/material'
import { memo, useCallback, useMemo } from 'react'
import { ITablePermission } from '@/models/TablePermissionModel'
import { getPermissionForRoleSelector } from '@/redux/slices/tablePermissionSlice'
import { useSelector } from 'react-redux'
import TableList from './TableList'
import { useTranslation } from 'react-i18next'

interface Props {
    height?: number | string
    sx?: SxProps<Theme> | undefined
}

function TablePermission({ height, sx }: Props) {
    const flatData = useSelector(getPermissionForRoleSelector)
    const { t } = useTranslation('common')
    const funcList = [
        t('COMMON.PERMISSION.ALL'),
        t('COMMON.PERMISSION.VIEW'),
        t('COMMON.PERMISSION.EDIT'),
        t('COMMON.PERMISSION.CREATE'),
        t('COMMON.PERMISSION.PRINT'),
        t('COMMON.PERMISSION.DELETE')
    ]

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
        <Paper
            sx={{
                width: '100%',
                overflow: 'hidden',
                ...sx,
                backgroundColor: 'var(--background-color)',
                border: '1px solid var(--border-color)',
                borderRadius: '6px'
            }}
        >
            <TableContainer
                sx={{
                    maxHeight: height || 600,
                    '&::-webkit-scrollbar': {
                        width: '7px',
                        height: '7px'
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: 'var(--scrollbar-color)',
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
                            borderRight: '1px solid var(--border-color)',
                            borderBottom: '1px solid var(--border-color)'
                        }
                    }}
                    aria-label='sticky table'
                >
                    <TableHead>
                        <TableRow>
                            <TableCell
                                sx={{
                                    color: 'var(--text-header-color)',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    padding: '14px 16px',
                                    backgroundColor: 'var(--background-color)'
                                }}
                            >
                                {t('COMMON.PERMISSION.MANAGEMENT_PAGE')}
                            </TableCell>

                            {funcList.map((item, index) => (
                                <TableCell
                                    key={index}
                                    align='center'
                                    sx={{
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                        padding: '14px 16px',
                                        color: 'var(--text-header-color)',
                                        backgroundColor: 'var(--background-color)'
                                    }}
                                >
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
