'use client'
import { Box, Button, Paper, TextField, Typography, Autocomplete } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { SaveIcon, XIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCreateBenefitMutation, useGetAllBenefitsTypeQuery } from '@/services/BenefitService'
import { useEffect, useState } from 'react'
import LoadingButton from '@mui/lab/LoadingButton'
import { useToast } from '@/hooks/useToast'
import { IBenefitGetAll, IBenefitGetAllType } from '@/models/Benefit'

function CreateBenefitPage() {
    const { t } = useTranslation('common')
    const router = useRouter()
    const [name, setName] = useState('')
    const [contribution, setContribution] = useState<number | ''>('')
    const [benefitTypeId, setBenefitTypeId] = useState<number | null>()
    const { data: benefitTypes, isLoading: isBenefitTypesLoading } = useGetAllBenefitsTypeQuery()
    const benefitTypesData = (benefitTypes?.Data?.Records as IBenefitGetAllType[]) || []
    const toast = useToast()
    const [isSubmit, setIsSubmit] = useState(false)

    const [createBenefit, { isSuccess, isLoading, isError }] = useCreateBenefitMutation()

    const handleSave = async () => {
        setIsSubmit(true)
        if (name === '' || !benefitTypeId || contribution === '') {
            return
        }
        const data = {
            Name: name,
            BenefitContribution: Number(contribution),
            BenefitTypeId: benefitTypeId
        }
        await createBenefit(data).unwrap()
        setIsSubmit(false)
    }

    useEffect(() => {
        if (isSuccess) {
            toast(t('COMMON.BENEFIT.CREATE_SUCCESS'), 'success')
        }
        if (isError) {
            toast(t('COMMON.BENEFIT.CREATE_ERROR'), 'error')
        }
    }, [isSuccess, isError])

    const handleSaveAndClose = async () => {
        await handleSave()
        if (isSuccess) {
            router.push('/admin/benefit')
        }
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
                    {t('COMMON.BENEFIT.CREATE_TITLE')}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', mt: '20px' }}>
                    <TextField
                        variant='outlined'
                        label={t('COMMON.BENEFIT.NAME')}
                        fullWidth
                        {...(isSubmit && name === '' && { error: true })}
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
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
                        options={benefitTypesData} // Replace with actual benefit types data
                        getOptionLabel={(option) => `${option.Id} - ${option.Name}`}
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
                                    <Typography>{`${option.Id} - ${option.Name}`}</Typography>
                                </Box>
                            )
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant='outlined'
                                label={t('COMMON.BENEFIT.TYPE')}
                                fullWidth
                                error={isSubmit && !benefitTypeId === null}
                            />
                        )}
                        value={benefitTypesData.find(type => type.Id === benefitTypeId) || null}
                        onChange={(event, newValue) => setBenefitTypeId(newValue?.Id || null)}
                        isOptionEqualToValue={(option, value) => option.Id === value.Id}
                    />
                    <TextField
                        variant='outlined'
                        label={t('COMMON.BENEFIT.CONTRIBUTION')}
                        fullWidth
                        type='number'
                        {...(isSubmit && contribution === '' && { error: true })}
                        value={contribution}
                        onChange={e => setContribution(Number(e.target.value))}
                    />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', mt: '20px' }}>
                    <LoadingButton
                        variant='contained'
                        {...(isLoading && { loading: true })}
                        loadingPosition='start'
                        startIcon={<SaveIcon />}
                        onClick={handleSave}
                    >
                        {t('COMMON.BUTTON.SAVE')}
                    </LoadingButton>
                    <LoadingButton
                        variant='contained'
                        {...(isLoading && { loading: true })}
                        loadingPosition='start'
                        startIcon={<SaveIcon />}
                        onClick={handleSaveAndClose}
                    >
                        {t('COMMON.BUTTON.SAVE_AND_CLOSE')}
                    </LoadingButton>
                    <Button
                        variant='contained'
                        startIcon={<XIcon />}
                        onClick={() => router.push('/admin/benefit')}
                    >
                        {t('COMMON.BUTTON.CLOSE')}
                    </Button>
                </Box>
            </Paper>
        </Box>
    )
}

export default CreateBenefitPage
