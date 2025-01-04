import { Avatar, Box, Button, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useRef, useEffect, useState } from 'react'
import { useGetAuthMeQuery } from '@/services/AuthService'
import ErrorPage from '@/app/user/requests/ErrorPage'
import { formatDate } from '@/utils/formatDate'
import Loading from '@/components/Loading'
import { Download, AlertCircle } from 'lucide-react'

interface EmployeeProps {
    aspnetUserId: string
}

const Employee: React.FC<EmployeeProps> = ({ aspnetUserId }) => {
    const { t } = useTranslation('common')
    const [openErrorReport, setopenErrorReport] = useState(false)
    const prevOpen = useRef(open)
    useEffect(() => {
        prevOpen.current = open
    }, [open, aspnetUserId])

    const { data: responseGetMeData, isFetching: isFetchingGetMe } = useGetAuthMeQuery()
    const infoMe = responseGetMeData?.Data

    if (isFetchingGetMe || !infoMe) {
        return <Loading />
    }

    {
        /*const [fullName, setFullName] = useState('')
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [startDateWork, setStartDateWork] = useState('')
    const [gender, setGender] = useState(null)
    const [address, setAddress] = useState('')
    const [note, setNote] = useState('')
    const [birthday, setBirthday] = useState('')
    const [departmentName, setDepartmentName] = useState(0)
    const [employeeId, setEmployeeId] = useState('')
    const [roles, setRoles] = useState<string[]>([])

    const { data: responseData, isFetching: isFetchingGetById } = useGetByIdUsersQuery(aspnetUserId)

    const data = responseData?.Data
    useEffect(() => {
        if (!isFetchingGetById && data) {
            setEmployeeId(data.EmployeeId)
            setFullName(data.FullName)
            setUserName(data.UserName)
            setEmail(data.Email)
            setPhoneNumber(data.PhoneNumber)
            setStartDateWork(data.StartDateWork)
            setGender(data.Gender)
            setAddress(data.Address)
            setNote(data.Note)
            setBirthday(data.Birthday)
            setDepartmentName(data.departmentName)
            setRoles(data.Roles)
        }
    }, [data, isFetchingGetById])*/
    }

    return (
        <Box
            sx={{
                width: '100%',
                boxShadow: 'var(--box-shadow-paper)',
                borderRadius: '30px',
                padding: '35px',
                backgroundColor: 'var(--attendance-bg1)'
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between'
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
                            height: '42px',
                            backgroundColor: '#4effca',
                            borderRadius: '4px',
                            mr: '14px'
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
                        alignItems: 'center',
                        gap: '18px'
                    }}
                >
                    <Button
                        sx={{
                            padding: '8px 12px',
                            borderRadius: '8px',
                            height: '41.5px',
                            mb: 'auto',
                            fontWeight: 'bold',
                            display: 'flex',
                            gap: '10px',
                            color: '#040506',
                            backgroundColor: '#4effca',
                            textTransform: 'none',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Download size={20} />
                        {t('COMMON.ATTENDANCE.DOWNLOAD_INFO')}
                    </Button>

                    <Button
                        sx={{
                            padding: '8px 12px',
                            borderRadius: '8px',
                            height: '41.5px',
                            mb: 'auto',
                            fontWeight: 'bold',
                            display: 'flex',
                            gap: '10px',
                            color: '#040506',
                            backgroundColor: '#ff4e4e',
                            textTransform: 'none',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        onClick={() => setopenErrorReport(true)}
                    >
                        <AlertCircle size={20} />
                        {t('Báo lỗi')}
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

            <ErrorPage
                handleToggle={() => setopenErrorReport(false)}
                open={openErrorReport}
                reportedBy={infoMe.Id}
                type={'COMMON.SIDEBAR.EMPLOYEE'}
                typeId={infoMe.EmployeeId}
            />
        </Box>
    )
}

export default Employee
