import React from 'react'
import ReactECharts from 'echarts-for-react'
import { Box, Paper, Typography } from '@mui/material'
import { useGetInfoForDepartmentChartQuery } from '@/services/SalaryService'
import { useTheme } from 'next-themes'
import { color } from 'echarts'

export default function DepartmentChart() {
    const { data, isLoading } = useGetInfoForDepartmentChartQuery()
    const { theme } = useTheme()

    if (isLoading) {
        return <div>Loading...</div>
    }
    const departmentNames = Object.keys(data?.Data || {})
    const totalSalaries = Object.values(data?.Data || {})
    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        xAxis: {
            type: 'category',
            data: departmentNames,
            axisLabel: {
                rotate: 45 // Xoay nhãn 45 độ
            }
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: function (value: number) {
                    if (value >= 1e9) {
                        return (value / 1e9).toFixed(1) + 'B' // "B" cho tỷ
                    } else if (value >= 1e6) {
                        return (value / 1e6).toFixed(1) + 'M' // "M" cho triệu
                    } else if (value >= 1e3) {
                        return (value / 1e3).toFixed(1) + 'K' // "K" cho nghìn
                    } else {
                        return value // Trả về giá trị bình thường nếu nhỏ hơn 1000
                    }
                }
            }
        },
        series: [
            {
                data: totalSalaries,
                type: 'bar',
                itemStyle: {
                    color: function (params: { dataIndex: number; value: number; seriesIndex: number; name: string }) {
                        const colors = ['#ff69b4', '#ff1493', '#db7093', '#c71585', '#ffb6c1']
                        return colors[params.dataIndex % colors.length]
                    }
                }
            }
        ]
    }
    return (
        <Paper
            elevation={0}
            sx={{
                width: '100%',
                padding: '24px',
                backgroundColor: 'var(--background-item)',
                borderRadius: '15px',
                height: '100%'
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography fontSize={'24px'} fontWeight={'bold'} color='var(--text-color)'>
                    Tổng thu nhập theo phòng ban
                </Typography>
                <Box
                    sx={{
                        marginLeft: 'auto',
                        backgroundImage: 'url("/background_salary/department.png")',
                        width: '50px',
                        height: '50px',
                        backgroundBlendMode: 'overlay',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                ></Box>
            </Box>

            <ReactECharts option={option} style={{ width: '100%', height: '300px', marginTop: '10px' }}></ReactECharts>
        </Paper>
    )
}
