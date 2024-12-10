'use client'
import CustomTabs from '@/components/tabs/tabs'
import { Box, Typography } from '@mui/material'

function SalaryPage() {
    // Dữ liệu cho các tab
    const tabs = [
        {
            label: 'Chu kỳ lương',
            content: (
                <Box>
                    <Typography>Nội dung thông tin lương</Typography>
                    {/* Thêm nội dung cho tab thông tin lương */}
                </Box>
            )
        },
        {
            label: 'Chính sách lương',
            content: (
                <Box>
                    <Typography>Nội dung chính sách lương lương</Typography>
                    {/* Thêm nội dung cho tab bảng lương */}
                </Box>
            )
        }
    ]

    return (
        <Box sx={{ padding: '20px' }}>
            <CustomTabs tabs={tabs} />
        </Box>
    )
}

export default SalaryPage
