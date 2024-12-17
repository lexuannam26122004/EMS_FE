'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
    Box,
    Select,
    Pagination,
    Typography,
    MenuItem,
    SelectChangeEvent,
    Paper,
    Checkbox,
    TableRow,
    TableBody,
    Table,
    TableCell,
    TableHead,
    TableContainer,
    Button,
    TextField,
    InputAdornment,
    IconButton,
    Tooltip,
    TableSortLabel,
    Avatar
} from '@mui/material'

import { IAspNetUserGetAll } from '@/models/AspNetUser'
import { useGetAllUsersQuery } from '@/services/AspNetUserService'
import { IEmploymentContractSearch } from '@/models/EmploymentContract'
import {
    useSearchEmploymentContractsQuery,
    useChangeStatusEmploymentContractsMutation
} from '@/services/EmploymentContractService'

import { CirclePlus, EyeIcon, Pencil, Trash2 } from 'lucide-react'
import SearchIcon from '@mui/icons-material/Search'
import { useTranslation } from 'react-i18next'
import AlertDialog from '@/components/AlertDialog'

const EmployeeTable: React.FC = () => {
    const [selectedRow, setSelectedRow] = useState<string | null>(null)
    const [openDialog, setOpenDialog] = useState(false)
    const [isChangeMany, setIsChangeMany] = useState(false)
    const [selected, setSelected] = useState<string[]>([])
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [rowsPerPage, setRowsPerPage] = useState('10')
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [sortConfig, setSortConfig] = useState<{
        key: keyof IEmploymentContractSearch | 'EmployeeId'
        direction: 'asc' | 'desc'
    }>({ key: 'EmployeeId', direction: 'asc' })
    const { t } = useTranslation('common')
    const router = useRouter()

    const [changeEmploymentContract] = useChangeStatusEmploymentContractsMutation()

    const { data: contractResponse, isLoading: isContractsLoading, refetch } = useSearchEmploymentContractsQuery()
    const { data: userResponse, isLoading: isUsersLoading } = useGetAllUsersQuery()

    const contract = (contractResponse?.Data?.Records as IEmploymentContractSearch[]) || []
    const employee = (userResponse?.Data?.Records as IAspNetUserGetAll[]) || []

    const users = contract.map(contract => {
        const matchedEmployee = employee.find(emp => emp.Id === contract.UserId)
        return {
            ...contract,
            FullName: matchedEmployee?.FullName || 'N/A',
            AvatarPath:
                matchedEmployee?.AvatarPath ||
                'https://localhost:44381/avatars/aa1678f0-75b0-48d2-ae98-50871178e9bd.jfif',
            EmployeeId:matchedEmployee?.EmployeeId || 'N/A',
        }
    })

    if (isContractsLoading || isUsersLoading) return <div>Loading...</div>

    const filteredUsers = users.filter(
        user =>
            user.Id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.FullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.UserId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.ContractName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.BasicSalary?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
            (user.StartDate &&
                new Date(user.StartDate).toLocaleDateString().toLowerCase().includes(searchTerm.toLowerCase()))
    )

    const isSelected = (id: string) => selected.includes(id)

    const handleCheckboxClick = (id: string) => {
        setSelected(prev => (prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]))
    }

    const sortedUsers = filteredUsers.sort((a, b) => {
        const aValue = a[sortConfig.key]
        const bValue = b[sortConfig.key]

        if (typeof aValue === 'number' && typeof bValue === 'number') {
            return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue
        } else {
            const aString = aValue?.toString().toLowerCase() || ''
            const bString = bValue?.toString().toLowerCase() || ''
            return sortConfig.direction === 'asc' ? aString.localeCompare(bString) : bString.localeCompare(aString)
        }
    })

    const totalRecords = sortedUsers.length
    const paginatedUsers = sortedUsers.slice((currentPage - 1) * Number(rowsPerPage), currentPage * Number(rowsPerPage))

    const handleSort = (key: keyof IEmploymentContractSearch | 'EmployeeId') => {
        setSortConfig(prev => ({
            key,
            direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
        }))
    }

    const handleChangePage = (_event: React.ChangeEvent<unknown>, page: number) => setCurrentPage(page)

    const handleChangeRowsPerPage = (event: SelectChangeEvent<string>) => {
        setRowsPerPage(event.target.value)
        setCurrentPage(1)
    }

    const handleDeleteManyClick = async () => {
        setIsChangeMany(true)
        setOpenDialog(true)
    }

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setSelected(users.map(row => row.Id))
        } else {
            setSelected([])
        }
    }

    const from = (currentPage - 1) * Number(rowsPerPage) + 1
    const to = Math.min(currentPage * Number(rowsPerPage), totalRecords)

    const countRows = selected.length

    const handleDeleteClick = async (id: string) => {
        setOpenDialog(true)
        setSelectedRow(id)
    }

    const handleDeleteEmploymentContract = async () => {
        if (selectedRow) {
            await changeEmploymentContract(selectedRow)
            if (isSelected(selectedRow)) {
                setSelected(prev => prev.filter(item => item !== selectedRow))
            }
            setOpenDialog(false)
            setSelectedRow(null)
            refetch()
        }
    }

    const handleDeleteManyEmploymentContract = async () => {
        if (selected.length > 0) {
            for (const id of selected) {
                await changeEmploymentContract(id)
            }
            setIsChangeMany(false)
            setSelected([])
            setOpenDialog(false)
            refetch()
        }
    }

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
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <IconButton
                                                color='primary'
                                                sx={{
                                                    height: '100%',
                                                    backgroundColor: 'var(--button-color)',
                                                    color: 'white',
                                                    borderRadius: '0 8px 8px 0',
                                                    padding: '10.5px',
                                                    zIndex: 100,
                                                    '&:hover': {
                                                        backgroundColor: 'var(--hover-button-color)'
                                                    }
                                                }}
                                            >
                                                <SearchIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }
                            }}
                        />
                    </Box>

                    <Box display='flex' alignItems='center' justifyContent='center' gap='20px'>
                        <Typography
                            sx={{
                                color: 'red',
                                whiteSpace: 'nowrap',
                                visibility: countRows > 0 ? 'visible' : 'hidden'
                            }}
                        >
                            {t('COMMON.COUNT_ROWS_SELECTED', { countRows })}
                        </Typography>
                        <Button
                            variant='contained'
                            startIcon={<Trash2 />}
                            sx={{
                                height: '44px',
                                visibility: countRows > 0 ? 'visible' : 'hidden',
                                backgroundColor: 'var(--button-color)',
                                width: 'auto',
                                padding: '0px 24px',
                                '&:hover': {
                                    backgroundColor: 'var(--hover-button-color)'
                                },
                                fontSize: '16px',
                                fontWeight: 'bold',
                                whiteSpace: 'nowrap',
                                textTransform: 'none'
                            }}
                            onClick={() => handleDeleteManyClick()}
                        >
                            {t('COMMON.BUTTON.DELETE')}
                        </Button>

                        <Button
                            variant='contained'
                            startIcon={<CirclePlus />}
                            sx={{
                                height: '44px',
                                backgroundColor: 'var(--button-color)',
                                width: 'auto',
                                padding: '0px 24px',
                                '&:hover': {
                                    backgroundColor: 'var(--hover-button-color)'
                                },
                                fontSize: '16px',
                                fontWeight: 'bold',
                                whiteSpace: 'nowrap',
                                textTransform: 'none'
                            }}
                            onClick={() => router.push('/admin/contract/create-contract')}
                        >
                            {t('COMMON.BUTTON.CREATE')}
                        </Button>
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
                                <TableCell
                                    padding='checkbox'
                                    sx={{ borderColor: 'var(--border-color)', paddingLeft: '8.5px' }}
                                >
                                    <Checkbox
                                        indeterminate={selected.length > 0 && selected.length < users.length}
                                        checked={
                                            users && selected.length > 0 ? selected.length === users.length : false
                                        }
                                        onChange={handleSelectAllClick}
                                        sx={{
                                            color: 'var(--text-color)'
                                        }}
                                    />
                                </TableCell>
                                <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                    <TableSortLabel
                                        active={sortConfig.key === 'EmployeeId'}
                                        direction={sortConfig.key === 'EmployeeId' ? sortConfig.direction : 'asc'}
                                        onClick={() => handleSort('EmployeeId')}
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

                                {['FullName', 'UserId', 'ContractName', 'StartDate', 'BasicSalary'].map(
                                    (column, index) => (
                                        <TableCell key={index} sx={{ borderColor: 'var(--border-color)' }}>
                                            <TableSortLabel
                                                active={sortConfig.key === column}
                                                direction={sortConfig.key === column ? sortConfig.direction : 'asc'}
                                                onClick={() => handleSort(column as keyof IEmploymentContractSearch)}
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
                                    )
                                )}

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
                                <TableRow key={user.Id} selected={isSelected(user.Id)}>
                                    <TableCell
                                        padding='checkbox'
                                        sx={{ borderColor: 'var(--border-color)', paddingLeft: '8.5px' }}
                                    >
                                        <Checkbox
                                            checked={isSelected(user.Id)}
                                            onChange={() => handleCheckboxClick(user.Id)}
                                            sx={{
                                                color: 'var(--text-color)'
                                            }}
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
                                            {user.EmployeeId}
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
                                                whiteSpace: 'nowrap',
                                                display: 'flex',
                                                alignItems: 'center'
                                            }}
                                            component='div'
                                        >
                                            <Avatar
                                                src={
                                                    user.AvatarPath ||
                                                    'https://localhost:44381/avatars/aa1678f0-75b0-48d2-ae98-50871178e9bd.jfif'
                                                }
                                                alt='Avatar'
                                                sx={{ marginRight: '20px' }}
                                            />
                                            {user.FullName || 'N/A'}
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
                                            {user.UserId}
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
                                            {user.ContractName || 'N/A'}
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
                                            {user.StartDate && !isNaN(new Date(user.StartDate).getTime())
                                                ? new Date(user.StartDate).toLocaleDateString()
                                                : 'N/A'}
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
                                            {user.BasicSalary ? user.BasicSalary.toString().toLowerCase() : 'N/A'}
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
                                                    onClick={() =>
                                                        router.push(`/admin/contract/update-contract?id=${user.Id}`)
                                                    }
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
                                                    onClick={() => handleDeleteClick(user.Id)}
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
                        count={Math.ceil(totalRecords / Number(rowsPerPage))}
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

            <AlertDialog
                title={t('COMMON.ALERT_DIALOG.CONFIRM_DELETE.TITLE')}
                content={t('COMMON.ALERT_DIALOG.CONFIRM_DELETE.CONTENT')}
                type='warning'
                open={openDialog}
                setOpen={setOpenDialog}
                buttonCancel={t('COMMON.ALERT_DIALOG.CONFIRM_DELETE.CANCEL')}
                buttonConfirm={t('COMMON.ALERT_DIALOG.CONFIRM_DELETE.DELETE')}
                onConfirm={() =>
                    isChangeMany ? handleDeleteManyEmploymentContract() : handleDeleteEmploymentContract()
                }
            />
        </Box>
    )
}

export default EmployeeTable
