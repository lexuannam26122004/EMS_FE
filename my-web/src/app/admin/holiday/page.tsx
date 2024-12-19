'use client'
import { IHolidayGetAll } from '@/models/Holiday'
import {
    useGetAllHolidayQuery,
    useDeleteHolidayMutation,
    useUpdateHolidayMutation,
    useCreateHolidayMutation,
    useDeleteManyHolidayMutation
} from '@/services/HolidayService'
import { IFilterSysConfiguration } from '@/models/SysConfiguration'
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
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import SearchIcon from '@mui/icons-material/Search'
import { CirclePlus, EyeIcon, Pencil, Trash2 } from 'lucide-react'
import AlertDialog from '@/components/AlertDialog'
import { userSentNotificationId } from '@/utils/globalVariables'
import { useRouter } from 'next/navigation'
import { useCreateNotificationMutation } from '@/services/NotificationsService'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'

function HolidayPage() {
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
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [note, setNote] = useState('')
    const [filter, setFilter] = useState<IFilterSysConfiguration>({
        pageSize: 10,
        pageNumber: 1
    })

    const { data: responseData, isFetching, refetch } = useGetAllHolidayQuery(filter)
    const [deleteHoliday, { isSuccess: isSuccessDelete }] = useDeleteHolidayMutation()
    const [createHoliday, { isSuccess, isLoading, isError }] = useCreateHolidayMutation()
    const [updateHoliday] = useUpdateHolidayMutation()
    const [
        deleteManyHoliday,
        { isError: isErrorDeleteMany, isSuccess: isSuccessDeleteMany, isLoading: isLoadingDeleteMany }
    ] = useDeleteManyHolidayMutation()
    const [createNotification, { isError: isErrorCreate, isLoading: isLoadingNotify, isSuccess: isSuccessCreate }] =
        useCreateNotificationMutation()

    const holidayData = responseData?.Data.Records as IHolidayGetAll[]
    const totalRecords = responseData?.Data.TotalRecords as number

    const isSelected = (id: number) => selected.includes(id)

    const handleCheckboxClick = (id: number) => {
        setSelected(prev => (prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]))
    }

    const handleSave = async () => {
        setIsSubmit(true)
        if (name === '' || startDate === '' || endDate === '' || new Date(endDate) < new Date(startDate)) {
            alert('Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu.')
            return
        }

        try {
            const StartDate = new Date(startDate)
            const EndDate = new Date(endDate)
            const formattedStartDate = StartDate.toLocaleDateString() // Định dạng ngày
            const formattedEndDate = EndDate.toLocaleDateString() // Định dạng ngày
            const Note =
                StartDate > EndDate
                    ? String(note) +
                      ' ' +
                      t('COMMON.HOLIDAY.FROM') +
                      formattedStartDate +
                      ' ' +
                      t('COMMON.HOLIDAY.TO') +
                      formattedEndDate
                    : String(note) + ' ' + t('COMMON.HOLIDAY.LEAVE') + formattedStartDate

            if (selectedRow) {
                await updateHoliday({
                    Id: selectedRow, // ID của bản ghi cần cập nhật
                    Name: name,
                    StartDate: StartDate,
                    EndDate: EndDate,
                    Note: note || ''
                }).unwrap() // unwrap để xử lý lỗi nếu có
            } else {
                // Nếu không có selectedRow, tức là đang tạo mới
                await createHoliday({
                    Name: name,
                    StartDate: StartDate,
                    EndDate: EndDate,
                    Note: note || ''
                }).unwrap()
                const data = {
                    Type: 'Holiday',
                    Content: Note,
                    Title: name,
                    ListUser: [],
                    ListFile: [],
                    UserId: userSentNotificationId,
                    ListDept: [],
                    ListRole: [],
                    TypeToNotify: 1
                }

                await createNotification(data).unwrap()
            }

            handleCloseCreateDialog()
            setDialog()
            setSelectedRow(null) // Reset selectedRow
            setIsSubmit(false)
        } catch (error) {
            console.error('Failed to save holiday:', error)
        }
    }

    const setDialog = () => {
        setName('')
        setStartDate('')
        setEndDate('')
        setNote('')
    }

    useEffect(() => {
        if (isSuccess) {
            refetch() // Gọi lại dữ liệu sau khi tạo hoặc cập nhật thành công
        }
    }, [isSuccess])

    const handleUpdate = async (holiday: IHolidayGetAll) => {
        const startDate = typeof holiday.StartDate === 'string' ? new Date(holiday.StartDate) : holiday.StartDate
        const endDate = typeof holiday.EndDate === 'string' ? new Date(holiday.EndDate) : holiday.EndDate
        setName(holiday.Name)
        setStartDate(startDate.toISOString().split('T')[0]) // Chuyển đổi sang định dạng YYYY-MM-DD
        setEndDate(endDate.toISOString().split('T')[0]) // Chuyển đổi sang định dạng YYYY-MM-DD
        setNote(holiday.Note || '') // Ghi chú có thể null
        setSelectedRow(holiday.Id) // Lưu ID của bản ghi đang chỉnh sửa
        setIsOpen(true) // Mở dialog
    }

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setSelected(holidayData.map(row => row.Id))
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
        const newRowsPerPage = event.target.value as string
        setRowsPerPage(newRowsPerPage)
        setPage(1)
        setFilter(prev => ({
            ...prev,
            pageSize: Number(newRowsPerPage),
            pageNumber: 1
        }))
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

    useEffect(() => {
        if (!isFetching && responseData?.Data) {
            const from = (page - 1) * Number(rowsPerPage) + 1
            setFrom(from)

            const to = Math.min(page * Number(rowsPerPage), totalRecords)
            setTo(to)
        }
    }, [isFetching, responseData, page, rowsPerPage]) // Thêm filter vào dependencies

    useEffect(() => {
        refetch()
    }, [filter])

    const handleDeleteClick = async (id: number) => {
        setOpenDialog(true)
        setSelectedRow(id)
    }

    const handleDeleteHoliday = async () => {
        if (selectedRow) {
            await deleteHoliday(selectedRow)
            if (isSelected(selectedRow)) {
                setSelected(prev => prev.filter(item => item !== selectedRow))
            }
            setOpenDialog(false)
            setSelectedRow(null)
        }
    }

    const handleDeleteManyHoliday = async () => {
        if (selected.length > 0) {
            await deleteManyHoliday(selected)
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

    const countRows = selected.length

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
                            id='location-search'
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
                                        indeterminate={selected.length > 0 && selected.length < holidayData.length}
                                        checked={
                                            holidayData && selected.length > 0
                                                ? selected.length === holidayData.length
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
                                            {t('COMMON.HOLIDAY.NAME')}
                                        </Typography>
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={orderBy === 'StartDate'}
                                        direction={orderBy === 'StartDate' ? order : 'asc'}
                                        onClick={() => handleSort('StartDate')}
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
                                            {t('COMMON.HOLIDAY.START_DATE')}
                                        </Typography>
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={orderBy === 'EndDate'}
                                        direction={orderBy === 'EndDate' ? order : 'asc'}
                                        onClick={() => handleSort('EndDate')}
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
                                            {t('COMMON.HOLIDAY.END_DATE')}
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
                                        {t('COMMON.HOLIDAY.NOTE')}
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
                                        {t('COMMON.HOLIDAY.ACTION')}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {holidayData?.map(row => (
                                <TableRow key={row.Id} selected={isSelected(row.Id)}>
                                    <TableCell padding='checkbox'>
                                        <Checkbox
                                            checked={isSelected(row.Id)}
                                            onChange={() => handleCheckboxClick(row.Id)}
                                        />
                                    </TableCell>
                                    <TableCell>{row.Id}</TableCell>
                                    <TableCell>{row.Name}</TableCell>
                                    <TableCell>{formatDate(row.StartDate.toString())}</TableCell>
                                    <TableCell>{formatDate(row.EndDate.toString())}</TableCell>
                                    <TableCell
                                        sx={{
                                            color: 'var(--text-color)',
                                            fontSize: '16px',
                                            overflow: 'hidden',
                                            maxWidth: '300px',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        }}
                                    >
                                        {row.Note}
                                    </TableCell>
                                    <TableCell>
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
                onConfirm={() => (isChangeMany ? handleDeleteManyHoliday() : handleDeleteHoliday())}
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
                        zIndex: 1000,
                        height: '100vh'
                    }}
                >
                    {/* <DateRangePicker>
                        
                    </DateRangePicker> */}
                    <Box //box nội dung
                        sx={{
                            width: '500px',
                            backgroundColor: 'white',
                            borderRadius: '12px',
                            boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                            overflow: 'hidden', //ẩn nội dung khi bị tràn
                            margin: 'auto'
                        }}
                    >
                        <Box //header
                            sx={{
                                padding: '16px 24px',
                                borderBottom: '1px solid var(--border-color)',
                                fontSize: '24px',
                                fontWeight: 'bold',
                                backgroundColor: 'var(--background-color)' //màu nền
                            }}
                        >
                            {t('COMMON.HOLIDAY.TITLE')}
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
                            {/* Name Field - Required */}
                            <Box>
                                <TextField
                                    variant='outlined'
                                    label={t('COMMON.HOLIDAY.ACTION_HOLIDAY.NAME')}
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
                                    label={t('COMMON.HOLIDAY.ACTION_HOLIDAY.START_DATE')}
                                    fullWidth
                                    type='date'
                                    InputLabelProps={{ shrink: true }}
                                    {...(isSubmit && startDate === '' && { error: true })}
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
                                    value={startDate}
                                    onChange={e => setStartDate(e.target.value)}
                                />
                                <Typography
                                    sx={{
                                        color: 'red',
                                        margin: '1px 0 0 10px',
                                        fontSize: '12px',
                                        visibility: isSubmit && startDate === '' ? 'visible' : 'hidden'
                                    }}
                                >
                                    {t('COMMON.TEXTFIELD.REQUIRED')}
                                </Typography>
                            </Box>
                            <Box>
                                <TextField
                                    variant='outlined'
                                    label={t('COMMON.HOLIDAY.ACTION_HOLIDAY.END_DATE')}
                                    fullWidth
                                    type='date'
                                    InputLabelProps={{ shrink: true }}
                                    {...(isSubmit && endDate === '' && { error: true })}
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
                                    value={endDate}
                                    onChange={e => setEndDate(e.target.value)}
                                />
                                <Typography
                                    sx={{
                                        color: 'red',
                                        margin: '1px 0 0 10px',
                                        fontSize: '12px',
                                        visibility: isSubmit && endDate === '' ? 'visible' : 'hidden'
                                    }}
                                >
                                    {t('COMMON.TEXTFIELD.REQUIRED')}
                                </Typography>
                            </Box>
                            <TextField
                                variant='outlined'
                                label={t('COMMON.HOLIDAY.NOTE')}
                                id='fullWidth'
                                fullWidth
                                multiline
                                minRows={4}
                                maxRows={12}
                                sx={{
                                    mt: '7px',
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
                                value={note}
                                onChange={e => setNote(e.target.value)}
                            />
                        </Box>
                        <Box
                            sx={{
                                //footer
                                padding: '16px 24px',
                                borderTop: '2px solid var(--border-color)',
                                display: 'flex',
                                justifyContent: 'flex-end',
                                gap: '12px',
                                backgroundColor: 'var(--background-color)'
                            }}
                        >
                            <Button //nút lưu
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
                                Lưu
                            </Button>

                            <Button //nút hủy
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
                                Hủy
                            </Button>
                        </Box>
                    </Box>
                </Box>
            )}
        </Box>
    )
}

export default HolidayPage
