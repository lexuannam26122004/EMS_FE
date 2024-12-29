'use client'
import { Box, Paper, Tooltip, Typography } from '@mui/material'
import { BadgeDollarSign, BadgeHelp } from 'lucide-react'
import React from 'react'
import TotalBySex from './TotalBySex'
import TotalByLevel from './TotalByLevel'
export default function SpecialInfo() {
    return (
        <Box sx={{ justifyContent: 'center', alignItems: 'center', gap: '24px', display: 'flex' }}>
            <Box sx={{ width: 'calc(100% / 3)' }}>
                <Paper
                    elevation={0}
                    sx={{
                        backgroundImage: 'url(/images/Subtract_red.svg)',
                        backgroundColor: 'var(--background-color-after)',
                        backgroundSize: 'cover',
                        borderRadius: '38px',
                        height: '100%',
                        padding: '24px',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        position: 'relative'
                    }}
                >
                    <Box width={'100%'}>
                        <Typography
                            sx={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                color: '#637381'
                            }}
                        >
                            Nhân viên có lương cao nhất
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                        >
                            <Typography
                                sx={{
                                    color: '#09090b',
                                    fontSize: '30px',
                                    margin: '10px 5px',
                                    fontWeight: 'bold'
                                }}
                            >
                                Nguyễn Văn A
                            </Typography>
                            <Box
                                sx={{
                                    position: 'absolute',
                                    right: '30px',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                                <Tooltip title={'tăng 3 triệu so với tháng trước'}>
                                    <BadgeHelp color='#33FF33' style={{ marginLeft: '10px' }}></BadgeHelp>
                                </Tooltip>
                            </Box>
                        </Box>

                        <Box
                            sx={{
                                mt: '5px',
                                color: '#09090b', //!(!rewardPercent || rewardPercent >= 0) ? '#F93C65' : '#00B69B',
                                fontSize: '15px',
                                fontWeight: 'bold',
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            <BadgeDollarSign color='green'></BadgeDollarSign>
                            <Typography
                                sx={{
                                    ml: '6px',
                                    color: '#09090b',
                                    fontSize: '16px'
                                }}
                            >
                                30
                            </Typography>
                            <Typography
                                sx={{
                                    ml: '6px',
                                    color: '#09090b',
                                    fontSize: '16px'
                                }}
                            >
                                Triệu đồng
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
                <Paper
                    elevation={0}
                    sx={{
                        backgroundImage: 'url(/images/Subtract_blue.svg)',
                        backgroundColor: 'var(--background-color-after)',
                        backgroundSize: 'cover',
                        borderRadius: '38px',
                        backgroundPosition: 'left center',
                        height: '100%',
                        padding: '24px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        position: 'relative',
                        marginTop: '24px'
                    }}
                >
                    <Box width={'100%'}>
                        <Typography
                            sx={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                color: 'var(--reward-title-color)'
                            }}
                        >
                            Nhân viên có lương thấp nhất
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                        >
                            <Typography
                                sx={{
                                    color: '#09090b',
                                    fontSize: '30px',
                                    margin: '10px 5px',
                                    fontWeight: 'bold'
                                }}
                            >
                                Nguyễn Văn A
                            </Typography>
                            <Box
                                sx={{
                                    position: 'absolute',
                                    right: '30px',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                                <Tooltip title={'tăng 3 triệu so với tháng trước'}>
                                    <BadgeHelp color='#33FF33' style={{ marginLeft: '10px' }}></BadgeHelp>
                                </Tooltip>
                            </Box>
                        </Box>

                        <Box
                            sx={{
                                mt: '5px',
                                color: '#09090b', //!(!rewardPercent || rewardPercent >= 0) ? '#F93C65' : '#00B69B',
                                fontSize: '15px',
                                fontWeight: 'bold',
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            <BadgeDollarSign color='green'></BadgeDollarSign>
                            <Typography
                                sx={{
                                    ml: '6px',
                                    color: '#09090b',
                                    fontSize: '16px'
                                }}
                            >
                                10
                            </Typography>
                            <Typography
                                sx={{
                                    ml: '6px',
                                    color: '#09090b',
                                    fontSize: '16px'
                                }}
                            >
                                Triệu đồng
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
            </Box>
            <Box sx={{ width: 'calc(100% / 3' }}>
                <TotalBySex />
            </Box>
            <Box sx={{ width: 'calc(100% / 3' }}>
                <TotalByLevel />
            </Box>
        </Box>
    )
}
