import { Box, InputLabel, Paper, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { SelectChangeEvent, TextField, InputAdornment, Pagination, Avatar } from '@mui/material'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import SearchIcon from '@mui/icons-material/Search'
import { Star } from 'lucide-react'
import { IFilterReadNotificationsForUserVModel } from '@/models/Notifications'

const users = [
    {
        avatarPath: 'https://api-prod-minimal-v620.pages.dev/assets/images/avatar/avatar-1.webp',
        fullname: 'Lê Xuân Nam',
        count: 30,
        employeeID: 'EMP001',
        roles: ['Leader']
    },
    {
        avatarPath: 'https://api-prod-minimal-v620.pages.dev/assets/images/avatar/avatar-2.webp',
        fullname: 'Lê Xuân Thanh',
        count: 24,
        employeeID: 'EMP002',
        roles: ['Leader']
    },
    {
        avatarPath: 'https://api-prod-minimal-v620.pages.dev/assets/images/avatar/avatar-3.webp',
        fullname: 'Lê Thị Tuyết Phương',
        count: 20,
        employeeID: 'EMP003',
        roles: ['Manager']
    },
    {
        avatarPath: 'https://api-prod-minimal-v620.pages.dev/assets/images/avatar/avatar-4.webp',
        fullname: 'Hùng Bùi Vỹ',
        count: 19,
        employeeID: 'EMP004',
        roles: ['Employee']
    },
    {
        avatarPath: 'https://api-prod-minimal-v620.pages.dev/assets/images/avatar/avatar-5.webp',
        fullname: 'Lê Tuấn Khang',
        count: 15,
        employeeID: 'EMP005',
        roles: ['Employee']
    },
    {
        avatarPath: 'https://api-prod-minimal-v620.pages.dev/assets/images/avatar/avatar-6.webp',
        fullname: 'Bùi Thị Thanh Hằng',
        count: 9,
        employeeID: 'EMP006',
        roles: ['Employee']
    }
]

interface IGetAll {
    avatarPath: string
    fullname: string
    count: number
    employeeID: string
    roles: string[]
}

const responseData = {
    Data: {
        TotalRecords: users.length,
        Records: users
    }
}

function Page() {
    const { t } = useTranslation('common')

    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()
    const [type, setType] = useState(0)
    const [value, setValue] = useState(currentMonth)
    const [keyword, setKeyword] = useState('')
    const [filter, setFilter] = useState<IFilterReadNotificationsForUserVModel>({
        pageSize: 7,
        pageNumber: 1
    })

    const handleSearchKeyword = () => {}

    const notifyData = responseData?.Data.Records as IGetAll[]

    const totalRecords = (responseData?.Data.TotalRecords as number) || 0

    const handleTypeChange = (event: SelectChangeEvent<number>) => {
        setType(event.target.value as number)
    }

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
                    alignItems: 'center',
                    gap: '24px'
                }}
            >
                <FormControl
                    sx={{
                        width: '100px',
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
                    <InputLabel id='select-label'>{t('COMMON.STAT_NOTIFY.BY')}</InputLabel>
                    <Select
                        label={t('COMMON.STAT_NOTIFY.BY')}
                        defaultValue={type}
                        onChange={handleTypeChange}
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
                                    width: '100px',
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
                        <MenuItem
                            value={0}
                            sx={{
                                borderRadius: '6px',
                                '&:last-child': {
                                    mt: '3px'
                                }
                            }}
                        >
                            {t('COMMON.STAT_NOTIFY.MONTH')}
                        </MenuItem>

                        <MenuItem
                            value={1}
                            sx={{
                                borderRadius: '6px',
                                '&:last-child': {
                                    mt: '3px'
                                }
                            }}
                        >
                            {t('COMMON.STAT_NOTIFY.YEAR')}
                        </MenuItem>
                    </Select>
                </FormControl>

                <FormControl
                    sx={{
                        width: '90px',
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

            <Box sx={{ position: 'relative', width: '100%', mt: '5px', padding: '0 24px' }}>
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
            <Box
                sx={{
                    flex: 1,
                    border: '1px dashed var(--border-color)',
                    borderRadius: '15px',
                    overflow: 'hidden',
                    margin: '16px 12px'
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
                    {users.map((user, index) => (
                        <Box
                            sx={{
                                '&:hover': {
                                    backgroundColor: 'var(--hover-color)',
                                    cursor: 'pointer'
                                },
                                borderRadius: '10px',
                                padding: '12px 8px',
                                display: 'flex',
                                justifyContent: 'left',
                                alignItems: 'center'
                            }}
                        >
                            {index === 0 ? (
                                <img
                                    src='/images/cup.svg'
                                    style={{
                                        width: '20px',
                                        marginRight: '15px'
                                    }}
                                ></img>
                            ) : (
                                <Box
                                    sx={{
                                        color: 'white',
                                        fontSize: '13px',
                                        borderRadius: '50%',
                                        border:
                                            index === 0
                                                ? '1px solid #FFAA00'
                                                : index === 1
                                                  ? '1px solid #00D95F'
                                                  : index === 2
                                                    ? '1px solid red'
                                                    : '1px solid rgb(59, 59, 59)',
                                        width: '20px',
                                        height: '20px',
                                        display: 'flex',
                                        backgroundColor:
                                            index === 0
                                                ? '#FFAA00'
                                                : index === 1
                                                  ? '#00D95F'
                                                  : index === 2
                                                    ? 'red'
                                                    : 'rgb(59, 59, 59)',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginRight: '15px'
                                    }}
                                >
                                    {index + 1}
                                </Box>
                            )}
                            <Box>
                                <Avatar
                                    sx={{
                                        mr: '12px',
                                        width: '45px',
                                        height: '45px'
                                    }}
                                    src={
                                        user.avatarPath ||
                                        'https://localhost:44381/avatars/aa1678f0-75b0-48d2-ae98-50871178e9bd.jfif'
                                    }
                                />
                            </Box>
                            <Box>
                                <Typography
                                    sx={{
                                        color: 'var(--text-color)',
                                        fontWeight: 'bold',
                                        fontSize: '16px'
                                    }}
                                >
                                    {user.fullname}
                                </Typography>
                                <Typography
                                    sx={{
                                        color: '#858494',
                                        fontSize: '14px'
                                    }}
                                >
                                    {user.employeeID}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    fontSize: '16px',
                                    color: 'white',
                                    marginLeft: 'auto',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: '4px 7px',
                                    whiteSpace: 'nowrap',
                                    backgroundColor: '#37cf79e6',
                                    fontWeight: 'bold'
                                }}
                            >
                                <Star
                                    size={16}
                                    style={{
                                        color: '#FFAA00',
                                        fill: '#FFAA00',
                                        verticalAlign: 'middle',
                                        marginRight: '6px'
                                    }}
                                />
                                {user.count}
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
