'use client'
import { IFilterEmploymentContract } from '@/models/EmploymentContract'
import ChartCount from './ChartCount'
import ChartEvent from './ChartEvent'
import ListEvent from './ListEvent'
import {
    Box,
    Select,
    Pagination,
    Typography,
    MenuItem,
    SelectChangeEvent,
    Paper,
    InputLabel,
    FormControl,
    TextField,
    InputAdornment
} from '@mui/material'
import { useEffect, useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import SearchIcon from '@mui/icons-material/Search'
import ListNotify from './ListNotify'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { INotificationGetById } from '@/models/Notifications'
import DisplayInfo from './DisplayInfo'
import ListRead from './ListRead'

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    }
}

const responseData = {
    Data: {
        TotalRecords: 10,
        Records: [
            {
                Id: 1,
                Title: 'Thông báo hệ thống',
                Content:
                    'Báo cáo công việc của bạn bị thiếu và cần được bổ sung đầy đủ trước ngày 2024-12-10. Vui lòng kiểm tra và gửi lại thông tin chính xác để hệ thống cập nhật.',
                SentTime: '2024-12-01T08:00:00.000',
                Type: 'Discipline',
                UserId: 'U001',
                FullName: 'Nguyen Van A',
                AvatarPath: null
            },
            {
                Id: 2,
                Title: 'Cập nhật thông tin',
                Content:
                    'Hệ thống yêu cầu bạn cập nhật hồ sơ cá nhân để đảm bảo thông tin đầy đủ và chính xác. Vui lòng truy cập trang cá nhân để hoàn thành các mục còn thiếu.',
                SentTime: '2024-12-01T09:00:00.000Z',
                Type: 'Public',
                UserId: 'U002',
                FullName: 'Tran Thi B',
                AvatarPath: null
            },
            {
                Id: 3,
                Title: 'Phản hồi từ quản lý',
                Content:
                    'Quản lý đã phản hồi yêu cầu của bạn về báo cáo tuần. Vui lòng bổ sung thêm chi tiết về tiến độ công việc và gửi lại trước ngày 2024-12-07.',
                SentTime: '2024-12-02T07:30:00.000Z',
                Type: 'Timekeeping',
                UserId: 'U003',
                FullName: 'Pham Van C',
                AvatarPath: '/images/workforce.png'
            },
            {
                Id: 4,
                Title: 'Thông báo bảo mật',
                Content:
                    'Chúng tôi phát hiện hoạt động đăng nhập bất thường từ một thiết bị lạ. Vui lòng đổi mật khẩu ngay để đảm bảo an toàn tài khoản của bạn.',
                SentTime: '2024-12-02T10:00:00.000Z',
                Type: 'Public',
                UserId: 'U004',
                FullName: 'Nguyen Thi D',
                AvatarPath: null
            },
            {
                Id: 5,
                Title: 'Cập nhật quy định',
                Content:
                    'Quy định mới về giờ làm việc sẽ có hiệu lực từ ngày 2024-12-15. Vui lòng đọc kỹ thông báo và chuẩn bị điều chỉnh lịch trình cá nhân nếu cần.',
                SentTime: '2024-12-03T08:45:00.000Z',
                Type: 'Public',
                UserId: 'U005',
                FullName: 'Le Van E',
                AvatarPath: '/images/avatar5.jpg'
            },
            {
                Id: 6,
                Title: 'Nhắc nhở công việc',
                Content:
                    'Hạn chót nộp báo cáo tháng 12 là ngày 2024-12-05. Hãy đảm bảo báo cáo được hoàn thành đúng thời hạn để tránh ảnh hưởng đến kết quả đánh giá.',
                SentTime: '2024-12-04T09:00:00.000Z',
                Type: 'Timekeeping',
                UserId: 'U006',
                FullName: 'Tran Van F',
                AvatarPath: '/images/workforce.png'
            },
            {
                Id: 7,
                Title: 'Thông báo sự kiện',
                Content:
                    'Bạn được mời tham dự hội thảo công nghệ tổ chức vào ngày 2024-12-12 tại phòng họp chính. Đây là cơ hội để cập nhật kiến thức và mở rộng mối quan hệ chuyên môn.',
                SentTime: '2024-12-04T11:30:00.000Z',
                Type: 'Public',
                UserId: 'U007',
                FullName: 'Pham Thi G',
                AvatarPath: null
            },
            {
                Id: 8,
                Title: 'Thông báo lương',
                Content:
                    'Lương tháng 12 đã được chuyển vào tài khoản của bạn vào ngày 2024-12-05. Vui lòng kiểm tra và thông báo nếu có bất kỳ sai sót nào.',
                SentTime: '2024-12-05T08:15:00.000Z',
                Type: 'Salary',
                UserId: 'U008',
                FullName: 'Nguyen Van H',
                AvatarPath: '/images/avatar8.jpg'
            },
            {
                Id: 9,
                Title: 'Thông báo kiểm tra',
                Content:
                    'Buổi kiểm tra định kỳ sẽ diễn ra vào ngày 2024-12-10. Vui lòng hoàn thành các mục chuẩn bị được gửi qua email để đạt kết quả tốt nhất.',
                SentTime: '2024-12-05T14:00:00.000Z',
                Type: 'Public',
                UserId: 'U009',
                FullName: 'Le Thi I',
                AvatarPath: null
            },
            {
                Id: 10,
                Title: 'Thông báo hoàn tất',
                Content:
                    'Hệ thống đã ghi nhận và xử lý phản hồi của bạn thành công. Cảm ơn bạn đã hợp tác để cải thiện quy trình làm việc.',
                SentTime: '2024-12-06T10:30:00.000Z',
                Type: 'Public',
                UserId: 'U010',
                FullName: 'Tran Van J',
                AvatarPath: '/images/workforce.png'
            }
        ]
    }
}

