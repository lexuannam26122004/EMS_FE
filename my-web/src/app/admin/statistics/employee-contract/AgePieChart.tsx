'use client'
import React from 'react'
import ReactECharts from 'echarts-for-react'
import { Box, Paper, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useTheme } from 'next-themes'
const AgePieChart: React.FC = () => {
    const { t } = useTranslation('common')
    const { theme } = useTheme()
    
    const option = {
        textStyle: {
            color: theme === 'light' ? '#000000' : '#ffffff',
            fontFamily: 'Arial, sans-serif'
        },
        legend: {
            top: 'bottom',
            textStyle: {
                color: theme === 'light' ? '#000000' : '#ffffff',
                fontFamily: 'Arial, sans-serif'
            },
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        toolbox: {
            show: true,
            feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        series: [
            {
                name: 'Nightingale Chart',
                type: 'pie',
                roseType: 'area',
                itemStyle: {
                    borderRadius: 8
                },
                label: {
                    show: false
                },
                data: [
                    { value: 10, name: '0-18 years' },
                    { value: 10, name: '19-35 years' },
                    { value: 10, name: '36-50 years' },
                    { value: 10, name: '51-65 years' },
                    { value: 10, name: '66+ years' }
                ]
            }
        ]
    }
    return (
        <Paper
            elevation={0}
            sx={{
                width: '100%',
                padding: '24px',boxShadow: 'var(--box-shadow-paper)',
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
                    {t('COMMON.DASHBOARD.AGE_OF_EMPLOYEE')}
                </Typography>
            </Box>
            <ReactECharts option={option} style={{ height: '400px', width: '100%' }} />
        </Paper>
    )
}

export default AgePieChart
