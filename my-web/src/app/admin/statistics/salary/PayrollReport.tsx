'use client'
import React, { useEffect, useState } from 'react'
import ReactECharts from 'echarts-for-react'
import { Paper, SelectChangeEvent, Typography, Box, FormControl, Select, MenuItem } from '@mui/material'
import { useTheme } from 'next-themes'
import { useTranslation } from 'react-i18next'

const data2024 = {
    insurance: [
        { PayrollPeriod: '01-2024', TotalSalary: 6032336868 },
        { PayrollPeriod: '02-2024', TotalSalary: 6031014234 },
        { PayrollPeriod: '03-2024', TotalSalary: 6074100324 },
        { PayrollPeriod: '04-2024', TotalSalary: 6058002753 },
        { PayrollPeriod: '05-2024', TotalSalary: 5952887349 },
        { PayrollPeriod: '06-2024', TotalSalary: 6052335954 },
        { PayrollPeriod: '07-2024', TotalSalary: 6088820931 },
        { PayrollPeriod: '08-2024', TotalSalary: 6062112867 },
        { PayrollPeriod: '09-2024', TotalSalary: 6081234663 },
        { PayrollPeriod: '10-2024', TotalSalary: 6015393663 },
        { PayrollPeriod: '11-2024', TotalSalary: 5986883175 }
    ],
    PITax: [
        { PayrollPeriod: '01-2024', TotalPITax: 189225698.5 },
        { PayrollPeriod: '02-2024', TotalPITax: 188716615.2 },
        { PayrollPeriod: '03-2024', TotalPITax: 190588556.9 },
        { PayrollPeriod: '04-2024', TotalPITax: 189322993.5 },
        { PayrollPeriod: '05-2024', TotalPITax: 186653506.7 },
        { PayrollPeriod: '06-2024', TotalPITax: 189803731 },
        { PayrollPeriod: '07-2024', TotalPITax: 190729983.4 },
        { PayrollPeriod: '08-2024', TotalPITax: 190487507.7 },
        { PayrollPeriod: '09-2024', TotalPITax: 190199593.4 },
        { PayrollPeriod: '10-2024', TotalPITax: 188956540.9 },
        { PayrollPeriod: '11-2024', TotalPITax: 187727691.6 }
    ],
    net: [
        { PayrollPeriod: '01-2024', TotalPITax: 1892256985 },
        { PayrollPeriod: '02-2024', TotalPITax: 1887166152 },
        { PayrollPeriod: '03-2024', TotalPITax: 1905885569 },
        { PayrollPeriod: '04-2024', TotalPITax: 1893229935 },
        { PayrollPeriod: '05-2024', TotalPITax: 1866535067 },
        { PayrollPeriod: '06-2024', TotalPITax: 1898037310 },
        { PayrollPeriod: '07-2024', TotalPITax: 1907299834 },
        { PayrollPeriod: '08-2024', TotalPITax: 1904875077 },
        { PayrollPeriod: '09-2024', TotalPITax: 1901995934 },
        { PayrollPeriod: '10-2024', TotalPITax: 1889565409 },
        { PayrollPeriod: '11-2024', TotalPITax: 1877276916 }
    ],
    gross: [
        { PayrollPeriod: '01-2024', TotalPITax: 2071846113 },
        { PayrollPeriod: '02-2024', TotalPITax: 2066883753 },
        { PayrollPeriod: '03-2024', TotalPITax: 2086356345 },
        { PayrollPeriod: '04-2024', TotalPITax: 2075929620 },
        { PayrollPeriod: '05-2024', TotalPITax: 2047428324 },
        { PayrollPeriod: '06-2024', TotalPITax: 2078029852 },
        { PayrollPeriod: '07-2024', TotalPITax: 2088267781 },
        { PayrollPeriod: '08-2024', TotalPITax: 2083623077 },
        { PayrollPeriod: '09-2024', TotalPITax: 2081723303 },
        { PayrollPeriod: '10-2024', TotalPITax: 2071579046 },
        { PayrollPeriod: '11-2024', TotalPITax: 2058056158 }
    ]
}

