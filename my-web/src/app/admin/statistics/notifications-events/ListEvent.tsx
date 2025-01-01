import { Box, InputLabel, Paper, Tooltip, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { SelectChangeEvent, TextField, InputAdornment, Pagination } from '@mui/material'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import SearchIcon from '@mui/icons-material/Search'
import { Eye, Star } from 'lucide-react'
import dayjs from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { IEventGetAll, IFilterEvent } from '@/models/Event'
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers'
import { toZonedTime, format } from 'date-fns-tz'
import formatDateToTime from '@/utils/formatDateToTime'

export const eventData: IEventGetAll[] = [
    {
        Id: 1,
        Title: 'New Year Celebration',
        StartDate: '2024-01-01T00:00:00',
        EndDate: '2024-01-01T23:59:59',
        IsHoliday: true,
        Description: 'Celebration of the New Year.',
        Color: '#FF5733',
        AllDay: true
    },
    {
        Id: 2,
        Title: 'Team Meeting',
        StartDate: '2024-01-05T10:00:00',
        EndDate: '2024-01-05T12:00:00',
        IsHoliday: false,
        Description: 'Monthly team meeting.',
        Color: '#33C4FF',
        AllDay: false
    },
    {
        Id: 3,
        Title: 'Company Retreat',
        StartDate: '2024-01-15T09:00:00',
        EndDate: '2024-01-16T17:00:00',
        IsHoliday: false,
        Description: 'Annual company retreat.',
        Color: '#4CAF50',
        AllDay: false
    },
    {
        Id: 4,
        Title: "Valentine's Day",
        StartDate: '2024-02-14T00:00:00',
        EndDate: '2024-02-14T23:59:59',
        IsHoliday: true,
        Description: "Celebration of Valentine's Day.",
        Color: '#FF69B4',
        AllDay: true
    },
    {
        Id: 5,
        Title: 'Project Deadline',
        StartDate: '2024-03-01T08:00:00',
        EndDate: '2024-03-01T23:59:59',
        IsHoliday: false,
        Description: 'Final deadline for project submission.',
        Color: '#FFC300',
        AllDay: false
    },
    {
        Id: 6,
        Title: 'Team Building Activity',
        StartDate: '2024-03-10T14:00:00',
        EndDate: '2024-03-10T18:00:00',
        IsHoliday: false,
        Description: 'Outdoor team-building games and activities.',
        Color: '#7D3C98',
        AllDay: false
    },
    {
        Id: 7,
        Title: 'Easter Holiday',
        StartDate: '2024-03-31T00:00:00',
        EndDate: '2024-03-31T23:59:59',
        IsHoliday: true,
        Description: 'Easter Sunday celebration.',
        Color: '#FF7F50',
        AllDay: true
    },
    {
        Id: 8,
        Title: 'Conference Presentation',
        StartDate: '2024-04-15T09:00:00',
        EndDate: '2024-04-15T11:00:00',
        IsHoliday: false,
        Description: 'Presenting at the annual tech conference.',
        Color: '#2980B9',
        AllDay: false
    },
    {
        Id: 9,
        Title: 'Labor Day',
        StartDate: '2024-05-01T00:00:00',
        EndDate: '2024-05-01T23:59:59',
        IsHoliday: true,
        Description: 'International Labor Day holiday.',
        Color: '#E74C3C',
        AllDay: true
    },
    {
        Id: 10,
        Title: 'Summer Vacation',
        StartDate: '2024-06-15T00:00:00',
        EndDate: '2024-06-20T23:59:59',
        IsHoliday: false,
        Description: 'Family summer vacation.',
        Color: '#F39C12',
        AllDay: true
    }
]

// interface IGetAll {
//     avatarPath: string
//     fullname: string
//     count: number
//     employeeID: string
//     roles: string[]
// }

const responseData = {
    Data: {
        TotalRecords: eventData.length,
        Records: eventData
    }
}

const convertToVietnamTime = (date: Date) => {
    if (isNaN(date.getTime())) {
        throw new Error('Invalid Date')
    }

    const timeZone = 'Asia/Ho_Chi_Minh'

    const vietnamTime = toZonedTime(date, timeZone)

    const formattedDate = format(vietnamTime, "yyyy-MM-dd'T'HH:mm:ss")

    return formattedDate // Trả về thời gian đã được định dạng
}

function Page() {
    const { t } = useTranslation('common')

    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()
    const [type] = useState(0)
    const [value, setValue] = useState(currentMonth)
    const [keyword, setKeyword] = useState('')
    const [filter, setFilter] = useState<IFilterEvent>({
        pageSize: 7,
        startDate: dayjs().startOf('month').format('YYYY-MM-DD HH:mm:ss'), // Đầu tháng với giờ
        endDate: dayjs().endOf('month').format('YYYY-MM-DD HH:mm:ss'), // Cuối tháng với giờ
        pageNumber: 1
    })

    const handleSearchKeyword = () => {
        console.log('Search keyword:', value)
    }

    //const notifyData = responseData?.Data.Records as IEventGetAll[]

    const totalRecords = (responseData?.Data.TotalRecords as number) || 0

    // const handleTypeChange = (event: SelectChangeEvent<number>) => {
    //     setType(event.target.value as number)
    // }

    const handleValueChange = (event: SelectChangeEvent<number>) => {
        setValue(event.target.value as number)
    }

    const [page, setPage] = useState(1)

    const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
        setPage(newPage)
        setFilter(prev => {
            return {
                ...prev,
                pageNumber: newPage
            }
        })
    }

    return (
        <Paper
            sx={{
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                display: 'flex',
                boxShadow: 'var(--box-shadow-paper)',
                flexDirection: 'column',
                borderRadius: '15px',
                backgroundColor: 'var(--background-item)'
            }}
        >
            <Typography
                variant='h5'
                sx={{
                    fontSize: '18px',
                    padding: '24px 24px 0',
                    fontWeight: 'bold',
                    color: 'var(--text-color)'
                }}
            >
                {t('COMMON.STAT_NOTIFY.READ_NOTIFY_PER_EMPLOYEE')}
            </Typography>

            <Box
                sx={{
                    mt: '24px',
                    padding: '0 24px',
                    display: 'flex',
                    gap: '18px'
                }}
            >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                        label='Date'
                        value={dayjs(filter.startDate)}
                        onChange={value =>
                            setFilter({ ...filter, startDate: convertToVietnamTime(value?.toDate() || new Date()) })
                        }
                        viewRenderers={{
                            hours: renderTimeViewClock,
                            minutes: renderTimeViewClock,
                            seconds: renderTimeViewClock
                        }}
                        sx={{
                            width: '100%',
                            '& .MuiInputBase-root': {
                                color: 'var(--text-color)'
                            },
                            '& .MuiInputBase-input': {},
                            '& .MuiInputLabel-root': {
                                color: 'var(--text-label-color)'
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderRadius: '8px',
                                borderColor: 'var(--border-dialog)'
                            },
                            '& .MuiSvgIcon-root': {
                                color: 'var(--text-label-color)' // Màu của icon (lịch)
                            },
                            '& .MuiOutlinedInput-root': {
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'var(--hover-field-color)' // Màu viền khi hover
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'var(--selected-field-color) !important' // Màu viền khi focus, thêm !important để ghi đè
                                }
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: 'var(--selected-field-color)'
                            }
                        }}
                    />
                </LocalizationProvider>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                        label='Date'
                        value={dayjs(filter.startDate)}
                        onChange={value =>
                            setFilter({ ...filter, startDate: convertToVietnamTime(value?.toDate() || new Date()) })
                        }
                        viewRenderers={{
                            hours: renderTimeViewClock,
                            minutes: renderTimeViewClock,
                            seconds: renderTimeViewClock
                        }}
                        sx={{
                            width: '100%',
                            '& .MuiInputBase-root': {
                                color: 'var(--text-color)'
                            },
                            '& .MuiInputBase-input': {},
                            '& .MuiInputLabel-root': {
                                color: 'var(--text-label-color)'
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderRadius: '8px',
                                borderColor: 'var(--border-dialog)'
                            },
                            '& .MuiSvgIcon-root': {
                                color: 'var(--text-label-color)' // Màu của icon (lịch)
                            },
                            '& .MuiOutlinedInput-root': {
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'var(--hover-field-color)' // Màu viền khi hover
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'var(--selected-field-color) !important' // Màu viền khi focus, thêm !important để ghi đè
                                }
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: 'var(--selected-field-color)'
                            }
                        }}
                    />
                </LocalizationProvider>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    gap: '18px',
                    padding: '18px 24px 0'
                }}
            >
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
                        flex: 1,
                        '& fieldset': {
                            borderRadius: '10px',
                            borderColor: 'var(--border-color)'
                        },
                        '& .MuiInputBase-root': { paddingLeft: '0px', paddingRight: '12px' },
                        '& .MuiInputBase-input': {
                            padding: '10px 0px',
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
                <FormControl
                    sx={{
                        width: '90px',
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
                    <InputLabel id='select-label'>
                        {type === 0 ? t('COMMON.STAT_NOTIFY.MONTH') : t('COMMON.STAT_NOTIFY.YEAR')}
                    </InputLabel>
                    <Select
                        label={type === 0 ? t('COMMON.STAT_NOTIFY.MONTH') : t('COMMON.STAT_NOTIFY.YEAR')}
                        defaultValue={type === 0 ? currentMonth : currentYear}
                        onChange={handleValueChange}
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
                                    width: '90px',
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
                        {type === 0
                            ? [...Array(12).keys()].map(item => (
                                  <MenuItem
                                      value={item}
                                      key={item}
                                      sx={{
                                          borderRadius: '6px',
                                          '&:last-child': {
                                              mt: '3px'
                                          }
                                      }}
                                  >
                                      {item + 1}
                                  </MenuItem>
                              ))
                            : Array.from({ length: currentYear - 2022 }, (_, index) => {
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

            <Box
                sx={{
                    flex: 1,
                    border: '1px dashed var(--border-color)',
                    borderRadius: '15px',
                    overflow: 'hidden',
                    margin: '18px 12px'
                }}
            >
                <Box
                    sx={{
                        height: '100%',
                        padding: '12px 5px 12px 12px',
                        overflow: 'auto',
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
                    {eventData.map((event, index) => (
                        <Box
                            key={index}
                            sx={{
                                '&:hover': {
                                    backgroundColor: 'var(--hover-color)'
                                },
                                borderRadius: '10px',
                                padding: '12px 8px',
                                display: 'flex',
                                justifyContent: 'left',
                                position: 'relative',
                                alignItems: 'center'
                            }}
                        >
                            <Box
                                sx={{
                                    backgroundColor: event.Color,
                                    borderRadius: '8px',
                                    width: '40px',
                                    height: '30px',
                                    mr: '12px'
                                }}
                            />

                            <Box>
                                <Typography
                                    sx={{
                                        color: 'var(--text-color)',
                                        fontWeight: 'bold',
                                        fontSize: '16px'
                                    }}
                                >
                                    {event.Title}
                                </Typography>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        gap: '5px',
                                        color: '#858494',
                                        fontSize: '14px',
                                        alignItems: 'center'
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: '#858494',
                                            fontSize: '14px'
                                        }}
                                    >
                                        {formatDateToTime(event.StartDate)}
                                    </Typography>
                                    {t('COMMON.STAT_NOTIFY.TO')}
                                    <Typography
                                        sx={{
                                            color: '#858494',
                                            fontSize: '14px'
                                        }}
                                    >
                                        {formatDateToTime(event.EndDate)}
                                    </Typography>
                                </Box>
                            </Box>
                            {event.IsHoliday && (
                                <Tooltip title={t('COMMON.STAT_NOTIFY.HOLIDAY')}>
                                    <Star
                                        size={16}
                                        style={{
                                            cursor: 'default',
                                            position: 'absolute',
                                            right: '60px',
                                            color: '#FFAA00',
                                            fill: '#FFAA00',
                                            verticalAlign: 'middle',
                                            marginRight: '6px'
                                        }}
                                    />
                                </Tooltip>
                            )}

                            <Box
                                display='flex'
                                alignItems='center'
                                justifyContent='center'
                                sx={{
                                    ml: 'auto',
                                    color: '#00d100',
                                    borderRadius: '50%',
                                    width: '42px',
                                    height: '42px',
                                    '&:hover': {
                                        cursor: 'pointer',
                                        backgroundColor: 'var(--hover-color)'
                                    }
                                }}
                            >
                                <Eye />
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>
            <Pagination
                count={Math.ceil(totalRecords / 7)}
                page={page}
                onChange={handleChangePage}
                boundaryCount={1}
                siblingCount={2}
                variant='outlined'
                sx={{
                    padding: '0px 24px 20px',
                    ml: 'auto',
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
        </Paper>
    )
}

export default Page
