import React from 'react'
import ReactECharts from 'echarts-for-react'
import { Box, Paper, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

const MyPieChart = () => {
    const { t } = useTranslation('common')

    const option = {
        title: {
            text: 'Website Traffic Sources',
            subtext: 'Based on Fake Data',
            left: 'center',
            textStyle: {
                color: 'var(--text-color)',
                fontSize: 20,
                fontWeight: 'bold'
            },
            subtextStyle: {
                color: 'var(--text-color)',
                fontSize: 12
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b}: {c} ({d}%)' // Hiển thị tên và tỷ lệ phần trăm
        },
        legend: {
            bottom: '0px'
        },

        series: [
            {
                itemStyle: {
                    borderRadius: 10
                },
                avoidLabelOverlap: false,
                padAngle: 5,
                name: 'Traffic Source',
                type: 'pie',
                radius: ['30%', '90%'],
                data: [
                    { value: 1048, name: 'Search Engine' },
                    { value: 735, name: 'Direct' },
                    { value: 580, name: 'Email' },
                    { value: 484, name: 'Union Ads' },
                    { value: 300, name: 'Video Ads' }
                ],
                label: {
                    show: false
                },
                labelLine: {
                    show: false
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
                borderRadius: '15px'
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'top' }}>
                <Typography
                    sx={{
                        fontSize: '18px',
                        fontWeight: 'bold',
                        color: 'var(--text-color)'
                    }}
                >
                    {t('Biểu đồ')}
                </Typography>
            </Box>
            <ReactECharts option={option} style={{ height: '470px', width: '100%', top: '-50px' }} />
        </Paper>
    )
}

export default MyPieChart
