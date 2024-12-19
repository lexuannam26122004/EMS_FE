'use client'
import CustomTabs from '@/components/tabs/tabs'
import { Box, Button, Divider, Typography } from '@mui/material'
import React from 'react'
import ReactECharts from 'echarts-for-react'
import { useTranslation } from 'react-i18next'
import { useGetAllSalariesQuery } from '@/services/SalaryService'
import { ISalaryGetAll } from '@/models/Salary'
import { ProgressClock } from 'mdi-material-ui'
import { Heart, Users, WalletIcon } from 'lucide-react'
import { ChartNoAxesColumn, ChartNoAxesCombined, Wallet } from 'lucide-react'
import { useRouter } from 'next/navigation'

function SalaryPage() {
    const { t } = useTranslation('common')
    const { data: responseData, isFetching, refetch } = useGetAllSalariesQuery()
    const router = useRouter()

    const salaryData = responseData?.Data as ISalaryGetAll[]
    const salaryCycles = [
        'Cycle 1',
        'Cycle 2',
        'Cycle 3',
        'Cycle 4',
        'Cycle 5',
        'Cycle 6',
        'Cycle 7',
        'Cycle 8',
        'Cycle 9',
        'Cycle 10'
    ]
    const option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: 'Email',
                type: 'line',
                data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
                name: 'Union Ads',
                type: 'line',
                data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
                name: 'Video Ads',
                type: 'line',
                data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
                name: 'Direct',
                type: 'line',
                data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
                name: 'Search Engine',
                type: 'line',
                data: [1300, 932, 901, 934, 1290, 1330, 1320]
            }
        ]
    }

    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden',
                    marginLeft: '10px'
                }}
            >
                <Box
                    sx={{
                        width: 'calc(100% / 9 * 5)',
                        backgroundColor: 'var(--background-color)',
                        border: '1px solid lightgray',
                        borderRadius: '5px',
                        gap: '10px'
                    }}
                >
                    <Typography sx={{ padding: '10px', marginLeft: '10px', fontSize: '24px', fontWeight: 'bold' }}>
                        {t('COMMON.SALARY.PAYROLL_SCHEDULE')}
                    </Typography>
                    <Divider
                        sx={{ height: '1px', marginLeft: '15px', marginRight: '15px', marginBottom: '15px' }}
                    ></Divider>
                    <ReactECharts option={option} style={{ width: '100%', height: '400px' }}></ReactECharts>
                </Box>
                <Box
                    sx={{
                        width: 'calc(100% / 9 * 4)',
                        backgroundColor: 'var(--background-color)',
                        border: '1px solid lightgray',
                        borderRadius: '5px',
                        gap: '10px',
                        marginRight: '20px'
                    }}
                >
                    <Typography sx={{ padding: '10px', marginLeft: '10px', fontSize: '24px', fontWeight: 'bold' }}>
                        {t('COMMON.SALARY.OVERVIEW')}
                    </Typography>
                    <Divider
                        sx={{ height: '1px', marginLeft: '15px', marginRight: '15px', marginBottom: '15px' }}
                    ></Divider>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Box sx={{ padding: '15px' }}>
                            <Box>
                                <Typography sx={{ padding: '10px', marginLeft: '10px', fontSize: '16px' }}>
                                    {t('COMMON.SALARY.OVERVIEW')}
                                </Typography>
                                <Typography
                                    sx={{ padding: '10px', marginLeft: '10px', fontSize: '26px', fontWeight: 'bold' }}
                                >
                                    {t('COMMON.SALARY.OVERVIEW')}
                                </Typography>
                                <Box sx={{ alignItems: 'center', display: 'flex' }}>
                                    <ChartNoAxesCombined size={16} color='black' style={{ marginLeft: '20px' }} />
                                    <Typography sx={{ padding: '10px', fontSize: '16px' }}>
                                        {t('COMMON.SALARY.OVERVIEW')}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{ marginTop: '40px' }}>
                                <Typography sx={{ padding: '10px', marginLeft: '10px', fontSize: '16px' }}>
                                    {t('COMMON.SALARY.OVERVIEW')}
                                </Typography>
                                <Typography
                                    sx={{ padding: '10px', marginLeft: '10px', fontSize: '26px', fontWeight: 'bold' }}
                                >
                                    {t('COMMON.SALARY.OVERVIEW')}
                                </Typography>
                                <Box sx={{ alignItems: 'center', display: 'flex' }}>
                                    <ChartNoAxesCombined size={16} color='black' style={{ marginLeft: '20px' }} />
                                    <Typography sx={{ padding: '10px', fontSize: '16px' }}>
                                        {t('COMMON.SALARY.OVERVIEW')}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Divider
                            orientation='vertical'
                            flexItem
                            sx={{ marginRight: '-20px', marginLeft: '20px', marginTop: '15px', marginBottom: '15px' }}
                        />
                        <Box sx={{ padding: '15px' }}>
                            <Box>
                                <Typography sx={{ padding: '10px', marginLeft: '10px', fontSize: '16px' }}>
                                    {t('COMMON.SALARY.OVERVIEW')}
                                </Typography>
                                <Typography
                                    sx={{ padding: '10px', marginLeft: '10px', fontSize: '26px', fontWeight: 'bold' }}
                                >
                                    {t('COMMON.SALARY.OVERVIEW')}
                                </Typography>
                                <Box sx={{ alignItems: 'center', display: 'flex' }}>
                                    <ChartNoAxesCombined size={16} color='black' style={{ marginLeft: '20px' }} />
                                    <Typography sx={{ padding: '10px', fontSize: '16px' }}>
                                        {t('COMMON.SALARY.OVERVIEW')}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{ marginTop: '40px' }}>
                                <Typography sx={{ padding: '10px', marginLeft: '10px', fontSize: '16px' }}>
                                    {t('COMMON.SALARY.OVERVIEW')}
                                </Typography>
                                <Typography
                                    sx={{ padding: '10px', marginLeft: '10px', fontSize: '26px', fontWeight: 'bold' }}
                                >
                                    {t('COMMON.SALARY.OVERVIEW')}
                                </Typography>
                                <Box sx={{ alignItems: 'center', display: 'flex' }}>
                                    <ChartNoAxesCombined size={16} color='black' style={{ marginLeft: '20px' }} />
                                    <Typography sx={{ padding: '10px', fontSize: '16px' }}>
                                        {t('COMMON.SALARY.OVERVIEW')}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Divider
                            orientation='vertical'
                            flexItem
                            sx={{ marginRight: '-20px', marginLeft: '20px', marginTop: '15px', marginBottom: '15px' }}
                        />
                        <Box sx={{ padding: '15px' }}>
                            <Box>
                                <Typography sx={{ padding: '10px', marginLeft: '10px', fontSize: '16px' }}>
                                    {t('COMMON.SALARY.OVERVIEW')}
                                </Typography>
                                <Typography
                                    sx={{ padding: '10px', marginLeft: '10px', fontSize: '26px', fontWeight: 'bold' }}
                                >
                                    {t('COMMON.SALARY.OVERVIEW')}
                                </Typography>
                                <Box sx={{ alignItems: 'center', display: 'flex' }}>
                                    <ChartNoAxesCombined size={16} color='black' style={{ marginLeft: '20px' }} />
                                    <Typography sx={{ padding: '10px', fontSize: '16px' }}>
                                        {t('COMMON.SALARY.OVERVIEW')}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{ marginTop: '40px' }}>
                                <Typography sx={{ padding: '10px', marginLeft: '10px', fontSize: '16px' }}>
                                    {t('COMMON.SALARY.OVERVIEW')}
                                </Typography>
                                <Typography
                                    sx={{ padding: '10px', marginLeft: '10px', fontSize: '26px', fontWeight: 'bold' }}
                                >
                                    {t('COMMON.SALARY.OVERVIEW')}
                                </Typography>
                                <Box sx={{ alignItems: 'center', display: 'flex' }}>
                                    <ChartNoAxesCombined size={16} color='black' style={{ marginLeft: '20px' }} />
                                    <Typography sx={{ padding: '10px', fontSize: '16px' }}>
                                        {t('COMMON.SALARY.OVERVIEW')}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                <Typography sx={{ padding: '10px', fontSize: '16px' }}>{t('COMMON.SALARY.PAYROLL_CYCLE')}</Typography>
                <Divider sx={{ flexGrow: 1, alignSelf: 'center', marginRight: '12px' }} />
            </Box>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)', // 4 cột mỗi hàng
                    gap: '16px' // Khoảng cách giữa các phần tử
                }}
            >
                {salaryCycles.map((cycle, index) => (
                    <Box
                        key={index}
                        sx={{
                            padding: '10px 20px',
                            border: '1px solid lightgray',
                            borderRadius: '5px',
                            cursor: 'pointer', // Thay đổi con trỏ khi hover
                            backgroundColor: 'var(--background-color)',
                            '&:hover': {
                                backgroundColor: 'var(--hover-button-color)'
                            },
                            '&:active': {
                                // Thêm hiệu ứng gợn sóng khi nhấn
                                transform: 'scale(0.95)', // Giảm kích thước một chút
                                transition: 'transform 0.1s ease' // Thêm hiệu ứng chuyển tiếp
                            },
                            boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                        }}
                        onClick={() => router.push('/admin/salary/getall-salary')}
                    >
                        <Typography style={{ fontWeight: 'bold', fontSize: '20px', color: 'blue' }}>{cycle}</Typography>
                        <Typography style={{ fontSize: '16px', marginTop: '10px', color: 'var(--text-color)' }}>
                            {cycle}
                        </Typography>
                        <Divider sx={{ flexGrow: 1, alignSelf: 'center', marginTop: '10px', marginRight: '12px' }} />
                        <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <WalletIcon style={{ marginTop: '10px' }}></WalletIcon>
                                <Typography
                                    style={{
                                        fontSize: '18px',
                                        marginLeft: '10px',
                                        marginTop: '10px',
                                        color: 'var(--text-color)'
                                    }}
                                >
                                    {cycle}
                                </Typography>
                            </Box>
                            <Typography style={{ fontSize: '18px', marginTop: '10px' }}>{cycle}</Typography>
                        </Box>
                        <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Heart style={{ marginTop: '10px' }}></Heart>
                                <Typography
                                    style={{
                                        fontSize: '18px',
                                        color: 'var(--text-color)',
                                        marginLeft: '10px',
                                        marginTop: '10px'
                                    }}
                                >
                                    {cycle}
                                </Typography>
                            </Box>
                            <Typography style={{ fontSize: '18px', marginTop: '10px' }}>{cycle}</Typography>
                        </Box>
                        <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Users style={{ marginTop: '10px' }}></Users>
                                <Typography
                                    style={{
                                        fontSize: '18px',
                                        color: 'var(--text-color)',
                                        marginLeft: '10px',
                                        marginTop: '10px'
                                    }}
                                >
                                    {cycle}
                                </Typography>
                            </Box>
                            <Typography style={{ fontSize: '18px', marginTop: '10px' }}>{cycle}</Typography>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    )
    // Dữ liệu cho các tab
    // const tabs = [
    //     {
    //         label: 'Chu kỳ lương',
    //         content: (
    //             <Box>
    //                 <Typography>Nội dung thông tin lương</Typography>
    //                 {/* Thêm nội dung cho tab thông tin lương */}
    //             </Box>
    //         )
    //     },
    //     {
    //         label: 'Chính sách lương',
    //         content: (
    //             <Box>
    //                 <Typography>Nội dung chính sách lương lương</Typography>
    //                 {/* Thêm nội dung cho tab bảng lương */}
    //             </Box>
    //         )
    //     }
    // ]

    // return (
    //     <Box sx={{ padding: '20px' }}>
    //         <CustomTabs tabs={tabs} />
    //     </Box>
    // )
}

export default SalaryPage