const data2023 = {
    insurance: [
        { PayrollPeriod: '01-2023', TotalSalary: 6047089278 },
        { PayrollPeriod: '02-2023', TotalSalary: 6003660087 },
        { PayrollPeriod: '03-2023', TotalSalary: 6073391628 },
        { PayrollPeriod: '04-2023', TotalSalary: 6078330972 },
        { PayrollPeriod: '05-2023', TotalSalary: 5989724850 },
        { PayrollPeriod: '06-2023', TotalSalary: 6029917797 },
        { PayrollPeriod: '07-2023', TotalSalary: 6108670311 },
        { PayrollPeriod: '08-2023', TotalSalary: 5994998214 },
        { PayrollPeriod: '09-2023', TotalSalary: 6025236306 },
        { PayrollPeriod: '10-2023', TotalSalary: 6013285797 },
        { PayrollPeriod: '11-2023', TotalSalary: 6035754900 },
        { PayrollPeriod: '12-2023', TotalSalary: 5976413268 }
    ],
    PITax: [
        { PayrollPeriod: '01-2023', TotalPITax: 190098246.5 },
        { PayrollPeriod: '02-2023', TotalPITax: 187704595.6 },
        { PayrollPeriod: '03-2023', TotalPITax: 191134607.1 },
        { PayrollPeriod: '04-2023', TotalPITax: 190495477.9 },
        { PayrollPeriod: '05-2023', TotalPITax: 187769667 },
        { PayrollPeriod: '06-2023', TotalPITax: 189087131.6 },
        { PayrollPeriod: '07-2023', TotalPITax: 191740500.4 },
        { PayrollPeriod: '08-2023', TotalPITax: 187573029.8 },
        { PayrollPeriod: '09-2023', TotalPITax: 188437688.9 },
        { PayrollPeriod: '10-2023', TotalPITax: 187738536.2 },
        { PayrollPeriod: '11-2023', TotalPITax: 189585541.7 },
        { PayrollPeriod: '12-2023', TotalPITax: 186669943.6 }
    ],
    net: [
        { PayrollPeriod: '01-2023', TotalPITax: 1900982465 },
        { PayrollPeriod: '02-2023', TotalPITax: 1877045956 },
        { PayrollPeriod: '03-2023', TotalPITax: 1911346071 },
        { PayrollPeriod: '04-2023', TotalPITax: 1904954779 },
        { PayrollPeriod: '05-2023', TotalPITax: 1877696670 },
        { PayrollPeriod: '06-2023', TotalPITax: 1890871316 },
        { PayrollPeriod: '07-2023', TotalPITax: 1917405004 },
        { PayrollPeriod: '08-2023', TotalPITax: 1875730298 },
        { PayrollPeriod: '09-2023', TotalPITax: 1884376889 },
        { PayrollPeriod: '10-2023', TotalPITax: 1877385362 },
        { PayrollPeriod: '11-2023', TotalPITax: 1895855417 },
        { PayrollPeriod: '12-2023', TotalPITax: 1866699436 }
    ],
    gross: [
        { PayrollPeriod: '01-2023', TotalPITax: 2081105280 },
        { PayrollPeriod: '02-2023', TotalPITax: 2060049539 },
        { PayrollPeriod: '03-2023', TotalPITax: 2090532546 },
        { PayrollPeriod: '04-2023', TotalPITax: 2085269850 },
        { PayrollPeriod: '05-2023', TotalPITax: 2057922872 },
        { PayrollPeriod: '06-2023', TotalPITax: 2072774494 },
        { PayrollPeriod: '07-2023', TotalPITax: 2096482362 },
        { PayrollPeriod: '08-2023', TotalPITax: 2055165498 },
        { PayrollPeriod: '09-2023', TotalPITax: 2064917496 },
        { PayrollPeriod: '10-2023', TotalPITax: 2059510856 },
        { PayrollPeriod: '11-2023', TotalPITax: 2074695688 },
        { PayrollPeriod: '12-2023', TotalPITax: 2050189312 }
    ]
}

