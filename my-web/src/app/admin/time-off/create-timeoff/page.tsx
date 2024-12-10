'use client'
import {
    Box,
    Button,
    Paper,
    TextField,
    Typography,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Autocomplete,
    Avatar
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { SaveIcon, XIcon, RefreshCcwIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { useEffect, useState } from 'react'
import LoadingButton from '@mui/lab/LoadingButton'
import { useToast } from '@/hooks/useToast'

import { IAspNetUserGetAll } from '@/models/AspNetUser'
import { useGetAllUsersQuery } from '@/services/AspNetUserService'

import { useCreateTimeOffsMutation, useSearchTimeOffQuery } from '@/services/TimeOffService'

const getCurrentDateTime = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

const CreateTimeOff = () => {
    const { t } = useTranslation('common')
    const router = useRouter()

    const [userId, setUserId] = useState('')
    const [reason, setReason] = useState('')
    const [date, setDate] = useState('')
    const [content, setContent] = useState('')
    const [isAccepted, setIsAccepted] = useState('')

    const toast = useToast()
    const [isSubmit, setIsSubmit] = useState(false)

    const [createTimeOff, { isSuccess, isError, reset }] = useCreateTimeOffsMutation()

    const { refetch } = useSearchTimeOffQuery()

    const { data: userResponse, isLoading: isUsersLoading } = useGetAllUsersQuery()
    const employee = (userResponse?.Data?.Records as IAspNetUserGetAll[]) || []

    const [isSaveLoading, setIsSaveLoading] = useState(false)
    const [isSaveAndCloseLoading, setIsSaveAndCloseLoading] = useState(false)

    useEffect(() => {
        setDate(getCurrentDateTime())
    }, [])

    const handleSave = async () => {
        setIsSaveLoading(true)
        setIsSubmit(true)
        if (userId === '' || reason === '' || date === '' || isAccepted === '') {
            setIsSaveLoading(false)
            return
        }
        const data = {
            UserId: userId,
            Reason: reason,
            Date: new Date(date),
            IsAccepted: isAccepted === 'da' ? true : false,
            Content: content,
            IsActive: true
        }
        try {
            await createTimeOff(data).unwrap()
        } finally {
            setIsSaveLoading(false)
        }
        setIsSubmit(false)
    }

    useEffect(() => {
        if (isSuccess === true) {
            toast(t('Tạo nghỉ phép thành công'), 'success')
            refetch()
            reset()
        }
        if (isError === true) {
            toast(t('Tạo nghỉ phép thất bại'), 'error')
            reset()
        }
    }, [isSuccess, isError, toast, t, reset, refetch])

    const handleSaveAndClose = async () => {
        setIsSaveAndCloseLoading(true)
        setIsSubmit(true)
        if (userId === '' || reason === '' || date === '' || isAccepted === '') {
            setIsSaveAndCloseLoading(false)
            return
        }
        const data = {
            UserId: userId,
            Reason: reason,
            Date: new Date(date),
            IsAccepted: isAccepted === 'da' ? true : false,
            Content: content,
            IsActive: true
        }
        try {
            await createTimeOff(data).unwrap()
            router.push('/admin/time-off')
        } finally {
            setIsSaveAndCloseLoading(false)
        }
        setIsSubmit(false)
    }

    if (isUsersLoading) return <div>Loading...</div>

    return (
        <Box sx={{ width: '100%' }}>
            <Paper
                sx={{
                    width: '100%',
                    overflow: 'hidden',
                    borderRadius: '6px',
                    backgroundColor: 'var(--background-color)',
                    padding: '20px'
                }}
            >
                <Typography sx={{ fontWeight: 'bold', fontSize: '22px', color: 'var(--text-color)' }}>
                    {'Create a New TimeOff'}
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '20px',
                        mt: '20px'
                    }}
                >
                    <Box
                        sx={{
                            width: 'calc(50% - 10px)'
                        }}
                    >
                        <Autocomplete
                            sx={{
                                color: 'var(--text-color)',
                                backgroundColor: 'var(--background-color)',
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
                                },
                                '& .MuiAutocomplete-popupIndicator': {
                                    '& svg': {
                                        fill: 'var(--text-color)'
                                    }
                                },
                                '& .MuiAutocomplete-clearIndicator': {
                                    '& svg': {
                                        fill: 'var(--text-color)'
                                    }
                                }
                            }}
                            options={employee}
                            getOptionLabel={option => `${option.Id} - ${option.FullName}`}
                            renderOption={(props, option, { selected }) => {
                                const { key, ...otherProps } = props
                                return (
                                    <Box
                                        key={key}
                                        component='li'
                                        {...otherProps}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '10px',
                                            padding: '8px',
                                            color: selected ? 'black' : 'var(--text-color)',
                                            backgroundColor: 'var(--background-color)',
                                            '&:hover': {
                                                color: 'black'
                                            }
                                        }}
                                    >
                                        <Avatar
                                            src={
                                                option.AvatarPath ||
                                                'https://localhost:44381/avatars/aa1678f0-75b0-48d2-ae98-50871178e9bd.jfif'
                                            }
                                            alt='Avatar'
                                        />
                                        <Typography>{`${option.Id} - ${option.FullName}`}</Typography>
                                    </Box>
                                )
                            }}
                            renderInput={params => (
                                <TextField
                                    {...params}
                                    variant='outlined'
                                    label={t('Thông tin nhân viên*')}
                                    fullWidth
                                    error={isSubmit && userId === ''}
                                />
                            )}
                            value={employee.find(e => e.Id === userId) || null}
                            onChange={(event, newValue) => setUserId(newValue?.Id || '')}
                            isOptionEqualToValue={(option, value) => option.Id === value.Id}
                        />

                        <Typography
                            sx={{
                                color: 'red',
                                margin: '1px 0 0 10px',
                                fontSize: '12px',
                                visibility: isSubmit && userId === '' ? 'visible' : 'hidden'
                            }}
                        >
                            {t('COMMON.TEXTFIELD.REQUIRED')}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            width: 'calc(50% - 10px)'
                        }}
                    >
                        <TextField
                            variant='outlined'
                            label={'Ngày xin nghỉ phép*'}
                            type='date'
                            fullWidth
                            {...(isSubmit && date === '' && { error: true })}
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
                            value={date}
                            onChange={e => setDate(e.target.value)}
                        />
                        <Typography
                            sx={{
                                color: 'red',
                                margin: '1px 0 0 10px',
                                fontSize: '12px',
                                visibility: isSubmit && date === '' ? 'visible' : 'hidden'
                            }}
                        >
                            {t('COMMON.TEXTFIELD.REQUIRED')}
                        </Typography>
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '20px',
                        mt: '7px'
                    }}
                >
                    <Box
                        sx={{
                            width: 'calc(50% - 10px)'
                        }}
                    >
                        <TextField
                            variant='outlined'
                            label={t('Lý do xin nghỉ phép*')}
                            id='fullWidth'
                            fullWidth
                            multiline
                            {...(isSubmit && reason === '' && { error: true })}
                            minRows={1}
                            maxRows={12}
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
                            value={reason}
                            onChange={e => setReason(e.target.value)}
                        />
                        <Typography
                            sx={{
                                color: 'red',
                                margin: '1px 0 0 10px',
                                fontSize: '12px',
                                visibility: isSubmit && reason === '' ? 'visible' : 'hidden'
                            }}
                        >
                            {t('COMMON.TEXTFIELD.REQUIRED')}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            width: 'calc(50% - 10px)'
                        }}
                    >
                        <FormControl
                            fullWidth
                            error={isSubmit && isAccepted === ''}
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
                                },
                                '& .MuiSelect-icon': {
                                    color: 'var(--text-color)'
                                }
                            }}
                        >
                            <InputLabel>Trạng thái*</InputLabel>

                            <Select
                                labelId='gender-label'
                                id='gender'
                                value={isAccepted}
                                label='Trạng thái*'
                                onChange={e => setIsAccepted(e.target.value)}
                                MenuProps={{
                                    PaperProps: {
                                        sx: {
                                            backgroundColor: 'var(--background-color)',
                                            color: 'var(--text-color)',
                                            boxShadow: '0px 2px 6px var(--text-color)'
                                        }
                                    }
                                }}
                            >
                                <MenuItem value='da'>Đã duyệt</MenuItem>
                                <MenuItem value='chua'>Chưa duyệt</MenuItem>
                            </Select>
                        </FormControl>
                        <Typography
                            sx={{
                                color: 'red',
                                margin: '1px 0 0 10px',
                                fontSize: '12px',
                                visibility: isSubmit && isAccepted === '' ? 'visible' : 'hidden'
                            }}
                        >
                            {t('COMMON.TEXTFIELD.REQUIRED')}
                        </Typography>
                    </Box>
                </Box>

                <TextField
                    variant='outlined'
                    label={t('Nội dung')}
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
                    value={content}
                    onChange={e => setContent(e.target.value)}
                />

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', mt: '20px' }}>
                    <Button
                        variant='contained'
                        startIcon={<RefreshCcwIcon />}
                        sx={{
                            height: '44px',
                            backgroundColor: 'var(--button-color)',
                            width: 'auto',
                            fontSize: '16px',
                            '&:hover': {
                                backgroundColor: 'var(--hover-button-color)'
                            },
                            padding: '0px 20px',
                            fontWeight: 'bold',
                            whiteSpace: 'nowrap',
                            textTransform: 'none'
                        }}
                        onClick={() => {
                            window.location.reload()
                        }}
                    >
                        {t('Làm mới')}
                    </Button>

                    <LoadingButton
                        variant='contained'
                        loading={isSaveLoading}
                        loadingPosition='start'
                        startIcon={<SaveIcon />}
                        sx={{
                            height: '44px',
                            backgroundColor: 'var(--button-color)',
                            width: 'auto',
                            padding: '0px 20px',
                            fontSize: '16px',
                            '&:hover': {
                                backgroundColor: 'var(--hover-button-color)'
                            },
                            fontWeight: 'bold',
                            whiteSpace: 'nowrap',
                            textTransform: 'none'
                        }}
                        onClick={handleSave}
                    >
                        {t('COMMON.BUTTON.SAVE')}
                    </LoadingButton>

                    <LoadingButton
                        variant='contained'
                        loading={isSaveAndCloseLoading}
                        loadingPosition='start'
                        startIcon={<SaveIcon />}
                        sx={{
                            height: '44px',
                            backgroundColor: 'var(--button-color)',
                            width: 'auto',
                            padding: '0px 20px',
                            '&:hover': {
                                backgroundColor: 'var(--hover-button-color)'
                            },
                            fontSize: '16px',
                            fontWeight: 'bold',
                            whiteSpace: 'nowrap',
                            textTransform: 'none'
                        }}
                        onClick={handleSaveAndClose}
                    >
                        {t('COMMON.BUTTON.SAVE_AND_CLOSE')}
                    </LoadingButton>

                    <Button
                        variant='contained'
                        startIcon={<XIcon />}
                        sx={{
                            height: '44px',
                            backgroundColor: 'var(--button-color)',
                            width: 'auto',
                            fontSize: '16px',
                            '&:hover': {
                                backgroundColor: 'var(--hover-button-color)'
                            },
                            padding: '0px 20px',
                            fontWeight: 'bold',
                            whiteSpace: 'nowrap',
                            textTransform: 'none'
                        }}
                        onClick={() => {
                            router.push('/admin/time-off')
                        }}
                    >
                        {t('COMMON.BUTTON.CLOSE')}
                    </Button>
                </Box>
            </Paper>
        </Box>
    )
}

export default CreateTimeOff
