'use client'
import { IFilterSysConfiguration } from '@/models/SysConfiguration'
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableSortLabel,
    TableRow,
    Tooltip,
    Typography,
    Paper,
    Pagination,
    Select,
    MenuItem,
    SelectChangeEvent,
    FormControl
} from '@mui/material'
import { ClipboardCheck } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function Discipline() {
    const { t } = useTranslation('common')
    // const router = useRouter()
    // const [selected, setSelected] = useState<number[]>([])
    // const [openDialog, setOpenDialog] = useState(false)
    // const [selectedRow, setSelectedRow] = useState<number | null>(null)
    const [order, setOrder] = useState<'asc' | 'desc'>('asc')
    const [orderBy, setOrderBy] = useState<string>('')
    const [page, setPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState('5')
    const [from] = useState(1)
    const [to] = useState(5)
    const [filter, setFilter] = useState<IFilterSysConfiguration>({
        pageSize: 5,
        pageNumber: 1
    })

    useEffect(() => {}, [from, to, filter])

    const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
        setPage(newPage)
        setFilter(prev => {
            return {
                ...prev,
                pageNumber: newPage
            }
        })
    }

    const handleChangeRowsPerPage = (event: SelectChangeEvent) => {
        setPage(1)
        setRowsPerPage(event.target.value as string)
        setFilter(prev => {
            return {
                ...prev,
                pageSize: Number(event.target.value),
                pageNumber: 1
            }
        })
    }

    // const [selectedConfig, setSelectedConfig] = useState<IGetAllSysConfiguration | null>(null)
    //const [openModal, setOpenModal] = useState(false)

    // const handleClickDetail = (config: IGetAllSysConfiguration) => {
    //     setSelectedConfig(config)
    //     setOpenModal(true)
    // }

    const handleSort = (property: string) => {
        if (orderBy === property) {
            setOrder(order === 'asc' ? 'desc' : 'asc')
        } else {
            setOrder('asc')
        }
        setOrderBy(property)
    }

    const currentYear = new Date().getFullYear()
    const [selectedYear, setSelectedYear] = useState(currentYear)

    useEffect(() => {}, [selectedYear])

    const handleYearChange = (event: SelectChangeEvent<number>) => {
        setSelectedYear(event.target.value as number)
    }
    const data = ['1', '2']

    return (
        <Box>
            <Paper
                elevation={1}
                sx={{
                    width: '100%',
                    borderRadius: '30px',
                    padding: '35px',
                    backgroundColor: 'var(--attendance-bg1)'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        mb: '20px',
                        justifyContent: 'space-between'
                    }}
                >
                    <Box>
                        <Typography
                            sx={{
                                fontSize: '18px',
                                fontWeight: 'bold',
                                color: 'var(--text-color)'
                            }}
                        >
                            {t('discipline')}
                        </Typography>
                    </Box>
                    <FormControl sx={{ width: '90px' }}>
                        <Select
                            defaultValue={currentYear}
                            onChange={handleYearChange}
                            sx={{
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'var(--border-color)'
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    border: '1px solid var(--border-color)' // Đặt border cho trạng thái focus
                                },
                                '& fieldset': {
                                    borderRadius: '8px',
                                    borderColor: 'var(--border-color)'
                                },
                                '& .MuiSelect-icon': {
                                    color: 'var(--text-color)'
                                },
                                '& .MuiInputBase-input': {
                                    color: 'var(--text-color)',
                                    padding: '10px'
                                }
                            }}
                            MenuProps={{
                                PaperProps: {
                                    elevation: 0,
                                    sx: {
                                        width: '120px',
                                        mt: '2px',
                                        borderRadius: '8px',
                                        padding: '0 8px',
                                        backgroundImage:
                                            'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiBmaWxsPSJ1cmwoI3BhaW50MF9yYWRpYWxfMjc0OV8xNDUxODYpIiBmaWxsLW9wYWNpdHk9IjAuMTIiLz4KPGRlZnM+CjxyYWRpYWxHcmFkaWVudCBpZD0icGFpbnQwX3JhZGlhbF8yNzQ5XzE0NTE4NiIgY3g9IjAiIGN5PSIwIiByPSIxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgxMjAgMS44MTgxMmUtMDUpIHJvdGF0ZSgtNDUpIHNjYWxlKDEyMy4yNSkiPgo8c3RvcCBzdG9wLWNvbG9yPSIjMDBCOEQ5Ii8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzAwQjhEOSIgc3RvcC1vcGFjaXR5PSIwIi8+CjwvcmFkaWFsR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+Cg==), url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiBmaWxsPSJ1cmwoI3BhaW50MF9yYWRpYWxfMjc0OV8xNDUxODcpIiBmaWxsLW9wYWNpdHk9IjAuMTIiLz4KPGRlZnM+CjxyYWRpYWxHcmFkaWVudCBpZD0icGFpbnQwX3JhZGlhbF8yNzQ5XzE0NTE4NyIgY3g9IjAiIGN5PSIwIiByPSIxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgwIDEyMCkgcm90YXRlKDEzNSkgc2NhbGUoMTIzLjI1KSI+CjxzdG9wIHN0b3AtY29sb3I9IiNGRjU2MzAiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRkY1NjMwIiBzdG9wLW9wYWNpdHk9IjAiLz4KPC9yYWRpYWxHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4K)',
                                        backgroundPosition: 'top right, bottom left',
                                        backgroundSize: '50%, 50%',
                                        backgroundRepeat: 'no-repeat',
                                        backdropFilter: 'blur(20px)',
                                        backgroundColor: 'var(--background-item)',
                                        color: 'var(--text-color)',
                                        border: '1px solid var(--border-color)',
                                        '& .MuiMenuItem-root': {
                                            '&:hover': { backgroundColor: 'var(--hover-color)' },
                                            '&.Mui-selected': {
                                                backgroundColor: 'var(--background-selected-item)',
                                                '&:hover': { backgroundColor: 'var(--hover-color)' }
                                            }
                                        }
                                    }
                                },
                                anchorOrigin: {
                                    vertical: 'bottom',
                                    horizontal: 'right' // Căn chỉnh bên phải
                                },
                                transformOrigin: {
                                    vertical: 'top',
                                    horizontal: 'right' // Căn chỉnh bên phải
                                }
                            }}
                        >
                            {[...Array(currentYear - 2021)].map((_, index) => {
                                const year = currentYear - index
                                return (
                                    <MenuItem
                                        key={year}
                                        value={year}
                                        sx={{
                                            borderRadius: '6px',
                                            '&:last-child': {
                                                mt: '3px'
                                            }
                                        }}
                                    >
                                        {year}
                                    </MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                </Box>
                <TableContainer
                    sx={{
                        maxHeight: '540px',
                        scrollbarGutter: 'stable',
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
                    <Table>
                        <TableHead>
                            <TableRow
                                sx={{
                                    backgroundColor: 'var(--header-table-dashboard) !important',
                                    position: 'sticky', // Giữ cố định
                                    top: 0, // Vị trí cố định ở trên cùng
                                    zIndex: 2, // Ưu tiên header trên các phần tử khác
                                    '&:last-child td, &:last-child th': {
                                        border: 'none'
                                    }
                                }}
                            >
                                <TableCell sx={{ borderColor: 'var(--border-color)', padding: '0 35px !important' }}>
                                    <TableSortLabel
                                        active={'Date' === orderBy}
                                        direction={orderBy === 'Date' ? order : 'asc'}
                                        onClick={() => handleSort('Date')}
                                        sx={{
                                            '& .MuiTableSortLabel-icon': {
                                                color: 'var(--text-color) !important'
                                            },
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontWeight: 'bold',
                                                color: 'var(--text-color)',
                                                fontSize: '16px',
                                                textAlign: 'center',
                                                maxWidth: '280px',
                                                overflow: 'hidden',
                                                ml: '8px',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap'
                                            }}
                                        >
                                            {t('COMMON.REWARD_DISCIPLINE.DATE')}
                                        </Typography>
                                    </TableSortLabel>
                                </TableCell>

                                <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                    <TableSortLabel
                                        active={'Reason' === orderBy}
                                        direction={orderBy === 'Reason' ? order : 'asc'}
                                        onClick={() => handleSort('Reason')}
                                        sx={{
                                            '& .MuiTableSortLabel-icon': {
                                                color: 'var(--text-color) !important'
                                            }
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontWeight: 'bold',
                                                color: 'var(--text-color)',
                                                maxWidth: '400px',
                                                fontSize: '16px',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap'
                                            }}
                                        >
                                            {t('COMMON.REWARD_DISCIPLINE.REASON')}
                                        </Typography>
                                    </TableSortLabel>
                                </TableCell>

                                <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                    <TableSortLabel
                                        active={'Money' === orderBy}
                                        direction={orderBy === 'Money' ? order : 'asc'}
                                        onClick={() => handleSort('Money')}
                                        sx={{
                                            '& .MuiTableSortLabel-icon': {
                                                color: 'var(--text-color) !important'
                                            }
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontWeight: 'bold',
                                                color: 'var(--text-color)',
                                                maxWidth: '400px',
                                                fontSize: '16px',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap'
                                            }}
                                        >
                                            {t('COMMON.REWARD_DISCIPLINE.MONEY_DISCIPLINE')}
                                        </Typography>
                                    </TableSortLabel>
                                </TableCell>

                                <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                    <TableSortLabel
                                        active={'Note' === orderBy}
                                        direction={orderBy === 'Note' ? order : 'asc'}
                                        onClick={() => handleSort('Note')}
                                        sx={{
                                            '& .MuiTableSortLabel-icon': {
                                                color: 'var(--text-color) !important'
                                            }
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontWeight: 'bold',
                                                color: 'var(--text-color)',
                                                maxWidth: '400px',
                                                fontSize: '16px',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap'
                                            }}
                                        >
                                            {t('COMMON.REWARD_DISCIPLINE.NOTE')}
                                        </Typography>
                                    </TableSortLabel>
                                </TableCell>

                                <TableCell sx={{ borderColor: 'var(--border-color)', width: '70px' }}>
                                    <Typography
                                        sx={{
                                            fontWeight: 'bold',
                                            color: 'var(--text-color)',
                                            fontSize: '16px',
                                            textAlign: 'center',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        }}
                                    >
                                        {t('COMMON.ERROR_REPORT.STATUS')}
                                    </Typography>
                                </TableCell>

                                <TableCell sx={{ borderColor: 'var(--border-color)', padding: '16px 35px' }}>
                                    <Typography
                                        sx={{
                                            fontWeight: 'bold',
                                            color: 'var(--text-color)',
                                            fontSize: '16px',
                                            overflow: 'hidden',
                                            textAlign: 'center',
                                            maxWidth: '280px',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        }}
                                    >
                                        {t('COMMON.ERROR_REPORT.ACTION')}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data &&
                                data.map((row, index: number) => (
                                    <TableRow
                                        key={index}
                                        sx={{
                                            '&:last-child td, &:last-child th': {
                                                border: 'none'
                                            }
                                        }}
                                    >
                                        <TableCell
                                            sx={{
                                                borderStyle: 'dashed',
                                                padding: '0 35px !important',
                                                borderColor: 'var(--border-color)'
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    color: 'var(--text-color)',
                                                    fontSize: '16px',
                                                    maxWidth: '280px',
                                                    textAlign: 'center',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                date
                                            </Typography>
                                        </TableCell>

                                        <TableCell
                                            sx={{
                                                borderStyle: 'dashed',
                                                // padding: '0 35px !important',
                                                borderColor: 'var(--border-color)'
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    color: 'var(--text-color)',
                                                    fontSize: '16px',
                                                    maxWidth: '280px',
                                                    // textAlign: 'center',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                reason
                                            </Typography>
                                        </TableCell>

                                        <TableCell
                                            sx={{
                                                borderStyle: 'dashed',
                                                borderColor: 'var(--border-color)'
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    color: '#1eff9c',
                                                    fontSize: '16px',
                                                    width: '88px',
                                                    padding: '8px 10px',
                                                    borderRadius: '10px',
                                                    border: '1px solid var(--border-color)',
                                                    fontWeight: 'bold',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                money
                                            </Typography>
                                        </TableCell>

                                        <TableCell
                                            sx={{
                                                borderStyle: 'dashed',
                                                borderColor: 'var(--border-color)'
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    color: '#52f2d8',
                                                    fontSize: '16px',
                                                    fontStyle: 'italic',
                                                    maxWidth: '280px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                note
                                            </Typography>
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                borderStyle: 'dashed',
                                                width: '70px',
                                                borderColor: 'var(--border-color)',
                                                padding: '11px'
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    borderRadius: '8px',
                                                    padding: '5px 10px',
                                                    display: 'flex',
                                                    minWidth: '100px',
                                                    justifyContent: 'center',
                                                    backgroundColor: 'var(--bg-danger-color)'
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        fontSize: '15px',
                                                        overflow: 'hidden',
                                                        color: 'var(--text-danger-color)',
                                                        width: 'auto',
                                                        fontWeight: 'bold',
                                                        display: 'inline-block',
                                                        textOverflow: 'ellipsis',
                                                        whiteSpace: 'nowrap'
                                                    }}
                                                >
                                                    {t('COMMON.ATTENDANCE.STATUS_INVALID')}
                                                </Typography>
                                            </Box>
                                            {/* {row.IsValid === false ? (
                                        <Box
                                            sx={{
                                                borderRadius: '8px',
                                                padding: '5px 10px',
                                                display: 'flex',
                                                minWidth: '100px',
                                                justifyContent: 'center',
                                                backgroundColor: 'var(--bg-danger-color)'
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontSize: '15px',
                                                    overflow: 'hidden',
                                                    color: 'var(--text-danger-color)',
                                                    width: 'auto',
                                                    fontWeight: 'bold',
                                                    display: 'inline-block',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                {t('COMMON.ATTENDANCE.STATUS_INVALID')}
                                            </Typography>
                                        </Box>
                                    ) : row.CheckInTime > '08:00:00' ? (
                                        row.CheckOutTime < '17:00' ? (
                                            <Box>
                                                <Box
                                                    sx={{
                                                        borderRadius: '8px',
                                                        padding: '5px 10px',
                                                        display: 'flex',
                                                        minWidth: '100px',
                                                        justifyContent: 'center',
                                                        backgroundColor: 'var(--bg-warning-color)'
                                                    }}
                                                >
                                                    <Typography
                                                        sx={{
                                                            fontSize: '15px',
                                                            overflow: 'hidden',
                                                            color: 'var(--text-warning-color)',
                                                            width: 'auto',
                                                            fontWeight: 'bold',
                                                            display: 'inline-block',
                                                            textOverflow: 'ellipsis',
                                                            whiteSpace: 'nowrap'
                                                        }}
                                                    >
                                                        {t('COMMON.ATTENDANCE.STATUS_LATE')}
                                                    </Typography>
                                                </Box>

                                                <Box
                                                    sx={{
                                                        mt: '10px',
                                                        borderRadius: '8px',
                                                        padding: '5px 10px',
                                                        display: 'flex',
                                                        minWidth: '100px',
                                                        justifyContent: 'center',
                                                        backgroundColor: 'var(--bg-closed-color)'
                                                    }}
                                                >
                                                    <Typography
                                                        sx={{
                                                            fontSize: '15px',
                                                            overflow: 'hidden',
                                                            color: 'var(--text-closed-color)',
                                                            width: 'auto',
                                                            fontWeight: 'bold',
                                                            display: 'inline-block',
                                                            textOverflow: 'ellipsis',
                                                            whiteSpace: 'nowrap'
                                                        }}
                                                    >
                                                        {t('COMMON.ATTENDANCE.STATUS_EARLY')}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        ) : (
                                            <Box
                                                sx={{
                                                    borderRadius: '8px',
                                                    padding: '5px 10px',
                                                    display: 'flex',
                                                    minWidth: '100px',
                                                    justifyContent: 'center',
                                                    backgroundColor: 'var(--bg-warning-color)'
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        fontSize: '15px',
                                                        overflow: 'hidden',
                                                        color: 'var(--text-warning-color)',
                                                        width: 'auto',
                                                        fontWeight: 'bold',
                                                        display: 'inline-block',
                                                        textOverflow: 'ellipsis',
                                                        whiteSpace: 'nowrap'
                                                    }}
                                                >
                                                    {t('COMMON.ATTENDANCE.STATUS_LATE')}
                                                </Typography>
                                            </Box>
                                        )
                                    ) : row.CheckOutTime < '17:00' ? (
                                        <Box
                                            sx={{
                                                borderRadius: '8px',
                                                padding: '5px 10px',
                                                display: 'flex',
                                                minWidth: '100px',
                                                justifyContent: 'center',
                                                backgroundColor: 'var(--bg-closed-color)'
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontSize: '15px',
                                                    overflow: 'hidden',
                                                    color: 'var(--text-closed-color)',
                                                    width: 'auto',
                                                    fontWeight: 'bold',
                                                    display: 'inline-block',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                {t('COMMON.ATTENDANCE.STATUS_EARLY')}
                                            </Typography>
                                        </Box>
                                    ) : (
                                        <Box
                                            sx={{
                                                borderRadius: '8px',
                                                padding: '5px 10px',
                                                display: 'flex',
                                                minWidth: '100px',
                                                justifyContent: 'center',
                                                backgroundColor: 'var(--bg-success-color)'
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontSize: '15px',
                                                    overflow: 'hidden',
                                                    color: 'var(--text-success-color)',
                                                    width: 'auto',
                                                    fontWeight: 'bold',
                                                    display: 'inline-block',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                {t('COMMON.ATTENDANCE.STATUS_ON_TIME')}
                                            </Typography>
                                        </Box>
                                    )} */}
                                        </TableCell>

                                        <TableCell
                                            sx={{
                                                borderStyle: 'dashed',
                                                padding: '16px 24px',
                                                borderColor: 'var(--border-color)',
                                                width: '146px',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            <Box
                                                display='flex'
                                                alignItems='center'
                                                justifyContent='center'
                                                sx={{
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                <Tooltip title={t('COMMON.REWARD_DISCIPLINE.VIEW_DETAIL')}>
                                                    <Box
                                                        display='flex'
                                                        alignItems='center'
                                                        justifyContent='center'
                                                        sx={{
                                                            color: '#00d100',
                                                            borderRadius: '50%',
                                                            width: '42px',
                                                            height: '42px',
                                                            '&:hover': {
                                                                backgroundColor: 'var(--hover-color)'
                                                            }
                                                        }}
                                                    >
                                                        <ClipboardCheck />
                                                    </Box>
                                                </Tooltip>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box display='flex' alignItems='center' justifyContent='space-between' padding='35px'>
                    <Box display='flex' alignItems='center'>
                        <Typography sx={{ mr: '10px', color: 'var(--text-color)' }}>
                            {t('COMMON.PAGINATION.ROWS_PER_PAGE')}
                        </Typography>
                        <Select
                            id='select'
                            sx={{
                                width: '71px',
                                padding: '5px',
                                borderRadius: '8px',
                                color: 'var(--text-color)',
                                '& .MuiSelect-icon': {
                                    color: 'var(--text-color)'
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'var(--border-color)'
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'var(--hover-field-color)'
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'var(--selected-field-color)'
                                },
                                '& .MuiSelect-select': {
                                    padding: '6px 32px 6px 10px'
                                }
                            }}
                            value={rowsPerPage}
                            defaultValue='5'
                            onChange={handleChangeRowsPerPage}
                            MenuProps={{
                                PaperProps: {
                                    elevation: 0,
                                    sx: {
                                        border: '1px solid var(--border-color)',
                                        borderRadius: '8px',
                                        backgroundColor: 'var(--background-item)',
                                        '& .MuiList-root': {
                                            borderRadius: '0px',
                                            backgroundImage:
                                                'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiBmaWxsPSJ1cmwoI3BhaW50MF9yYWRpYWxfMjc0OV8xNDUxODYpIiBmaWxsLW9wYWNpdHk9IjAuMTIiLz4KPGRlZnM+CjxyYWRpYWxHcmFkaWVudCBpZD0icGFpbnQwX3JhZGlhbF8yNzQ5XzE0NTE4NiIgY3g9IjAiIGN5PSIwIiByPSIxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgxMjAgMS44MTgxMmUtMDUpIHJvdGF0ZSgtNDUpIHNjYWxlKDEyMy4yNSkiPgo8c3RvcCBzdG9wLWNvbG9yPSIjMDBCOEQ5Ii8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzAwQjhEOSIgc3RvcC1vcGFjaXR5PSIwIi8+CjwvcmFkaWFsR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+Cg==), url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiBmaWxsPSJ1cmwoI3BhaW50MF9yYWRpYWxfMjc0OV8xNDUxODcpIiBmaWxsLW9wYWNpdHk9IjAuMTIiLz4KPGRlZnM+CjxyYWRpYWxHcmFkaWVudCBpZD0icGFpbnQwX3JhZGlhbF8yNzQ5XzE0NTE4NyIgY3g9IjAiIGN5PSIwIiByPSIxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgwIDEyMCkgcm90YXRlKDEzNSkgc2NhbGUoMTIzLjI1KSI+CjxzdG9wIHN0b3AtY29sb3I9IiNGRjU2MzAiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRkY1NjMwIiBzdG9wLW9wYWNpdHk9IjAiLz4KPC9yYWRpYWxHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4K)',
                                            backgroundPosition: 'top right, bottom left',
                                            backgroundSize: '50%, 50%',
                                            backgroundRepeat: 'no-repeat',
                                            backdropFilter: 'blur(20px)',
                                            backgroundColor: 'var(--background-item)',
                                            padding: '5px',
                                            '& .MuiMenuItem-root': {
                                                color: 'var(--text-color)',
                                                borderRadius: '6px',
                                                '&:hover': {
                                                    backgroundColor: 'var(--hover-color) !important'
                                                },
                                                '&.Mui-selected': {
                                                    backgroundColor: 'var(--background-selected-item)'
                                                }
                                            }
                                        }
                                    }
                                }
                            }}
                        >
                            <MenuItem sx={{ marginBottom: '3px' }} value={5}>
                                5
                            </MenuItem>
                            <MenuItem sx={{ marginBottom: '3px' }} value={10}>
                                10
                            </MenuItem>
                            <MenuItem sx={{ marginBottom: '3px' }} value={20}>
                                20
                            </MenuItem>
                            <MenuItem sx={{ marginBottom: '3px' }} value={30}>
                                30
                            </MenuItem>
                            <MenuItem value={40}>40</MenuItem>
                        </Select>
                        <Typography sx={{ ml: '30px', color: 'var(--text-color)' }}>
                            {/* {t('COMMON.PAGINATION.FROM_TO', { from, to, totalRecords })} */}
                        </Typography>
                    </Box>
                    <Pagination
                        count={Math.ceil(3 / Number(rowsPerPage))}
                        page={page}
                        onChange={handleChangePage}
                        boundaryCount={1}
                        siblingCount={2}
                        variant='outlined'
                        sx={{
                            color: 'var(--text-color)',
                            borderColor: 'var(--border-color)',
                            '& .MuiPaginationItem-root': {
                                color: 'var(--text-color)',
                                borderColor: 'var(--border-color)',
                                '&.Mui-selected': {
                                    backgroundColor: 'var(--background-selected-item) ',
                                    borderColor: 'var(--background-selected-item) ',
                                    color: 'var(--text-color)'
                                },
                                '&:hover': {
                                    backgroundColor: 'var(--hover-color) !important',
                                    borderColor: 'var(--hover-color) !important'
                                }
                            }
                        }}
                        color='primary'
                    />
                </Box>
            </Paper>
        </Box>
    )
}