function ContractExpPage() {
    const { t } = useTranslation('common')
    // const router = useRouter()
    // const [selected, setSelected] = useState<number[]>([])
    const [page, setPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState('5')
    const [from] = useState(1)
    const [to] = useState(5)
    const [filter, setFilter] = useState<IFilterEmploymentContract>({
        pageSize: 5,
        pageNumber: 1,
        daysUntilExpiration: 60
    })
    const [keyword, setKeyword] = useState('')
    // const [openDialog, setOpenDialog] = useState(false)
    // const [selectedRow, setSelectedRow] = useState<number | null>(null)
    // const [order, setOrder] = useState<'asc' | 'desc'>('asc')
    // const [orderBy, setOrderBy] = useState<string>('')
    // const [selectedConfig, setSelectedConfig] = useState<IGetAllSysConfiguration | null>(null)
    // const [openModal, setOpenModal] = useState(false)

    // const { data: responseD, isFetching, refetch } = useGetContractsExpiringSoonQuery(filter)

    // const handleClickDetail = (config: IGetAllSysConfiguration) => {
    //     setSelectedConfig(config)
    //     setOpenModal(true)
    // }

    useEffect(() => {
        // refetch()
    }, [filter])

    const notifyData = responseData?.Data.Records as INotificationGetById[]

    const totalRecords = (responseData?.Data.TotalRecords as number) || 0

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
    //         const from = (page - 1) * Number(rowsPerPage) + Math.min(1, notifyData.length)
    //         setFrom(from)

    //         const to = Math.min(notifyData.length + (page - 1) * Number(rowsPerPage), totalRecords)
    //         setTo(to)
    //     }
    // }, [isFetching, responseData, page, rowsPerPage])

    // useEffect(() => {
    //     refetch()
    // }, [filter])

    // const handleSort = (property: string) => {
    //     setFilter(prev => ({
    //         ...prev,
    //         sortBy: property,
    //         isDescending: orderBy === property && order === 'asc' ? true : false
    //     }))
    //     if (orderBy === property) {
    //         setOrder(order === 'asc' ? 'desc' : 'asc')
    //     } else {
    //         setOrder('asc')
    //     }
    //     setOrderBy(property)
    // }

    const [currentTab, setCurrentTab] = useState(0)

    // Lọc dữ liệu theo status
    const filteredData = useMemo(() => {
        switch (currentTab) {
            case 0: // All
                return notifyData
            case 1: // Pending
                return notifyData.filter(item => item.Type === 'Public')
            case 2: // In Progress
                return notifyData.filter(item => item.Type === 'Benefit')
            case 3: // Rejected
                return notifyData.filter(item => item.Type === 'Salary')
            case 4: // Resolved
                return notifyData.filter(item => item.Type === 'Reward')
            case 5: // Rejected
                return notifyData.filter(item => item.Type === 'Insurance')
            case 6: // Rejected
                return notifyData.filter(item => item.Type === 'Holiday')
            case 7: // Rejected
                return notifyData.filter(item => item.Type === 'Discipline')
            case 8: // Rejected
                return notifyData.filter(item => item.Type === 'Timekeeping')
            default:
                return notifyData
        }
    }, [notifyData, currentTab])

    const counts = useMemo(
        () => ({
            0: notifyData.length,
            1: notifyData.filter(item => item.Type === 'Public').length,
            2: notifyData.filter(item => item.Type === 'Benefit').length,
            3: notifyData.filter(item => item.Type === 'Salary').length,
            4: notifyData.filter(item => item.Type === 'Reward').length,
            5: notifyData.filter(item => item.Type === 'Insurance').length,
            6: notifyData.filter(item => item.Type === 'Holiday').length,
            7: notifyData.filter(item => item.Type === 'Discipline').length,
            8: notifyData.filter(item => item.Type === 'Timekeeping').length
        }),
        [notifyData]
    )

    const badgeStyle: React.CSSProperties = {
        fontSize: '12px',
        height: '24px',
        minWidth: '24px',
        borderRadius: '6px',
        padding: '0px 7px',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }

    const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null)

    // const handleClick = useCallback(
    //     (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    //         setAnchorEl(anchorEl ? null : event.currentTarget)
    //         // setSelectedNotification(notification)
    //     },
    //     [anchorEl]
    // )

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (anchorEl && !anchorEl.contains(event.target as Node)) {
                setAnchorEl(null)
                //setSelectedNotification(null)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [anchorEl])

    return (
        <Box>
            <DisplayInfo />
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    gap: '24px',
                    mt: '24px'
                }}
            >
                <Box
                    sx={{
                        width: 'calc(100% / 3 * 2 - 8px)'
                    }}
                >
                    <ChartCount />
                </Box>
                <Box
                    sx={{
                        width: 'calc(100% / 3 - 16px)',
                        height: '615px'
                    }}
                >
                    <ListRead />
                </Box>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    gap: '24px',
                    mt: '24px'
                }}
            >
                <Box
                    sx={{
                        width: 'calc(100% / 2 - 12px)',
                        height: '615px'
                    }}
                >
                    <ListEvent />
                </Box>
                <Box
                    sx={{
                        width: 'calc(100% / 2 - 12px)'
                    }}
                >
                    <ChartEvent />
                </Box>
            </Box>
            <Paper
                elevation={0}
                sx={{
                    width: '100%',
                    overflow: 'hidden',
                    borderRadius: '15px',
                    backgroundColor: 'var(--background-color-after)'
                }}
            >
                <Typography
                    sx={{
                        userSelect: 'none',
                        color: 'var(--text-color)',
                        fontWeight: 'bold',
                        fontSize: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '24px 24px 15px'
                    }}
                >
                    {t('COMMON.STAT_NOTIFY.LIST_NOTIFICATIONS')}
                </Typography>

                <Box>
                    <Tabs
                        value={currentTab}
                        onChange={(event, newValue) => setCurrentTab(newValue)}
                        aria-label='basic tabs example'
                        TabIndicatorProps={{
                            sx: {
                                background: 'linear-gradient(to right,rgb(103, 255, 164),rgb(255, 182, 127))', // Màu của thanh indicator
                                height: '2px',
                                borderRadius: '1px'
                            }
                        }}
                    >
                        <Tab
                            sx={{
                                textTransform: 'none',
                                color: 'var(--text-rejected-color1)',
                                fontWeight: '600',
                                paddingLeft: '25px',
                                paddingRight: '25px',
                                '&.Mui-selected': {
                                    color: 'var(--text-color)',
                                    fontWeight: '600'
                                }
                            }}
                            label={
                                <Box style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    {t('COMMON.ERROR_REPORT.ALL')}
                                    <Box
                                        style={{
                                            ...badgeStyle,
                                            backgroundColor:
                                                currentTab === 0 ? 'var(--bg-all-color1)' : 'var(--bg-rejected-color1)',
                                            color:
                                                currentTab === 0
                                                    ? 'var(--text-all-color1)'
                                                    : 'var(--text-rejected-color1)'
                                        }}
                                    >
                                        {counts[0]}
                                    </Box>
                                </Box>
                            }
                            {...a11yProps(0)}
                        />
                        <Tab
                            sx={{
                                textTransform: 'none',
                                color: 'var(--text-rejected-color1)',
                                fontWeight: '600',
                                '&.Mui-selected': {
                                    color: 'var(--text-color)',
                                    fontWeight: '600'
                                }
                            }}
                            label={
                                <Box style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    {t('COMMON.NOTIFICATION_TYPE.PUBLIC')}
                                    <Box
                                        style={{
                                            ...badgeStyle,
                                            backgroundColor:
                                                currentTab === 1
                                                    ? 'var(--bg-warning-color)'
                                                    : 'var(--bg-warning-color1)',
                                            color:
                                                currentTab === 1
                                                    ? 'var(--text-warning-color)'
                                                    : 'var(--text-warning-color1)'
                                        }}
                                    >
                                        {counts[1]}
                                    </Box>
                                </Box>
                            }
                            {...a11yProps(1)}
                        />
                        <Tab
                            sx={{
                                textTransform: 'none',
                                color: 'var(--text-rejected-color1)',
                                fontWeight: '600',
                                '&.Mui-selected': {
                                    color: 'var(--text-color)',
                                    fontWeight: '600'
                                }
                            }}
                            label={
                                <Box style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    {t('COMMON.NOTIFICATION_TYPE.BENEFIT')}
                                    <Box
                                        style={{
                                            ...badgeStyle,
                                            backgroundColor:
                                                currentTab === 2 ? 'var(--bg-closed-color)' : 'var(--bg-closed-color1)',
                                            color:
                                                currentTab === 2
                                                    ? 'var(--text-closed-color)'
                                                    : 'var(--text-closed-color1)'
                                        }}
                                    >
                                        {counts[2]}
                                    </Box>
                                </Box>
                            }
                            {...a11yProps(2)}
                        />
                        <Tab
                            sx={{
                                textTransform: 'none',
                                color: 'var(--text-rejected-color1)',
                                fontWeight: '600',
                                '&.Mui-selected': {
                                    color: 'var(--text-color)',
                                    fontWeight: '600'
                                }
                            }}
                            label={
                                <Box style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    {t('COMMON.NOTIFICATION_TYPE.SALARY')}
                                    <Box
                                        style={{
                                            ...badgeStyle,
                                            backgroundColor:
                                                currentTab === 3
                                                    ? 'var(--bg-success-color)'
                                                    : 'var(--bg-success-color1)',
                                            color:
                                                currentTab === 3
                                                    ? 'var(--text-success-color)'
                                                    : 'var(--text-success-color1)'
                                        }}
                                    >
                                        {counts[3]}
                                    </Box>
                                </Box>
                            }
                            {...a11yProps(3)}
                        />
                        <Tab
                            sx={{
                                textTransform: 'none',
                                color: 'var(--text-rejected-color1)',
                                fontWeight: '600',
                                '&.Mui-selected': {
                                    color: 'var(--text-color)',
                                    fontWeight: '600'
                                }
                            }}
                            label={
                                <Box style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    {t('COMMON.NOTIFICATION_TYPE.REWARD')}
                                    <Box
                                        style={{
                                            ...badgeStyle,
                                            backgroundColor:
                                                currentTab === 4 ? 'var(--bg-danger-color)' : 'var(--bg-danger-color1)',
                                            color:
                                                currentTab === 4
                                                    ? 'var(--text-danger-color)'
                                                    : 'var(--text-danger-color1)'
                                        }}
                                    >
                                        {counts[4]}
                                    </Box>
                                </Box>
                            }
                            {...a11yProps(4)}
                        />
                        <Tab
                            sx={{
                                textTransform: 'none',
                                color: 'var(--text-rejected-color1)',
                                fontWeight: '600',
                                '&.Mui-selected': {
                                    color: 'var(--text-color)',
                                    fontWeight: '600'
                                }
                            }}
                            label={
                                <Box style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    {t('COMMON.NOTIFICATION_TYPE.INSURANCE')}
                                    <Box
                                        style={{
                                            ...badgeStyle,
                                            backgroundColor:
                                                currentTab === 5
                                                    ? 'var(--bg-insurance-color)'
                                                    : 'var(--bg-insurance-color1)',
                                            color:
                                                currentTab === 5
                                                    ? 'var(--text-insurance-color)'
                                                    : 'var(--text-insurance-color1)'
                                        }}
                                    >
                                        {counts[5]}
                                    </Box>
                                </Box>
                            }
                            {...a11yProps(5)}
                        />
                        <Tab
                            sx={{
                                textTransform: 'none',
                                color: 'var(--text-rejected-color1)',
                                fontWeight: '600',
                                '&.Mui-selected': {
                                    color: 'var(--text-color)',
                                    fontWeight: '600'
                                }
                            }}
                            label={
                                <Box style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    {t('COMMON.NOTIFICATION_TYPE.HOLIDAY')}
                                    <Box
                                        style={{
                                            ...badgeStyle,
                                            backgroundColor:
                                                currentTab === 6
                                                    ? 'var(--bg-holiday-color)'
                                                    : 'var(--bg-holiday-color1)',
                                            color:
                                                currentTab === 6
                                                    ? 'var(--text-holiday-color)'
                                                    : 'var(--text-holiday-color1)'
                                        }}
                                    >
                                        {counts[6]}
                                    </Box>
                                </Box>
                            }
                            {...a11yProps(6)}
                        />
                        <Tab
                            sx={{
                                textTransform: 'none',
                                color: 'var(--text-rejected-color1)',
                                fontWeight: '600',
                                '&.Mui-selected': {
                                    color: 'var(--text-color)',
                                    fontWeight: '600'
                                }
                            }}
                            label={
                                <Box style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    {t('COMMON.NOTIFICATION_TYPE.DISCIPLINE')}
                                    <Box
                                        style={{
                                            ...badgeStyle,
                                            backgroundColor:
                                                currentTab === 7
                                                    ? 'var(--bg-discipline-color)'
                                                    : 'var(--bg-discipline-color1)',
                                            color:
                                                currentTab === 7
                                                    ? 'var(--text-discipline-color)'
                                                    : 'var(--text-discipline-color1)'
                                        }}
                                    >
                                        {counts[7]}
                                    </Box>
                                </Box>
                            }
                            {...a11yProps(7)}
                        />
                        <Tab
                            sx={{
                                textTransform: 'none',
                                color: 'var(--text-rejected-color1)',
                                fontWeight: '600',
                                '&.Mui-selected': {
                                    color: 'var(--text-color)',
                                    fontWeight: '600'
                                }
                            }}
                            label={
                                <Box style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    {t('COMMON.NOTIFICATION_TYPE.TIMEKEEPING')}
                                    <Box
                                        style={{
                                            ...badgeStyle,
                                            backgroundColor:
                                                currentTab === 8
                                                    ? 'var(--bg-attendance-color)'
                                                    : 'var(--bg-attendance-color1)',
                                            color:
                                                currentTab === 8
                                                    ? 'var(--text-attendance-color)'
                                                    : 'var(--text-attendance-color1)'
                                        }}
                                    >
                                        {counts[8]}
                                    </Box>
                                </Box>
                            }
                            {...a11yProps(8)}
                        />
                    </Tabs>
                </Box>

                <Box display='flex' alignItems='center' gap='24px' margin='20px 24px'>
                    <Box sx={{ position: 'relative', width: '45%', height: '55px' }}>
                        <TextField
                            id='location-search'
                            type='search'
                            placeholder={t('COMMON.ERROR_REPORT.SEARCH')}
                            variant='outlined'
                            required
                            value={keyword}
                            onChange={e => setKeyword(e.target.value)}
                            sx={{
                                color: 'var(--text-color)',
                                padding: '0px',
                                width: '100%',
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
                                        opacity: 1
                                    }
                                },
                                '& .MuiOutlinedInput-root:hover fieldset': {
                                    borderColor: 'var(--hover-field-color)'
                                },
                                '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                                    borderColor: 'var(--selected-field-color)'
                                }
                            }}
                            onKeyDown={() => {
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

                    <Box>
                        <FormControl
                            sx={{
                                width: '140px',
                                height: '53px',
                                '& fieldset': {
                                    borderRadius: '8px',
                                    borderColor: 'var(--border-color)' // Viền mặc định
                                },
                                '& .MuiOutlinedInput-root:hover fieldset': {
                                    borderColor: 'var(--hover-field-color)' // Màu hover khi không lỗi
                                },
                                '& .MuiOutlinedInput-root.Mui-error:hover fieldset': {
                                    borderColor: 'var(--error-color)' // Màu hover khi lỗi
                                },
                                '& .MuiOutlinedInput-root.Mui-error fieldset': {
                                    borderColor: 'var(--error-color)' // Màu viền khi lỗi
                                },
                                '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                                    borderColor: 'var(--selected-field-color)' // Màu viền khi focus
                                },
                                '& .MuiOutlinedInput-root.Mui-error.Mui-focused fieldset': {
                                    borderColor: 'var(--error-color)' // Màu viền khi lỗi và focus
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'var(--text-label-color)' // Label mặc định
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: 'var(--selected-field-color)' // Label khi focus
                                },
                                '& .MuiInputLabel-root.Mui-error': {
                                    color: 'var(--error-color)' // Label khi lỗi
                                }
                            }}
                        >
                            <InputLabel
                                sx={{
                                    color: 'var(--text-label-color)',
                                    '&.Mui-focused': {
                                        color: 'var(--selected-color)'
                                    }
                                }}
                            >
                                {t('COMMON.ERROR_REPORT.TYPE')}
                            </InputLabel>
                            <Select
                                // open={openSelectType}
                                // onClose={handleCloseSelectType}
                                // onOpen={handleOpenSelectType}
                                // value={typeNotification}
                                // onChange={handleChange}
                                label={t('COMMON.CREATE_NOTIFICATION.TYPE')}
                                autoFocus={false}
                                sx={{
                                    height: '53px',
                                    mt: '-1px',
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'var(--hover-color)' // Khi hover
                                    },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'var(--selected-color)' // Khi focus
                                    },
                                    '& fieldset': {
                                        borderRadius: '8px',
                                        borderColor: 'var(--border-color)' // Viền khi không focus
                                    },
                                    '& .MuiSelect-icon': {
                                        color: 'var(--text-color)' // Màu icon dropdown
                                    },
                                    '& .MuiInputBase-input': {
                                        color: 'var(--text-color)' // Màu text
                                    }
                                }}
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
                                <MenuItem value={'Public'}>{t('COMMON.NOTIFICATION_TYPE.PUBLIC')}</MenuItem>
                                <MenuItem value={'Benefit'}>{t('COMMON.NOTIFICATION_TYPE.BENEFIT')}</MenuItem>
                                <MenuItem value={'Salary'}>{t('COMMON.NOTIFICATION_TYPE.SALARY')}</MenuItem>
                                <MenuItem value={'Reward'}>{t('COMMON.NOTIFICATION_TYPE.REWARD')}</MenuItem>
                                <MenuItem value={'Insurance'}>{t('COMMON.NOTIFICATION_TYPE.INSURANCE')}</MenuItem>
                                <MenuItem value={'Holiday'}>{t('COMMON.NOTIFICATION_TYPE.HOLIDAY')}</MenuItem>
                                <MenuItem value={'Discipline'}>{t('COMMON.NOTIFICATION_TYPE.DISCIPLINE')}</MenuItem>
                                <MenuItem value={'Timekeeping'}>{t('COMMON.NOTIFICATION_TYPE.TIMEKEEPING')}</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Box>

                <ListNotify notifications={filteredData} totalRecords={totalRecords} />

                <Box display='flex' alignItems='center' justifyContent='space-between' padding='24px'>
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

export default ContractExpPage
