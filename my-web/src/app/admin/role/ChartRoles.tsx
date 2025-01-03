'use client'
import React from 'react'
import ReactECharts from 'echarts-for-react'
import { Box, Paper, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
const Chart: React.FC = () => {
    const { t } = useTranslation('common')

    const option = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '5%',
            left: 'center'
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: 2, name: 'Quản trị viên' },
                    { value: 10, name: 'Quản lý' },
                    { value: 100, name: 'Nhân viên' },
                    { value: 20, name: 'Nhân viên IT' }
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'top' }}>
                <Typography
                    sx={{
                        fontSize: '18px',
                        fontWeight: 'bold',
                        color: 'var(--text-color)'
                    }}
                >
                    {t('Tỉ lệ nhân viên')}
                </Typography>
            </Box>
            <ReactECharts option={option} style={{ height: '360px', width: '100%' }} />
        </Paper>
    )
}

export default Chart