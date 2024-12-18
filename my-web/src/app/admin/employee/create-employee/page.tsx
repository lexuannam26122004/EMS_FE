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
import Image from 'next/image';
import { useTranslation } from 'react-i18next'
import { SaveIcon, XIcon, RefreshCcwIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useGetAllUsersQuery, useCreateUsersMutation } from '@/services/AspNetUserService'
import { useEffect, useState } from 'react'
import LoadingButton from '@mui/lab/LoadingButton'
import { useToast } from '@/hooks/useToast'
import { IAspNetUserGetAll } from '@/models/AspNetUser'

import { IAspNetRoleGetAll } from '@/models/AspNetRole'
import { useGetAllRolesQuery } from '@/services/AspNetRoleService'

import { IDepartmentGetAll } from '@/models/Department'
import { useGetAllDepartmentsQuery } from '@/services/DepartmentService'

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
    const [gender, setGender] = useState('')
    const [address, setAddress] = useState('')
    const [note, setNote] = useState('')
    const [birthday, setBirthday] = useState('')
    const [departmentId, setDepartmentId] = useState('')
    const [password, setPassword] = useState('')
    const [roles, setRoles] = useState<string[]>([])
    const [isExistingUser, setIsExistingUser] = useState(false)
    const [isExistingEmail, setIsExistingEmail] = useState(false)

    const [previewSrc, setPreviewSrc] = useState<string>(
        'https://assets.minimals.cc/public/assets/images/mock/avatar/avatar-2.webp'
    )

    const [file, setFile] = useState<File | null>(null)

    const toast = useToast()
    const [isSubmit, setIsSubmit] = useState(false)

    const [createUsers, { isSuccess, isError, reset }] = useCreateUsersMutation()

    const { data: userResponse, isLoading: isUsersLoading, refetch } = useGetAllUsersQuery()
    const employee = (userResponse?.Data?.Records as IAspNetUserGetAll[]) || []

    const { data: roleResponse, isLoading: isRoleLoading } = useGetAllRolesQuery()
    const role = (roleResponse?.Data?.Records as IAspNetRoleGetAll[]) || []

    const { data: departmentResponse, isLoading: isDepartmentLoading } = useGetAllDepartmentsQuery()
    const department = (departmentResponse?.Data?.Records as IDepartmentGetAll[]) || []

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    const isPasswordValid = passwordRegex.test(password)

    const [isSaveLoading, setIsSaveLoading] = useState(false)
    const [isSaveAndCloseLoading, setIsSaveAndCloseLoading] = useState(false)

    useEffect(() => {
        setStartDateWork(getCurrentDateTime())
        setBirthday(getCurrentDateTime())
    }, [])

    const handleSave = async () => {
        setIsSaveLoading(true)
        setIsSubmit(true)
        if (
            fullName === '' ||
            userName === '' ||
            email === '' ||
            phoneNumber === '' ||
            startDateWork === '' ||
            gender === '' ||
            address === '' ||
            birthday === '' ||
            departmentId === '' ||
            password === '' ||
            !Array.isArray(roles) ||
            roles.length === 0 ||
            isExistingUser ||
            isExistingEmail ||
            !isPasswordValid
        ) {
            setIsSaveLoading(false)
            return
        }
        const data = {
            FullName: fullName,
            UserName: userName,
            Email: email,
            PhoneNumber: phoneNumber,
            StartDateWork: new Date(startDateWork),
            Gender: gender === 'nam' ? true : gender === 'nữ' ? false : undefined,
            Address: address,
            Note: note,
            Birthday: new Date(birthday),
            DepartmentId: Number(departmentId),
            Password: password,
            Roles: roles,
            IsActive: true,
            AvatarFileId: 0
        }
        try {
            await createUsers(data).unwrap()
        } finally {
            setIsSaveLoading(false)
        }
        setIsSubmit(false)
    }

    useEffect(() => {
        if (isSuccess === true) {
            toast(t('Tạo nhân viên thành công'), 'success')
            refetch()
            setIsExistingUser(true)
            setIsExistingEmail(true)
            reset()
        }
        if (isError === true) {
            toast(t('Tạo nhân viên thất bại'), 'error')
            reset()
        }
    }, [isSuccess, isError, toast, t, reset, refetch])

    const handleSaveAndClose = async () => {
        setIsSaveAndCloseLoading(true)
        setIsSubmit(true)
        if (
            fullName === '' ||
            userName === '' ||
            email === '' ||
            phoneNumber === '' ||
            startDateWork === '' ||
            gender === '' ||
            address === '' ||
            birthday === '' ||
            departmentId === '' ||
            password === '' ||
            !Array.isArray(roles) ||
            roles.length === 0 ||
            isExistingUser ||
            isExistingEmail ||
            !isPasswordValid
        ) {
            setIsSaveAndCloseLoading(false)
            return
        }
        const data = {
            FullName: fullName,
            UserName: userName,
            Email: email,
            PhoneNumber: phoneNumber,
            StartDateWork: new Date(startDateWork),
            Gender: gender === 'nam' ? true : gender === 'nữ' ? false : undefined,
            Address: address,
            Note: note,
            Birthday: new Date(birthday),
            DepartmentId: Number(departmentId),
            Password: password,
            Roles: roles,
            IsActive: true,
            AvatarFileId: 0
        }
        try {
            await createUsers(data).unwrap()
            router.push('/admin/employee')
        } finally {
            setIsSaveAndCloseLoading(false)
        }
        setIsSubmit(false)
    }

    if (isUsersLoading || isRoleLoading || isDepartmentLoading) return <div>Loading...</div>

    const triggerFileInput = () => {
        document.getElementById('fileInput')?.click()
    }

    // Handle image preview
    const previewImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null

        if (file) {
            // Check file size
            if (file.size > 3 * 1024 * 1024) {
                alert('File size must not exceed 3MB!')
                return
            }

            const reader = new FileReader()
            reader.onload = (e: ProgressEvent<FileReader>) => {
                setPreviewSrc(e.target?.result as string)
                setFile(file)
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Box
                sx={{
                    fontFamily: 'Arial, sans-serif',
                    backgroundColor: '#f9f9f9',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 0
                }}
            >
                <Box
                    sx={{
                        textAlign: 'center',
                        background: '#fff',
                        padding: '15px',
                        borderRadius: '10px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        maxWidth: '250px'
                    }}
                >
                    <Box
                        sx={{
                            position: 'relative',
                            cursor: 'pointer'
                        }}
                    >
                        <input
                            type='file'
                            id='fileInput'
                            accept='image/*'
                            onChange={previewImage}
                            style={{ display: 'none' }}
                        />

                        <Box
                            sx={{
                                width: '120px',
                                height: '120px',
                                borderRadius: '50%',
                                overflow: 'hidden',
                                margin: '0 auto 8px',
                                backgroundColor: '#f0f0f0',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'relative',
                                transition: 'box-shadow 0.3s ease'
                            }}
                            onMouseEnter={() => (document.getElementById('updatePhoto')!.style.display = 'flex')}
                            onMouseLeave={() => (document.getElementById('updatePhoto')!.style.display = 'none')}
                        >
                            <Image
                                src={previewSrc}
                                alt='Avatar'
                                layout='fill' // This makes the image cover the parent container
                                objectFit='cover' // Ensure the image maintains the same aspect ratio
                            />

                            <Box
                                id='updatePhoto'
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    background: 'rgba(0, 0, 0, 0.3)',
                                    display: 'none',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    fontSize: '14px',
                                    cursor: 'pointer',
                                    flexDirection: 'column',
                                    textAlign: 'center'
                                }}
                                onClick={triggerFileInput}
                            >
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='36'
                                    height='36'
                                    viewBox='0 0 24 24'
                                    fill='white'
                                >
                                    <path d='M12 10.25a.75.75 0 0 1 .75.75v1.25H14a.75.75 0 0 1 0 1.5h-1.25V15a.75.75 0 0 1-1.5 0v-1.25H10a.75.75 0 0 1 0-1.5h1.25V11a.75.75 0 0 1 .75-.75'></path>
                                    <path d='M9.778 21h4.444c3.121 0 4.682 0 5.803-.735a4.4 4.4 0 0 0 1.226-1.204c.749-1.1.749-2.633.749-5.697s0-4.597-.749-5.697a4.4 4.4 0 0 0-1.226-1.204c-.72-.473-1.622-.642-3.003-.702c-.659 0-1.226-.49-1.355-1.125A2.064 2.064 0 0 0 13.634 3h-3.268c-.988 0-1.839.685-2.033 1.636c-.129.635-.696 1.125-1.355 1.125c-1.38.06-2.282.23-3.003.702A4.4 4.4 0 0 0 2.75 7.667C2 8.767 2 10.299 2 13.364s0 4.596.749 5.697c.324.476.74.885 1.226 1.204C5.096 21 6.657 21 9.778 21M16 13a4 4 0 1 1-8 0a4 4 0 0 1 8 0m2-3.75a.75.75 0 0 0 0 1.5h1a.75.75 0 0 0 0-1.5z'></path>
                                </svg>
                                <span style={{ color: 'white' }}>Update Avatar</span>
                            </Box>
                        </Box>
                    </Box>
                    {/* Instructions */}
                    <Box
                        sx={{
                            fontSize: '12px',
                            color: '#666',
                            marginTop: '8px'
                        }}
                    >
                        Allowed: *.jpeg, *.jpg, *.png, *.gif
                        <br />
                        <small style={{ fontSize: '10px', color: '#999' }}>Max size: 3MB</small>
                    </Box>
                </Box>
            </Box>

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
                        <FormControl
                            fullWidth
                            error={isSubmit && departmentId === ''}
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
                            <InputLabel>Phòng ban*</InputLabel>
                            <Select
                                value={departmentId}
                                onChange={e => setDepartmentId(e.target.value)}
                                label='Phòng ban*'
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
                                {department.map(dept => (
                                    <MenuItem key={dept.Id} value={dept.Id}>
                                        {dept.Name}
                                    </MenuItem>
                                ))}
                            </Select>
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
                        </FormControl>
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
                                  : 'Hợp lệ'}
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
                                  : 'Hợp lệ'}
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
                            {role.map(roleItem => (
                                <MenuItem key={roleItem.Name} value={roleItem.Name}>
                                    <Checkbox
                                        checked={roles.includes(roleItem.Name)}
                                        sx={{
                                            color: 'var(--text-color)'
                                        }}
                                    />
                                    <ListItemText primary={roleItem.Name} />
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
                            error={isSubmit && gender === ''}
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
                                value={gender}
                                label='Giới tính*'
                                onChange={e => setGender(e.target.value)}
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
                                <MenuItem value='nam'>Nam</MenuItem>
                                <MenuItem value='nữ'>Nữ</MenuItem>
                                <MenuItem value='khác'>Khác</MenuItem>
                            </Select>
                            {isSubmit && gender === '' && (
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
                                  : 'Hợp lệ'}
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
                            onChange={e => {
                                const value = e.target.value

                                if (/^\d*$/.test(value)) {
                                    setPhoneNumber(value)
                                }
                            }}
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