const data2022 = {
    insurance: [
        { PayrollPeriod: '01-2022', TotalSalary: 6055396239 },
        { PayrollPeriod: '02-2022', TotalSalary: 6004065198 },
        { PayrollPeriod: '03-2022', TotalSalary: 6053204760 },
        { PayrollPeriod: '04-2022', TotalSalary: 5989657875 },
        { PayrollPeriod: '05-2022', TotalSalary: 5979124545 },
        { PayrollPeriod: '06-2022', TotalSalary: 6024314526 },
        { PayrollPeriod: '07-2022', TotalSalary: 6050252280 },
        { PayrollPeriod: '08-2022', TotalSalary: 6030377232 },
        { PayrollPeriod: '09-2022', TotalSalary: 5954556225 },
        { PayrollPeriod: '10-2022', TotalSalary: 6041521647 },
        { PayrollPeriod: '11-2022', TotalSalary: 6029161119 },
        { PayrollPeriod: '12-2022', TotalSalary: 6120579237 }
    ],
    PITax: [
        { PayrollPeriod: '01-2022', TotalPITax: 190117307 },
        { PayrollPeriod: '02-2022', TotalPITax: 188049609.6 },
        { PayrollPeriod: '03-2022', TotalPITax: 190259204.6 },
        { PayrollPeriod: '04-2022', TotalPITax: 187006528.1 },
        { PayrollPeriod: '05-2022', TotalPITax: 187280611.2 },
        { PayrollPeriod: '06-2022', TotalPITax: 188744988.1 },
        { PayrollPeriod: '07-2022', TotalPITax: 189640029.5 },
        { PayrollPeriod: '08-2022', TotalPITax: 188786426.8 },
        { PayrollPeriod: '09-2022', TotalPITax: 186610934 },
        { PayrollPeriod: '10-2022', TotalPITax: 189268835.7 },
        { PayrollPeriod: '11-2022', TotalPITax: 188802949.8 },
        { PayrollPeriod: '12-2022', TotalPITax: 192422960.6 }
    ],
    net: [
        { PayrollPeriod: '01-2022', TotalPITax: 1901173070 },
        { PayrollPeriod: '02-2022', TotalPITax: 1880496096 },
        { PayrollPeriod: '03-2022', TotalPITax: 1902592046 },
        { PayrollPeriod: '04-2022', TotalPITax: 1870065281 },
        { PayrollPeriod: '05-2022', TotalPITax: 1872806112 },
        { PayrollPeriod: '06-2022', TotalPITax: 1887449881 },
        { PayrollPeriod: '07-2022', TotalPITax: 1896400295 },
        { PayrollPeriod: '08-2022', TotalPITax: 1887864268 },
        { PayrollPeriod: '09-2022', TotalPITax: 1866109340 },
        { PayrollPeriod: '10-2022', TotalPITax: 1892688357 },
        { PayrollPeriod: '11-2022', TotalPITax: 1888029498 },
        { PayrollPeriod: '12-2022', TotalPITax: 1924229606 }
    ],
    gross: [
        { PayrollPeriod: '01-2022', TotalPITax: 2081304260 },
        { PayrollPeriod: '02-2022', TotalPITax: 2061464480 },
        { PayrollPeriod: '03-2022', TotalPITax: 2080659494 },
        { PayrollPeriod: '04-2022', TotalPITax: 2053509354 },
        { PayrollPeriod: '05-2022', TotalPITax: 2051114257 },
        { PayrollPeriod: '06-2022', TotalPITax: 2069517087 },
        { PayrollPeriod: '07-2022', TotalPITax: 2076417566 },
        { PayrollPeriod: '08-2022', TotalPITax: 2069160866 },
        { PayrollPeriod: '09-2022', TotalPITax: 2045126702 },
        { PayrollPeriod: '10-2022', TotalPITax: 2072122671 },
        { PayrollPeriod: '11-2022', TotalPITax: 2068600594 },
        { PayrollPeriod: '12-2022', TotalPITax: 2104593964 }
    ]
}

