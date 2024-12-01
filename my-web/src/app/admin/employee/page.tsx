'use client'

import React, { useState } from 'react'
import {
    Box,
    Typography,
    Select,
    MenuItem,
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    Avatar,
    Paper,
    Button,
    Stack
} from '@mui/material'
import { IAspNetUserGetAll } from '@/models/AspNetUser'
import { useGetAllUsersQuery } from '@/services/AspNetUserService'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import { CirclePlus, EyeIcon, Pencil, Trash2 } from 'lucide-react'
import SearchIcon from '@mui/icons-material/Search'
import { useTranslation } from 'react-i18next'
import Checkbox from '@mui/material/Checkbox'

const EmployeeTable: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [rowsPerPage, setRowsPerPage] = useState<number>(10)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [sortConfig, setSortConfig] = useState<{
        key: keyof IAspNetUserGetAll | 'Id'
        direction: 'asc' | 'desc' | ''
    }>({ key: 'Id', direction: 'asc' })
    const { t } = useTranslation('common')
    const { data: userResponse, isLoading: loading } = useGetAllUsersQuery()
    const users = (userResponse?.Data?.Records as IAspNetUserGetAll[]) || []

    if (loading) return <div>Loading...</div>

    const filteredUsers = users.filter(
        user =>
            user.FullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.Email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.PhoneNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.DepartmentName?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const sortedUsers = filteredUsers.sort((a, b) => {
        if (sortConfig.direction === '') return 0
        const aValue = a[sortConfig.key]?.toString().toLowerCase() || ''
        const bValue = b[sortConfig.key]?.toString().toLowerCase() || ''
        return sortConfig.direction === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    })

    const totalRecords = sortedUsers.length
    const paginatedUsers = sortedUsers.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)

    const handleSort = (key: keyof IAspNetUserGetAll | 'Id') => {
        setSortConfig(prev => ({
            key,
            direction: prev.direction === 'asc' && prev.key === key ? 'desc' : 'asc'
        }))
    }


    const handleChangePage = (_event: React.ChangeEvent<unknown>, page: number) => setCurrentPage(page)

    const handleChangeRowsPerPage = (event: React.ChangeEvent<{ value: unknown }>) => {
        setRowsPerPage(Number(event.target.value))
        setCurrentPage(1)
    }

    const handleEdit = (id: string) => {
        console.log(`Edit user with ID: ${id}`)
        // Thêm logic xử lý chỉnh sửa tại đây
    }

    const handleDelete = (id: string) => {
        console.log(`Delete user with ID: ${id}`)
        // Thêm logic xử lý xóa tại đây
    }

    const handleViewDetails = (id: string) => {
        console.log(`View details of user with ID: ${id}`)
        // Thêm logic hiển thị chi tiết tại đây
    }

    const from = (currentPage - 1) * rowsPerPage + 1
    const to = Math.min(currentPage * rowsPerPage, totalRecords)





    return (
        <Box>
            <Paper
                sx={{
                    width: '100%',
                    overflow: 'hidden',
                    borderRadius: '6px',
                    backgroundColor: 'var(--background-color)'
                }}
            >
                <Box display='flex' alignItems='center' justifyContent='space-between' margin='20px'>
                    <Box sx={{ position: 'relative', width: '100%' }}>
                        <TextField
                            fullWidth
                            variant='outlined'
                            placeholder={t('COMMON.SYS_CONFIGURATION.PLACEHOLDER_SEARCH')}
                            value={searchTerm}
                            sx={{
                                color: 'var(--text-color)',
                                padding: '0px',
                                width: '335px',
                                '& fieldset': {
                                    borderRadius: '8px',
                                    borderColor: 'var(--border-color)'
                                },
                                '& .MuiInputBase-root': { paddingRight: '0px' },
                                '& .MuiInputBase-input': {
                                    padding: '11px 0 11px 14px',
                                    color: 'var(--text-color)',
                                    fontSize: '16px'
                                },
                                '& .MuiOutlinedInput-root:hover fieldset': {
                                    borderColor: 'var(--hover-color)'
                                },
                                '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                                    borderColor: 'var(--selected-color)'
                                }
                            }}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </Box>
                </Box>

                <TableContainer
                    sx={{
                        textAlign: 'center',
                        '&::-webkit-scrollbar': {
                            width: '7px',
                            height: '7px',
                            backgroundColor: 'var(--background-color)'
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: 'var(--scrollbar-color)',
                            borderRadius: '10px'
                        }
                    }}
                >
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: 'var(--header-color-table)' }}>
                                <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                    <TableSortLabel
                                        active={sortConfig.key === 'Id'}
                                        direction={sortConfig.key === 'Id' ? sortConfig.direction : 'asc'}
                                        onClick={() => handleSort('Id')}
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
                                                fontSize: '16px',
                                                overflow: 'hidden',
                                                maxWidth: '260px',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap'
                                            }}
                                        >
                                            ID
                                        </Typography>
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                    <Typography
                                        sx={{
                                            fontWeight: 'bold',
                                            color: 'var(--text-color)',
                                            fontSize: '16px',
                                            overflow: 'hidden',
                                            maxWidth: '260px',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        }}
                                    >
                                        Avatar
                                    </Typography>
                                </TableCell>
                                {['FullName', 'Email', 'PhoneNumber', 'DepartmentName'].map((column, index) => (
                                    <TableCell key={index} sx={{ borderColor: 'var(--border-color)' }}>
                                        <TableSortLabel
                                            active={sortConfig.key === column}
                                            direction={sortConfig.key === column ? sortConfig.direction : 'asc'}
                                            onClick={() => handleSort(column)}
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
                                                    fontSize: '16px',
                                                    overflow: 'hidden',
                                                    maxWidth: '260px',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                {column}
                                            </Typography>
                                        </TableSortLabel>
                                    </TableCell>
                                ))}

                                <TableCell
                                    sx={{
                                        borderColor: 'var(--border-color)',
                                        padding: '0px 9.5px 0px 0px',
                                        width: '146px'
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontWeight: 'bold',
                                            color: 'var(--text-color)',
                                            fontSize: '16px',
                                            overflow: 'hidden',
                                            textAlign: 'center',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        }}
                                    >
                                        {t('COMMON.SYS_CONFIGURATION.ACTION')}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedUsers.map(user => (
                                <TableRow key={user.Id}>
                                    <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                        <Typography
                                            sx={{
                                                fontWeight: 'bold',
                                                color: 'var(--text-color)',
                                                fontSize: '16px',
                                                overflow: 'hidden',
                                                maxWidth: '260px',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap'
                                            }}
                                        >
                                            {user.Id}
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                        <Avatar
                                            src={user.AvatarPath || 'https://via.placeholder.com/150'}
                                            alt='Avatar'
                                        />
                                    </TableCell>
                                    <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                        <Typography
                                            sx={{
                                                fontWeight: 'bold',
                                                color: 'var(--text-color)',
                                                fontSize: '16px',
                                                overflow: 'hidden',
                                                maxWidth: '260px',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap'
                                            }}
                                        >
                                            {user.FullName || 'N/A'}{' '}
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                        <Typography
                                            sx={{
                                                fontWeight: 'bold',
                                                color: 'var(--text-color)',
                                                fontSize: '16px',
                                                overflow: 'hidden',
                                                maxWidth: '260px',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap'
                                            }}
                                        >
                                            {user.Email}
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                        <Typography
                                            sx={{
                                                fontWeight: 'bold',
                                                color: 'var(--text-color)',
                                                fontSize: '16px',
                                                overflow: 'hidden',
                                                maxWidth: '260px',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap'
                                            }}
                                        >
                                            {user.PhoneNumber || 'N/A'}
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                        <Typography
                                            sx={{
                                                fontWeight: 'bold',
                                                color: 'var(--text-color)',
                                                fontSize: '16px',
                                                overflow: 'hidden',
                                                maxWidth: '260px',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap'
                                            }}
                                        >
                                            {user.DepartmentName}
                                        </Typography>
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            padding: '0px 9.5px 0px 0px',
                                            borderColor: 'var(--border-color)',
                                            width: '146px'
                                        }}
                                    >
                                        <Box
                                            display='flex'
                                            alignItems='center'
                                            justifyContent='space-between'
                                            gap='10px'
                                        >
                                            <Tooltip title={t('COMMON.BUTTON.VIEW_DETAIL')}>
                                                <Box
                                                    display='flex'
                                                    alignItems='center'
                                                    justifyContent='center'
                                                    sx={{
                                                        cursor: 'pointer',
                                                        color: '#00d100',
                                                        borderRadius: '50%',
                                                        width: '42px',
                                                        height: '42px',
                                                        '&:hover': {
                                                            backgroundColor: 'var(--hover-color)'
                                                        }
                                                    }}
                                                >
                                                    <EyeIcon />
                                                </Box>
                                            </Tooltip>
                                            <Tooltip title={t('COMMON.BUTTON.EDIT')}>
                                                <Box
                                                    display='flex'
                                                    alignItems='center'
                                                    justifyContent='center'
                                                    sx={{
                                                        cursor: 'pointer',
                                                        color: '#00d4ff',
                                                        borderRadius: '50%',
                                                        width: '42px',
                                                        height: '42px',
                                                        '&:hover': {
                                                            backgroundColor: 'var(--hover-color)'
                                                        }
                                                    }}
                                                    //onClick={() => handleButtonUpdateClick(row.Id)}
                                                >
                                                    <Pencil />
                                                </Box>
                                            </Tooltip>
                                            <Tooltip title={t('COMMON.BUTTON.DELETE')}>
                                                <Box
                                                    display='flex'
                                                    alignItems='center'
                                                    justifyContent='center'
                                                    sx={{
                                                        cursor: 'pointer',
                                                        color: 'red',
                                                        borderRadius: '50%',
                                                        width: '42px',
                                                        height: '42px',
                                                        '&:hover': {
                                                            backgroundColor: 'var(--hover-color)'
                                                        }
                                                    }}
                                                    //onClick={() => handleDeleteClick(row.Id)}
                                                >
                                                    <Trash2 />
                                                </Box>
                                            </Tooltip>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Box display='flex' alignItems='center' justifyContent='space-between' padding='15px'>
                    <Box display='flex' alignItems='center'>
                        <Typography sx={{ mr: '10px', color: 'var(--text-color)' }}>
                            {' '}
                            {t('COMMON.PAGINATION.ROWS_PER_PAGE')}
                        </Typography>
                        <Select
                            id='select'
                            sx={{
                                width: '71px',
                                padding: '5px',
                                color: 'var(--text-color)',
                                '& .MuiSelect-icon': {
                                    color: 'var(--text-color)'
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'var(--border-color)'
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'var(--hover-color)'
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'var(--selected-color)'
                                },
                                '& .MuiSelect-select': {
                                    padding: '6px 32px 6px 10px'
                                }
                            }}
                            value={rowsPerPage}
                            defaultValue='10'
                            onChange={handleChangeRowsPerPage}
                            MenuProps={{
                                PaperProps: {
                                    elevation: 0,
                                    sx: {
                                        border: '1px solid var(--border-color)',
                                        '& .MuiList-root': {
                                            backgroundColor: 'var(--background-color)',
                                            padding: '5px',
                                            '& .MuiMenuItem-root': {
                                                color: 'var(--text-color)',
                                                borderRadius: '4px',
                                                '&:hover': {
                                                    backgroundColor: 'var(--hover-color)'
                                                },
                                                '&.Mui-selected': {
                                                    backgroundColor: 'var(--selected-color)'
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
                            {t('COMMON.PAGINATION.FROM_TO', { from, to, totalRecords })}
                        </Typography>
                    </Box>
                    <Pagination
                        count={Math.ceil(totalRecords / rowsPerPage)}
                        page={currentPage}
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
                                    backgroundColor: 'var(--selected-color)',
                                    color: 'var(--text-color)'
                                },
                                '&:hover': {
                                    backgroundColor: 'var(--hover-color)',
                                    borderColor: 'var(--hover-color)'
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

export default EmployeeTable
