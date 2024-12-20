'use client'
import AlertDialog from '@/components/AlertDialog'
import { ISalaryGetAll } from '@/models/Salary'
import { IFilterSysConfiguration } from '@/models/SysConfiguration'
import { useGetAllSalariesQuery } from '@/services/SalaryService'
import { formatDate } from '@/utils/formatDate'
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
import { CirclePlus, EyeIcon, Pencil, SearchIcon, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

function GetAllSalaryPage(period: string) {
    const { t } = useTranslation('common')
    const [selected, setSelected] = useState<string[]>([])
    const [page, setPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState('10')
    const [from, setFrom] = useState(1)
    const [to, setTo] = useState(10)
    const [keyword, setKeyword] = useState('')
    const [isChangeMany, setIsChangeMany] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)
    const [selectedRow, setSelectedRow] = useState<string | null>(null)
    const [order, setOrder] = useState<'asc' | 'desc'>('asc')
    const [orderBy, setOrderBy] = useState<string>('')
    const [filter, setFilter] = useState<IFilterSysConfiguration>({
        pageSize: 10,
        pageNumber: 1
    })

    const { data: responseData, isFetching, refetch } = useGetAllSalariesQuery({filter, period})

    const salaryData = responseData?.Data as ISalaryGetAll[]
    const totalRecords = responseData?.Data.TotalRecords as number

    const isSelected = (id: string) => selected.includes(id)

    const handleCheckboxClick = (id: string) => {
        setSelected(prev => (prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]))
    }

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setSelected(salaryData.map(row => row.Id))
        } else {
            setSelected([])
        }
    }

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

    const handleSearchKeyword = () => {
        setPage(1)
        setFilter(prev => {
            return {
                ...prev,
                keyword: keyword,
                pageNumber: 1
            }
        })
    }

    // useEffect(() => {
    //     if (!isFetching && responseData?.Data) {
    //         const from = (page - 1) * Number(rowsPerPage) + Math.min(1, salaryData.length)
    //         setFrom(from)

    //         const to = Math.min(salaryData.length + (page - 1) * Number(rowsPerPage), totalRecords)
    //         setTo(to)
    //     }
    // }, [isFetching, responseData, page, rowsPerPage])

    useEffect(() => {
        refetch()
    }, [filter])

    const handleSort = (property: string) => {
        setFilter(prev => ({
            ...prev,
            sortBy: property,
            isDescending: orderBy === property && order === 'asc' ? true : false
        }))
        if (orderBy === property) {
            setOrder(order === 'asc' ? 'desc' : 'asc')
        } else {
            setOrder('asc')
        }
        setOrderBy(property)
    }

    const handleDeleteManySysConfiguration = () => {}

    const handleDeleteSysConfiguration = () => {}

    const countRows = selected.length

    return (
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                height: '80vh',
                overflow: 'hidden',
                gap: '10px'
            }}
        >
            <Box
                sx={{
                    width: 'calc(100% / 5)',
                    scrollbarGutter: 'stable',
                    overflow: 'auto',
                    backgroundColor: 'var(--background-color)',
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
                <Typography style={{ fontWeight: 'bold', fontSize: '20px', color: 'green' }}>cycle</Typography>
                hello
            </Box>
            <Box
                sx={{
                    width: 'calc(100% / 5 * 4)',
                    height: '100%',
                    overflow: 'auto',
                    scrollbarGutter: 'stable',

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
                <Paper
                    sx={{
                        width: '100%',
                        height: '100%',
                        overflow: 'hidden',
                        borderRadius: '6px',
                        backgroundColor: 'var(--background-color)'
                    }}
                >
                    <Box display='flex' alignItems='center' justifyContent='space-between' margin='20px'>
                        <Box sx={{ position: 'relative', width: '100%' }}>
                            <TextField
                                id='location-search'
                                type='search'
                                placeholder={t('COMMON.SYS_CONFIGURATION.PLACEHOLDER_SEARCH')}
                                variant='outlined'
                                required
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
                                                    onClick={handleSearchKeyword}
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
                                //onClick={() => handleDeleteManyClick()}
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
                                //onClick={() => router.push('/admin/configuration/create-configuration')}
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
                                            indeterminate={selected.length > 0 && selected.length < salaryData.length}
                                            checked={
                                                salaryData && selected.length > 0
                                                    ? selected.length === salaryData.length
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
                                    <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                        <TableSortLabel
                                            active={'FullName' === orderBy}
                                            direction={orderBy === 'FullName' ? order : 'asc'}
                                            onClick={() => handleSort('FullName')}
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
                                                {t('COMMON.SALARY.NAME')}
                                            </Typography>
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                        <TableSortLabel
                                            active={'UserId' === orderBy}
                                            direction={orderBy === 'UserId' ? order : 'asc'}
                                            onClick={() => handleSort('UserId')}
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
                                                    maxWidth: '280px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                {t('COMMON.SALARY.EMPLOYEE_ID')}
                                            </Typography>
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                        <TableSortLabel
                                            active={'Date' === orderBy}
                                            direction={orderBy === 'Date' ? order : 'asc'}
                                            onClick={() => handleSort('Date')}
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
                                                    maxWidth: '280px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                {t('COMMON.SALARY.DATE')}
                                            </Typography>
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                        <TableSortLabel
                                            active={'BasicSalary' === orderBy}
                                            direction={orderBy === 'BasicSalary' ? order : 'asc'}
                                            onClick={() => handleSort('BasicSalary')}
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
                                                {t('COMMON.SALARY.BASIC_SALARY')}
                                            </Typography>
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                        <TableSortLabel
                                            active={'Timekeeping' === orderBy}
                                            direction={orderBy === 'Timekeeping' ? order : 'asc'}
                                            onClick={() => handleSort('Timekeeping')}
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
                                                {t('COMMON.SALARY.TIME_KEEPING')}
                                            </Typography>
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                        <TableSortLabel
                                            active={'Insurance' === orderBy}
                                            direction={orderBy === 'Insurance' ? order : 'asc'}
                                            onClick={() => handleSort('Insurance')}
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
                                                    maxWidth: '280px',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                {t('COMMON.SALARY.INSURANCE')}
                                            </Typography>
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                        <TableSortLabel
                                            active={'Benefit' === orderBy}
                                            direction={orderBy === 'Benefit' ? order : 'asc'}
                                            onClick={() => handleSort('Benefit')}
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
                                                    maxWidth: '280px',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                {t('COMMON.SALARY.BENEFIT')}
                                            </Typography>
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                        <TableSortLabel
                                            active={'Reward' === orderBy}
                                            direction={orderBy === 'Reward' ? order : 'asc'}
                                            onClick={() => handleSort('Reward')}
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
                                                    maxWidth: '280px',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                {t('COMMON.SALARY.REWARD')}
                                            </Typography>
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                        <TableSortLabel
                                            active={'Discipline' === orderBy}
                                            direction={orderBy === 'Discipline' ? order : 'asc'}
                                            onClick={() => handleSort('Discipline')}
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
                                                    maxWidth: '280px',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                {t('COMMON.SALARY.DISCIPLINE')}
                                            </Typography>
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                        <TableSortLabel
                                            active={'PITax' === orderBy}
                                            direction={orderBy === 'PITax' ? order : 'asc'}
                                            onClick={() => handleSort('PITax')}
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
                                                    maxWidth: '280px',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                {t('COMMON.SALARY.PI_TAX')}
                                            </Typography>
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                        <TableSortLabel
                                            active={'TotalSalary' === orderBy}
                                            direction={orderBy === 'TotalSalary' ? order : 'asc'}
                                            onClick={() => handleSort('TotalSalary')}
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
                                                    maxWidth: '280px',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                {t('COMMON.SALARY.TOTAL_SALARY')}
                                            </Typography>
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                        <TableSortLabel
                                            active={'PayrollPeriod' === orderBy}
                                            direction={orderBy === 'PayrollPeriod' ? order : 'asc'}
                                            onClick={() => handleSort('PayrollPeriod')}
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
                                                    maxWidth: '280px',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                {t('COMMON.SALARY.PAYROLL_PERIOD')}
                                            </Typography>
                                        </TableSortLabel>
                                    </TableCell>

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
                                {salaryData &&
                                    salaryData.map(row => (
                                        <TableRow key={row.Id} selected={isSelected(row.Id)}>
                                            <TableCell
                                                padding='checkbox'
                                                sx={{ borderColor: 'var(--border-color)', paddingLeft: '8.5px' }}
                                            >
                                                <Checkbox
                                                    checked={isSelected(row.Id)}
                                                    onChange={() => handleCheckboxClick(row.Id)}
                                                    sx={{
                                                        color: 'var(--text-color)'
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    minWidth: '49px',
                                                    maxWidth: '100px',
                                                    borderColor: 'var(--border-color)'
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        color: 'var(--text-color)',
                                                        fontSize: '16px',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        whiteSpace: 'nowrap'
                                                    }}
                                                >
                                                    {row.Id}
                                                </Typography>
                                            </TableCell>
                                            <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                                <Typography
                                                    sx={{
                                                        color: 'var(--text-color)',
                                                        fontSize: '16px',
                                                        maxWidth: '280px',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        whiteSpace: 'nowrap'
                                                    }}
                                                >
                                                    {row.FullName}
                                                </Typography>
                                            </TableCell>
                                            <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                                <Typography
                                                    sx={{
                                                        color: 'var(--text-color)',
                                                        fontSize: '16px',
                                                        maxWidth: '280px',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        whiteSpace: 'nowrap'
                                                    }}
                                                >
                                                    {row.UserId}
                                                </Typography>
                                            </TableCell>
                                            <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                                <Typography
                                                    sx={{
                                                        color: 'var(--text-color)',
                                                        fontSize: '16px',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        whiteSpace: 'nowrap'
                                                    }}
                                                >
                                                    {formatDate(row.Date.toString())}
                                                </Typography>
                                            </TableCell>
                                            <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                                <Typography
                                                    sx={{
                                                        color: 'var(--text-color)',
                                                        fontSize: '16px',
                                                        overflow: 'hidden',
                                                        maxWidth: '400px',
                                                        textOverflow: 'ellipsis',
                                                        whiteSpace: 'nowrap'
                                                    }}
                                                >
                                                    {row.BasicSalary}
                                                </Typography>
                                            </TableCell>
                                            <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                                <Typography
                                                    sx={{
                                                        color: 'var(--text-color)',
                                                        fontSize: '16px',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        whiteSpace: 'nowrap'
                                                    }}
                                                >
                                                    {row.Timekeeping}
                                                </Typography>
                                            </TableCell>
                                            <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                                <Typography
                                                    sx={{
                                                        color: 'var(--text-color)',
                                                        fontSize: '16px',
                                                        overflow: 'hidden',
                                                        maxWidth: '280px',
                                                        textOverflow: 'ellipsis',
                                                        whiteSpace: 'nowrap'
                                                    }}
                                                >
                                                    {row.Insurance}
                                                </Typography>
                                            </TableCell>
                                            <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                                <Typography
                                                    sx={{
                                                        color: 'var(--text-color)',
                                                        fontSize: '16px',
                                                        overflow: 'hidden',
                                                        maxWidth: '280px',
                                                        textAlign: 'center',
                                                        textOverflow: 'ellipsis',
                                                        whiteSpace: 'nowrap'
                                                    }}
                                                >
                                                    {row.Benefit}
                                                </Typography>
                                            </TableCell>
                                            <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                                <Typography
                                                    sx={{
                                                        color: 'var(--text-color)',
                                                        fontSize: '16px',
                                                        overflow: 'hidden',
                                                        maxWidth: '280px',
                                                        textOverflow: 'ellipsis',
                                                        whiteSpace: 'nowrap'
                                                    }}
                                                >
                                                    {row.Reward}
                                                </Typography>
                                            </TableCell>
                                            <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                                <Typography
                                                    sx={{
                                                        color: 'var(--text-color)',
                                                        fontSize: '16px',
                                                        overflow: 'hidden',
                                                        maxWidth: '280px',
                                                        textOverflow: 'ellipsis',
                                                        whiteSpace: 'nowrap'
                                                    }}
                                                >
                                                    {row.Discipline}
                                                </Typography>
                                            </TableCell>
                                            <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                                <Typography
                                                    sx={{
                                                        color: 'var(--text-color)',
                                                        fontSize: '16px',
                                                        overflow: 'hidden',
                                                        maxWidth: '280px',
                                                        textOverflow: 'ellipsis',
                                                        whiteSpace: 'nowrap'
                                                    }}
                                                >
                                                    {row.PITax}
                                                </Typography>
                                            </TableCell>
                                            <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                                <Typography
                                                    sx={{
                                                        color: 'var(--text-color)',
                                                        fontSize: '16px',
                                                        overflow: 'hidden',
                                                        maxWidth: '280px',
                                                        textOverflow: 'ellipsis',
                                                        whiteSpace: 'nowrap'
                                                    }}
                                                >
                                                    {row.TotalSalary}
                                                </Typography>
                                            </TableCell>
                                            <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                                <Typography
                                                    sx={{
                                                        color: 'var(--text-color)',
                                                        fontSize: '16px',
                                                        overflow: 'hidden',
                                                        maxWidth: '280px',
                                                        textOverflow: 'ellipsis',
                                                        whiteSpace: 'nowrap'
                                                    }}
                                                >
                                                    {row.PayrollPeriod}
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
                                                            //onClick={() => handleClickDetail(row)}
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
                </Paper>
            </Box>
            <AlertDialog
                title={t('COMMON.ALERT_DIALOG.CONFIRM_DELETE.TITLE')}
                content={t('COMMON.ALERT_DIALOG.CONFIRM_DELETE.CONTENT')}
                type='warning'
                open={openDialog}
                setOpen={setOpenDialog}
                buttonCancel={t('COMMON.ALERT_DIALOG.CONFIRM_DELETE.CANCEL')}
                buttonConfirm={t('COMMON.ALERT_DIALOG.CONFIRM_DELETE.DELETE')}
                onConfirm={() => (isChangeMany ? handleDeleteManySysConfiguration() : handleDeleteSysConfiguration())}
            />
        </Box>
    )
}

export default GetAllSalaryPage
