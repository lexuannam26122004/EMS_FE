import { useState, useMemo } from 'react'
import { useGetAllUsersQuery } from '@/services/AspNetUserService'
import Grid2 from '@mui/material/Grid2'
import { Paper } from '@mui/material'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import { CircleEditOutline } from 'mdi-material-ui'
import TableRow from '@mui/material/TableRow'
import { Columns } from './ColumnUserList'
import { Button, CircularProgress, TableCell, TableSortLabel, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import sortTable, { getComparator } from '@/common/sortTable'

export default function PermissionForUser() {
    const { t } = useTranslation('common')
    const [order, setOrder] = useState<'asc' | 'desc'>('asc')
    const [userSelected, setUserSelected] = useState<any>(null)
    const [orderBy, setOrderBy] = useState<string>('')

    const { data: userResponse, isLoading } = useGetAllUsersQuery()

    const userData = userResponse?.Data?.Records ?? []

    const comparator = useMemo(() => getComparator(order, orderBy), [order, orderBy])
    const sortedRecords = useMemo(() => sortTable(userData, comparator), [userData, comparator])

    const handleSort = (property: string) => {
        const isAsc = orderBy === property && order === 'asc'
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(property)
    }

    const handleOpenModal = (data: any) => {
        setUserSelected(data)
    }

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            {isLoading ? (
                <Grid2 container sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </Grid2>
            ) : (
                <TableContainer
                    sx={{
                        maxHeight: '70vh',
                        overflow: 'auto',
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
                    <Table stickyHeader aria-label='sticky table table-border'>
                        <TableHead>
                            <TableRow>
                                {Columns.map((column, idx) => {
                                    const columnLabel = column.label as any

                                    return (
                                        <TableCell
                                            key={idx}
                                            align={column.align}
                                            sx={{
                                                maxWidth: '200px',
                                                width: column.width,
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis'
                                            }}
                                        >
                                            {column.sortable ? (
                                                <TableSortLabel
                                                    active={orderBy === column.id}
                                                    direction={orderBy === column.id ? order : 'asc'}
                                                    onClick={() => handleSort(column.id)}
                                                >
                                                    <Typography>{t(columnLabel)}</Typography>
                                                </TableSortLabel>
                                            ) : (
                                                <Typography>{t(columnLabel)}</Typography>
                                            )}
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortedRecords.map((row, rowIndex) => (
                                <TableRow hover role='checkbox' tabIndex={-1} key={rowIndex}>
                                    {Columns.map((column, idx) => {
                                        const value = row[column.id]
                                        if (idx === Columns.length - 1) {
                                            return (
                                                <TableCell
                                                    key={idx}
                                                    align='center'
                                                    sx={{
                                                        width: '5%'
                                                    }}
                                                >
                                                    <Button
                                                        onClick={() => {
                                                            handleOpenModal(row)
                                                        }}
                                                    >
                                                        <CircleEditOutline style={{ color: 'green' }} />
                                                    </Button>
                                                </TableCell>
                                            )
                                        }
                                        if (column.id === 'Roles') {
                                            return (
                                                <TableCell
                                                    key={column.id}
                                                    style={{
                                                        maxWidth: '200px',
                                                        width: '35%',
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis'
                                                    }}
                                                >
                                                    <Typography
                                                        sx={{
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            whiteSpace: 'nowrap'
                                                        }}
                                                        component='span'
                                                    >
                                                        {row?.Roles.length === 0
                                                            ? '---'
                                                            : row?.Roles.map((el: string, idx: number) =>
                                                                  idx == row?.Roles.length - 1 ? el : el + '-'
                                                              )}
                                                    </Typography>
                                                </TableCell>
                                            )
                                        }
                                        if (column.id === 'FullName') {
                                            return (
                                                <TableCell
                                                    key={column.id}
                                                    sx={{
                                                        maxWidth: '200px',
                                                        width: '35%',
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis'
                                                    }}
                                                >
                                                    <Typography
                                                        sx={{
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            whiteSpace: 'nowrap'
                                                        }}
                                                        component='span'
                                                    >
                                                        {value}
                                                    </Typography>
                                                </TableCell>
                                            )
                                        } else {
                                            return (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                    sx={{
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        width: '5%',
                                                        whiteSpace: 'nowrap',
                                                        minWidth: 50
                                                    }}
                                                >
                                                    <Typography
                                                        sx={{
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            whiteSpace: 'nowrap'
                                                        }}
                                                    >
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value}
                                                    </Typography>
                                                </TableCell>
                                            )
                                        }
                                    })}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Paper>
    )
}
