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
    FormHelperText,
    Checkbox,
    ListItemText
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { SaveIcon, XIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useGetAllUsersQuery, useCreateUsersMutation } from '@/services/AspNetUserService'
import { useEffect, useState } from 'react'
import LoadingButton from '@mui/lab/LoadingButton'
import { useToast } from '@/hooks/useToast'
import { IAspNetUserGetAll } from '@/models/AspNetUser'

const getCurrentDateTime = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

const CreateEmployeePage = () => {
    const { t } = useTranslation('common')
    const router = useRouter()
    const [fullName, setFullName] = useState('')
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [startDateWork, setStartDateWork] = useState('')
    const [sex, setSex] = useState('')
    const [address, setAddress] = useState('')
    const [note, setNote] = useState('')
    const [birthday, setBirthday] = useState('')
    const [departmentId, setDepartmentId] = useState('')
    const [password, setPassword] = useState('')
    const [roles, setRoles] = useState<string[]>([])
    const [isExistingUser, setIsExistingUser] = useState(false)
    const [isExistingEmail, setIsExistingEmail] = useState(false)

    const toast = useToast()
    const [isSubmit, setIsSubmit] = useState(false)

    const [createUsers, { isSuccess, isLoading, isError, reset }] = useCreateUsersMutation()
    const { data: userResponse, isLoading: isUsersLoading } = useGetAllUsersQuery()
    const employee = (userResponse?.Data?.Records as IAspNetUserGetAll[]) || []

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    const isPasswordValid = passwordRegex.test(password)

    useEffect(() => {
        setStartDateWork(getCurrentDateTime())
        setBirthday(getCurrentDateTime())
    }, [])

    const handleSave = async () => {
        setIsSubmit(true)
        if (
            fullName === '' ||
            userName === '' ||
            email === '' ||
            phoneNumber === '' ||
            startDateWork === '' ||
            sex === '' ||
            address === '' ||
            birthday === '' ||
            departmentId === '' ||
            password === '' ||
            !Array.isArray(roles) ||
            roles.length === 0 ||
            isExistingUser ||
            isExistingEmail||
            !isPasswordValid
        ) {
            return
        }
        const data = {
            FullName: fullName,
            UserName: userName,
            Email: email,
            PhoneNumber: phoneNumber,
            StartDateWork: new Date(startDateWork),
            Sex: sex === 'nam' ? 1 : sex === 'nữ' ? 2 : 0,
            Address: address,
            Note: note,
            Birthday: new Date(birthday),
            DepartmentId: Number(departmentId),
            Password: password,
            Roles: roles,
            IsActive: true,
            AvatarFileId: 0
        }
        await createUsers(data).unwrap()
        setIsSubmit(false)
    }

    useEffect(() => {
        if (isSuccess === true) {
            toast(t('Tạo nhân viên thành công'), 'success')
            reset()
        }
        if (isError === true) {
            toast(t('Tạo nhân viên thất bại'), 'error')
            reset()
        }
    }, [isSuccess, isError, toast, t, reset])

    const handleSaveAndClose = async () => {
        setIsSubmit(true)
        if (
            fullName === '' ||
            userName === '' ||
            email === '' ||
            phoneNumber === '' ||
            startDateWork === '' ||
            sex === '' ||
            address === '' ||
            birthday === '' ||
            departmentId === '' ||
            password === '' ||
            !Array.isArray(roles) ||
            roles.length === 0 ||
            isExistingUser ||
            isExistingEmail||
            !isPasswordValid
        ) {
            return
        }
        const data = {
            FullName: fullName,
            UserName: userName,
            Email: email,
            PhoneNumber: phoneNumber,
            StartDateWork: new Date(startDateWork),
            Sex: sex === 'nam' ? 1 : sex === 'nữ' ? 2 : 0,
            Address: address,
            Note: note,
            Birthday: new Date(birthday),
            DepartmentId: Number(departmentId),
            Password: password,
            Roles: roles,
            IsActive: true,
            AvatarFileId: 0
        }
        await createUsers(data).unwrap()
        setIsSubmit(false)
        router.push('/admin/employee')
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
                    {'Create a New Employee'}
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
                            label={'Họ và tên*'}
                            fullWidth
                            {...(isSubmit && fullName === '' && { error: true })}
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
                            value={fullName}
                            onChange={e => setFullName(e.target.value)}
                        />
                        <Typography
                            sx={{
                                color: 'red',
                                margin: '1px 0 0 10px',
                                fontSize: '12px',
                                visibility: isSubmit && fullName === '' ? 'visible' : 'hidden'
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
                            label={'Email*'}
                            fullWidth
                            {...(isSubmit && (email === '' || isExistingEmail) && { error: true })}
                            type='email'
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
                            value={email}
                            onChange={e => {
                                setEmail(e.target.value)
                                setIsExistingEmail(employee.some(user => user.Email === e.target.value.trim()))
                            }}
                        />
                        <Typography
                            sx={{
                                color: 'red',
                                margin: '1px 0 0 10px',
                                fontSize: '12px',
                                visibility:
                                    isSubmit && email === '' ? 'visible' : isExistingEmail ? 'visible' : 'hidden'
                            }}
                        >
                            {isSubmit && email === ''
                                ? t('COMMON.TEXTFIELD.REQUIRED')
                                : isExistingEmail
                                  ? t('Email đã tồn tại')
                                  : ''}
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
                            label={'Tên tài khoản*'}
                            fullWidth
                            {...(isSubmit && (userName === '' || isExistingUser) && { error: true })}
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
                            value={userName}
                            onChange={e => {
                                setUserName(e.target.value)
                                setIsExistingUser(employee.some(user => user.UserName === e.target.value.trim()))
                            }}
                        />
                        <Typography
                            sx={{
                                color: 'red',
                                margin: '1px 0 0 10px',
                                fontSize: '12px',
                                visibility:
                                    isSubmit && userName === '' ? 'visible' : isExistingUser ? 'visible' : 'hidden'
                            }}
                        >
                            {isSubmit && userName === ''
                                ? t('COMMON.TEXTFIELD.REQUIRED')
                                : isExistingUser
                                  ? t('Tên tài khoản này đã tồn tại')
                                  : ''}
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            width: 'calc(50% - 10px)'
                        }}
                    >
                        <TextField
                            variant='outlined'
                            label={'Mật khẩu*'}
                            fullWidth
                            {...(isSubmit && (password === '' || !isPasswordValid) && { error: true })}
                            type='password'
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
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <Typography
                            sx={{
                                color: 'red',
                                margin: '1px 0 0 10px',
                                fontSize: '12px',
                                visibility: isSubmit && (password === '' || !isPasswordValid) ? 'visible' : 'hidden'
                            }}
                        >
                            {isSubmit && password === ''
                                ? t('COMMON.TEXTFIELD.REQUIRED')
                                : !isPasswordValid
                                  ? t('Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ cái và số.')
                                  : ''}
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ mt: '7px' }}>
                    <FormControl
                        variant='outlined'
                        fullWidth
                        {...(isSubmit && (!Array.isArray(roles) || roles.length === 0) && { error: true })}
                        sx={{
                            backgroundColor: 'var(--background-color)',
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
                        <InputLabel id='roles-label'>Chức vụ*</InputLabel>
                        <Select
                            label={'Chức vụ*'}
                            multiple
                            value={roles}
                            onChange={event => setRoles(event.target.value as string[])}
                            renderValue={selected => (selected as string[]).join(', ')}
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
                            {['Administrator', 'Manager', 'Employee', 'IT Support'].map(role => (
                                <MenuItem key={role} value={role}>
                                    <Checkbox
                                        checked={roles.includes(role)}
                                        sx={{
                                            color: 'var(--text-color)'
                                        }}
                                    />
                                    <ListItemText primary={role} />
                                </MenuItem>
                            ))}
                        </Select>

                        <Typography
                            sx={{
                                color: 'red',
                                margin: '1px 0 0 10px',
                                fontSize: '12px',
                                visibility:
                                    isSubmit && (!Array.isArray(roles) || roles.length === 0) ? 'visible' : 'hidden'
                            }}
                        >
                            {t('COMMON.TEXTFIELD.REQUIRED')}
                        </Typography>
                    </FormControl>
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
                        <FormControl
                            fullWidth
                            error={isSubmit && sex === ''}
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
                            <InputLabel>Giới tính*</InputLabel>

                            <Select
                                labelId='gender-label'
                                id='gender'
                                value={sex}
                                label='Giới tính*'
                                onChange={e => setSex(e.target.value)}
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
                                <MenuItem value='nam'>Nam</MenuItem>
                                <MenuItem value='nữ'>Nữ</MenuItem>
                            </Select>
                            {isSubmit && sex === '' && (
                                <FormHelperText>{t('COMMON.TEXTFIELD.REQUIRED')}</FormHelperText>
                            )}
                        </FormControl>
                    </Box>

                    <Box
                        sx={{
                            width: 'calc(50% - 10px)'
                        }}
                    >
                        <TextField
                            variant='outlined'
                            label={t('Địa chỉ*')}
                            fullWidth
                            {...(isSubmit && address === '' && { error: true })}
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
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                        />
                        <Typography
                            sx={{
                                color: 'red',
                                margin: '1px 0 0 10px',
                                fontSize: '12px',
                                visibility: isSubmit && address === '' ? 'visible' : 'hidden'
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
                            label={'Ngày sinh*'}
                            type='date'
                            fullWidth
                            {...(isSubmit && birthday === '' && { error: true })}
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
                            value={birthday}
                            onChange={e => setBirthday(e.target.value)}
                        />
                        <Typography
                            sx={{
                                color: 'red',
                                margin: '1px 0 0 10px',
                                fontSize: '12px',
                                visibility: isSubmit && birthday === '' ? 'visible' : 'hidden'
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
                            label={'Ngày vào làm*'}
                            fullWidth
                            {...(isSubmit && startDateWork === '' && { error: true })}
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
                            value={startDateWork}
                            onChange={e => setStartDateWork(e.target.value)}
                        />
                        <Typography
                            sx={{
                                color: 'red',
                                margin: '1px 0 0 10px',
                                fontSize: '12px',
                                visibility: isSubmit && startDateWork === '' ? 'visible' : 'hidden'
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
                            label={'Phòng ban*'}
                            fullWidth
                            {...(isSubmit && departmentId === '' && { error: true })}
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
                            value={departmentId}
                            onChange={e => setDepartmentId(e.target.value)}
                        />
                        <Typography
                            sx={{
                                color: 'red',
                                margin: '1px 0 0 10px',
                                fontSize: '12px',
                                visibility: isSubmit && departmentId === '' ? 'visible' : 'hidden'
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
                            label={'Số điện thoại*'}
                            fullWidth
                            {...(isSubmit && phoneNumber === '' && { error: true })}
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
                            value={phoneNumber}
                            onChange={e => setPhoneNumber(e.target.value)}
                        />
                        <Typography
                            sx={{
                                color: 'red',
                                margin: '1px 0 0 10px',
                                fontSize: '12px',
                                visibility: isSubmit && phoneNumber === '' ? 'visible' : 'hidden'
                            }}
                        >
                            {t('COMMON.TEXTFIELD.REQUIRED')}
                        </Typography>
                    </Box>
                </Box>

                <TextField
                    variant='outlined'
                    label={t('Note')}
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
                            router.push('/admin/employee')
                        }}
                    >
                        {t('COMMON.BUTTON.CLOSE')}
                    </Button>
                </Box>
            </Paper>
        </Box>
    )
}

export default CreateEmployeePage
