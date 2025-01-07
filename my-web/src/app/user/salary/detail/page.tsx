'use client'
import React from 'react'
import {
    Box,
    Card,
    CardContent,
    Typography,
    Avatar,
    TableContainer,
    Table,
    TableBody,
    TableRow,
    TableCell
} from '@mui/material'
import { styled } from '@mui/material/styles'

interface EmployeeSalaryProps {
    avatarUrl: string
    employeeName: string
    position: string
    baseSalary: number
    bonus: number
    totalSalary: number
    department: string
    employeeId: string
    workDays: number
    lateDays: number
    paidLeaveDays: number
    unpaidLeaveDays: number
    salaryCoefficient: number
    overtimeSalary: number
    allowance: number
    insurance: number
    tax: number
}

const StyledCard = styled(Card)(() => ({}))

const EmployeeSalary: React.FC<EmployeeSalaryProps> = ({
    avatarUrl,
    employeeName,
    position,
    baseSalary,
    bonus,
    totalSalary,
    department,
    employeeId,
    workDays,
    lateDays,
    paidLeaveDays,
    unpaidLeaveDays,
    salaryCoefficient,
    overtimeSalary,
    allowance,
    insurance,
    tax
}) => {
    return (
        <Box sx={{ maxWidth: 1000, mx: 'auto', mt: 4, p: 2 }}>
            <StyledCard>
                <CardContent sx={{ backgroundColor: 'var(--background-color)' }}>
                    {/* Header Section */}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            ml: 2,
                            mt: 2,
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
                            <Typography variant='h5' fontWeight='bold' color='var(--text-color)'>
                                {employeeName}
                            </Typography>
                            <Typography variant='subtitle1' color='var(--text-color)'>
                                {position} - {department}
                            </Typography>
                        </Box>
                    </Box>

                    <Box sx={{ padding: '20px' }}>
                        <TableContainer>
                            <Table>
                                <TableBody>
                                    {/* Thông tin nhân viên */}
                                    <TableRow>
                                        <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                            <Typography
                                                sx={{
                                                    color: 'var(--text-color)',
                                                    fontSize: '16px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                Họ tên
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                            <Typography
                                                sx={{
                                                    color: 'var(--text-color)',
                                                    fontSize: '16px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                {employeeName}
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                            <Typography
                                                sx={{
                                                    color: 'var(--text-color)',
                                                    fontSize: '16px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                Mã số nhân viên
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                            <Typography
                                                sx={{
                                                    color: 'var(--text-color)',
                                                    fontSize: '16px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                {employeeId}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                            <Typography
                                                sx={{
                                                    color: 'var(--text-color)',
                                                    fontSize: '16px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                Phòng ban
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                            <Typography
                                                sx={{
                                                    color: 'var(--text-color)',
                                                    fontSize: '16px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                {department}
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                            <Typography
                                                sx={{
                                                    color: 'var(--text-color)',
                                                    fontSize: '16px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                Số ngày công
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                            <Typography
                                                sx={{
                                                    color: 'var(--text-color)',
                                                    fontSize: '16px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                {workDays}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                            <Typography
                                                sx={{
                                                    color: 'var(--text-color)',
                                                    fontSize: '16px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                Số ngày đi trễ
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                            <Typography
                                                sx={{
                                                    color: 'var(--text-color)',
                                                    fontSize: '16px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                {lateDays}
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                            <Typography
                                                sx={{
                                                    color: 'var(--text-color)',
                                                    fontSize: '16px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                Ngày nghỉ có phép
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                            <Typography
                                                sx={{
                                                    color: 'var(--text-color)',
                                                    fontSize: '16px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                {paidLeaveDays}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                            <Typography
                                                sx={{
                                                    color: 'var(--text-color)',
                                                    fontSize: '16px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                Ngày nghỉ không phép
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                            <Typography
                                                sx={{
                                                    color: 'var(--text-color)',
                                                    fontSize: '16px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                {unpaidLeaveDays}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>

                                    {/* Các khoản thu nhập */}
                                    <TableRow>
                                        <TableCell sx={{ borderColor: 'var(--border-color)' }} colSpan={4}>
                                            <Typography
                                                fontWeight='bold'
                                                sx={{
                                                    color: 'var(--text-color)',
                                                    fontSize: '20px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                    fontWeight: 'bold'
                                                }}
                                            >
                                                Các khoản thu nhập
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                            <Typography
                                                sx={{
                                                    color: 'var(--text-color)',
                                                    fontSize: '16px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                Lương cơ bản
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                            <Typography
                                                sx={{
                                                    color: 'var(--text-color)',
                                                    fontSize: '16px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                {baseSalary.toLocaleString('vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND'
                                                })}
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                            <Typography
                                                sx={{
                                                    color: 'var(--text-color)',
                                                    fontSize: '16px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                Hệ số
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                            <Typography
                                                sx={{
                                                    color: 'var(--text-color)',
                                                    fontSize: '16px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                {salaryCoefficient}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                            <Typography
                                                sx={{
                                                    color: 'var(--text-color)',
                                                    fontSize: '16px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                Lương làm thêm giờ
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                            <Typography
                                                sx={{
                                                    color: 'var(--text-color)',
                                                    fontSize: '16px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                {overtimeSalary.toLocaleString('vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND'
                                                })}
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                            <Typography
                                                sx={{
                                                    color: 'var(--text-color)',
                                                    fontSize: '16px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                Phụ cấp
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                            <Typography
                                                sx={{
                                                    color: 'var(--text-color)',
                                                    fontSize: '16px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                {allowance.toLocaleString('vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND'
                                                })}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                            <Typography
                                                sx={{
                                                    color: 'var(--text-color)',
                                                    fontSize: '16px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                Thưởng
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                            <Typography
                                                sx={{
                                                    color: 'var(--text-color)',
                                                    fontSize: '16px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                {bonus.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ borderColor: 'var(--border-color)' }} colSpan={2}></TableCell>
                                    </TableRow>

                                    {/* Các khoản khấu trừ */}
                                    <TableRow>
                                        <TableCell colSpan={4} sx={{ borderColor: 'var(--border-color)' }}>
                                            <Typography
                                                fontWeight='bold'
                                                sx={{
                                                    color: 'var(--text-color)',
                                                    fontSize: '20px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                    fontWeight: 'bold'
                                                }}
                                            >
                                                Các khoản khấu trừ
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                            <Typography
                                                sx={{
                                                    color: 'var(--text-color)',
                                                    fontSize: '16px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                Bảo hiểm
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                            <Typography
                                                sx={{
                                                    color: 'var(--text-color)',
                                                    fontSize: '16px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                {insurance.toLocaleString('vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND'
                                                })}
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                            <Typography
                                                sx={{
                                                    color: 'var(--text-color)',
                                                    fontSize: '16px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                Thuế
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                            <Typography
                                                sx={{
                                                    color: 'var(--text-color)',
                                                    fontSize: '16px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                {tax.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>

                                    {/* Tổng cộng */}
                                    <TableRow>
                                        <TableCell
                                            colSpan={1}
                                            sx={{ fontWeight: 'bold', borderColor: 'var(--border-color)' }}
                                        >
                                            <Typography
                                                sx={{
                                                    color: 'var(--text-color)',
                                                    fontSize: '20px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                    fontWeight: 'bold'
                                                }}
                                            >
                                                Tổng cộng
                                            </Typography>
                                        </TableCell>
                                        <TableCell colSpan={1} sx={{ borderColor: 'var(--border-color)' }}>
                                            <Typography
                                                sx={{
                                                    color: 'var(--text-color)',
                                                    fontSize: '16px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                {totalSalary.toLocaleString('vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND'
                                                })}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>

                        {/* Tổng tiền thực nhận */}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                            <Typography fontWeight='bold' fontSize={'20px'} color='var(--text-color)'>
                                Tổng số tiền thực nhận:
                            </Typography>
                            <Typography color='var(--text-color)'>
                                {(totalSalary - insurance - tax).toLocaleString('vi-VN', {
                                    style: 'currency',
                                    currency: 'VND'
                                })}
                            </Typography>
                        </Box>
                    </Box>
                </CardContent>
            </StyledCard>
        </Box>
    )
}

// Demo dữ liệu
const EmployeeSalaryPage: React.FC = () => {
    const sampleData = {
        avatarUrl: 'https://i.pravatar.cc/150?img=3',
        employeeName: 'Lê Xuân Nam',
        position: 'Administrator',
        baseSalary: 20000000,
        bonus: 5000000,
        totalSalary: 25000000,
        department: 'Human Resources',
        employeeId: 'NV001',
        workDays: 26,
        lateDays: 2,
        paidLeaveDays: 1,
        unpaidLeaveDays: 0,
        salaryCoefficient: 1.5,
        overtimeSalary: 3000000,
        allowance: 1000000,
        insurance: 1500000,
        tax: 1000000
    }

    return <EmployeeSalary {...sampleData} />
}

export default EmployeeSalaryPage
