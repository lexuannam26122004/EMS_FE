import React, { useState } from 'react'

import { MenuItem, FormControl, Select, Box, Paper, Typography, SelectChangeEvent } from '@mui/material'
import { useTranslation } from 'react-i18next'
import ReactECharts from 'echarts-for-react'

const Chart: React.FC = () => {
    const currentYear = new Date().getFullYear()
    const [selectedYear, setSelectedYear] = useState(currentYear)
    const { t } = useTranslation('common')

    const handleYearChange = (event: SelectChangeEvent<number>) => {
        setSelectedYear(Number(event.target.value))
    }

    const reportData = [
        { score: 85.5, amount: 85.5, type: 'Lương' },
        { score: 78.1, amount: 78.1, type: 'Lợi ích' },
        { score: 65.3, amount: 65.3, type: 'Kỉ luật' },
        { score: 92.4, amount: 92.4, type: 'Khen thưởng' },
        { score: 72.6, amount: 72.6, type: 'Cá Nhân' },
        { score: 88.9, amount: 88.9, type: 'Hợp đồng' }
    ]

    const option = {
        dataset: {
            source: [['score', 'amount', 'type'], ...reportData.map(item => [item.score, item.amount, item.type])]
        },
        grid: { containLabel: true, top: '10%', left: '2%', right: '10%', bottom: '3%' },
        xAxis: { name: 'Số lượng' },
        yAxis: { type: 'category' },
        visualMap: {
            orient: 'horizontal',
            left: 'center',
            top: '0%',
            min: 60,
            max: 100,
            text: ['Cao', 'Thấp'],
            dimension: 0,
            inRange: {
                color: ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3']
            },
            itemHeight: '300'
        },
        tooltip: {
            trigger: 'item', // Trigger when hovering over an item
            formatter: function (params) {
                return `Loại: ${params.value[2]}<br/>Số lượng: ${params.value[1]}`
            }
        },
        toolbox: {
            feature: {
                saveAsImage: {
                    show: true,
                    title: 'Save as Image',
                    pixelRatio: 2
                }
            }
        },
        series: [
            {
                type: 'bar',
                encode: {
                    x: 'amount',
                    y: 'type'
                },
                itemStyle: {
                    borderRadius: [0, 30, 30, 0]
                },
                emphasis: {
                    itemStyle: {
                        borderWidth: 2,
                        shadowBlur: 20,
                        shadowOffsetX: 5,
                        shadowOffsetY: 5,
                        shadowColor: 'var(--text-color)'
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
                mt: '24px',
                padding: '24px 24px 15px',
                overflow: 'hidden',
                borderRadius: '20px',
                backgroundColor: 'var(--background-item)'
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    mb: '24px',
                    justifyContent: 'space-between'
                }}
            >
                <Box>
                    <Typography
                        sx={{
                            fontSize: '18px',
                            fontWeight: 'bold',
                            color: 'var(--text-color)'
                        }}
                    >
                        {t('Biểu đồ thống kê báo cáo lỗi')}
                    </Typography>
                </Box>
                <FormControl sx={{ width: '100px' }}>
                    <Select
                        value={selectedYear}
                        onChange={handleYearChange}
                        sx={{
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'var(--border-color)'
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                border: '1px solid var(--border-color)' // Đặt border cho trạng thái focus
                            },
                            '& fieldset': {
                                borderRadius: '8px',
                                borderColor: 'var(--border-color)'
                            },
                            '& .MuiSelect-icon': {
                                color: 'var(--text-color)'
                            },
                            '& .MuiInputBase-input': {
                                color: 'var(--text-color)',
                                padding: '10px'
                            }
                        }}
                        MenuProps={{
                            PaperProps: {
                                elevation: 0,
                                sx: {
                                    width: '120px',
                                    mt: '2px',
                                    borderRadius: '8px',
                                    padding: '0 8px',
                                    backgroundImage:
                                        'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiBmaWxsPSJ1cmwoI3BhaW50MF9yYWRpYWxfMjc0OV8xNDUxODYpIiBmaWxsLW9wYWNpdHk9IjAuMTIiLz4KPGRlZnM+CjxyYWRpYWxHcmFkaWVudCBpZD0icGFpbnQwX3JhZGlhbF8yNzQ5XzE0NTE4NiIgY3g9IjAiIGN5PSIwIiByPSIxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgxMjAgMS44MTgxMmUtMDUpIHJvdGF0ZSgtNDUpIHNjYWxlKDEyMy4yNSkiPgo8c3RvcCBzdG9wLWNvbG9yPSIjMDBCOEQ5Ii8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzAwQjhEOSIgc3RvcC1vcGFjaXR5PSIwIi8+CjwvcmFkaWFsR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+Cg==), url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiBmaWxsPSJ1cmwoI3BhaW50MF9yYWRpYWxfMjc0OV8xNDUxODcpIiBmaWxsLW9wYWNpdHk9IjAuMTIiLz4KPGRlZnM+CjxyYWRpYWxHcmFkaWVudCBpZD0icGFpbnQwX3JhZGlhbF8yNzQ5XzE0NTE4NyIgY3g9IjAiIGN5PSIwIiByPSIxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgwIDEyMCkgcm90YXRlKDEzNSkgc2NhbGUoMTIzLjI1KSI+CjxzdG9wIHN0b3AtY29sb3I9IiNGRjU2MzAiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRkY1NjMwIiBzdG9wLW9wYWNpdHk9IjAiLz4KPC9yYWRpYWxHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4K)',
                                    backgroundPosition: 'top right, bottom left',
                                    backgroundSize: '50%, 50%',
                                    backgroundRepeat: 'no-repeat',
                                    backdropFilter: 'blur(20px)',
                                    backgroundColor: 'var(--background-item)',
                                    color: 'var(--text-color)',
                                    border: '1px solid var(--border-color)',
                                    '& .MuiMenuItem-root': {
                                        '&:hover': { backgroundColor: 'var(--hover-color)' },
                                        '&.Mui-selected': {
                                            backgroundColor: 'var(--background-selected-item)',
                                            '&:hover': { backgroundColor: 'var(--hover-color)' }
                                        }
                                    }
                                }
                            },
                            anchorOrigin: {
                                vertical: 'bottom',
                                horizontal: 'right' // Căn chỉnh bên phải
                            },
                            transformOrigin: {
                                vertical: 'top',
                                horizontal: 'right' // Căn chỉnh bên phải
                            }
                        }}
                    >
                        {[...Array(currentYear - 2022 + 1)].map((_, index) => {
                            const year = 2022 + index
                            return (
                                <MenuItem
                                    key={year}
                                    value={year}
                                    sx={{
                                        borderRadius: '6px',
                                        '&:last-child': {
                                            mt: '3px'
                                        }
                                    }}
                                >
                                    {year}
                                </MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
            </Box>
            <ReactECharts option={option} style={{ height: 500 }} />
        </Paper>
    )
}

export default Chart
