'use client'
import { IDepartmentGetAll } from '@/models/Department'
import {
    useGetAllDepartmentsQuery,
    useDeleteDepartmentMutation,
    useUpdateDepartmentMutation,
    useCreateDepartmentMutation,
    useDeleteManyDepartmentsMutation
} from '@/services/DepartmentService'
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
    TableSortLabel
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import SearchIcon from '@mui/icons-material/Search'
import { CirclePlus, Pencil, Trash2 } from 'lucide-react'
import AlertDialog from '@/components/AlertDialog'
import { useRouter } from 'next/navigation'
import DisplayInfo from '../DisplayInfo'
import DepartmentInfo from './DepartmentInfo'

function DepartmentPage() {
    const { t } = useTranslation('common')
    const [selected, setSelected] = useState<number[]>([])
    const [page, setPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState('10')
    const [from, setFrom] = useState(1)
    const [to, setTo] = useState(10)
    const [keyword, setKeyword] = useState('')
    const [isSubmit, setIsSubmit] = useState(false)
    const [isChangeMany, setIsChangeMany] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)
    const [selectedRow, setSelectedRow] = useState<number | null>(null)
    const [order, setOrder] = useState<'asc' | 'desc'>('asc')
    const [orderBy, setOrderBy] = useState<string>('')
    const [name, setName] = useState('')
    const [departmentHeadId, setDepartmentHeadId] = useState<string | null>(null)

    const { data: responseData, isFetching, refetch } = useGetAllDepartmentsQuery()
    const [deleteDepartment, { isSuccess: isSuccessDelete }] = useDeleteDepartmentMutation()
    const [createDepartment, { isSuccess, isLoading, isError }] = useCreateDepartmentMutation()
    const [updateDepartment] = useUpdateDepartmentMutation()
    const [
        deleteManyDepartments,
        { isError: isErrorDeleteMany, isSuccess: isSuccessDeleteMany, isLoading: isLoadingDeleteMany }
    ] = useDeleteManyDepartmentsMutation()

    const departmentData = responseData?.Data as IDepartmentGetAll[]
    const totalRecords = departmentData?.length || 0

    const isSelected = (id: number) => selected.includes(id)

    const handleCheckboxClick = (id: number) => {
        setSelected(prev => (prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]))
    }

    const handleSave = async () => {
        setIsSubmit(true)
        if (name === '') {
            alert('Name is required.')
            return
        }

        try {
            if (selectedRow) {
                await updateDepartment({
                    Id: selectedRow,
                    Name: name,
                    DepartmentHeadName: departmentHeadId
                }).unwrap()
            } else {
                await createDepartment({
                    Name: name,
                    DepartmentHeadId: departmentHeadId
                }).unwrap()
            }

            handleCloseCreateDialog()
            setDialog()
            setSelectedRow(null)
            setIsSubmit(false)
        } catch (error) {
            console.error('Failed to save department:', error)
        }
    }

    const setDialog = () => {
        setName('')
        setDepartmentHeadId(null)
    }

    useEffect(() => {
        if (isSuccess) {
            refetch()
        }
    }, [isSuccess])

    const handleUpdate = async (department: IDepartmentGetAll) => {
        setName(department.Name)
        setDepartmentHeadId(department.DepartmentHeadName)
        setSelectedRow(department.Id)
        setIsOpen(true)
    }

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setSelected(departmentData.map(row => row.Id))
        } else {
            setSelected([])
        }
    }

    const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event: SelectChangeEvent) => {
        const newRowsPerPage = event.target.value as string
        setRowsPerPage(newRowsPerPage)
        setPage(1)
    }

    const handleSearchKeyword = () => {
        setPage(1)
    }

    useEffect(() => {
        if (!isFetching && departmentData) {
            const from = (page - 1) * Number(rowsPerPage) + 1
            setFrom(from)

            const to = Math.min(page * Number(rowsPerPage), totalRecords)
            setTo(to)
        }
    }, [isFetching, departmentData, page, rowsPerPage])

    useEffect(() => {
        refetch()
    }, [keyword])

    const handleDeleteClick = async (id: number) => {
        setOpenDialog(true)
        setSelectedRow(id)
    }

    const handleDeleteDepartment = async () => {
        if (selectedRow) {
            await deleteDepartment(selectedRow)
            if (isSelected(selectedRow)) {
                setSelected(prev => prev.filter(item => item !== selectedRow))
            }
            setOpenDialog(false)
            setSelectedRow(null)
        }
    }

    const handleDeleteManyDepartment = async () => {
        if (selected.length > 0) {
            await deleteManyDepartments(selected)
            setIsChangeMany(false)
            setSelected([])
            setOpenDialog(false)
        }
    }

    useEffect(() => {
        if (isSuccessDelete || isSuccessDeleteMany) {
            refetch()
        }
    }, [isSuccessDelete, isSuccessDeleteMany])

    const handleDeleteManyClick = async () => {
        setIsChangeMany(true)
        setOpenDialog(true)
    }

    const [isOpen, setIsOpen] = useState(false)
    const handleOpenCreateDialog = () => {
        setIsOpen(true)
    }
    const handleCloseCreateDialog = () => {
        setIsOpen(false)
        setDialog()
        setSelectedRow(null)
        setIsSubmit(false)
    }

    useEffect(() => {
        if (isSuccessDelete) {
            refetch()
        }
    }, [isSuccessDelete])

    const handleSort = (property: string) => {
        setOrderBy(property)
        setOrder(order === 'asc' ? 'desc' : 'asc')
    }

    const countRows = selected.length

    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <DepartmentInfo />
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
                            id='department-search'
                            type='search'
                            placeholder={t('COMMON.SYS_CONFIGURATION.PLACEHOLDER_SEARCH')}
                            variant='outlined'
                            value={keyword}
                            onChange={e => setKeyword(e.target.value)}
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
                            onKeyDown={e => {
                                if (e.key === 'Enter') {
                                    e.preventDefault()
                                    handleSearchKeyword()
                                }
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <IconButton
                                            onClick={handleSearchKeyword}
                                            sx={{
                                                backgroundColor: 'var(--button-color)',
                                                borderRadius: '0 8px 8px 0',
                                                padding: '10.5px',
                                                '&:hover': {
                                                    backgroundColor: 'var(--hover-button-color)'
                                                }
                                            }}
                                        >
                                            <SearchIcon sx={{ color: 'white' }} />
                                        </IconButton>
                                    </InputAdornment>
                                )
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
                            onClick={() => handleOpenCreateDialog()}
                        >
                            {t('COMMON.BUTTON.CREATE')}
                        </Button>
                    </Box>
                </Box>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: 'var(--header-color-table)' }}>
                                <TableCell
                                    padding='checkbox'
                                    sx={{ borderColor: 'var(--border-color)', paddingLeft: '8.5px' }}
                                >
                                    <Checkbox
                                        indeterminate={selected.length > 0 && selected.length < departmentData.length}
                                        checked={
                                            departmentData && selected.length > 0
                                                ? selected.length === departmentData.length
                                                : false
                                        }
                                        onChange={handleSelectAllClick}
                                        sx={{
                                            color: 'var(--text-color)'
                                        }}
                                    />
                                </TableCell>
                                <TableCell
                                    sx={{ borderColor: 'var(--border-color)', minWidth: '49px', maxWidth: '60px' }}
                                >
                                    <TableSortLabel
                                        active={'Id' === orderBy}
                                        direction={orderBy === 'Id' ? order : 'asc'}
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
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap'
                                            }}
                                        >
                                            ID
                                        </Typography>
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell
                                    sx={{ borderColor: 'var(--border-color)', minWidth: '49px', maxWidth: '60px' }}
                                >
                                    <TableSortLabel
                                        active={orderBy === 'Name'}
                                        direction={orderBy === 'Name' ? order : 'asc'}
                                        onClick={() => handleSort('Name')}
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
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap'
                                            }}
                                        >
                                            {t('COMMON.DEPARTMENT.NAME')}
                                        </Typography>
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        sx={{
                                            fontWeight: 'bold',
                                            color: 'var(--text-color)',
                                            fontSize: '16px',
                                            overflow: 'hidden',
                                            maxWidth: '300px',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        }}
                                    >
                                        {t('COMMON.DEPARTMENT.HEAD')}
                                    </Typography>
                                </TableCell>
                                <TableCell>
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
                                        {t('COMMON.DEPARTMENT.ACTION')}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {departmentData?.map(row => (
                                <TableRow key={row.Id} selected={isSelected(row.Id)}>
                                    <TableCell padding='checkbox'>
                                        <Checkbox
                                            checked={isSelected(row.Id)}
                                            onChange={() => handleCheckboxClick(row.Id)}
                                        />
                                    </TableCell>
                                    <TableCell>{row.Id}</TableCell>
                                    <TableCell>{row.Name}</TableCell>
                                    <TableCell>{row.DepartmentHeadName}</TableCell>
                                    <TableCell>
                                        <Box
                                            display='flex'
                                            alignItems='center'
                                            justifyContent='space-between'
                                            gap='10px'
                                        >
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
                                                    onClick={() => handleUpdate(row)}
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
                                                    onClick={() => handleDeleteClick(row.Id)}
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
                        <Typography sx={{ mr: '10px' }}>{t('COMMON.PAGINATION.ROWS_PER_PAGE')}</Typography>
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
                            defaultValue='5'
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
                            {[1, 2, 3, 4, 5, 10, 20, 30, 40].map(value => (
                                <MenuItem key={value} value={value}>
                                    {value}
                                </MenuItem>
                            ))}
                        </Select>
                        <Typography sx={{ ml: '30px' }}>
                            {t('COMMON.PAGINATION.FROM_TO', { from, to, totalRecords })}
                        </Typography>
                    </Box>
                    <Pagination
                        count={Math.ceil(totalRecords / Number(rowsPerPage))}
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
                onConfirm={() => (isChangeMany ? handleDeleteManyDepartment() : handleDeleteDepartment())}
            />

            {isOpen && (
                <Box
                    sx={{
                        position: 'fixed',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyItems: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 1000
                    }}
                >
                    <Box
                        sx={{
                            width: '500px',
                            backgroundColor: 'white',
                            borderRadius: '12px',
                            boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                            overflow: 'hidden',
                            margin: 'auto'
                        }}
                    >
                        <Box
                            sx={{
                                padding: '16px 24px',
                                borderBottom: '1px solid var(--border-color)',
                                fontSize: '24px',
                                fontWeight: 'bold',
                                backgroundColor: 'var(--background-color)'
                            }}
                        >
                            {t('COMMON.DEPARTMENT.TITLE')}
                        </Box>
                        <Box
                            sx={{
                                padding: '24px',
                                backgroundColor: 'var(--background-color)',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '20px'
                            }}
                        >
                            <Box>
                                <TextField
                                    variant='outlined'
                                    label={t('COMMON.DEPARTMENT.NAME')}
                                    name='name'
                                    fullWidth
                                    {...(isSubmit && name === '' && { error: true })}
                                    sx={{
                                        color: 'var(--text-color)',
                                        '& fieldset': {
                                            borderRadius: '8px',
                                            color: 'var(--text-color)',
                                            borderColor: 'var(--border-color)'
                                        },
                                        '& .MuiInputBase-root': { paddingRight: '0px' },
                                        '& .MuiInputBase-input': {
                                            color: 'var(--text-color)',
                                            fontSize: '16px'
                                        },
                                        '& .MuiOutlinedInput-root:hover fieldset': {
                                            borderColor: 'var(--hover-color)'
                                        },
                                        '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                                            borderColor: 'var(--selected-color)'
                                        },
                                        '& .MuiInputLabel-root': {
                                            color: 'var(--text-label-color)'
                                        },
                                        '& .MuiInputLabel-root.Mui-focused': {
                                            color: 'var(--selected-color)'
                                        }
                                    }}
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                                <Typography
                                    sx={{
                                        color: 'red',
                                        margin: '1px 0 0 10px',
                                        fontSize: '12px',
                                        visibility: isSubmit && name === '' ? 'visible' : 'hidden'
                                    }}
                                >
                                    {t('COMMON.TEXTFIELD.REQUIRED')}
                                </Typography>
                            </Box>
                            <Box>
                                <TextField
                                    variant='outlined'
                                    label={t('COMMON.DEPARTMENT.HEAD')}
                                    fullWidth
                                    value={departmentHeadId || ''}
                                    onChange={e => setDepartmentHeadId(e.target.value)}
                                    sx={{
                                        color: 'var(--text-color)',
                                        '& fieldset': {
                                            borderRadius: '8px',
                                            color: 'var(--text-color)',
                                            borderColor: 'var(--border-color)'
                                        },
                                        '& .MuiInputBase-root': { paddingRight: '0px' },
                                        '& .MuiInputBase-input': {
                                            color: 'var(--text-color)',
                                            fontSize: '16px'
                                        },
                                        '& .MuiOutlinedInput-root:hover fieldset': {
                                            borderColor: 'var(--hover-color)'
                                        },
                                        '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                                            borderColor: 'var(--selected-color)'
                                        },
                                        '& .MuiInputLabel-root': {
                                            color: 'var(--text-label-color)'
                                        },
                                        '& .MuiInputLabel-root.Mui-focused': {
                                            color: 'var(--selected-color)'
                                        }
                                    }}
                                />
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                padding: '16px 24px',
                                borderTop: '2px solid var(--border-color)',
                                display: 'flex',
                                justifyContent: 'flex-end',
                                gap: '12px',
                                backgroundColor: 'var(--background-color)'
                            }}
                        >
                            <Button
                                variant='contained'
                                onClick={handleSave}
                                sx={{
                                    height: '44px',
                                    backgroundColor: 'var(--button-color)',
                                    padding: '0px 24px',
                                    '&:hover': {
                                        backgroundColor: 'var(--hover-button-color)'
                                    },
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    textTransform: 'none'
                                }}
                            >
                                {t('COMMON.BUTTON.SAVE')}
                            </Button>

                            <Button
                                variant='contained'
                                onClick={handleCloseCreateDialog}
                                sx={{
                                    height: '44px',
                                    backgroundColor: 'var(--button-color)',
                                    padding: '0px 24px',
                                    '&:hover': {
                                        backgroundColor: 'var(--hover-button-color)'
                                    },
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    textTransform: 'none'
                                }}
                            >
                                {t('COMMON.BUTTON.CANCEL')}
                            </Button>
                        </Box>
                    </Box>
                </Box>
            )}
        </Box>
    )
}

export default DepartmentPage
