'use client'

import { Box, TableContainer, Table, TableRow, TableBody, TableCell, Avatar, Tabs, Tab } from '@mui/material'
import { useTranslation } from 'react-i18next'
import React, { useState, useEffect } from 'react'

const DetailModal = () => {
    const { t } = useTranslation('common')

    const [backgroundImageUrl, setBackgroundImageUrl] = useState('')

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * 10) + 1
        const newBackgroundImageUrl = `https://api-prod-minimal-v620.pages.dev/assets/images/cover/cover-${randomIndex}.webp`
        setBackgroundImageUrl(newBackgroundImageUrl)
    }, [])

    const [selectedTab, setSelectedTab] = useState(0)

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue)
        console.log('Selected Tab:', newValue)
    }

    return (
        <Box
            sx={{
                width: '100%',
                borderRadius: '10px',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${backgroundImageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(20px)',
                    zIndex: -1
                }}
            />
            {/* Color overlay */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Adjust opacity and color as needed
                    zIndex: -1
                }}
            />

            <Box
                sx={{
                    width: '90%',
                    borderRadius: '15px',
                    margin: '25px auto'
                }}
            >
                <Box
                    sx={{
                        borderRadius: '15px',
                        backgroundColor: 'var(--background-item)',
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
                                left: '150px',
                                width: '200px',
                                height: '200px',
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
                            justifyContent: 'flex-end',
                            padding: '20px 30px',
                            marginTop: '-50px'
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
                            <Tab label='Cá Nhân' sx={{ color: 'var(--text-color)' }} />
                            <Tab label='Hợp Đồng' sx={{ color: 'var(--text-color)' }} />
                            <Tab label='Phúc Lợi' sx={{ color: 'var(--text-color)' }} />
                            <Tab label='Kỉ Luật' sx={{ color: 'var(--text-color)' }} />
                        </Tabs>
                    </Box>
                </Box>

                <Box
                    sx={{
                        margin: '20px',
                        width: '50%',
                        overflow: 'hidden',
                        borderRadius: '15px',
                        backgroundColor: 'var(--background-item)',
                        marginLeft: 'auto',
                        padding: '20px'
                    }}
                >
                    <TableContainer>
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
                </Box>
            </Box>
        </Box>
    )
}

export default DetailModal
