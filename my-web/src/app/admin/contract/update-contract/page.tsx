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
import { useRouter, useSearchParams } from 'next/navigation'

import { useEffect, useState } from 'react'
import LoadingButton from '@mui/lab/LoadingButton'
import { useToast } from '@/hooks/useToast'

import { IAspNetUserGetAll } from '@/models/AspNetUser'
import { useGetAllUsersQuery } from '@/services/AspNetUserService'

import {
    useUpdateEmploymentContractsMutation,
    useGetByIdEmploymentContractsQuery,
    useSearchEmploymentContractsQuery
} from '@/services/EmploymentContractService'

const getCurrentDateTime = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

const UpdateEmploymentContract = () => {
    const { t } = useTranslation('common')
    const router = useRouter()

    const [userId, setUserId] = useState('')
    const [contractName, setContractName] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [basicSalary, setBasicSalary] = useState('')
    const [clause, setClause] = useState('')
    const [probationPeriod, setProbationPeriod] = useState('')
    const [workingHours, setWorkingHours] = useState('')
    const [terminationClause, setTerminationClause] = useState('')
    const [typeContract, setTypeContract] = useState('')
    const [managerId, setManagerId] = useState('')

    function formatDate(dateString: string): string {
        const date = new Date(dateString)
        if (isNaN(date.getTime())) {
            return ''
        }
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')

        return `${year}-${month}-${day}`
    }

    const toast = useToast()
    const [isSubmit, setIsSubmit] = useState(false)

    const searchParams = useSearchParams()
    const id = searchParams.get('id') || ''
    const { data: responseData, isFetching: isFetchingGetById } = useGetByIdEmploymentContractsQuery(id)
    const [updateEmploymentContract, { isSuccess, isError, reset }] = useUpdateEmploymentContractsMutation()
    const data = responseData?.Data
    useEffect(() => {
        if (!isFetchingGetById && data) {
            setUserId(data.UserId || '')
            setContractName(data.ContractName || '')
            setStartDate(formatDate(data.StartDate))
            setEndDate(formatDate(data.EndDate))
            setBasicSalary(data.BasicSalary || '0')
            setClause(data.Clause || '')
            setProbationPeriod(data.ProbationPeriod || '0')
            setWorkingHours(data.WorkingHours || '0')
            setTerminationClause(data.TerminationClause || '')
            setTypeContract(data.TypeContract || '')
            setManagerId(data.ManagerId || '')
        }
    }, [data, isFetchingGetById])

    const { refetch } = useSearchEmploymentContractsQuery()
    const { data: userResponse, isLoading: isUsersLoading } = useGetAllUsersQuery()
    const employee = (userResponse?.Data?.Records as IAspNetUserGetAll[]) || []

    const [isSaveLoading, setIsSaveLoading] = useState(false)
    const [isSaveAndCloseLoading, setIsSaveAndCloseLoading] = useState(false)

    useEffect(() => {
        setStartDate(getCurrentDateTime())
        setEndDate(getCurrentDateTime())
    }, [])

    const handleSave = async () => {
        setIsSaveLoading(true)
        setIsSubmit(true)
        if (
            userId === '' ||
            contractName === '' ||
            startDate === '' ||
            endDate === '' ||
            basicSalary === '' ||
            probationPeriod === '' ||
            workingHours === '' ||
            typeContract === '' ||
            managerId === ''
        ) {
            setIsSaveLoading(false)
            return
        }
        const data = {
            Id: id,
            UserId: userId,
            ContractName: contractName,
            StartDate: new Date(startDate),
            EndDate: new Date(endDate),
            BasicSalary: Number(basicSalary),
            Clause: clause || '',
            IsActive: true,
            ProbationPeriod: Number(probationPeriod),
            WorkingHours: Number(workingHours),
            TerminationClause: terminationClause || '',
            ContractFileId: 0,
            TypeContract: typeContract,
            ManagerId: managerId
        }
        try {
            await updateEmploymentContract(data).unwrap()
        } finally {
            setIsSaveLoading(false)
        }
        setIsSubmit(false)
    }

    useEffect(() => {
        if (isSuccess === true) {
            toast(t('Cập nhật hợp đồng thành công'), 'success')
            refetch()
            reset()
        }
        if (isError === true) {
            toast(t('Cập nhật hợp đồng thất bại'), 'error')
            reset()
        }
    }, [isSuccess, isError, toast, t, reset, refetch])

    const handleSaveAndClose = async () => {
        setIsSaveAndCloseLoading(true)
        setIsSubmit(true)
        if (
            userId === '' ||
            contractName === '' ||
            startDate === '' ||
            endDate === '' ||
            basicSalary === '' ||
            clause === '' ||
            probationPeriod === '' ||
            workingHours === '' ||
            terminationClause === '' ||
            typeContract === '' ||
            managerId === ''
        ) {
            setIsSaveAndCloseLoading(false)
            return
        }
        const data = {
            Id: id,
            UserId: userId,
            ContractName: contractName,
            StartDate: new Date(startDate),
            EndDate: new Date(endDate),
            BasicSalary: Number(basicSalary),
            Clause: clause,
            IsActive: true,
            ProbationPeriod: Number(probationPeriod),
            WorkingHours: Number(workingHours),
            TerminationClause: terminationClause,
            ContractFileId: 0,
            TypeContract: typeContract,
            ManagerId: managerId
        }
        try {
            await updateEmploymentContract(data).unwrap()
            router.push('/admin/contract')
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
                    {'Update a Contract'}
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
                            getOptionLabel={option => `${option.EmployeeId} - ${option.FullName}`}
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
                                        <Typography>{`${option.EmployeeId} - ${option.FullName}`}</Typography>
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
                            getOptionLabel={option => `${option.EmployeeId} - ${option.FullName}`}
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
                                        <Typography>{`${option.EmployeeId} - ${option.FullName}`}</Typography>
                                    </Box>
                                )
                            }}
                            renderInput={params => (
                                <TextField
                                    {...params}
                                    variant='outlined'
                                    label={t('Thông tin nhân viên*')}
                                    fullWidth
                                    error={isSubmit && managerId === ''}
                                />
                            )}
                            value={employee.find(e => e.Id === managerId) || null}
                            onChange={(event, newValue) => setManagerId(newValue?.Id || '')}
                            isOptionEqualToValue={(option, value) => option.Id === value.Id}
                        />

                        <Typography
                            sx={{
                                color: 'red',
                                margin: '1px 0 0 10px',
                                fontSize: '12px',
                                visibility: isSubmit && managerId === '' ? 'visible' : 'hidden'
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
                        label={t('Tên hợp đồng*')}
                        id='fullWidth'
                        fullWidth
                        multiline
                        {...(isSubmit && contractName === '' && { error: true })}
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
                        value={contractName}
                        onChange={e => setContractName(e.target.value)}
                    />
                    <Typography
                        sx={{
                            color: 'red',
                            margin: '1px 0 0 10px',
                            fontSize: '12px',
                            visibility: isSubmit && contractName === '' ? 'visible' : 'hidden'
                        }}
                    >
                        {t('COMMON.TEXTFIELD.REQUIRED')}
                    </Typography>
                </Box>

                <TextField
                    variant='outlined'
                    label={t('Điều khoản hợp đồng')}
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
                    value={clause}
                    onChange={e => setClause(e.target.value)}
                />

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '20px',
                        mt: '25px'
                    }}
                >
                    <Box
                        sx={{
                            width: 'calc(50% - 10px)'
                        }}
                    >
                        <TextField
                            variant='outlined'
                            label={'Ngày bắt đầu*'}
                            type='date'
                            fullWidth
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

                    <Box
                        sx={{
                            width: 'calc(50% - 10px)'
                        }}
                    >
                        <TextField
                            variant='outlined'
                            label={'Ngày kết thúc*'}
                            fullWidth
                            {...(isSubmit && endDate === '' && { error: true })}
                            type='date'
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
                            label={t('Lương cơ bản*')}
                            fullWidth
                            {...(isSubmit && basicSalary === '' && { error: true })}
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
                            value={basicSalary}
                            onChange={e => setBasicSalary(e.target.value)}
                        />
                        <Typography
                            sx={{
                                color: 'red',
                                margin: '1px 0 0 10px',
                                fontSize: '12px',
                                visibility: isSubmit && basicSalary === '' ? 'visible' : 'hidden'
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
                            label={t('Số ngày thử việc*')}
                            fullWidth
                            {...(isSubmit && probationPeriod === '' && { error: true })}
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
                            value={probationPeriod}
                            onChange={e => setProbationPeriod(e.target.value)}
                        />
                        <Typography
                            sx={{
                                color: 'red',
                                margin: '1px 0 0 10px',
                                fontSize: '12px',
                                visibility: isSubmit && probationPeriod === '' ? 'visible' : 'hidden'
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
                            label={t('Số giờ làm việc mỗi ngày*')}
                            fullWidth
                            {...(isSubmit && workingHours === '' && { error: true })}
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
                            value={workingHours}
                            onChange={e => setWorkingHours(e.target.value)}
                        />
                        <Typography
                            sx={{
                                color: 'red',
                                margin: '1px 0 0 10px',
                                fontSize: '12px',
                                visibility: isSubmit && workingHours === '' ? 'visible' : 'hidden'
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
                            error={isSubmit && typeContract === ''}
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
                            <InputLabel> Chế độ làm việc*</InputLabel>

                            <Select
                                labelId='gender-label'
                                id='gender'
                                value={typeContract}
                                label=' Chế độ làm việc*'
                                onChange={e => setTypeContract(e.target.value)}
                                MenuProps={{
                                    PaperProps: {
                                        elevation: 0,
                                        sx: {
                                            backgroundColor: 'var(--background-color)',
                                            color: 'var(--text-color)',
                                            border: '1px solid var(--border-color)',
                                            '& .MuiMenuItem-root': {
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
                                        }
                                    }
                                }}
                            >
                                {['Full-time', 'Part-time', 'Flexible', 'Remote', 'Shift', 'Contract', 'Project'].map(
                                    (item, index) => (
                                        <MenuItem key={index} value={item}>
                                            {item}
                                        </MenuItem>
                                    )
                                )}
                            </Select>

                            <Typography
                                sx={{
                                    color: 'red',
                                    margin: '1px 0 0 10px',
                                    fontSize: '12px',
                                    visibility: isSubmit && typeContract === '' ? 'visible' : 'hidden'
                                }}
                            >
                                {t('COMMON.TEXTFIELD.REQUIRED')}
                            </Typography>
                        </FormControl>
                    </Box>
                </Box>

                <TextField
                    variant='outlined'
                    label={t('Điều khoản chấm dứt hợp đồng')}
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
                    value={terminationClause}
                    onChange={e => setTerminationClause(e.target.value)}
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
                            router.push('/admin/contract')
                        }}
                    >
                        {t('COMMON.BUTTON.CLOSE')}
                    </Button>
                </Box>
            </Paper>
        </Box>
    )
}

export default UpdateEmploymentContract
