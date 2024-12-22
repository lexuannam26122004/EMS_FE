'use client'
import AlertDialog from '@/components/AlertDialog'
import { IDepartmentGetAll } from '@/models/Department'
import { useChangeStatusMutation, useGetAllDepartmentQuery } from '@/services/DepartmentService'
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, SelectChangeEvent, TextField, InputAdornment, Button, Checkbox, TableSortLabel, Tooltip, Select, MenuItem, Pagination } from '@mui/material'
import { CirclePlus, EyeIcon, Pencil, SearchIcon, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import DetailModal from '../configuration/DetailModal'

function DepartmentTable() {
    const { data: department, isLoading: isBenefitTypesLoading, refetch } = useGetAllDepartmentQuery()
    const departmentDataRecord = (department?.Data?.Records as IDepartmentGetAll[]) || []
    const departmentDataTotalRecord = (department?.Data?.TotalRecords as IDepartmentGetAll[]) || []

    const [selectedRow, setSelectedRow] = useState<number | null>(null)
    const [openDialog, setOpenDialog] = useState(false)
    const [isChangeMany, setIsChangeMany] = useState(false)
    const [selected, setSelected] = useState<number[]>([])
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [rowsPerPage, setRowsPerPage] = useState('10')
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [sortConfig, setSortConfig] = useState<{
        key: keyof IDepartmentGetAll | 'Id'
        direction: 'asc' | 'desc'
    }>({ key: 'Id', direction: 'asc' })
    const { t } = useTranslation('common')
    const router = useRouter()

    const [changeEmployee] = useChangeStatusMutation()

    //const { data: contractResponse, isLoading: isContractsLoading } = useSearchEmploymentContractsQuery()
   //// const { data: userResponse, isLoading: isUsersLoading, refetch } = useGetAllDepartmentQuery()

    //const contract = (contractResponse?.Data?.Records as IEmploymentContractSearch[]) || []
    //const employee = (userResponse?.Data?.Records as IAspNetUserGetAll[]) || []

    //const users = employee.map(employee => {
    //    const matchedEmployee = contract.find(ct => ct.UserId === employee.Id)
    //    return {
    //        ...employee,
    //        ContractName: matchedEmployee?.ContractName || 'N/A',
    //        StartDate: matchedEmployee?.StartDate || 'N/A'
    //    }
    //})

    //const [selectedUser, setSelectedUser] = useState<IDepartmentGetAll | null>(null)
    //const [openModal, setOpenModal] = useState(false)

    const handleClickDetail = (department: IDepartmentGetAll) => {
        //setSelectedUser(department)
        //setOpenModal(true)
    }

    //if (isContractsLoading || isUsersLoading) return <div>Loading...</div>
    const departmentfilter = departmentDataRecord.map(department => {
        return {
            ...department,
            DepartmentHeadName: department.DepartmentHeadName || 'N/A'
        }
    })
    const filteredUsers = departmentfilter.filter(
        department =>
            department.Id?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
            department.Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            department.DepartmentHeadName?.toLowerCase().includes(searchTerm.toLowerCase())
            //department.DepartmentHeadId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            //department.CountDepartment?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            //user.UserName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            //user.Roles?.some(role => role.toLowerCase().includes(searchTerm.toLowerCase())) ||
            //(user.Birthday &&
            //    new Date(user.Birthday).toLocaleDateString().toLowerCase().includes(searchTerm.toLowerCase())) ||
            //user.Gender?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
            //user.Address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            //user.ContractName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            //(user.StartDate &&
            //    new Date(user.StartDate).toLocaleDateString().toLowerCase().includes(searchTerm.toLowerCase()))
    )

    const isSelected = (id: number) => selected.includes(id)

    const handleCheckboxClick = (id: number) => {
        setSelected(prev => (prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]))
    }

    const sortedUsers = filteredUsers.sort((a, b) => {
        const aValue = a[sortConfig.key]?.toString().toLowerCase() || ''
        const bValue = b[sortConfig.key]?.toString().toLowerCase() || ''
        return sortConfig.direction === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    })

    const totalRecords = sortedUsers.length
    const paginatedUsers = sortedUsers.slice((currentPage - 1) * Number(rowsPerPage), currentPage * Number(rowsPerPage))

    const handleSort = (key: keyof IDepartmentGetAll | 'Id') => {
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
            setSelected(departmentfilter.map(row => row.Id))
        } else {
            setSelected([])
        }
    }

    const from = (currentPage - 1) * Number(rowsPerPage) + 1
    const to = Math.min(currentPage * Number(rowsPerPage), totalRecords)

    const countRows = selected.length

    const handleDeleteClick = async (id: number) => {
        setOpenDialog(true)
        setSelectedRow(id)
    }

    const handleDeleteEmployee = async () => {
        if (selectedRow) {
            await changeEmployee(selectedRow)
            if (isSelected(selectedRow)) {
                setSelected(prev => prev.filter(item => item !== selectedRow))
            }
            setOpenDialog(false)
            setSelectedRow(null)
            refetch()
        }
    }

    const handleDeleteManyEmployee = async () => {
        if (selected.length > 0) {
            for (const id of selected) {
                await changeEmployee(id)
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
                    borderRadius: '15px',
                    backgroundColor: 'var(--background-item)'
                }}
            >
                <Box display='flex' alignItems='center' justifyContent='space-between' margin='24px'>
                    <Box sx={{ position: 'relative', width: '100%', height: '55px' }}>
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
                                    borderRadius: '10px',
                                    borderColor: 'var(--border-color)'
                                },
                                '& .MuiInputBase-root': { paddingLeft: '0px', paddingRight: '12px' },
                                '& .MuiInputBase-input': {
                                    padding: '15px 0px',
                                    color: 'var(--text-color)',
                                    fontSize: '16px',
                                    '&::placeholder': {
                                        color: 'var(--placeholder-color)',
                                        opacity: 1 // Đảm bảo opacity của placeholder không bị giảm
                                    }
                                },
                                '& .MuiOutlinedInput-root:hover fieldset': {
                                    borderColor: 'var(--hover-field-color)'
                                },
                                '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                                    borderColor: 'var(--selected-field-color)'
                                }
                            }}
                            onChange={e => setSearchTerm(e.target.value)}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment
                                            position='start'
                                            sx={{
                                                mr: 0
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    height: '100%',
                                                    color: '#a5bed4',
                                                    padding: '10.5px',
                                                    zIndex: 100
                                                }}
                                            >
                                                <SearchIcon />
                                            </Box>
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
                                mr: '5px',
                                height: '53px',
                                visibility: countRows > 0 ? 'visible' : 'hidden',
                                backgroundColor: 'var(--button-color)',
                                width: 'auto',
                                padding: '0px 30px',
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
                                height: '53px',
                                backgroundColor: 'var(--button-color)',
                                width: 'auto',
                                padding: '0px 30px',
                                '&:hover': {
                                    backgroundColor: 'var(--hover-button-color)'
                                },
                                fontSize: '16px',
                                fontWeight: 'bold',
                                whiteSpace: 'nowrap',
                                textTransform: 'none'
                            }}
                            onClick={() => router.push('/admin/employee/create-employee')}
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
                                    sx={{
                                        borderColor: 'var(--border-color)',
                                        paddingLeft: '12px',
                                        backgroundColor: 'var(--header-color-table)',
                                        position: 'sticky',
                                        left: 0,
                                        zIndex: 2
                                    }}
                                >
                                    <Checkbox
                                        indeterminate={selected.length > 0 && selected.length < departmentfilter.length}
                                        checked={
                                            departmentfilter && selected.length > 0 ? selected.length === departmentfilter.length : false
                                        }
                                        onChange={handleSelectAllClick}
                                        sx={{
                                            color: 'var(--text-color)',
                                            width: '48px'
                                        }}
                                    />
                                </TableCell>

                                <TableCell
                                    sx={{
                                        borderColor: 'var(--border-color)',
                                        backgroundColor: 'var(--header-color-table)',
                                        position: 'sticky',
                                        left: 60,
                                        zIndex: 1
                                    }}
                                >
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
                                                width: '27px',
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

                                <TableCell
                                    sx={{
                                        borderColor: 'var(--border-color)',
                                        backgroundColor: 'var(--header-color-table)',
                                        position: 'sticky',
                                        left: 145,
                                        zIndex: 1
                                    }}
                                >
                                    <TableSortLabel
                                        active={sortConfig.key === 'Name'}
                                        direction={sortConfig.key === 'Name' ? sortConfig.direction : 'asc'}
                                        onClick={() => handleSort('Name' as keyof IDepartmentGetAll)}
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
                                            {t('Tên phòng ban')}
                                        </Typography>
                                    </TableSortLabel>
                                </TableCell>

                                {[
                                    'quanly',
                                    'ngaytao',
                                    
                                ].map((column, index) => (
                                    <TableCell key={index} sx={{ borderColor: 'var(--border-color)' }}>
                                        <TableSortLabel
                                            active={sortConfig.key === column}
                                            direction={sortConfig.key === column ? sortConfig.direction : 'asc'}
                                            onClick={() => handleSort(column as keyof IDepartmentGetAll)}
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
                                                {t(`COMMON.EMPLOYEE.${column.toUpperCase()}`)}
                                            </Typography>
                                        </TableSortLabel>
                                    </TableCell>
                                ))}

                                <TableCell
                                    sx={{
                                        borderColor: 'var(--border-color)',
                                        padding: '0px 9.5px 0px 0px',
                                        width: '146px',
                                        position: 'sticky',
                                        right: -0.45,
                                        zIndex: 1,
                                        backgroundColor: 'var(--header-color-table)'
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
                            {paginatedUsers.map(department => (
                                <TableRow key={department.Id} selected={isSelected(department.Id)}>
                                    <TableCell
                                        padding='checkbox'
                                        sx={{
                                            borderColor: 'var(--border-color)',
                                            paddingLeft: '12px',
                                            position: 'sticky',
                                            left: 0,
                                            zIndex: 1,
                                            clipPath: 'inset(0px 0px 1px 0px)',
                                            backdropFilter: 'blur(250px)',
                                            WebkitBackdropFilter: 'blur(250px)'
                                        }}
                                    >
                                        <Checkbox
                                            checked={isSelected(department.Id)}
                                            onChange={() => handleCheckboxClick(department.Id)}
                                            sx={{
                                                color: 'var(--text-color)',
                                                width: '48px'
                                            }}
                                        />
                                    </TableCell>

                                    <TableCell
                                        sx={{
                                            borderColor: 'var(--border-color)',
                                            position: 'sticky',
                                            left: 60,
                                            zIndex: 1,
                                            clipPath: 'inset(0px 0px 1px 0px)',
                                            backdropFilter: 'blur(3000px)',
                                            WebkitBackdropFilter: 'blur(3000px)'
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                color: 'var(--text-color)',
                                                fontSize: '16px',
                                                maxWidth: '260px',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap'
                                            }}
                                        >
                                            {department.Id}
                                        </Typography>
                                    </TableCell>

                                    <TableCell
                                        sx={{
                                            borderColor: 'var(--border-color)',
                                            position: 'sticky',
                                            left: 145,
                                            zIndex: 1,
                                            clipPath: 'inset(0px 0px 1px 0px)',
                                            backdropFilter: 'blur(3000px)',
                                            WebkitBackdropFilter: 'blur(3000px)'
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                color: 'var(--text-color)',
                                                fontSize: '16px',
                                                maxWidth: '260px',
                                                overflow: 'hidden',
                                                whiteSpace: 'nowrap',
                                                display: 'flex',
                                                alignItems: 'center',
                                                textOverflow: 'ellipsis'
                                            }}
                                            component='div'
                                        >
                                            {department.Name || 'N/A'}
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                        <Typography
                                            sx={{
                                                color: 'var(--text-color)',
                                                fontSize: '16px',
                                                maxWidth: '260px',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap'
                                            }}
                                        >
                                            {department.DepartmentHeadName || 'N/A'}
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                        <Typography
                                            sx={{
                                                color: 'var(--text-color)',
                                                fontSize: '16px',
                                                maxWidth: '260px',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap'
                                            }}
                                        >
                                            {department.CreateDate || 'N/A'}
                                        </Typography>
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            padding: '0px 9.5px 0px 0px',
                                            borderColor: 'var(--border-color)',
                                            width: '146px',
                                            position: 'sticky',
                                            right: -0.45,
                                            zIndex: 1,
                                            clipPath: 'inset(0px 0px 1px 0px)',
                                            backdropFilter: 'blur(3000px)',
                                            WebkitBackdropFilter: 'blur(3000px)'
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
                                                    onClick={() => handleClickDetail(department)}
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
                                                        router.push(`/admin/department/update-department?id=${department.Id}`)
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
                                                    onClick={() => handleDeleteClick(department.Id)}
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
                onConfirm={() => (isChangeMany ? handleDeleteManyEmployee() : handleDeleteEmployee())}
            />

            
        </Box>
    )
}


export default DepartmentTable

