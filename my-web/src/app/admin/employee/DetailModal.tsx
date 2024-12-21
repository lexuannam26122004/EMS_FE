'use client'

import {
    Box,
    Divider,
    Modal,
    Paper,
    TableContainer,
    Table,
    Typography,
    TableRow,
    TableBody,
    TableCell,
    Tooltip,
    Avatar,
    Tab,
    Tabs,
    CircularProgress
} from '@mui/material'
import { X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Pencil, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import AlertDialog from '@/components/AlertDialog'
import React, { useState } from 'react'
import { IAspNetUserGetAll } from '@/models/AspNetUser'
import { useGetAllUsersQuery, useChangeStatusUsersMutation } from '@/services/AspNetUserService'
import { IEmploymentContractSearch, IUserDetails } from '@/models/EmploymentContract'
import { useSearchEmploymentContractsQuery } from '@/services/EmploymentContractService'

interface Props {
    open: boolean
    handleToggle: () => void
    aspnetuser: IAspNetUserGetAll
    randomIndex: number
}

function DetailModal({ open, handleToggle, aspnetuser, randomIndex }: Props) {
    const { t } = useTranslation('common')
    const router = useRouter()
    const [openDialog, setOpenDialog] = useState(false)
    const { refetch } = useGetAllUsersQuery()
    const [changeEmployee] = useChangeStatusUsersMutation()
    const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null)
    const backgroundImageUrl = `/background/${randomIndex}.jpg`

    const handleDeleteClick = (id: string) => {
        setSelectedEmployeeId(id)
        setOpenDialog(true)
    }

    const handleDeleteEmployee = async () => {
        if (selectedEmployeeId) {
            await changeEmployee(selectedEmployeeId)
            setOpenDialog(false)
            setSelectedEmployeeId(null)
            refetch()
            window.location.reload()
        }
    }

    const [selectedTab, setSelectedTab] = useState(0)

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue)
        console.log('Selected Tab:', newValue)
    }

    const { data: contractResponse, isLoading: isContractsLoading } = useSearchEmploymentContractsQuery()
    const { data: userResponse, isLoading: isUsersLoading } = useGetAllUsersQuery()

    let users: IUserDetails[] = []

    const contract = (contractResponse?.Data?.Records as IEmploymentContractSearch[]) || []
    const employee = (userResponse?.Data?.Records as IAspNetUserGetAll[]) || []

    const foundContract = contract.find(contract => contract.UserId === aspnetuser.Id)

    if (foundContract) {
        const matchedEmployee = employee.find(emp => emp.Id === foundContract.UserId)
        const matchedManager = employee.find(emp => emp.Id === foundContract.ManagerId)

        users = [
            {
                ...foundContract,
                FullName: matchedEmployee?.FullName || 'N/A',
                EmployeeId: matchedEmployee?.EmployeeId || 'N/A',
                ManagerFullName: matchedManager?.FullName || 'N/A',
                Manager: matchedManager?.EmployeeId || 'N/A'
            }
        ]
    } else {
        users = []
    }

    if (isContractsLoading || isUsersLoading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '400px',
                    backgroundColor: '#f5f5f5'
                }}
            >
                <CircularProgress />
            </Box>
        )
    }

    const renderTableContent = () => {
        switch (selectedTab) {
            case 0:
                return [
                    { label: t('COMMON.EMPLOYEE.FULLNAME'), value: aspnetuser.FullName || 'N/A' },
                    { label: t('COMMON.EMPLOYEE.DEPARTMENTNAME'), value: aspnetuser.DepartmentName || 'N/A' },
                    { label: t('COMMON.EMPLOYEE.USERNAME'), value: aspnetuser.UserName || 'N/A' },
                    {
                        label: t('COMMON.EMPLOYEE.ROLES'),
                        value: aspnetuser.Roles?.join(', ') || 'N/A'
                    },
                    {
                        label: t('COMMON.EMPLOYEE.GENDER'),
                        value: aspnetuser.Gender === true ? t('Nam') : aspnetuser.Gender === false ? t('Nữ') : t('Khác')
                    },
                    { label: t('COMMON.EMPLOYEE.ADDRESS'), value: aspnetuser.Address || 'N/A' },
                    {
                        label: t('COMMON.EMPLOYEE.BIRTHDAY'),
                        value:
                            aspnetuser.Birthday && !isNaN(new Date(aspnetuser.Birthday).getTime())
                                ? new Date(aspnetuser.Birthday).toLocaleDateString()
                                : 'N/A'
                    },
                    {
                        label: t('COMMON.EMPLOYEE.STARTDATE'),
                        value:
                            aspnetuser.StartDateWork && !isNaN(new Date(aspnetuser.StartDateWork).getTime())
                                ? new Date(aspnetuser.StartDateWork).toLocaleDateString()
                                : 'N/A'
                    },
                    { label: t('COMMON.EMPLOYEE.EMAIL'), value: aspnetuser.Email || 'N/A' },
                    { label: t('COMMON.EMPLOYEE.PHONENUMBER'), value: aspnetuser.PhoneNumber || 'N/A' },
                    { label: t('COMMON.EMPLOYEE.NOTE'), value: aspnetuser.Note || 'N/A' }
                ]

            case 1:
                if (users.length > 0) {
                    return [
                        { label: t('ID'), value: users[0]?.Id },
                        {
                            label: t('COMMON.CONTRACT.INFORMATION'),
                            value: `${users[0].EmployeeId || 'N/A'} ${users[0].FullName || 'N/A'}`
                        },

                        {
                            label: t('COMMON.CONTRACT.INFORMATIONMANAGER'),
                            value: `${users[0].Manager || 'N/A'} ${users[0].ManagerFullName || 'N/A'}`
                        },

                        { label: t('COMMON.CONTRACT.CONTRACTNAME'), value: users[0].ContractName || 'N/A' },
                        {
                            label: t('COMMON.CONTRACT.STARTDATE'),
                            value:
                                users[0].StartDate && !isNaN(new Date(users[0].StartDate).getTime())
                                    ? new Date(users[0].StartDate).toLocaleDateString()
                                    : 'N/A'
                        },
                        {
                            label: t('COMMON.CONTRACT.ENDDATE'),
                            value:
                                users[0].EndDate && !isNaN(new Date(users[0].EndDate).getTime())
                                    ? new Date(users[0].EndDate).toLocaleDateString()
                                    : 'N/A'
                        },
                        { label: t('COMMON.CONTRACT.CLAUSE'), value: users[0].Clause || 'N/A' },
                        { label: t('COMMON.CONTRACT.BASICSALARY'), value: users[0].BasicSalary || 'N/A' },
                        { label: t('COMMON.CONTRACT.PROBATIONPERIOD'), value: users[0].ProbationPeriod || 'N/A' },
                        { label: t('COMMON.CONTRACT.WORKINGHOURS'), value: users[0].WorkingHours || 'N/A' },
                        { label: t('COMMON.CONTRACT.TYPECONTRACT'), value: users[0].TypeContract || 'N/A' },
                        { label: t('COMMON.CONTRACT.TERMINATIONCLAUSE'), value: users[0].TerminationClause || 'N/A' },
                        { label: t('COMMON.CONTRACT.APPENDIX'), value: users[0].Appendix || 'N/A' }
                    ]
                } else {
                    return []
                }
            case 2:
                return []
            case 3:
                return []
            default:
                return null
        }
    }

    return (
        <Modal open={open} onClose={handleToggle}>
            <Paper
                elevation={0}
                sx={{
                    width: '70%',
                    height: '90vh',
                    position: 'absolute',
                    overflowY: 'auto',
                    top: '50%',
                    left: '50%',
                    backgroundColor: 'var(--background-color)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '10px',
                    transform: 'translate(-50%, -50%)',
                    '&::-webkit-scrollbar': {
                        display: 'none'
                    }
                }}
            >
                <Box
                    sx={{
                        paddingBlock: 1.4,
                        paddingInline: 9,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: '1',
                        position: 'sticky',
                        top: 0,
                        backgroundColor: 'var(--background-color)',
                        borderBottom: '1px solid var(--border-color)'
                    }}
                >
                    <Typography
                        variant='h6'
                        sx={{
                            fontWeight: 'Bold',
                            fontSize: '18px',
                            textAlign: 'center',
                            margin: 'auto',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            color: 'var(--text-color)'
                        }}
                    >
                        {t('Xem chi tiết thông tin ') + aspnetuser.FullName}
                    </Typography>

                    <Box
                        sx={{
                            position: 'absolute',
                            right: '16px',
                            top: '8px',
                            cursor: 'pointer',
                            backgroundColor: 'var(--background-color)',
                            padding: '5px',
                            borderRadius: '50%',
                            border: '1px solid var(--border-color)',
                            '&:hover': {
                                backgroundColor: 'var(--hover-color)',
                                borderColor: 'var(--hover-color)'
                            }
                        }}
                        onClick={handleToggle}
                    >
                        <X style={{ color: 'var(--text-color)' }} />
                    </Box>
                </Box>
                <Divider sx={{ zIndex: '1', borderColor: 'var(--border-color)' }} />

                <Box
                    sx={{
                        width: '100%',
                        maxHeight: '80vh',
                        overflow: 'auto',
                        '&::-webkit-scrollbar-corner': {
                            borderRadius: '10px'
                        }
                    }}
                >
                    <Box
                        sx={{
                            width: '100%',
                            height: '250px',
                            backgroundImage: `url(${backgroundImageUrl})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            position: 'relative'
                        }}
                    >
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: '-90px',
                                left: '30px',
                                width: '180px',
                                height: '180px',
                                border: '5px solid #fff',
                                borderRadius: '50%',
                                overflow: 'hidden',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                            }}
                        >
                            <Avatar
                                src={
                                    aspnetuser.AvatarPath ||
                                    'https://localhost:44381/avatars/aa1678f0-75b0-48d2-ae98-50871178e9bd.jfif'
                                }
                                alt='Avatar'
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                }}
                            />
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '130px 30px 20px',
                            marginTop: '-100px'
                        }}
                    >
                        <Box
                            sx={{
                                marginLeft: '220px'
                            }}
                        >
                            <h1
                                style={{
                                    fontSize: '24px',

                                    marginBottom: '5px',
                                    fontWeight: 'bold',
                                    color: 'var(--text-color)'
                                }}
                            >
                                {aspnetuser.FullName}
                            </h1>
                            <p
                                style={{
                                    fontSize: '16px',

                                    color: 'var(--text-color)'
                                }}
                            >
                                {aspnetuser.Roles?.join(', ') || 'N/A'}
                            </p>
                        </Box>

                        <Box display='flex' alignItems='center' justifyContent='space-between' gap='10px'>
                            <Tooltip title={t('COMMON.BUTTON.EDIT')}>
                                <Box
                                    display='flex'
                                    alignItems='center'
                                    justifyContent='center'
                                    sx={{
                                        cursor: 'pointer',
                                        color: '#00d4ff',
                                        borderRadius: '50%',
                                        width: '42px',
                                        height: '42px',
                                        '&:hover': {
                                            backgroundColor: 'var(--hover-color)'
                                        }
                                    }}
                                    onClick={() => router.push(`/admin/employee/update-employee?id=${aspnetuser.Id}`)}
                                >
                                    <Pencil />
                                </Box>
                            </Tooltip>
                            <Tooltip title={t('COMMON.BUTTON.DELETE')}>
                                <Box
                                    display='flex'
                                    alignItems='center'
                                    justifyContent='center'
                                    sx={{
                                        cursor: 'pointer',
                                        color: 'red',
                                        borderRadius: '50%',
                                        width: '42px',
                                        height: '42px',
                                        '&:hover': {
                                            backgroundColor: 'var(--hover-color)'
                                        }
                                    }}
                                    onClick={() => handleDeleteClick(aspnetuser.Id)}
                                >
                                    <Trash2 />
                                </Box>
                            </Tooltip>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            paddingRight: '30px'
                        }}
                    >
                        <Tabs
                            value={selectedTab}
                            onChange={handleTabChange}
                            aria-label='right-aligned tabs'
                            sx={{
                                borderBottom: 1,
                                borderColor: 'divider'
                            }}
                        >
                            <Tab label='Cá Nhân' />
                            <Tab label='Hợp Đồng' />
                            <Tab label='Phúc Lợi' />
                            <Tab label='Kỉ Luật' />
                        </Tabs>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            padding: '5px',

                            borderTop: '1px solid #ddd',
                            borderBottom: '1px solid #ddd'
                        }}
                    ></Box>
                </Box>

                <TableContainer
                    sx={{
                        padding: '10px 3px 10px 10px',
                        scrollbarGutter: 'stable',
                        '&::-webkit-scrollbar': {
                            width: '7px',
                            height: '7px',
                            backgroundColor: 'var(--background-after-color)'
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: 'var(--scrollbar-color)',
                            borderRadius: '10px'
                        },
                        overflow: 'auto',
                        '&::-webkit-scrollbar-corner': {
                            borderRadius: '10px'
                        }
                    }}
                >
                    <Table>
                        <TableBody>
                            {renderTableContent()?.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell
                                        sx={{
                                            fontSize: '16px',
                                            fontWeight: 'bold',
                                            whiteSpace: 'nowrap',
                                            color: 'var(--text-color)',
                                            borderBottom: 'none',
                                            paddingLeft: '100px',
                                            width: '40%'
                                        }}
                                    >
                                        {item.label}:
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            color: 'var(--text-color)',
                                            fontSize: '16px',
                                            borderBottom: 'none'
                                        }}
                                    >
                                        {item.value}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <AlertDialog
                    title={t('COMMON.ALERT_DIALOG.CONFIRM_DELETE.TITLE')}
                    content={t('COMMON.ALERT_DIALOG.CONFIRM_DELETE.CONTENT')}
                    type='warning'
                    open={openDialog}
                    setOpen={setOpenDialog}
                    buttonCancel={t('COMMON.ALERT_DIALOG.CONFIRM_DELETE.CANCEL')}
                    buttonConfirm={t('COMMON.ALERT_DIALOG.CONFIRM_DELETE.DELETE')}
                    onConfirm={() => handleDeleteEmployee()}
                />
            </Paper>
        </Modal>
    )
}

export default DetailModal
