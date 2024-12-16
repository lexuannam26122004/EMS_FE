'use client'

import { IAspNetUserGetAll } from '@/models/AspNetUser'
import { formatDate } from '@/utils/formatDate'
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
    Avatar
} from '@mui/material'
import { X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Pencil, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import AlertDialog from '@/components/AlertDialog'
import React, { useState } from 'react'
import { useGetAllUsersQuery, useChangeStatusUsersMutation } from '@/services/AspNetUserService'

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

    return (
        <Modal open={open} onClose={handleToggle}>
            <Paper
                elevation={0}
                sx={{
                    width: '70%',
                    height: 'auto',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    backgroundColor: 'var(--background-color)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    transform: 'translate(-50%, -50%)'
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
                        position: 'relative'
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
                        {t('COMMON.SYS_CONFIGURATION.VIEW_DETAIL')}
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
                        maxHeight: '80vh',
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
                            {[
                                { label: t('COMMON.SYS_CONFIGURATION.KEY'), value: aspnetuser.FullName },
                                { label: t('COMMON.SYS_CONFIGURATION.TYPE'), value: aspnetuser.FullName },
                                { label: t('COMMON.SYS_CONFIGURATION.VALUE'), value: aspnetuser.FullName },
                                { label: t('COMMON.SYS_CONFIGURATION.DESCRIPTION'), value: aspnetuser.FullName },
                                {
                                    label: t('COMMON.SYS_CONFIGURATION.CREATED_DATE'),
                                    value: formatDate(aspnetuser.FullName)
                                },
                                { label: t('COMMON.SYS_CONFIGURATION.CREATED_BY'), value: aspnetuser.FullName }
                            ].map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell
                                        sx={{
                                            fontSize: '16px',
                                            fontWeight: 'bold',
                                            whiteSpace: 'nowrap',
                                            color: 'var(--text-color)',
                                            borderBottom: 'none',
                                            padding: '8px'
                                        }}
                                    >
                                        {item.label}:
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            color: 'var(--text-color)',
                                            fontSize: '16px',
                                            borderBottom: 'none',
                                            padding: '8px'
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
