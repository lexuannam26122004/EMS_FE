import React from 'react'
import ReactECharts from 'echarts-for-react'
import { Paper, Typography } from '@mui/material'
import { useTheme } from 'next-themes'
import { useGetSalaryByLevelQuery } from '@/services/SalaryService'
import { ISalaryByLevel } from '@/models/Salary'

const EmployeeSalaryChart = () => {
    const { data, isLoading } = useGetSalaryByLevelQuery()
    const { theme } = useTheme()
    const levels = data?.Data as ISalaryByLevel

    if (isLoading) {
        return <div>Loading...</div>
    }

    const time = levels.period

    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {},
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
        },
        yAxis: {
            type: 'category',
            data: ['under10', 'Indonesia', 'USA', 'India', 'China', 'World']
        },
        series: [
            {
                name: time,
                type: 'bar',
                data: [
                    levels?.under10,
                    levels?.between10and20,
                    levels?.between20and30,
                    levels?.between30and40,
                    levels?.greaterThan40,
                    16
                ],
                itemStyle: {
                    color: function (params: { dataIndex: number; value: number; seriesIndex: number; name: string }) {
                        const colors = ['#4caf50', '#66bb6a', '#81c784', '#a5d6a7', '#c8e6c9'] // Mảng màu xanh lá cây
                        return colors[params.dataIndex % colors.length] // Lấy màu theo chỉ số dữ liệu
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
            <Typography fontSize={'24px'} fontWeight={'bold'} color='var(--text-color)'>
                Phân tích mức lương nhân viên
            </Typography>
            <ReactECharts option={option} style={{ width: '100%', height: '300px', marginTop: '10px' }}></ReactECharts>
        </Paper>
    )
}

export default EmployeeSalaryChart
