'use client'
import { Box, Button, Grid2, Paper, TextField, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { SaveIcon, XIcon, Loader } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useUpdateSysConfigurationMutation, useGetByIdSysConfigurationQuery } from '@/services/SysConfigurationService'
import { useEffect, useState } from 'react'
import LoadingButton from '@mui/lab/LoadingButton'
import { useToast } from '@/hooks/useToast'
import { useSearchParams } from 'next/navigation'

function updateConfigurationPage() {
    const { t } = useTranslation('common')
    const router = useRouter()
    const [key, setKey] = useState('')
    const [type, setType] = useState('')
    const [value, setValue] = useState('')
    const [description, setDescription] = useState('')
    const toast = useToast()
    const [isSubmit, setIsSubmit] = useState(false)

    const searchParams = useSearchParams()
    const id = searchParams.get('id') ? parseInt(searchParams.get('id') as string) : 0

    const { data: responseData, isFetching: isFetchingGetById, refetch } = useGetByIdSysConfigurationQuery(id)
    const [updateSysConfiguration, { isSuccess, isLoading, isError }] = useUpdateSysConfigurationMutation()

    const data = responseData?.Data
    useEffect(() => {
        if (!isFetchingGetById && data) {
            setKey(data.Key)
            setType(data.Type)
            setValue(data.Value)
            setDescription(data.Description)
        }
    }, [data, isFetchingGetById])

    const handleSave = async () => {
        setIsSubmit(true)
        if (key === '' || type === '' || value === '') {
            return
        }
        const data = {
            Id: id,
            Key: key,
            Type: type,
            Value: value,
            Description: description
        }
        await updateSysConfiguration(data).unwrap()
        refetch()
        setIsSubmit(false)
    }

    useEffect(() => {
        if (isSuccess === true) {
            toast(t('COMMON.SYS_CONFIGURATION.ACTION_CONFIGURATION.UPDATE_SUCCESS'), 'success')
        }
        if (isError === true) {
            toast(t('COMMON.SYS_CONFIGURATION.ACTION_CONFIGURATION.UPDATE_ERROR'), 'error')
        }
    }, [isSuccess, isError])

    const handleSaveAndClose = async () => {
        setIsSubmit(true)
        if (key === '' || type === '' || value === '') {
            return
        }
        const data = {
            Id: id,
            Key: key,
            Type: type,
            Value: value,
            Description: description
        }
        await updateSysConfiguration(data).unwrap()
        refetch()
        setIsSubmit(false)
        router.push('/admin/configuration')
    }

    return (
        <Box sx={{ width: '720px', maxWidth: '100%', margin: '0 auto' }}>
            <Paper
                elevation={0}
                sx={{
                    width: '100%',
                    overflow: 'hidden',
                    borderRadius: '15px',
                    backgroundColor: 'var(--background-item)',
                    padding: '24px'
                }}
            >
                <Typography sx={{ fontWeight: 'bold', fontSize: '22px', color: 'var(--text-color)' }}>
                    {t('COMMON.SYS_CONFIGURATION.ACTION_CONFIGURATION.UPDATE_TITLE')}
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
                        <TextField
                            variant='outlined'
                            label={t('COMMON.SYS_CONFIGURATION.ACTION_CONFIGURATION.KEY')}
                            fullWidth
                            {...(isSubmit && key === '' && { error: true })}
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
                                }
                            }}
                            value={key}
                            onChange={e => setKey(e.target.value)}
                        />
                        <Typography
                            sx={{
                                color: 'var(--error-color)',
                                margin: '1px 0 0 10px',
                                fontSize: '12px',
                                visibility: isSubmit && key === '' ? 'visible' : 'hidden'
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
                            label={t('COMMON.SYS_CONFIGURATION.ACTION_CONFIGURATION.TYPE')}
                            fullWidth
                            {...(isSubmit && type === '' && { error: true })}
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
                                }
                            }}
                            value={type}
                            onChange={e => setType(e.target.value)}
                        />
                        <Typography
                            sx={{
                                color: 'var(--error-color)',
                                margin: '1px 0 0 10px',
                                fontSize: '12px',
                                visibility: isSubmit && type === '' ? 'visible' : 'hidden'
                            }}
                        >
                            {t('COMMON.TEXTFIELD.REQUIRED')}
                        </Typography>
                    </Box>
                </Box>

                <Box
                    sx={{
                        mt: '7px'
                    }}
                >
                    <TextField
                        variant='outlined'
                        label={t('COMMON.SYS_CONFIGURATION.ACTION_CONFIGURATION.VALUE')}
                        fullWidth
                        multiline
                        {...(isSubmit && value === '' && { error: true })}
                        minRows={1}
                        maxRows={3}
                        sx={{
                            '& fieldset': {
                                borderRadius: '8px',
                                color: 'var(--text-color)',
                                borderColor: 'var(--border-color)'
                            },
                            '& .MuiInputBase-root': {
                                paddingRight: '3px'
                            },
                            '& .MuiInputBase-input': {
                                scrollbarGutter: 'stable',
                                '&::-webkit-scrollbar': {
                                    width: '7px',
                                    height: '7px'
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    backgroundColor: 'var(--scrollbar-color)',
                                    borderRadius: '10px'
                                },
                                paddingRight: '4px',
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
                            }
                        }}
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                    <Typography
                        sx={{
                            color: 'var(--error-color)',
                            margin: '1px 0 0 10px',
                            fontSize: '12px',
                            visibility: isSubmit && value === '' ? 'visible' : 'hidden'
                        }}
                    >
                        {t('COMMON.TEXTFIELD.REQUIRED')}
                    </Typography>
                </Box>

                <TextField
                    variant='outlined'
                    label={t('COMMON.SYS_CONFIGURATION.ACTION_CONFIGURATION.DESCRIPTION')}
                    id='fullWidth'
                    fullWidth
                    multiline
                    minRows={4}
                    maxRows={12}
                    sx={{
                        mt: '7px',
                        '& fieldset': {
                            borderRadius: '8px',
                            color: 'var(--text-color)',
                            borderColor: 'var(--border-color)'
                        },
                        '& .MuiInputBase-root': {
                            paddingRight: '3px'
                        },
                        '& .MuiInputBase-input': {
                            scrollbarGutter: 'stable',
                            '&::-webkit-scrollbar': {
                                width: '7px',
                                height: '7px'
                            },
                            '&::-webkit-scrollbar-thumb': {
                                backgroundColor: 'var(--scrollbar-color)',
                                borderRadius: '10px'
                            },
                            paddingRight: '4px',
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
                        }
                    }}
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', mt: '20px' }}>
                    <LoadingButton
                        variant='contained'
                        {...(isLoading && { loading: true })}
                        loadingPosition='start'
                        startIcon={<SaveIcon />}
                        sx={{
                            height: '50px',
                            backgroundColor: 'var(--button-color)',
                            width: 'auto',
                            padding: '0px 30px',
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
                        {...(isLoading && { loading: true })}
                        loadingPosition='start'
                        startIcon={<SaveIcon />}
                        sx={{
                            height: '50px',
                            backgroundColor: 'var(--button-color)',
                            width: 'auto',
                            padding: '0px 30px',
                            fontSize: '16px',
                            '&:hover': {
                                backgroundColor: 'var(--hover-button-color)'
                            },
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
                            height: '50px',
                            backgroundColor: 'var(--button-color)',
                            width: 'auto',
                            padding: '0px 30px',
                            fontSize: '16px',
                            '&:hover': {
                                backgroundColor: 'var(--hover-button-color)'
                            },
                            fontWeight: 'bold',
                            whiteSpace: 'nowrap',
                            textTransform: 'none'
                        }}
                        onClick={() => {
                            router.push('/admin/configuration')
                        }}
                    >
                        {t('COMMON.BUTTON.CLOSE')}
                    </Button>
                </Box>
            </Paper>
        </Box>
    )
}

export default updateConfigurationPage