export default function PayrollReport() {
    const { theme } = useTheme()
    const { t } = useTranslation()
    const [loading, setLoading] = useState(true)
    const currentYear = 2024
    const [selectedYear, setSelectedYear] = useState<number>(currentYear)

    const [option, setOption] = useState<any>(null)

    const handleYearChange = (event: SelectChangeEvent<number>) => {
        setSelectedYear(event.target.value as number)
    }

    useEffect(() => {}, [loading])

    useEffect(() => {
        const selectedData = selectedYear === 2024 ? data2024 : selectedYear === 2023 ? data2023 : data2022

        const periods = selectedData.insurance.map(item => item.PayrollPeriod)
        const insuranceData = selectedData.insurance.map(item => item.TotalSalary)
        const pitTaxData = selectedData.PITax.map(item => item.TotalPITax)
        const netData = selectedData.net.map(item => item.TotalPITax)
        const grossData = selectedData.gross.map(item => item.TotalPITax)

        setOption({
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#999'
                    }
                }
            },
            toolbox: {
                feature: {
                    dataView: { show: true, readOnly: false },
                    magicType: { show: true, type: ['line', 'bar'] },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            legend: {
                data: [
                    t('COMMON.SALARY.TOTAL_INSURANCE'),
                    t('COMMON.SALARY.TOTAL_PITAX'),
                    t('COMMON.SALARY.TOTAL_GROSS'),
                    t('COMMON.SALARY.TOTAL_SALARY')
                ],
                textStyle: {
                    color: theme === 'light' ? 'black' : '#fff',
                    fontFamily: 'Arial, sans-serif'
                }
            },
            xAxis: [
                {
                    type: 'category',
                    data: periods,
                    axisPointer: {
                        type: 'shadow'
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: 'Amount (Primary)',
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
                {
                    type: 'value',
                    name: 'Amount ',
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
                }
            ],
            series: [
                {
                    name: t('COMMON.SALARY.TOTAL_INSURANCE'),
                    type: 'bar',
                    tooltip: {
                        valueFormatter: function (value: number) {
                            return value + ''
                        }
                    },
                    data: insuranceData
                },
                {
                    name: t('COMMON.SALARY.TOTAL_PITAX'),
                    type: 'bar',
                    tooltip: {
                        valueFormatter: function (value: number) {
                            return value + ''
                        }
                    },
                    data: pitTaxData
                },
                {
                    name: t('COMMON.SALARY.TOTAL_GROSS'),
                    type: 'line',
                    yAxisIndex: 1,
                    tooltip: {
                        valueFormatter: function (value: number) {
                            return value + ''
                        }
                    },
                    data: grossData
                },
                {
                    name: t('COMMON.SALARY.TOTAL_SALARY'),
                    type: 'line',
                    yAxisIndex: 1,
                    tooltip: {
                        valueFormatter: function (value: number) {
                            return value + ''
                        }
                    },
                    data: netData
                }
            ]
        })
        setLoading(false)
    }, [selectedYear, theme])

    return (
        <Paper
            elevation={0}
            sx={{
                width: '100%',
                padding: '24px',
                backgroundColor: 'var(--background-item)',
                borderRadius: '15px',
                height: '100%',
                boxShadow: 'var(--box-shadow-paper)'
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    padding: '35px',
                    mb: '20px',
                    justifyContent: 'space-between'
                }}
            >
                <Typography fontSize={'24px'} fontWeight={'bold'} color='var(--text-color)'>
                    Payroll reports over month
                </Typography>
                <FormControl sx={{ width: '90px' }} fullWidth>
                    <Select
                        defaultValue={currentYear}
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
                        {[...Array(currentYear - 2021)].map((_, index) => {
                            const year = currentYear - index
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
            {option ? (
                <ReactECharts option={option} style={{ width: '100%', height: '350px', marginTop: '10px' }} />
            ) : null}
        </Paper>
    )
}
