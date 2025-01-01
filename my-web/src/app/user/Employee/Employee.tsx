import { TableContainer, Table, TableRow, TableBody, TableCell, Box} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useGetByIdUsersQuery } from '@/services/AspNetUserService'
import { useEffect, useState } from 'react'

interface EmployeeProps {
    aspnetUserId: string
}

const Employee: React.FC<EmployeeProps> = ({ aspnetUserId }) => {
    const { t } = useTranslation('common')

    const [fullName, setFullName] = useState('')
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
    }, [data, isFetchingGetById])


    return (
        <Box
            sx={{
                padding: '20px',
                backgroundColor: 'var(--hover-color)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                borderRadius: '12px',
                overflow: 'hidden',
                height: '600px',
                border: '1px solid #e0e0e0',
                width: '100%'
            }}
        >
            <Box
                sx={{
                    position: 'sticky',
                    top: 0,
                    backgroundColor: 'var(--background-color)',
                    padding: '15px 20px',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: 'var(--text-color)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #e0e0e0',
                    zIndex: 2,
                    marginBottom: '10px',
                    borderRadius: '12px'
                }}
            >
                Thông tin nhân viên
            </Box>

            <Box
                sx={{
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    borderRadius: '12px',
                    overflow: 'auto',
                    height: '480px',
                    width: '100%',
                    '&::-webkit-scrollbar': {
                        width: '10px' // Độ cao thanh cuộn
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: '#555', // Màu thanh cuộn
                        borderRadius: '4px'
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                        background: '#333'
                    }
                }}
            >
                <TableContainer
                    sx={{
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                        overflow: 'auto',
                        height: '480px',
                        width: '100%',
                        color: 'var(--text-color)'
                    }}
                >
                    <Table
                        sx={{
                            overflow: 'hidden',
                            backgroundColor: 'var(--background-color)'
                        }}
                    >
                        <TableBody>
                            {[
                                { label: t('ID'), value: employeeId },
                                { label: t('COMMON.EMPLOYEE.FULLNAME'), value: fullName || 'N/A' },
                                {
                                    label: t('COMMON.EMPLOYEE.DEPARTMENTNAME'),
                                    value: departmentName || 'N/A'
                                },
                                { label: t('COMMON.EMPLOYEE.USERNAME'), value: userName || 'N/A' },
                                {
                                    label: t('COMMON.EMPLOYEE.ROLES'),
                                    value: roles?.join(', ') || 'N/A'
                                },
                                {
                                    label: t('COMMON.EMPLOYEE.GENDER'),
                                    value: gender === true ? t('Nam') : gender === false ? t('Nữ') : t('Khác')
                                },
                                { label: t('COMMON.EMPLOYEE.ADDRESS'), value: address || 'N/A' },
                                {
                                    label: t('COMMON.EMPLOYEE.BIRTHDAY'),
                                    value:
                                        birthday && !isNaN(new Date(birthday).getTime())
                                            ? new Date(birthday).toLocaleDateString()
                                            : 'N/A'
                                },
                                {
                                    label: t('COMMON.EMPLOYEE.STARTDATE'),
                                    value:
                                        startDateWork && !isNaN(new Date(startDateWork).getTime())
                                            ? new Date(startDateWork).toLocaleDateString()
                                            : 'N/A'
                                },
                                { label: t('COMMON.EMPLOYEE.EMAIL'), value: email || 'N/A' },
                                { label: t('COMMON.EMPLOYEE.PHONENUMBER'), value: phoneNumber || 'N/A' },
                                { label: t('COMMON.EMPLOYEE.NOTE'), value: note || 'N/A' }
                            ].map((item, index) => (
                                <TableRow
                                    key={index}
                                    sx={{
                                        color: 'var(--text-color)',
                                        backgroundColor:
                                            index % 2 === 0 ? 'var(--hover-color)' : 'var(--background-color)',
                                        transition: 'background-color 0.3s ease'
                                    }}
                                >
                                    <TableCell
                                        sx={{
                                            fontSize: '18px',
                                            fontWeight: '600',
                                            paddingLeft: '30px',
                                            paddingRight: '30px',
                                            width: '40%',
                                            color: 'var(--text-color)'
                                        }}
                                    >
                                        {item.label}:
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            fontSize: '16px',
                                            paddingLeft: '30px',
                                            paddingRight: '30px',
                                            color: 'var(--text-color)'
                                        }}
                                    >
                                        {item.value}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    )
}

export default Employee
