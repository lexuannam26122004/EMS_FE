'use client'
import { Paper, Box, Avatar, Typography } from '@mui/material'
import { Mail, MapPinHouse, NotepadText, RefreshCw, Smartphone } from 'lucide-react'
import React from 'react'
import SalaryCompare from './SalaryCompare'
import SalaryCycle from './SalaryCycle'
export default function UserSalaryPage() {
import { Box, Card, CardContent, Typography, Grid, Divider, Avatar, Button } from '@mui/material'
import { styled } from '@mui/system'

interface EmployeeSalaryProps {
    avatarUrl: string
    employeeName: string
    position: string
    baseSalary: number
    bonus: number
    totalSalary: number
    department: string
}

const StyledCard = styled(Card)(() => ({}))

const EmployeeSalary: React.FC<EmployeeSalaryProps> = ({
    avatarUrl,
    employeeName,
    position,
    baseSalary,
    bonus,
    totalSalary,
    department
}) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: '30px' }}>
            <Paper
                elevation={1}
                sx={{
                    width: 'calc(100% / 3 + 50px)',
                    borderRadius: '30px',
                    padding: '35px',
                    backgroundColor: 'var(--attendance-bg1)'
                }}
            >
                <Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                    >
                        <Avatar
                            src='https://api-prod-minimal-v620.pages.dev/assets/images/avatar/avatar-3.webp'
                            sx={{
                                width: '120px',
                                height: '120px'
                            }}
                        />
                        <Typography
                            sx={{
                                fontSize: '20px',
                                fontWeight: 'bold',
                                color: 'var(--text-color)',
                                marginTop: '10px'
                            }}
                        >
                            FullName
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: '14px',

                                color: 'var(--text-color)'
                            }}
                        >
                            Roles
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: '14px',

                                color: 'var(--text-color)'
                            }}
                        >
                            Departments
                        </Typography>
                    </Box>
                    <Box sx={{ marginRight: '20px', marginTop: '15px', gap: '15px' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Smartphone size={'24px'} color='orange'></Smartphone>
                            <Typography fontSize={'14px'} color='var(--text-color)' style={{ marginLeft: '10px' }}>
                                0999.999.999
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '15px' }}>
                            <Mail size={'24px'} color='blue'></Mail>
                            <Typography fontSize={'14px'} color='var(--text-color)' style={{ marginLeft: '10px' }}>
                                hehe@gmail.com
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '15px' }}>
                            <MapPinHouse size={'24px'} color='green'></MapPinHouse>
                            <Typography fontSize={'14px'} color='var(--text-color)' style={{ marginLeft: '10px' }}>
                                Thủ Đức, Thành phố Hồ Chí Minh
                            </Typography>
                        </Box>
                    </Box>
                    <Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flex: 1,
                                backgroundColor: 'var(--attendance-bg2)',
                                alignItems: 'center',
                                padding: '20px 24px',
                                borderRadius: '20px',
                                mt: '30px'
                            }}
                        >
                            <Box
                                sx={{
                                    mr: '20px',
                                    width: '55px',
                                    height: '55px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    color: 'var(--text-color)',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: 'var(--attendance-bg3)'
                                }}
                            >
                                <NotepadText size={28} />
                            </Box>
                            <Box>
                                <Typography sx={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--text-color)' }}>
                                    11-1-2022
                                </Typography>
                                <Typography sx={{ fontSize: '15px', mt: '5px', color: 'var(--text-color)' }}>
                                    Ngày bắt đầu làm việc
                                </Typography>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flex: 1,
                                backgroundColor: 'var(--attendance-bg2)',
                                alignItems: 'center',
                                padding: '20px 24px',
                                borderRadius: '20px',
                                mt: '30px'
                            }}
                        >
                            <Box
                                sx={{
                                    mr: '20px',
                                    width: '55px',
                                    height: '55px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    color: 'var(--text-color)',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: 'var(--attendance-bg3)'
                                }}
                            >
                                <RefreshCw size={28} />
                            </Box>
                            <Box>
                                <Typography sx={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--text-color)' }}>
                                    24
                                </Typography>
                                <Typography sx={{ fontSize: '15px', mt: '5px', color: 'var(--text-color)' }}>
                                    chu kỳ lương{' '}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Paper>
            <Paper
                elevation={1}
                sx={{
                    width: 'calc(100% / 3 * 2 - 50px)',
                    borderRadius: '30px',

                    backgroundColor: 'var(--attendance-bg1)'
                }}
            >
                <Box sx={{ padding: '25px' }}>
                    <SalaryCompare />
                </Box>

                <SalaryCycle />
            </Paper>
        </Box>
    )
}
