'use client'

import { Box, Paper, TableContainer, Table, TableRow, TableBody, TableCell, Avatar } from '@mui/material'
import { useTranslation } from 'react-i18next'

const DetailModal = () => {
    const { t } = useTranslation('common')

    const backgroundImageUrl = `/background/${1}.jpg`

    return (
        <Paper
            elevation={0}
            sx={{
                width: '100%',
                height: '100vh',
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
                            left: '100px',
                            width: '250px',
                            height: '250px',
                            border: '5px solid #fff',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                        }}
                    >
                        <Avatar
                            src={'https://localhost:44381/avatars/aa1678f0-75b0-48d2-ae98-50871178e9bd.jfif'}
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
                        marginTop: '-120px'
                    }}
                >
                    <Box
                        sx={{
                            marginLeft: '350px'
                        }}
                    >
                        <h1
                            style={{
                                fontSize: '30px',

                                marginBottom: '5px',
                                fontWeight: 'bold',
                                color: 'var(--text-color)'
                            }}
                        >
                            {'aspnetuser.FullName'}
                        </h1>
                        <p
                            style={{
                                fontSize: '16px',

                                color: 'var(--text-color)'
                            }}
                        >
                            {'aspnetuser.Roles'}
                        </p>
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
                    width: '100%',
                    overflow: 'hidden',
                    borderRadius: '15px',
                    backgroundColor: 'var(--background-item)'
                }}
            >
                <Table>
                    <TableBody>
                        {[
                            { label: t('Họ tên đầy đủ'), value: 'aspnetuser.FullName' },
                            { label: t('Tên phòng ban'), value: 'aspnetuser.DepartmentName ' },
                            { label: t('Tên tài khoản'), value: 'aspnetuser.UserName' },
                            {
                                label: t('Chức vụ trong công ty'),
                                value: 'aspnetuser.Roles'
                            },
                            {
                                label: t('Giới tính'),
                                value: 'aspnetuser.Gender '
                            },
                            { label: t('Địa chỉ thường trú'), value: 'aspnetuser.Address ' },
                            {
                                label: t('Ngày sinh'),
                                value: 'aspnetuser.Birthday'
                            },
                            { label: t('Email'), value: 'aspnetuser.Email' },
                            { label: t('Số điện thoại'), value: 'aspnetuser.PhoneNumber' },
                            { label: t('Ghi chú'), value: 'aspnetuser.Note ' }
                        ].map((item, index) => (
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
        </Paper>
    )
}

export default DetailModal
