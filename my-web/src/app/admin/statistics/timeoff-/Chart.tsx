import React, { useState } from 'react'
import { useTheme } from 'next-themes'
import { MenuItem, FormControl, Select, Box, Paper, Typography, SelectChangeEvent } from '@mui/material'
import { useTranslation } from 'react-i18next'
import ReactECharts from 'echarts-for-react'

const Chart: React.FC = () => {
    const currentYear = new Date().getFullYear()
    const [selectedYear, setSelectedYear] = useState(currentYear)
    const { t } = useTranslation('common')
    const { theme } = useTheme()

    const handleYearChange = (event: SelectChangeEvent<number>) => {
        setSelectedYear(Number(event.target.value))
    }

    const xAxisData = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const data1: number[] = []
    const data2: number[] = []
    const data3: number[] = []
    const data4: number[] = []

    for (let i = 0; i < 12; i++) {
        data1.push(+(Math.random() * 2).toFixed(2))
        data2.push(+(Math.random() * 5).toFixed(2))
        data3.push(+(Math.random() + 0.3).toFixed(2))
        data4.push(+Math.random().toFixed(2))
    }

    const totalLeaveApproved = data1.reduce((sum, val) => sum + val, 0).toFixed(2)
    const totalLeavePending = data2.reduce((sum, val) => sum + val, 0).toFixed(2)
    const totalReportApproved = data3.reduce((sum, val) => sum + val, 0).toFixed(2)
    const totalReportPending = data4.reduce((sum, val) => sum + val, 0).toFixed(2)

    const emphasisStyle = {
        itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0,0,0,0.3)'
        }
    }

    const option = {
        textStyle: {
            color: theme === 'light' ? '#000000' : '#ffffff',
            fontFamily: 'Arial, sans-serif'
        },
        legend: {
            data: ['Nghỉ phép đã duyệt', 'Nghỉ phép chưa duyệt', 'Báo cáo lỗi đã duyệt', 'Báo cáo lỗi chưa duyệt'],
            width: '50%'
        },

        toolbox: {
            feature: {
                dataView: {
                    readOnly: false,
                    buttonColor: '#5f8c99',
                    optionToContent: () => {
                        let tableContent = '<table style="width: 100%; text-align: left; border-collapse: collapse;">'
                        tableContent += '<tr>'
                        tableContent += `<th style="border: 1px solid #ccc; padding: 5px;"></th>`
                        tableContent += `<th style="border: 1px solid #ccc; padding: 5px;">Nghỉ phép đã duyệt</th>`
                        tableContent += `<th style="border: 1px solid #ccc; padding: 5px;">Nghỉ phép chưa duyệt</th>`
                        tableContent += `<th style="border: 1px solid #ccc; padding: 5px;">Báo cáo lỗi đã duyệt</th>`
                        tableContent += `<th style="border: 1px solid #ccc; padding: 5px;">Báo cáo lỗi chưa duyệt</th>`
                        tableContent += '</tr>'

                        for (let i = 0; i < 12; i++) {
                            tableContent += `<tr>`
                            tableContent += `<td style="border: 1px solid #ccc; padding: 5px;">${xAxisData[i]}</td>`
                            tableContent += `<td style="border: 1px solid #ccc; padding: 5px;">${data1[i]}</td>`
                            tableContent += `<td style="border: 1px solid #ccc; padding: 5px;">${data2[i]}</td>`
                            tableContent += `<td style="border: 1px solid #ccc; padding: 5px;">${data3[i]}</td>`
                            tableContent += `<td style="border: 1px solid #ccc; padding: 5px;">${data4[i]}</td>`
                            tableContent += '</tr>'
                        }

                        tableContent += `<tr>`
                        tableContent += `<td style="border: 1px solid #ccc; padding: 5px; font-weight: bold;">Tổng</td>`
                        tableContent += `<td style="border: 1px solid #ccc; padding: 5px;">${totalLeaveApproved}</td>`
                        tableContent += `<td style="border: 1px solid #ccc; padding: 5px;">${totalLeavePending}</td>`
                        tableContent += `<td style="border: 1px solid #ccc; padding: 5px;">${totalReportApproved}</td>`
                        tableContent += `<td style="border: 1px solid #ccc; padding: 5px;">${totalReportPending}</td>`
                        tableContent += `</tr>`

                        tableContent += '</table>'
                        return tableContent
                    }
                },
                saveAsImage: {
                    pixelRatio: 2,
                    name: 'chart-download'
                }
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' },
            formatter: (params: any) => {
                let totalLeave = 0
                let totalErrorReport = 0

                params.forEach((param: any) => {
                    if (param.seriesName.includes('Nghỉ phép')) {
                        totalLeave += param.value
                    } else if (param.seriesName.includes('Báo cáo lỗi')) {
                        totalErrorReport += param.value
                    }
                })

                let tooltipContent = `${params[0].name}<br/>`
                params.forEach((param: any) => {
                    tooltipContent += `<span style="display: inline-block; width: 8px; height: 8px; background-color: ${param.color}; border-radius: 50%; margin-right: 8px;"></span>`
                    tooltipContent += `${param.seriesName}: ${param.value}<br/>`
                })

                tooltipContent += `<br/><strong>Tổng Nghỉ Phép:</strong> ${totalLeave.toFixed(2)}<br/>`
                tooltipContent += `<strong>Tổng Báo Cáo Lỗi:</strong> ${totalErrorReport.toFixed(2)}<br/>`

                return tooltipContent
            }
        },
        xAxis: {
            data: xAxisData
        },
        yAxis: {},
        grid: {
            left: '2%',
            right: '5.5%',
            bottom: '3%',
            containLabel: true
        },
        series: [
            {
                name: 'Nghỉ phép đã duyệt',
                type: 'bar',
                stack: 'stack1',
                emphasis: emphasisStyle,
                data: data1,
                itemStyle: {
                    color: '#5470C6'
                }
            },
            {
                name: 'Nghỉ phép chưa duyệt',
                type: 'bar',
                stack: 'stack1',
                emphasis: emphasisStyle,
                data: data2,
                itemStyle: {
                    color: '#91CC75'
                }
            },
            {
                name: 'Báo cáo lỗi đã duyệt',
                type: 'bar',
                stack: 'stack2',
                emphasis: emphasisStyle,
                data: data3,
                itemStyle: {
                    color: '#EE6666'
                }
            },
            {
                name: 'Báo cáo lỗi chưa duyệt',
                type: 'bar',
                stack: 'stack2',
                emphasis: emphasisStyle,
                data: data4,
                itemStyle: {
                    color: '#FFB980'
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
                        {t('Biểu đồ thống kê yêu cầu')}
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
            <ReactECharts option={option} style={{ height: 512 }} />
        </Paper>
    )
}

export default Chart
