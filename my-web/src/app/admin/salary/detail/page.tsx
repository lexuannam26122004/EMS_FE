'use client'
import AlertDialog from '@/components/AlertDialog'
import { ISalaryGetAll } from '@/models/salary'
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
    TableSortLabel,
    Divider,
    LinearProgress,
    LinearProgressProps,
    FormControl,
    InputLabel
} from '@mui/material'
import {
    ArrowLeft,
    BadgeCheck,
    BadgeDollarSign,
    BadgeMinus,
    Bitcoin,
    ChevronLeft,
    CirclePlus,
    EyeIcon,
    Heart,
    LocateFixed,
    Pencil,
    SearchIcon,
    Smile,
    Trash2,
    Users
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant='determinate' {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant='body2' sx={{ color: 'var(--text-color)' }}>{`${props.value}%`}</Typography>
            </Box>
        </Box>
    )
}

function GetAllSalaryPage() {
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
    const [progress, setProgress] = useState(50)
    const periodList = [
        '01/2024',
        '02/2024',
        '03/2024',
        '04/2024',
        '05/2024',
        '06/2024',
        '07/2024',
        '08/2024',
        '09/2024',
        '10/2024',
        '11/2024'
    ]
    const [period, setPeriod] = useState(periodList[periodList.length - 1])

    const { data: responseData, isFetching, refetch } = useGetAllSalariesQuery(filter)

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

    const departmentList = [
        'Cycle 1',
        'Cycle 2',
        'Cycle 3',
        'Cycle 4',
        'Cycle 5',
        'Cycle 6',
        'Cycle 7',
        'Cycle 8',
        'Cycle 9',
        'Cycle 10'
    ]

    return (
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                gap: '10px'
            }}
        >
            <Box
                sx={{
                    width: 'calc(100% / 5 + 30px)',
                    height: '100%',
                    backgroundColor: 'var(--background-color)',
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
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        marginTop: '10px'
                    }}
                >
                    <IconButton
                        sx={{
                            marginRight: '16px',
                            '& .MuiOutlinedInput-root:hover fieldset': {
                                borderColor: 'var(--hover-field-color)'
                            },
                            '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                                borderColor: 'var(--selected-field-color)'
                            }
                        }}
                    >
                        <ChevronLeft size={24} color='var(--text-color)' />
                    </IconButton>
                    <BadgeDollarSign size={'24px'} color='var(--button-color)'></BadgeDollarSign>
                    <Typography
                        style={{ marginLeft: '10px', fontWeight: 'bold', fontSize: '20px', color: 'var(--text-color)' }}
                    >
                        Payroll 11/2024
                    </Typography>
                </Box>
                <Typography fontSize={'16px'} sx={{ marginLeft: '60px' }}>
                    Hoàn thành 01/11 - 30/11/24
                </Typography>
                <Divider
                    orientation='horizontal'
                    flexItem
                    sx={{
                        marginRight: '20px',
                        marginLeft: '20px',
                        marginTop: '15px',
                        marginBottom: '15px',
                        backgroundColor: 'var(--divider-color)'
                    }}
                />
                <Box
                    sx={{
                        marginLeft: '20px',
                        marginRight: '20px'
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: '20px',
                            color: 'var(--title-color)',

                            marginTop: '5px',
                            fontWeight: 'bold'
                        }}
                    >
                        Tổng quan về chu kì
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '15px' }}>
                        <Box
                            sx={{
                                borderRadius: '45px',
                                backgroundColor: 'green',
                                width: '50px', // Thiết lập chiều rộng
                                height: '50px', // Thiết lập chiều cao
                                display: 'flex', // Nếu bạn muốn căn giữa nội dung bên trong
                                alignItems: 'center', // Căn giữa theo chiều dọc
                                justifyContent: 'center'
                            }}
                        >
                            <LocateFixed size={'30px'}></LocateFixed>
                        </Box>
                        <Box sx={{ marginLeft: '10px' }}>
                            <Typography sx={{ fontWeight: 'bold' }}>Tổng lương gross</Typography>
                            <Typography>4000000 Đ</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '15px' }}>
                        <Box
                            sx={{
                                borderRadius: '45px',
                                backgroundColor: '#00FF00',
                                width: '50px', // Thiết lập chiều rộng
                                height: '50px', // Thiết lập chiều cao
                                display: 'flex', // Nếu bạn muốn căn giữa nội dung bên trong
                                alignItems: 'center', // Căn giữa theo chiều dọc
                                justifyContent: 'center'
                            }}
                        >
                            <BadgeCheck size={'30px'}></BadgeCheck>
                        </Box>
                        <Box sx={{ marginLeft: '10px' }}>
                            <Typography sx={{ fontWeight: 'bold' }}>Tổng thực lĩnh</Typography>
                            <Typography>2000000 Đ</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '15px' }}>
                        <Box
                            sx={{
                                borderRadius: '45px',
                                backgroundColor: '#FFCC66',
                                width: '50px', // Thiết lập chiều rộng
                                height: '50px', // Thiết lập chiều cao
                                display: 'flex', // Nếu bạn muốn căn giữa nội dung bên trong
                                alignItems: 'center', // Căn giữa theo chiều dọc
                                justifyContent: 'center'
                            }}
                        >
                            <Users size={'30px'}></Users>
                        </Box>
                        <Box sx={{ marginLeft: '10px' }}>
                            <Typography sx={{ fontWeight: 'bold' }}>Tổng nhân sự</Typography>
                            <Typography>100 Nhân sự</Typography>
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '15px' }}>
                        <Box
                            sx={{
                                borderRadius: '45px',
                                backgroundColor: '#00FFFF',
                                width: '50px', // Thiết lập chiều rộng
                                height: '50px', // Thiết lập chiều cao
                                display: 'flex', // Nếu bạn muốn căn giữa nội dung bên trong
                                alignItems: 'center', // Căn giữa theo chiều dọc
                                justifyContent: 'center'
                            }}
                        >
                            <Smile size={'30px'}></Smile>
                        </Box>
                        <Box sx={{ marginLeft: '10px' }}>
                            <Typography sx={{ fontWeight: 'bold' }}>Tổng phúc lợi được trả</Typography>
                            <Typography>300000 Đ</Typography>
                        </Box>
                    </Box>
                </Box>
                <Divider
                    orientation='horizontal'
                    flexItem
                    sx={{
                        marginRight: '20px',
                        marginLeft: '20px',
                        marginTop: '15px',
                        marginBottom: '15px',
                        backgroundColor: 'var(--divider-color)'
                    }}
                />
                <Box
                    sx={{
                        marginLeft: '20px',
                        marginRight: '20px'
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: '20px',
                            color: 'var(--title-color)',

                            marginTop: '5px',
                            fontWeight: 'bold'
                        }}
                    >
                        Tổng quan về thuế và bảo hiểm
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '15px' }}>
                        <Box
                            sx={{
                                borderRadius: '45px',
                                backgroundColor: '#FF9933',
                                width: '50px', // Thiết lập chiều rộng
                                height: '50px', // Thiết lập chiều cao
                                display: 'flex', // Nếu bạn muốn căn giữa nội dung bên trong
                                alignItems: 'center', // Căn giữa theo chiều dọc
                                justifyContent: 'center'
                            }}
                        >
                            <BadgeMinus size={'30px'}></BadgeMinus>
                        </Box>
                        <Box sx={{ marginLeft: '10px' }}>
                            <Typography sx={{ fontWeight: 'bold' }}>Tổng thuế nhân viên chi trả</Typography>
                            <Typography>300000 Đ</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '15px' }}>
                        <Box
                            sx={{
                                borderRadius: '45px',
                                backgroundColor: '#FF0033',
                                width: '50px', // Thiết lập chiều rộng
                                height: '50px', // Thiết lập chiều cao
                                display: 'flex', // Nếu bạn muốn căn giữa nội dung bên trong
                                alignItems: 'center', // Căn giữa theo chiều dọc
                                justifyContent: 'center'
                            }}
                        >
                            <Heart size={'30px'}></Heart>
                        </Box>
                        <Box sx={{ marginLeft: '10px' }}>
                            <Typography sx={{ fontWeight: 'bold' }}>Tổng bảo hiểm của nhân sự</Typography>
                            <Typography>300000 Đ</Typography>
                        </Box>
                    </Box>
                </Box>
                <Divider
                    orientation='horizontal'
                    flexItem
                    sx={{
                        marginRight: '20px',
                        marginLeft: '20px',
                        marginTop: '15px',
                        marginBottom: '15px',
                        backgroundColor: 'var(--divider-color)'
                    }}
                />
                <Box
                    sx={{
                        marginLeft: '20px',
                        marginRight: '20px'
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: '20px',
                            color: 'var(--title-color)',

                            marginTop: '5px',
                            fontWeight: 'bold'
                        }}
                    >
                        Tổng quan về thu nhập
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '15px', gap: '10px' }}>
                        <Box
                            sx={{
                                borderRadius: '45px',
                                backgroundColor: '#00CCCC',
                                width: '50px', // Thiết lập chiều rộng
                                height: '50px', // Thiết lập chiều cao
                                display: 'flex', // Nếu bạn muốn căn giữa nội dung bên trong
                                alignItems: 'center', // Căn giữa theo chiều dọc
                                justifyContent: 'center'
                            }}
                        >
                            <BadgeDollarSign size={'30px'}></BadgeDollarSign>
                        </Box>
                        <Box>
                            <Typography sx={{ fontWeight: 'bold' }}>Lương gross trung bình</Typography>
                            <Typography>300000 Đ</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '15px' }}>
                        <Box
                            sx={{
                                borderRadius: '45px',
                                backgroundColor: '#CC99FF',
                                width: '50px', // Thiết lập chiều rộng
                                height: '50px', // Thiết lập chiều cao
                                display: 'flex', // Nếu bạn muốn căn giữa nội dung bên trong
                                alignItems: 'center', // Căn giữa theo chiều dọc
                                justifyContent: 'center'
                            }}
                        >
                            <Bitcoin size={'30px'}></Bitcoin>
                        </Box>
                        <Box sx={{ marginLeft: '10px' }}>
                            <Typography sx={{ fontWeight: 'bold' }}>Lương thực lĩnh trung bình</Typography>
                            <Typography>300000 Đ</Typography>
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '15px', gap: '10px' }}>
                        <Box
                            sx={{
                                borderRadius: '45px',
                                backgroundColor: '#FF0066',
                                width: '50px', // Thiết lập chiều rộng
                                height: '50px', // Thiết lập chiều cao
                                display: 'flex', // Nếu bạn muốn căn giữa nội dung bên trong
                                alignItems: 'center', // Căn giữa theo chiều dọc
                                justifyContent: 'center'
                            }}
                        >
                            <Heart size={'30px'}></Heart>
                        </Box>
                        <Box>
                            <Typography sx={{ fontWeight: 'bold' }}>Bảo hiểm trung bình</Typography>
                            <Typography>300000 Đ</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '15px' }}>
                        <Box
                            sx={{
                                borderRadius: '45px',
                                backgroundColor: '#FF33CC',
                                width: '50px', // Thiết lập chiều rộng
                                height: '50px', // Thiết lập chiều cao
                                display: 'flex', // Nếu bạn muốn căn giữa nội dung bên trong
                                alignItems: 'center', // Căn giữa theo chiều dọc
                                justifyContent: 'center'
                            }}
                        >
                            <BadgeMinus size={'30px'}></BadgeMinus>
                        </Box>
                        <Box sx={{ marginLeft: '10px' }}>
                            <Typography sx={{ fontWeight: 'bold' }}>Thuế trung bình mỗi nhân sự</Typography>
                            <Typography>300000 Đ</Typography>
                        </Box>
                    </Box>
                </Box>
                <Divider
                    orientation='horizontal'
                    flexItem
                    sx={{
                        marginRight: '20px',
                        marginLeft: '20px',
                        marginTop: '15px',
                        marginBottom: '15px',
                        backgroundColor: 'var(--divider-color)'
                    }}
                />
                <Box
                    sx={{
                        marginLeft: '20px',
                        marginRight: '20px',
                        marginBottom: '10px'
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: '20px',
                            color: 'var(--title-color)',

                            marginTop: '5px',
                            fontWeight: 'bold'
                        }}
                    >
                        Báo cáo theo phòng ban
                    </Typography>
                    {departmentList?.map(department => (
                        <Box sx={{ marginTop: '10px' }}>
                            <Typography sx={{ fontWeight: 'bold' }}>{department}</Typography>
                            <Typography>100,000,000 đ</Typography>
                            <Box sx={{ width: '100%' }}>
                                <LinearProgressWithLabel value={progress} />
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>
            <Box
                sx={{
                    width: 'calc(100% / 5 * 4 - 30px)',
                    height: '100%'
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
                        <Box sx={{ position: 'relative', width: '100%', height: '55px' }}>
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
                                onKeyDown={e => {
                                    handleSearchKeyword()
                                }}
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
                                //onClick={() => handleDeleteManyClick()}
                            >
                                {t('COMMON.BUTTON.DELETE')}
                            </Button>

                            <FormControl
                                fullWidth
                                //error={isSubmit && departmentId === ''}
                                sx={{
                                    '& fieldset': {
                                        borderRadius: '8px',
                                        color: 'var(--text-color)',
                                        borderColor: 'var(--border-color)'
                                    },
                                    '& .MuiInputBase-root': {
                                        paddingRight: '0px'
                                    },
                                    '& .MuiInputBase-input': {
                                        paddingRight: '12px',
                                        color: 'var(--text-color)',
                                        fontSize: '16px',
                                        '&::placeholder': {
                                            color: 'var(--placeholder-color)',
                                            opacity: 1
                                        }
                                    },
                                    '& .MuiOutlinedInput-root:hover fieldset': {
                                        borderColor: 'var(--hover-field-color)'
                                    },
                                    '& .MuiOutlinedInput-root.Mui-error:hover fieldset': {
                                        borderColor: 'var(--error-color) !important' // Màu lỗi khi hover
                                    },
                                    '& .MuiOutlinedInput-root.Mui-error fieldset': {
                                        borderColor: 'var(--error-color) !important' // Màu lỗi khi hover
                                    },
                                    '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                                        borderColor: 'var(--selected-field-color)'
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: 'var(--text-label-color)'
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                        color: 'var(--selected-field-color)'
                                    },
                                    '& .MuiInputLabel-root.Mui-error': {
                                        color: 'var(--error-color)'
                                    },
                                    '& .MuiSelect-icon': {
                                        color: 'var(--error-color)'
                                        //isSubmit && departmentId === '' ? 'var(--error-color)' : 'var(--text-color)'
                                    }
                                }}
                            >
                                <InputLabel>{t('COMMON.EMPLOYEE.DEPARTMENTNAME')}</InputLabel>
                                <Select
                                    value={period}
                                    onChange={e => setPeriod(e.target.value)}
                                    label={t('COMMON.EMPLOYEE.DEPARTMENTNAME')}
                                    MenuProps={{
                                        PaperProps: {
                                            elevation: 0,
                                            sx: {
                                                backgroundImage:
                                                    'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiBmaWxsPSJ1cmwoI3BhaW50MF9yYWRpYWxfMjc0OV8xNDUxODYpIiBmaWxsLW9wYWNpdHk9IjAuMTIiLz4KPGRlZnM+CjxyYWRpYWxHcmFkaWVudCBpZD0icGFpbnQwX3JhZGlhbF8yNzQ5XzE0NTE4NiIgY3g9IjAiIGN5PSIwIiByPSIxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgxMjAgMS44MTgxMmUtMDUpIHJvdGF0ZSgtNDUpIHNjYWxlKDEyMy4yNSkiPgo8c3RvcCBzdG9wLWNvbG9yPSIjMDBCOEQ5Ii8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzAwQjhEOSIgc3RvcC1vcGFjaXR5PSIwIi8+CjwvcmFkaWFsR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+Cg==), url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiBmaWxsPSJ1cmwoI3BhaW50MF9yYWRpYWxfMjc0OV8xNDUxODcpIiBmaWxsLW9wYWNpdHk9IjAuMTIiLz4KPGRlZnM+CjxyYWRpYWxHcmFkaWVudCBpZD0icGFpbnQwX3JhZGlhbF8yNzQ5XzE0NTE4NyIgY3g9IjAiIGN5PSIwIiByPSIxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgwIDEyMCkgcm90YXRlKDEzNSkgc2NhbGUoMTIzLjI1KSI+CjxzdG9wIHN0b3AtY29sb3I9IiNGRjU2MzAiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRkY1NjMwIiBzdG9wLW9wYWNpdHk9IjAiLz4KPC9yYWRpYWxHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4K)',
                                                backgroundPosition: 'top right, bottom left',
                                                backgroundSize: '50%, 50%',
                                                backgroundRepeat: 'no-repeat',
                                                padding: '0 8px',
                                                backdropFilter: 'blur(20px)',
                                                borderRadius: '8px',
                                                backgroundColor: 'var(--background-item)',
                                                color: 'var(--text-color)',
                                                border: '1px solid var(--border-color)',
                                                '& .MuiMenuItem-root': {
                                                    borderRadius: '6px',
                                                    '&:hover': {
                                                        backgroundColor: 'var(--hover-color)'
                                                    },
                                                    '&.Mui-selected': {
                                                        backgroundColor: 'var(--selected-color)',
                                                        '&:hover': {
                                                            backgroundColor: 'var(--hover-color)'
                                                        }
                                                    }
                                                }
                                            },
                                            autoFocus: false
                                        }
                                    }}
                                >
                                    {periodList.map(dept => (
                                        <MenuItem key={dept} value={dept}>
                                            {dept}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
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
