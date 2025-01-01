'use client'
import React from 'react'
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
        <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4, p: 2 }}>
            <StyledCard>
                <CardContent>
                    {/* Header Section */}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mb: 3
                        }}
                    >
                        <Avatar
                            alt={employeeName}
                            src={avatarUrl}
                            sx={{
                                width: 80,
                                height: 80,
                                mr: 3,
                                border: '2px solid',
                                borderColor: 'primary.main'
                            }}
                        />
                        <Box>
                            <Typography variant='h5' fontWeight='bold'>
                                {employeeName}
                            </Typography>
                            <Typography variant='subtitle1' color='text.secondary'>
                                {position} - {department}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Salary Details */}
                    <Divider sx={{ mb: 2 }} />
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography variant='body1' color='text.secondary'>
                                Lương cơ bản:
                            </Typography>
                        </Grid>
                        <Grid item xs={6} textAlign='right'>
                            <Typography variant='body1'>{baseSalary.toLocaleString()} VND</Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant='body1' color='text.secondary'>
                                Thưởng:
                            </Typography>
                        </Grid>
                        <Grid item xs={6} textAlign='right'>
                            <Typography variant='body1'>{bonus.toLocaleString()} VND</Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant='body1' color='text.secondary'>
                                Tổng lương:
                            </Typography>
                        </Grid>
                        <Grid item xs={6} textAlign='right'>
                            <Typography variant='h6' fontWeight='bold' color='primary'>
                                {totalSalary.toLocaleString()} VND
                            </Typography>
                        </Grid>
                    </Grid>
                    <Divider sx={{ my: 3 }} />

                    {/* Action Section */}
                    <Box textAlign='center'>
                        <Button variant='contained' color='primary' sx={{ px: 4 }}>
                            Cập nhật thông tin
                        </Button>
                    </Box>
                </CardContent>
            </StyledCard>
        </Box>
    )
}

// Demo dữ liệu
const EmployeeSalaryPage: React.FC = () => {
    const sampleData = {
        avatarUrl: 'https://i.pravatar.cc/150?img=3', // Thay bằng đường dẫn avatar thật
        employeeName: 'Nguyễn Văn A',
        position: 'Kỹ sư phần mềm',
        baseSalary: 20000000,
        bonus: 5000000,
        totalSalary: 25000000,
        department: 'Phát triển phần mềm'
    }

    return <EmployeeSalary {...sampleData} />
}

export default EmployeeSalaryPage
