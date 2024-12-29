'use client'
import React from 'react'
import ReactECharts from 'echarts-for-react'
import { Box, Paper, Typography } from '@mui/material'
import { useTheme } from 'next-themes'
export default function GrossTotalByAreas() {
    const { theme } = useTheme()
    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            textStyle: {
                color: theme === 'light' ? 'black' : '#fff',
                fontFamily: 'Arial, sans-serif'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            axisLine: {
                lineStyle: {
                    color: theme === 'light' ? 'black' : '#fff' // Màu của trục y
                }
            }
        },
        yAxis: {
            type: 'category',
            data: ['Brazil', 'Indonesia', 'USA', 'India', 'China'],

            axisLabel: {
                textStyle: {
                    color: theme === 'light' ? 'black' : '#fff', // Màu của chỉ số trục y
                    fontFamily: 'Arial, sans-serif'
                }
            }
        },
        series: [
            {
                name: '2011',
                type: 'bar',
                data: [
                    { value: 120, itemStyle: { color: '#FF5733' } }, // Màu đỏ
                    { value: 200, itemStyle: { color: '#33FF57' } }, // Màu xanh lá
                    { value: 150, itemStyle: { color: '#3357FF' } }, // Màu xanh dương
                    { value: 80, itemStyle: { color: '#F1C40F' } }, // Màu vàng
                    { value: 70, itemStyle: { color: '#8E44AD' } } // Màu tím
                ]
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
            <Typography fontSize={'20px'} fontWeight={'bold'} color='var(--text-color)'>
                Gross total by departments
            </Typography>
            <ReactECharts option={option} style={{ width: '100%', height: '330px', marginTop: '25px' }}></ReactECharts>
        </Paper>
    )
}
