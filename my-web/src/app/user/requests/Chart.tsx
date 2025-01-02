import React from 'react'
import ReactECharts from 'echarts-for-react'
import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useTheme } from 'next-themes'

const Chart = () => {
    const { t } = useTranslation('common')
    const { theme } = useTheme()

    const data = [
        { value: 1048, name: t('COMMON.NOTIFICATION_TYPE.BENEFIT') },
        { value: 735, name: t('COMMON.NOTIFICATION_TYPE.SALARY') },
        { value: 580, name: t('COMMON.NOTIFICATION_TYPE.REWARD') },
        { value: 484, name: t('COMMON.NOTIFICATION_TYPE.INSURANCE') },
        { value: 300, name: t('COMMON.NOTIFICATION_TYPE.HOLIDAY') },
        { value: 220, name: t('COMMON.NOTIFICATION_TYPE.DISCIPLINE') },
        { value: 130, name: t('COMMON.NOTIFICATION_TYPE.TIMEKEEPING') }
    ]

    const option = {
        tooltip: {
            trigger: 'item',
            backgroundColor: theme === 'light' ? 'rgba(250, 250, 250, 0.98)' : 'rgba(20, 26, 25, 0.98)',
            textStyle: {
                color: theme === 'light' ? '#000000' : '#ffffff'
            }
        },
        legend: {
            orient: 'horizontal',
            left: 'left',
            bottom: 0,
            itemGap: 14,
            textStyle: {
                color: theme === 'light' ? 'black' : '#fff',
                fontFamily: 'Arial, sans-serif',
                fontSize: 14
            },
            selectedMode: true
        },

        series: [
            {
                type: 'pie',
                radius: '90%',
                center: ['50%', '40%'],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                label: {
                    show: false // Ẩn nhãn tên phòng ban quanh biểu đồ
                },
                labelLine: {
                    show: false // Ẩn đường chỉ ra
                },
                data: data
            }
        ]
    }

    return (
        <Box
            sx={{
                padding: '20px',
                backgroundColor: 'var(--hover-color)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                borderRadius: '12px',
                overflow: 'hidden',
                height: '100%',
                border: '1px solid #e0e0e0',
                width: '100%'
            }}
        >
            <Box
                sx={{
                    position: 'sticky',
                    top: 0,
                    backgroundColor: 'var(--background-color)',
                    padding: '15px 20px',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: 'var(--text-color)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #e0e0e0',
                    zIndex: 2,
                    marginBottom: '10px',
                    borderRadius: '12px'
                }}
            >
                {t('Thông kê loại báo cáo lỗi')}
            </Box>

            <Box
                sx={{
                    width: '100%',
                    padding: '24px',
                    backgroundColor: 'var(--background-item)',
                    borderRadius: '15px',
                    height: '87%'
                }}
            >
                <ReactECharts option={option} style={{ height: '87%', width: '100%' }} />
            </Box>
        </Box>
    )
}

export default Chart
