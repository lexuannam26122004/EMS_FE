'use client'
import { Box, Button, Grid2, Paper, TextField, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { SaveIcon, XIcon, Loader } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCreateSysConfigurationMutation } from '@/services/SysConfigurationService'
import { useEffect, useState } from 'react'
import LoadingButton from '@mui/lab/LoadingButton'
import { useToast } from '@/hooks/useToast'

function createConfigurationPage() {
    const { t } = useTranslation('common')
    const router = useRouter()
    const [key, setKey] = useState('')
    const [type, setType] = useState('')
    const [value, setValue] = useState('')
    const [description, setDescription] = useState('')
    const toast = useToast()
    const [isSubmit, setIsSubmit] = useState(false)

    const [createSysConfiguration, { isSuccess, isLoading, isError }] = useCreateSysConfigurationMutation()

    const handleSave = async () => {
        setIsSubmit(true)
        if (key === '' || type === '' || value === '') {
            return
        }
        const data = {
            Key: key,
            Type: type,
            Value: value,
            Description: description
        }
        await createSysConfiguration(data).unwrap()
        setIsSubmit(false)
    }

    useEffect(() => {
        if (isSuccess === true) {
            toast(t('COMMON.SYS_CONFIGURATION.ACTION_CONFIGURATION.CREATE_SUCCESS'), 'success')
        }
        if (isError === true) {
            toast(t('COMMON.SYS_CONFIGURATION.ACTION_CONFIGURATION.CREATE_ERROR'), 'error')
        }
    }, [isSuccess, isError])

    const handleSaveAndClose = async () => {
        setIsSubmit(true)
        if (key === '' || type === '' || value === '') {
            return
        }
        const data = {
            Key: key,
            Type: type,
            Value: value,
            Description: description
        }
        await createSysConfiguration(data).unwrap()
        setIsSubmit(false)
        router.push('/admin/configuration')
    }

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
                    {t('COMMON.SYS_CONFIGURATION.ACTION_CONFIGURATION.CREATE_TITLE')}
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
                            value={key}
                            onChange={e => setKey(e.target.value)}
                        />
                        <Typography
                            sx={{
                                color: 'red',
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
                            value={type}
                            onChange={e => setType(e.target.value)}
                        />
                        <Typography
                            sx={{
                                color: 'red',
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
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                    <Typography
                        sx={{
                            color: 'red',
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
                        {...(isLoading && { loading: true })}
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

export default createConfigurationPage
