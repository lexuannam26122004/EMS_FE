'use client'
import LoadingButton from '@mui/lab/LoadingButton'
import {
    Box,
    Paper,
    TextField,
    Typography,
    Select,
    MenuItem,
    SelectChangeEvent,
    InputLabel,
    Button,
    FormControl,
    FormLabel,
    FormControlLabel,
    RadioGroup,
    Chip,
    Avatar
} from '@mui/material'
import { SaveIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { XIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useCreateNotificationMutation } from '@/services/NotificationsService'
import { userSentNotificationId } from '@/utils/globalVariables'
import Radio from '@mui/material/Radio'
import SpecificUsersModal from './SpecificUsersModal'
import {
    selectedUsersToNotifySlice,
    selectedUsersToNotifySliceSelector
} from '@/redux/slices/selectedUsersToNotifySlice'
import { useSelector, useDispatch } from 'react-redux'
import { IAspNetUserGetAll } from '@/models/AspNetUser'
import DepartmentAndRoleModal from './DepartmentAndRoleModal'
import {
    selectedDepartmentsToNotifySelector,
    selectedDepartmentsToNotifySlice
} from '@/redux/slices/selectedDepartmentsToNotifySlice'
import { selectedRolesToNotifySelector, selectedRolesToNotifySlice } from '@/redux/slices/selectedRolesToNotifySlice'
import UploadFiles from './UploadFiles'
import ListRole from './ListRole'

function createNotification() {
    const { t } = useTranslation('common')
    const router = useRouter()
    const [typeNotification, setTypeNotification] = useState<string>('')
    const [openSelectType, setOpenSelectType] = useState(false)
    const [createNotification, { isError: isErrorCreate, isLoading, isSuccess: isSuccessCreate }] =
        useCreateNotificationMutation()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [files, setFiles] = useState<number[]>([])
    const [isSubmit, setIsSubmit] = useState(false)
    const dispatch = useDispatch()
    const [typeReceiveNotify, setTypeReceiveNotify] = useState('All')
    const [openSpecificUsersModal, setOpenSpecificUsersModal] = useState(false)
    const [openDepartmentAndRolesModal, setOpenDepartmentAndRolesModal] = useState(false)
    const selectedUsers = useSelector(selectedUsersToNotifySliceSelector)
    const selectedDepartment = useSelector(selectedDepartmentsToNotifySelector)
    const selectedRole = useSelector(selectedRolesToNotifySelector)

    const handleCloseSpecificUsersModal = () => {
        setOpenSpecificUsersModal(false)
    }
    const handleCloseDepartmentAndRolesModal = () => {
        setOpenDepartmentAndRolesModal(false)
    }

    const handleChange = (event: SelectChangeEvent<typeof typeNotification>) => {
        setTypeNotification(event.target.value)
    }

    const handleCloseSelectType = () => {
        setOpenSelectType(false)
    }

    const handleOpenSelectType = () => {
        setOpenSelectType(true)
    }

    const handleSave = async () => {
        setIsSubmit(true)
        if (
            typeNotification === '' ||
            title === '' ||
            content === '' ||
            (typeReceiveNotify === 'Specific_Users' && selectedUsers.length === 0) ||
            (typeReceiveNotify === 'Department_And_Role' &&
                (selectedDepartment.length === 0 || selectedRole.length === 0))
        ) {
            return
        }

        const data = {
            Type: typeNotification,
            Content: content,
            Title: title,
            ListUser: selectedUsers.map(x => x.Id),
            ListFile: files,
            UserId: userSentNotificationId,
            ListDept: selectedDepartment.map(x => x.Id),
            ListRole: selectedRole.map(x => x.Id),
            TypeToNotify: typeReceiveNotify === 'Department_And_Role' ? 2 : typeReceiveNotify === 'All' ? 1 : 3
        }

        await createNotification(data).unwrap()
    }

    const handleSaveAndClose = async () => {
        setIsSubmit(true)
        if (
            typeNotification === '' ||
            title === '' ||
            content === '' ||
            (typeReceiveNotify === 'Specific_Users' && selectedUsers.length === 0) ||
            (typeReceiveNotify === 'Department_And_Role' &&
                (selectedDepartment.length === 0 || selectedRole.length === 0))
        ) {
            return
        }

        const data = {
            Type: typeNotification,
            Content: content,
            Title: title,
            ListUser: selectedUsers.map(x => x.Id),
            ListFile: files,
            UserId: userSentNotificationId,
            ListDept: selectedDepartment.map(x => x.Id),
            ListRole: selectedRole.map(x => x.Id),
            TypeToNotify: typeReceiveNotify === 'Department_And_Role' ? 2 : typeReceiveNotify === 'All' ? 1 : 3
        }

        await createNotification(data).unwrap()

        router.push('/admin')
    }

    const handleDeleteUserChip = (userId: string) => {
        dispatch(
            selectedUsersToNotifySlice.actions.updateSelectedUsersToNotifySlice(
                selectedUsers.filter(temp => temp.Id !== userId)
            )
        )
    }
    const handleDeleteRoleChip = (roleId: string) => {
        dispatch(
            selectedRolesToNotifySlice.actions.updateSelectedRolesToNotifySlice(
                selectedRole.filter(temp => temp.Id !== roleId)
            )
        )
    }
    const handleDeleteDeptChip = (id: number) => {
        dispatch(
            selectedDepartmentsToNotifySlice.actions.updateSelectedDepartmentsToNotifySlice(
                selectedDepartment.filter(temp => temp.Id !== id)
            )
        )
    }

    return (
        <Box width='100%'>
            <Paper
                elevation={0}
                sx={{
                    background: 'var(--background-color)',
                    width: '100%',
                    padding: '20px 20px 21px',
                    border: '1px solid var(--border-color)',
                    overflow: 'hidden',
                    borderRadius: '6px'
                }}
            >
                <Typography
                    sx={{
                        fontSize: '22px',
                        fontWeight: 'bold',
                        color: 'var(--text-color)',
                        marginBottom: '20px'
                    }}
                >
                    {t('COMMON.CREATE_NOTIFICATION.TITLE_PAGE')}
                </Typography>

                <Box sx={{ display: 'flex', gap: '20px', mt: '7px' }}>
                    <Box width='100%'>
                        <TextField
                            label={t('COMMON.CREATE_NOTIFICATION.TITLE*')}
                            multiline
                            maxRows={4}
                            {...(isSubmit === true && title === '' && { error: true })}
                            sx={{
                                width: '100%',
                                color: 'var(--text-color)',
                                '& fieldset': {
                                    borderRadius: '8px',
                                    color: 'var(--text-color)',
                                    borderColor: 'var(--border-color)'
                                },
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
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                        <Typography
                            sx={{
                                visibility: isSubmit === true && title === '' ? 'visible' : 'hidden',
                                color: 'red',
                                margin: '1px 0 0 10px',
                                fontSize: '12px'
                            }}
                        >
                            {t('COMMON.TEXTFIELD.REQUIRED')}
                        </Typography>
                    </Box>
                    <Box>
                        <FormControl
                            sx={{ width: '140px' }}
                            {...(isSubmit && typeNotification === '' && { error: true })}
                        >
                            <InputLabel
                                id='select-label'
                                sx={{
                                    color: 'var(--text-label-color)',
                                    '&.Mui-focused': {
                                        color: 'var(--selected-color)'
                                    }
                                }}
                            >
                                {t('COMMON.CREATE_NOTIFICATION.TYPE')}
                            </InputLabel>
                            <Select
                                labelId='select-label'
                                open={openSelectType}
                                onClose={handleCloseSelectType}
                                onOpen={handleOpenSelectType}
                                value={typeNotification}
                                onChange={handleChange}
                                label={t('COMMON.CREATE_NOTIFICATION.TYPE')}
                                sx={{
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'var(--hover-color)'
                                    },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'var(--selected-color)',
                                        color: 'var(--text-color)'
                                    },
                                    '& fieldset': {
                                        borderRadius: '8px',
                                        borderColor: 'var(--border-color)'
                                    },
                                    '& .MuiSelect-icon': {
                                        color: 'var(--text-color)'
                                    },
                                    '& .MuiInputBase-input': {
                                        color: 'var(--text-color)'
                                    }
                                }}
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
                                <MenuItem value={'Public'}>{t('COMMON.NOTIFICATION_TYPE.PUBLIC')}</MenuItem>
                                <MenuItem value={'Benefit'}>{t('COMMON.NOTIFICATION_TYPE.BENEFIT')}</MenuItem>
                                <MenuItem value={'Salary'}>{t('COMMON.NOTIFICATION_TYPE.SALARY')}</MenuItem>
                                <MenuItem value={'Reward'}>{t('COMMON.NOTIFICATION_TYPE.REWARD')}</MenuItem>
                                <MenuItem value={'Insurance'}>{t('COMMON.NOTIFICATION_TYPE.INSURANCE')}</MenuItem>
                                <MenuItem value={'Holiday'}>{t('COMMON.NOTIFICATION_TYPE.HOLIDAY')}</MenuItem>
                                <MenuItem value={'Discipline'}>{t('COMMON.NOTIFICATION_TYPE.DISCIPLINE')}</MenuItem>
                                <MenuItem value={'Timekeeping'}>{t('COMMON.NOTIFICATION_TYPE.TIMEKEEPING')}</MenuItem>
                            </Select>
                        </FormControl>
                        <Typography
                            sx={{
                                visibility: isSubmit === true && typeNotification === '' ? 'visible' : 'hidden',
                                color: 'red',
                                margin: '1px 0 0 10px',
                                fontSize: '12px'
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
                        label={t('COMMON.CREATE_NOTIFICATION.CONTENT*')}
                        multiline
                        {...(isSubmit === true && content === '' && { error: true })}
                        maxRows={8}
                        minRows={4}
                        sx={{
                            width: '100%',
                            color: 'var(--text-color)',
                            '& fieldset': {
                                borderRadius: '8px',
                                color: 'var(--text-color)',
                                borderColor: 'var(--border-color)'
                            },
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
                    <Typography
                        sx={{
                            visibility: isSubmit === true && content === '' ? 'visible' : 'hidden',
                            color: 'red',
                            margin: '1px 0 0 10px',
                            fontSize: '12px'
                        }}
                    >
                        {t('COMMON.TEXTFIELD.REQUIRED')}
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: '15px', mt: '7px' }}>
                    <FormControl>
                        <FormLabel
                            id='demo-row-radio-buttons-group-label'
                            sx={{
                                color: 'var(--text-color)'
                            }}
                        >
                            {t('COMMON.CREATE_NOTIFICATION.USERS_TO_NOTIFY')}
                        </FormLabel>
                        <RadioGroup
                            aria-labelledby='demo-row-radio-buttons-group-label'
                            name='row-radio-buttons-group'
                            defaultValue={'All'}
                            onChange={e => setTypeReceiveNotify(e.target.value)}
                        >
                            <FormControlLabel
                                value='All'
                                control={
                                    <Radio
                                        sx={{
                                            color: 'var(--text-color)',
                                            '&.Mui-checked': {
                                                color: 'var(--button-color)'
                                            },
                                            '&:hover': {
                                                backgroundColor: 'var(--hover-color)'
                                            }
                                        }}
                                    />
                                }
                                label={t('COMMON.CREATE_NOTIFICATION.ALL_USERS')}
                                sx={{
                                    color: 'var(--text-color)'
                                }}
                            />
                            <FormControlLabel
                                value='Department_And_Role'
                                control={
                                    <Radio
                                        sx={{
                                            color: 'var(--text-color)',
                                            '&.Mui-checked': {
                                                color: 'var(--button-color)'
                                            },
                                            '&:hover': {
                                                backgroundColor: 'var(--hover-color)'
                                            }
                                        }}
                                    />
                                }
                                label={t('COMMON.CREATE_NOTIFICATION.DEPARTMENT_AND_ROLE')}
                                onClick={() => setOpenDepartmentAndRolesModal(true)}
                                sx={{
                                    color: 'var(--text-color)'
                                }}
                            />
                            <FormControlLabel
                                value='Specific_Users'
                                control={
                                    <Radio
                                        sx={{
                                            color: 'var(--text-color)',
                                            '&.Mui-checked': {
                                                color: 'var(--button-color)'
                                            },
                                            '&:hover': {
                                                backgroundColor: 'var(--hover-color)'
                                            }
                                        }}
                                    />
                                }
                                label={t('COMMON.CREATE_NOTIFICATION.SPECIFIC_USERS')}
                                onClick={() => setOpenSpecificUsersModal(true)}
                                sx={{
                                    color: 'var(--text-color)'
                                }}
                            />
                        </RadioGroup>
                    </FormControl>

                    <Box display='flex' flexDirection='column' flex={1}>
                        <Box
                            flex={1}
                            display={typeReceiveNotify === 'All' ? 'none' : 'block'}
                            sx={{
                                border:
                                    (typeReceiveNotify === 'Specific_Users' && selectedUsers.length === 0) ||
                                    (typeReceiveNotify === 'Department_And_Role' &&
                                        (selectedDepartment.length === 0 || selectedRole.length === 0))
                                        ? '1px solid #d32f2f'
                                        : '1px solid var(--border-color)',
                                height: '100%',
                                borderRadius: '6px',
                                padding: '15px'
                            }}
                        >
                            <Box>
                                <Typography
                                    sx={{
                                        color: 'var(--text-color)'
                                    }}
                                    display={typeReceiveNotify === 'Department_And_Role' ? 'block' : 'none'}
                                >
                                    {t('COMMON.CREATE_NOTIFICATION.BY_DEPARTMENT_H')}
                                </Typography>
                                {typeReceiveNotify === 'Department_And_Role' &&
                                    (selectedDepartment.length === 0 ? (
                                        <Typography
                                            sx={{ fontStyle: 'italic', color: 'var(--button-alert-hover-color)' }}
                                        >
                                            {t('COMMON.CREATE_NOTIFICATION.EMPTY')}
                                        </Typography>
                                    ) : (
                                        selectedDepartment.map((dept, index) => (
                                            <Chip
                                                key={index}
                                                onDelete={() => handleDeleteDeptChip(dept.Id)}
                                                sx={{
                                                    mr: '10px',
                                                    mt: '10px',
                                                    color: 'var(--text-color)',
                                                    '& .MuiChip-deleteIcon': {
                                                        color: 'var(--icon-delete-chip-color)',
                                                        '&:hover': {
                                                            color: 'var(--hover-icon-delete-chip-color)'
                                                        }
                                                    }
                                                }}
                                                label={dept.Name}
                                                variant='outlined'
                                            />
                                        ))
                                    ))}
                            </Box>

                            <Box>
                                <Typography
                                    display={typeReceiveNotify === 'Department_And_Role' ? 'block' : 'none'}
                                    sx={{
                                        mt: '14px',
                                        color: 'var(--text-color)'
                                    }}
                                >
                                    {t('COMMON.CREATE_NOTIFICATION.BY_ROLE_H')}
                                </Typography>
                                {typeReceiveNotify === 'Department_And_Role' &&
                                    (selectedRole.length === 0 ? (
                                        <Typography
                                            sx={{ fontStyle: 'italic', color: 'var(--button-alert-hover-color)' }}
                                        >
                                            {t('COMMON.CREATE_NOTIFICATION.EMPTY')}
                                        </Typography>
                                    ) : (
                                        selectedRole.map((role, index) => (
                                            <Chip
                                                key={index}
                                                onDelete={() => handleDeleteRoleChip(role.Id)}
                                                sx={{
                                                    mr: '10px',
                                                    mt: '10px',
                                                    color: 'var(--text-color)',
                                                    '& .MuiChip-deleteIcon': {
                                                        color: 'var(--icon-delete-chip-color)',
                                                        '&:hover': {
                                                            color: 'var(--hover-icon-delete-chip-color)'
                                                        }
                                                    }
                                                }}
                                                label={role.Name}
                                                variant='outlined'
                                            />
                                        ))
                                    ))}
                            </Box>

                            <Box>
                                <Typography
                                    sx={{
                                        color: 'var(--text-color)'
                                    }}
                                    display={typeReceiveNotify === 'Specific_Users' ? 'block' : 'none'}
                                >
                                    {t('COMMON.CREATE_NOTIFICATION.USERS_WILL_SEE_THE_POST')}
                                </Typography>
                                {typeReceiveNotify === 'Specific_Users' &&
                                    (selectedUsers.length === 0 ? (
                                        <Typography
                                            sx={{ fontStyle: 'italic', color: 'var(--button-alert-hover-color)' }}
                                        >
                                            {t('COMMON.CREATE_NOTIFICATION.EMPTY')}
                                        </Typography>
                                    ) : (
                                        selectedUsers.map((user, index) => (
                                            <Chip
                                                key={index}
                                                avatar={
                                                    user.AvatarPath ? (
                                                        <Avatar alt='avatar' src={user.AvatarPath} />
                                                    ) : (
                                                        <Avatar>{user.FullName[0]}</Avatar>
                                                    )
                                                }
                                                onDelete={() => handleDeleteUserChip(user.Id)}
                                                sx={{
                                                    mr: '10px',
                                                    mt: '10px',
                                                    color: 'var(--text-color)',
                                                    '& .MuiChip-deleteIcon': {
                                                        color: 'var(--icon-delete-chip-color)',
                                                        '&:hover': {
                                                            color: 'var(--hover-icon-delete-chip-color)'
                                                        }
                                                    }
                                                }}
                                                label={user.FullName}
                                                variant='outlined'
                                            />
                                        ))
                                    ))}
                            </Box>
                        </Box>
                        <Typography
                            sx={{
                                visibility:
                                    isSubmit === true &&
                                    ((typeReceiveNotify === 'Specific_Users' && selectedUsers.length === 0) ||
                                        (typeReceiveNotify === 'Department_And_Role' &&
                                            (selectedDepartment.length === 0 || selectedRole.length === 0)))
                                        ? 'visible'
                                        : 'hidden',
                                color: 'red',
                                margin: '1px 0 0 10px',
                                fontSize: '12px'
                            }}
                        >
                            {t('COMMON.TEXTFIELD.REQUIRED')}
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ mt: '5px' }}>
                    <UploadFiles files={files} setFiles={setFiles} />
                </Box>

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
                            router.push('/admin')
                        }}
                    >
                        {t('COMMON.BUTTON.CLOSE')}
                    </Button>
                </Box>
            </Paper>
            <SpecificUsersModal open={openSpecificUsersModal} handleClose={handleCloseSpecificUsersModal} />
            <DepartmentAndRoleModal
                open={openDepartmentAndRolesModal}
                handleClose={handleCloseDepartmentAndRolesModal}
            />
        </Box>
    )
}

export default createNotification
