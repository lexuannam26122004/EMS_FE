'use client'
import React from 'react'
import {
    Box,
    Card,
    CardContent,
    Typography,
    Avatar,
    TableCell,
    TableRow,
    TableBody,
    Table,
    TableContainer
} from '@mui/material'
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

const StyledCard = styled(Card)(({}) => ({}))

const EmployeeSalary: React.FC<EmployeeSalaryProps> = ({ avatarUrl, employeeName, position, department }) => {
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
                                                    maxWidth: '400px',
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
                                                    maxWidth: '400px',
                                                    fontSize: '16px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                ...............................................
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                            <Typography
                                                sx={{
                                                    color: 'var(--text-color)',
                                                    maxWidth: '400px',
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
                                                    maxWidth: '400px',
                                                    fontSize: '16px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                ...............................................
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                            <Typography
                                                sx={{
                                                    color: 'var(--text-color)',
                                                    maxWidth: '400px',
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
                                                    maxWidth: '400px',
                                                    fontSize: '16px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                ...............................................
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                            <Typography
                                                sx={{
                                                    color: 'var(--text-color)',
                                                    maxWidth: '400px',
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
                                                    maxWidth: '400px',
                                                    fontSize: '16px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                ...............................................
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                            <Typography
                                                sx={{
                                                    color: 'var(--text-color)',
                                                    maxWidth: '400px',
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
                                                    maxWidth: '400px',
                                                    fontSize: '16px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                ...............................................
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                            <Typography
                                                sx={{
                                                    color: 'var(--text-color)',
                                                    maxWidth: '400px',
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
                                                    maxWidth: '400px',
                                                    fontSize: '16px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                ...............................................
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                            <Typography
                                                sx={{
                                                    color: 'var(--text-color)',
                                                    maxWidth: '400px',
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
                                                    maxWidth: '400px',
                                                    fontSize: '16px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                ...............................................
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
                                                    maxWidth: '400px',
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
                                                    maxWidth: '400px',
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
                                                    maxWidth: '400px',
                                                    fontSize: '16px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                ...............................................
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                            <Typography
                                                sx={{
                                                    color: 'var(--text-color)',
                                                    maxWidth: '400px',
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
                                                    maxWidth: '400px',
                                                    fontSize: '16px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                ...............................................
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                            <Typography
                                                sx={{
                                                    color: 'var(--text-color)',
                                                    maxWidth: '400px',
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
                                                    maxWidth: '400px',
                                                    fontSize: '16px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                ...............................................
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                            <Typography
                                                sx={{
                                                    color: 'var(--text-color)',
                                                    maxWidth: '400px',
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
                                                    maxWidth: '400px',
                                                    fontSize: '16px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                ...............................................
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                            <Typography
                                                sx={{
                                                    color: 'var(--text-color)',
                                                    maxWidth: '400px',
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
                                                    maxWidth: '400px',
                                                    fontSize: '16px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                ...............................................
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
                                                    maxWidth: '400px',
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
                                                    maxWidth: '400px',
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
                                                    maxWidth: '400px',
                                                    fontSize: '16px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                ...............................................
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                            <Typography
                                                sx={{
                                                    color: 'var(--text-color)',
                                                    maxWidth: '400px',
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
                                                    maxWidth: '400px',
                                                    fontSize: '16px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                ...............................................
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
                                                    maxWidth: '400px',
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
                                                    maxWidth: '400px',
                                                    fontSize: '16px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                ...............................................
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
                                ...............................................
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
