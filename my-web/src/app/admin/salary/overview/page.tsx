'use client'

import { Box, Typography } from '@mui/material'
import { BellPlus, Grid2x2Plus, HandCoins, ImagePlay, Sheet } from 'lucide-react'
import EmployeeSalaryChart from '../EmployeeSalaryChart'
import IncomeStructureChart from '../IncomeStructureChart'
import TotalIncomeChart from '../TotalIncomeChart'
import DepartmentChart from '../DepartmentChart'
import ErrorSalary from '../ErrorSalary'
import { useCreateSalaryMutation, useGetInfoForSalarySummaryQuery } from '@/services/SalaryService'

function OverviewSalaryPage() {
    const [createSalaries, { isSuccess, isError, isLoading }] = useCreateSalaryMutation()
    const { data } = useGetInfoForSalarySummaryQuery()
    const { total, PITax, totalInsurance } = data?.Data || {}

    return (
        <Box
            sx={{
                scrollbarGutter: 'stable',
                overflow: 'auto',
                '&::-webkit-scrollbar': {
                    width: '7px',
                    height: '7px'
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: 'var(--scrollbar-color)',
                    borderRadius: '10px'
                }
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box
                    sx={{
                        width: 'calc(100% / 3)',
                        backgroundBlendMode: 'overlay',
                        backgroundImage: 'url("/background/1.jpg")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderRadius: '15px',
                        zIndex: 1
                        //border: '1px solid black'
                    }}
                >
                    <Sheet size={'30px'} style={{ color: 'white', marginLeft: '10px', marginTop: '20px' }}></Sheet>
                    <Typography
                        sx={{
                            color: 'green',
                            padding: '10px',
                            marginBottom: '5px',
                            zIndex: 2
                        }}
                    >
                        xem chi tiết
                    </Typography>
                </Box>
                <Box
                    // variant='contained'
                    // color='primary'
                    // //onClick={handleCreateSalaries}
                    // disabled={isLoading}
                    sx={{
                        marginLeft: '20px',
                        width: 'calc(100% / 3)',
                        backgroundBlendMode: 'overlay',
                        backgroundImage: 'url("/background/1.jpg")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderRadius: '15px',
                        zIndex: 1
                    }}
                >
                    <Grid2x2Plus
                        size={'30px'}
                        style={{ color: 'white', marginLeft: '10px', marginTop: '20px' }}
                    ></Grid2x2Plus>
                    <Typography
                        sx={{
                            color: 'green',
                            padding: '10px',
                            marginBottom: '5px',
                            zIndex: 2
                        }}
                    >
                        {isLoading ? 'Đang tạo...' : 'Tạo bảng lương'}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        marginLeft: '20px',
                        width: 'calc(100% / 3)',
                        backgroundBlendMode: 'overlay',
                        backgroundImage: 'url("/background/1.jpg")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderRadius: '15px',
                        zIndex: 1
                    }}
                >
                    <HandCoins
                        size={'30px'}
                        style={{ color: 'white', marginLeft: '10px', marginTop: '20px' }}
                    ></HandCoins>
                    <Typography
                        sx={{
                            color: 'green',
                            padding: '10px',
                            marginBottom: '5px',
                            zIndex: 2
                        }}
                    >
                        chi trả lương
                    </Typography>
                </Box>
                <Box
                    sx={{
                        marginLeft: '20px',
                        width: 'calc(100% / 3)',
                        backgroundBlendMode: 'overlay',
                        backgroundImage: 'url("/background/1.jpg")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderRadius: '15px',
                        zIndex: 1
                    }}
                >
                    <BellPlus
                        size={'30px'}
                        style={{ color: 'white', marginLeft: '10px', marginTop: '20px' }}
                    ></BellPlus>
                    <Typography
                        sx={{
                            color: 'green',
                            padding: '10px',
                            marginBottom: '5px',
                            zIndex: 2
                        }}
                    >
                        Gửi thông báo
                    </Typography>
                </Box>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden',
                    marginTop: '15px',
                    gap: '15px'
                }}
            >
                <Box sx={{ width: 'calc(100% / 4 * 3)' }}>
                    <Box>
                        <Box
                            sx={{
                                backgroundColor: 'var(--background-item)',
                                width: '100%',
                                borderRadius: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '15px',
                                marginRight: '5px',
                                height: '100%'
                            }}
                        >
                            <Box
                                sx={{
                                    width: 'calc(100% / 4)',
                                    backgroundBlendMode: 'overlay',
                                    backgroundImage: 'url("/background_salary/tinhluong.png")',
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center',
                                    borderTopLeftRadius: '10px',
                                    borderBottomLeftRadius: '10px',
                                    height: '155px'
                                }}
                            ></Box>
                            <Box
                                sx={{
                                    width: 'calc(100% / 4 * 3)',
                                    marginLeft: '15px'
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: '20px',
                                        fontWeight: 'bold',
                                        marginTop: '12px',
                                        marginBottom: '2px'
                                    }}
                                >
                                    Tổng hợp lương
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: '16px',
                                        marginBottom: '15px'
                                    }}
                                >
                                    Lương tháng 12
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Box sx={{ width: 'calc(100% / 8 * 3)' }}>
                                        <Typography fontSize={'18px'}>Tổng lương</Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                                            <Typography fontWeight={'bold'} fontSize={'24px'}>
                                                {total > 1000000
                                                    ? (total / 1000000).toFixed(2)
                                                    : total > 1000
                                                      ? (total / 1000).toFixed(2)
                                                      : total}
                                            </Typography>
                                            <Typography fontSize={'16px'} style={{ marginLeft: '5px' }}>
                                                {total > 1000000
                                                    ? 'Nghìn tỷ đồng'
                                                    : total > 1000
                                                      ? 'Tỷ đồng'
                                                      : 'Triệu đồng'}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ width: 'calc(100% / 8 * 3)' }}>
                                        <Typography fontSize={'18px'}>Thuế TNCN</Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                                            <Typography fontWeight={'bold'} fontSize={'24px'}>
                                                {PITax > 1000000
                                                    ? (PITax / 1000000).toFixed(2)
                                                    : PITax > 1000
                                                      ? (PITax / 1000).toFixed(2)
                                                      : PITax}
                                            </Typography>
                                            <Typography fontSize={'16px'} style={{ marginLeft: '5px' }}>
                                                {PITax > 1000000
                                                    ? 'Nghìn tỷ đồng'
                                                    : PITax > 1000
                                                      ? 'Tỷ đồng'
                                                      : 'Triệu đồng'}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ width: 'calc(100% / 8 * 2)', marginRight: '-10px' }}>
                                        <Typography fontSize={'18px'}>Bảo hiểm</Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                                            <Typography fontWeight={'bold'} fontSize={'24px'}>
                                                {totalInsurance > 1000000
                                                    ? (totalInsurance / 1000000).toFixed(2)
                                                    : totalInsurance > 1000
                                                      ? (totalInsurance / 1000).toFixed(2)
                                                      : totalInsurance}
                                            </Typography>
                                            <Typography fontSize={'16px'} style={{ marginLeft: '5px' }}>
                                                {totalInsurance > 1000000
                                                    ? 'Nghìn tỷ đồng'
                                                    : totalInsurance > 1000
                                                      ? 'Tỷ đồng'
                                                      : 'Triệu đồng'}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    <Box sx={{ gap: '10px', display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                        <Box
                            sx={{
                                backgroundColor: 'var(--background-item)',
                                borderRadius: '5px',
                                width: 'calc(100% / 2)'
                            }}
                        >
                            <EmployeeSalaryChart />
                        </Box>
                        <Box
                            sx={{
                                backgroundColor: 'var(--background-item)',
                                borderRadius: '5px',
                                width: 'calc(100% / 2)'
                            }}
                        >
                            <IncomeStructureChart />
                        </Box>
                    </Box>
                    <Box sx={{ gap: '10px', display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                        <Box
                            sx={{
                                backgroundColor: 'var(--background-item)',
                                borderRadius: '5px',
                                width: 'calc(100% / 2)'
                            }}
                        >
                            <TotalIncomeChart />
                        </Box>
                        <Box
                            sx={{
                                backgroundColor: 'var(--background-item)',
                                borderRadius: '5px',
                                width: 'calc(100% / 2)'
                            }}
                        >
                            <DepartmentChart />
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ width: 'calc(100% / 4)', overflow: 'hidden' }}>
                    <ErrorSalary />
                </Box>
            </Box>
        </Box>
    )
}

export default OverviewSalaryPage
