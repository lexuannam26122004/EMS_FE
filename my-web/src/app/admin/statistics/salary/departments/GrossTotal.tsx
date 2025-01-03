'use client'
import React, { useEffect, useState } from 'react'
import ReactECharts from 'echarts-for-react'
import { Paper, Typography } from '@mui/material'
import { useTheme } from 'next-themes'
import Loading from '@/components/Loading'
import { useGetGrossTotalByDepartmentsQuery } from '@/services/SalaryService'

export default function GrossTotalByAreas() {
    const { theme } = useTheme()
    const [chartData, setChartData] = useState<{ [key: string]: number }>({})
    const [loading, setLoading] = useState(true)
    const { data, isLoading, error } = useGetGrossTotalByDepartmentsQuery()
    useEffect(() => {
        if (data) {
            setChartData(data.Data.salaryByDepartment) // Giả sử dữ liệu trả về có cấu trúc như bạn đã định nghĩa
            setLoading(false)
        }
    }, [data])

    if (isLoading || loading) {
        return <Loading />
    }
    if (error) {
        return (
            <Paper
                elevation={0}
                sx={{
                    width: '100%',
                    padding: '24px',
                    backgroundColor: 'var(--background-item)',
                    borderRadius: '15px',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Typography color='red'>Có lỗi xảy ra khi tải dữ liệu.</Typography> {/* Thông báo lỗi */}
            </Paper>
        )
    }

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
            right: '5%',
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
            },
            axisLabel: {
                formatter: function (value: number) {
                    if (value >= 1e9) {
                        return (value / 1e9).toFixed(0) + 'B' // "B" cho tỷ
                    } else if (value >= 1e6) {
                        return (value / 1e6).toFixed(0) + 'M' // "M" cho triệu
                    } else if (value >= 1e3) {
                        return (value / 1e3).toFixed(0) + 'K' // "K" cho nghìn
                    } else {
                        return value // Trả về giá trị bình thường nếu nhỏ hơn 1000
                    }
                }
            }
        },
        yAxis: {
            type: 'category',
            data: Object.keys(chartData),

            axisLabel: {
                formatter: function (value: string) {
                    const maxLength = 10 // Độ dài tối đa cho nhãn
                    return value.length > maxLength ? value.substring(0, maxLength) + '...' : value // Cắt nhãn nếu dài hơn maxLength
                },
                textStyle: {
                    color: theme === 'light' ? 'black' : '#fff', // Màu của chỉ số trục y
                    fontFamily: 'Arial, sans-serif'
                }
            }
        },
        series: [
            {
                data: Object.values(chartData),
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
                height: '100%',
                boxShadow: 'var(--box-shadow-paper)'
            }}
        >
            <Typography fontSize={'20px'} fontWeight={'bold'} color='var(--text-color)'>
                Gross total by departments
            </Typography>
            <ReactECharts option={option} style={{ width: '100%', height: '330px', marginTop: '25px' }}></ReactECharts>
        </Paper>
    )
}
