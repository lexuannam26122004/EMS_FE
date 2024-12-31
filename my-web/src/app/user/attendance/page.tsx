'use client'

import { Avatar, Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import Layout from '@/app/user/Layout'
import { useState } from 'react'
import { useGetAuthMeQuery } from '@/services/AuthService'
import { SelectChangeEvent } from '@mui/material'
import { formatDate } from '@/utils/formatDate'
import Loading from '@/components/Loading'
import { CircleArrowOutDownLeft, CircleArrowOutUpRight, Clock } from 'lucide-react'

function Page() {
    const { t } = useTranslation('common')
    const [type, setType] = useState(0)

    const handleTypeChange = (event: SelectChangeEvent<number>) => {
        setType(event.target.value as number)
    }

    const { data: responseData, isFetching: isFetchingGetMe, refetch } = useGetAuthMeQuery()
    const infoMe = responseData?.Data

    if (isFetchingGetMe || !infoMe) {
        return (
            <Layout>
                <Loading />
            </Layout>
        )
    }

    return (
        <Layout>
            <Box>
                <Paper
                    elevation={1}
                    sx={{
                        width: '100%',
                        borderRadius: '30px',
                        padding: '30px',
                        backgroundColor: 'var(--background-item)'
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                mb: '35px'
                            }}
                        >
                            <Box
                                sx={{
                                    width: '5px',
                                    height: '35px',
                                    backgroundColor: 'red',
                                    borderRadius: '4px',
                                    mr: '10px'
                                }}
                            />
                            <Typography
                                sx={{
                                    color: 'var(--text-color)',
                                    fontSize: '21px',
                                    fontWeight: 'bold'
                                }}
                            >
                                {t('COMMON.ATTENDANCE.DETAIL_EMPLOYEE')}
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '15px'
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
                            <Button sx={{ padding: '10px', borderRadius: '10px' }}>
                                {t('COMMON.ATTENDANCE.DOWNLOAD_INFO')}
                            </Button>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '40px'
                        }}
                    >
                        <Avatar
                            src='https://api-prod-minimal-v620.pages.dev/assets/images/avatar/avatar-3.webp'
                            sx={{
                                width: '120px',
                                height: '120px'
                            }}
                        />

                        <Box>
                            <Typography
                                sx={{
                                    fontSize: '20px',
                                    fontWeight: 'bold',
                                    color: 'var(--text-color)'
                                }}
                            >
                                {infoMe.FullName}
                            </Typography>

                            <Box
                                sx={{
                                    mt: '20px',
                                    display: 'flex',
                                    gap: '45px',
                                    alignItems: 'center'
                                }}
                            >
                                <Box>
                                    <Typography
                                        sx={{
                                            color: 'var(--sub-title-color)',
                                            fontSize: '15px'
                                        }}
                                    >
                                        {t('COMMON.EMPLOYEE.ROLES')}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            mt: '4px',
                                            color: 'var(--text-color)',
                                            fontSize: '17px'
                                        }}
                                    >
                                        {infoMe.Roles.join(', ')}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography
                                        sx={{
                                            color: 'var(--sub-title-color)',
                                            fontSize: '15px'
                                        }}
                                    >
                                        {t('COMMON.EMPLOYEE.PHONENUMBER')}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            mt: '4px',
                                            color: 'var(--text-color)',
                                            fontSize: '17px'
                                        }}
                                    >
                                        {infoMe.PhoneNumber}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography
                                        sx={{
                                            color: 'var(--sub-title-color)',
                                            fontSize: '15px'
                                        }}
                                    >
                                        {t('COMMON.EMPLOYEE.EMAIL')}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            mt: '4px',
                                            color: 'var(--text-color)',
                                            fontSize: '17px'
                                        }}
                                    >
                                        {infoMe.Email}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography
                                        sx={{
                                            color: 'var(--sub-title-color)',
                                            fontSize: '15px'
                                        }}
                                    >
                                        {t('COMMON.EMPLOYEE.BIRTHDAY')}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            mt: '4px',
                                            color: 'var(--text-color)',
                                            fontSize: '17px'
                                        }}
                                    >
                                        {formatDate(infoMe.Birthday)}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography
                                        sx={{
                                            color: 'var(--sub-title-color)',
                                            fontSize: '15px'
                                        }}
                                    >
                                        {t('COMMON.EMPLOYEE.DEPARTMENTNAME')}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            mt: '4px',
                                            color: 'var(--text-color)',
                                            fontSize: '17px'
                                        }}
                                    >
                                        {infoMe.DepartmentName || 'Department'}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography
                                        sx={{
                                            color: 'var(--sub-title-color)',
                                            fontSize: '15px'
                                        }}
                                    >
                                        {t('COMMON.EMPLOYEE.STARTDATEWORK')}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            mt: '4px',
                                            color: 'var(--text-color)',
                                            fontSize: '17px'
                                        }}
                                    >
                                        {formatDate(infoMe.StartDateWork)}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', gap: '35px', alignItems: 'center', mt: '40px' }}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                flex: 1,
                                padding: '20px 24px',
                                borderRadius: '20px',
                                background: '#cccccc'
                            }}
                        >
                            <Box
                                sx={{
                                    mr: '20px',
                                    width: '55px',
                                    height: '55px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: 'white'
                                }}
                            >
                                <Clock size={28} />
                            </Box>
                            <Box>
                                <Typography sx={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--text-color)' }}>
                                    309
                                </Typography>
                                <Typography sx={{ fontSize: '15px', mt: '5px', color: 'var(--sub-title-color)' }}>
                                    {t('COMMON.USER.TOTAL_ATTENDANCE')}
                                </Typography>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flex: 1,
                                alignItems: 'center',
                                padding: '20px 24px',
                                borderRadius: '20px',
                                background: '#cccccc'
                            }}
                        >
                            <Box
                                sx={{
                                    mr: '20px',
                                    width: '55px',
                                    height: '55px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: 'white'
                                }}
                            >
                                <CircleArrowOutDownLeft size={28} />
                            </Box>
                            <Box>
                                <Typography sx={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--text-color)' }}>
                                    309
                                </Typography>
                                <Typography sx={{ fontSize: '15px', mt: '5px', color: 'var(--sub-title-color)' }}>
                                    {t('COMMON.USER.TOTAL_ATTENDANCE')}
                                </Typography>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flex: 1,
                                alignItems: 'center',
                                padding: '20px 24px',
                                borderRadius: '20px',
                                background: '#cccccc'
                            }}
                        >
                            <Box
                                sx={{
                                    mr: '20px',
                                    width: '55px',
                                    height: '55px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: 'white'
                                }}
                            >
                                <CircleArrowOutUpRight size={28} />
                            </Box>
                            <Box>
                                <Typography sx={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--text-color)' }}>
                                    309
                                </Typography>
                                <Typography sx={{ fontSize: '15px', mt: '5px', color: 'var(--sub-title-color)' }}>
                                    {t('COMMON.USER.TOTAL_ATTENDANCE')}
                                </Typography>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flex: 1,
                                alignItems: 'center',
                                padding: '20px 24px',
                                borderRadius: '20px',
                                background: '#cccccc'
                            }}
                        >
                            <Box
                                sx={{
                                    mr: '20px',
                                    width: '55px',
                                    height: '55px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: 'white'
                                }}
                            >
                                <Clock size={28} />
                            </Box>
                            <Box>
                                <Typography sx={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--text-color)' }}>
                                    309
                                </Typography>
                                <Typography sx={{ fontSize: '15px', mt: '5px', color: 'var(--sub-title-color)' }}>
                                    {t('COMMON.USER.TOTAL_ATTENDANCE')}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </Layout>
    )
}

export default Page
