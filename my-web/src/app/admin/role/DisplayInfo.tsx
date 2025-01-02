'use client'

import { Box, Paper, Typography } from '@mui/material'
import { TrendingDown, TrendingUp } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

function Page() {
    const { t } = useTranslation('common')

    const contractsCount = 20
    const contractsPercent = 33.33

    const newEmployeesCount = 2
    const newEmployeesPercent = 0

    const resignedEmployeesCount = 10
    const resignedEmployeesPercent = 11.11

    const currentEmployeesCount = 100
    const currentEmployeesPercent = 25

    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '190px',
                    marginBottom: '24px'
                }}
            >
                <Paper
                    sx={{
                        width: 'calc(100% / 2)',
                        backgroundImage: 'linear-gradient(135deg, rgb(119, 175, 232),rgb(97, 171, 244))',
                        backgroundColor: 'var(--background-color-after)',
                        backgroundSize: 'cover',
                        borderRadius: '38px',
                        backgroundPosition: 'left center',
                        height: '100%',
                        padding: '24px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        position: 'relative'
                    }}
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            backgroundImage: 'url(/images/group_1.svg)',
                            backgroundSize: 'auto 50%',
                            backgroundRepeat: 'no-repeat',
                            left: '24px',
                            top: '24px',
                            width: 'calc(100% - 50px)',
                            height: '100%'
                        }}
                    ></Box>
                    <Box
                        sx={{
                            position: 'absolute',
                            backgroundImage: 'url(/images/statistics_new_employee.png)',
                            backgroundSize: 'contain', // Đảm bảo hình hiển thị đầy đủ và tỷ lệ gốc
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 0px bottom 0px',
                            right: '24px',
                            bottom: '24px',
                            width: '36%',
                            height: '60%'
                        }}
                    ></Box>
                    <Typography
                        sx={{
                            fontSize: '20px',
                            fontWeight: 'bold',
                            color: 'var(--reward-title-color)'
                        }}
                    >
                        {t('Tổng số quản trị viên')}
                    </Typography>
                    <Typography
                        sx={{
                            color: 'var(--reward-title-color)',
                            fontSize: '35px',
                            mt: '10px',
                            fontWeight: 'bold'
                        }}
                    >
                        {newEmployeesCount}
                    </Typography>
                    <Box
                        sx={{
                            mt: '10px',
                            color: '#4f4f4f', //!(!newEmployeesPercent || newEmployeesPercent >= 0) ? '#F93C65' : '#00B69B',
                            fontSize: '15px',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        {newEmployeesPercent !== null &&
                            (!(!newEmployeesPercent || newEmployeesPercent >= 0) ? (
                                <TrendingDown style={{ marginRight: '6px' }} />
                            ) : (
                                <TrendingUp style={{ marginRight: '6px' }} />
                            ))}
                        {newEmployeesPercent !== null ? newEmployeesPercent + '%' : t('COMMON.DASHBOARD.NO_CHANGE')}
                        <Typography
                            sx={{
                                ml: '6px',
                                color: '#4f4f4f',
                                fontSize: '16px'
                            }}
                        >
                            {t('COMMON.REWARD_DISCIPLINE.LAST_MONTH')}
                        </Typography>
                    </Box>
                </Paper>

                <Paper
                    sx={{
                        width: 'calc(100% / 2)',
                        backgroundImage: 'linear-gradient(135deg, rgb(73, 148, 97),rgb(15, 219, 86))',
                        backgroundColor: 'var(--background-color-after)',
                        backgroundSize: 'cover',
                        borderRadius: '38px',
                        backgroundPosition: 'left center',
                        height: '100%',
                        padding: '24px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        position: 'relative'
                    }}
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            backgroundImage: 'url(/images/group_2.svg)',
                            backgroundSize: 'auto 50%',
                            backgroundRepeat: 'no-repeat',
                            left: '24px',
                            top: '24px',
                            width: 'calc(100% - 50px)',
                            height: '100%'
                        }}
                    ></Box>

                    <Box
                        sx={{
                            position: 'absolute',
                            backgroundImage: 'url(/images/statistics_employee_quit.png)',
                            backgroundSize: 'contain', // Đảm bảo hình hiển thị đầy đủ và tỷ lệ gốc
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 0px bottom 0px',
                            right: '24px',
                            bottom: '24px',
                            width: '36%',
                            height: '60%'
                        }}
                    ></Box>

                    <Typography
                        sx={{
                            fontSize: '20px',
                            fontWeight: 'bold',
                            color: 'var(--reward-title-color)'
                        }}
                    >
                        {t('Tổng số nhân viên quản lý')}
                    </Typography>
                    <Typography
                        sx={{
                            color: 'var(--reward-title-color)',
                            fontSize: '35px',
                            mt: '10px',
                            fontWeight: 'bold'
                        }}
                    >
                        {resignedEmployeesCount}
                    </Typography>
                    <Box
                        sx={{
                            mt: '10px',
                            color: '#4f4f4f', //!(!newEmployeesPercent || newEmployeesPercent >= 0) ? '#F93C65' : '#00B69B',
                            fontSize: '15px',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        {resignedEmployeesPercent !== null &&
                            (!(!resignedEmployeesPercent || resignedEmployeesPercent >= 0) ? (
                                <TrendingDown style={{ marginRight: '6px' }} />
                            ) : (
                                <TrendingUp style={{ marginRight: '6px' }} />
                            ))}
                        {resignedEmployeesPercent !== null
                            ? resignedEmployeesPercent + '%'
                            : t('COMMON.DASHBOARD.NO_CHANGE')}
                        <Typography
                            sx={{
                                ml: '6px',
                                color: '#4f4f4f',
                                fontSize: '16px'
                            }}
                        >
                            {t('COMMON.REWARD_DISCIPLINE.LAST_MONTH')}
                        </Typography>
                    </Box>
                </Paper>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '24px',
                    height: '190px'
                }}
            >
                <Paper
                    sx={{
                        width: 'calc(100% / 2)',
                        backgroundImage: 'linear-gradient(135deg, rgb(210, 234, 92),rgb(207, 236, 13))',
                        backgroundColor: 'var(--background-color-after)',
                        backgroundSize: 'cover',
                        borderRadius: '38px',
                        backgroundPosition: 'left center',
                        height: '100%',
                        padding: '24px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        position: 'relative'
                    }}
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            backgroundImage: 'url(/images/group_1.svg)',
                            backgroundSize: 'auto 50%',
                            backgroundRepeat: 'no-repeat',
                            left: '24px',
                            top: '24px',
                            width: 'calc(100% - 50px)',
                            height: '100%'
                        }}
                    ></Box>
                    <Box
                        sx={{
                            position: 'absolute',
                            backgroundImage: 'url(/images/statistics_employees.png)',
                            backgroundSize: 'contain', // Đảm bảo hình hiển thị đầy đủ và tỷ lệ gốc
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 0px bottom 0px',
                            right: '24px',
                            bottom: '24px',
                            width: '36%',
                            height: '60%'
                        }}
                    ></Box>
                    <Typography
                        sx={{
                            fontSize: '20px',
                            fontWeight: 'bold',
                            color: 'var(--reward-title-color)'
                        }}
                    >
                        {t('Tổng số nhân viên')}
                    </Typography>
                    <Typography
                        sx={{
                            color: 'var(--reward-title-color)',
                            fontSize: '35px',
                            mt: '10px',
                            fontWeight: 'bold'
                        }}
                    >
                        {currentEmployeesCount}
                    </Typography>
                    <Box
                        sx={{
                            mt: '10px',
                            color: '#4f4f4f',
                            fontSize: '15px',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        {currentEmployeesPercent !== null &&
                            (!(!currentEmployeesPercent || currentEmployeesPercent >= 0) ? (
                                <TrendingDown style={{ marginRight: '6px' }} />
                            ) : (
                                <TrendingUp style={{ marginRight: '6px' }} />
                            ))}
                        {currentEmployeesPercent !== null
                            ? currentEmployeesPercent + '%'
                            : t('COMMON.DASHBOARD.NO_CHANGE')}
                        <Typography
                            sx={{
                                ml: '6px',
                                color: '#4f4f4f',
                                fontSize: '16px'
                            }}
                        >
                            {t('COMMON.REWARD_DISCIPLINE.LAST_MONTH')}
                        </Typography>
                    </Box>
                </Paper>

                <Paper
                    sx={{
                        width: 'calc(100% / 2)',
                        backgroundImage: 'linear-gradient(135deg, rgb(247, 80, 80),rgb(239, 16, 16))',
                        backgroundColor: 'var(--background-color-after)',
                        backgroundSize: 'cover',
                        borderRadius: '38px',
                        backgroundPosition: 'left center',
                        height: '100%',
                        padding: '24px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        position: 'relative'
                    }}
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            backgroundImage: 'url(/images/group_2.svg)',
                            backgroundSize: 'auto 50%',
                            backgroundRepeat: 'no-repeat',
                            left: '24px',
                            top: '24px',
                            width: 'calc(100% - 50px)',
                            height: '100%'
                        }}
                    ></Box>

                    <Box
                        sx={{
                            position: 'absolute',
                            backgroundImage: 'url(/images/statistics_contract.png)',
                            backgroundSize: 'contain', // Đảm bảo hình hiển thị đầy đủ và tỷ lệ gốc
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 0px bottom 0px',
                            right: '24px',
                            bottom: '24px',
                            width: '36%',
                            height: '60%'
                        }}
                    ></Box>

                    <Typography
                        sx={{
                            fontSize: '20px',
                            fontWeight: 'bold',
                            color: 'var(--reward-title-color)'
                        }}
                    >
                        {t('Tổng số nhân viên IT')}
                    </Typography>
                    <Typography
                        sx={{
                            color: 'var(--reward-title-color)',
                            fontSize: '35px',
                            mt: '10px',
                            fontWeight: 'bold'
                        }}
                    >
                        {contractsCount}
                    </Typography>
                    <Box
                        sx={{
                            mt: '10px',
                            color: '#4f4f4f', //!(!newEmployeesPercent || newEmployeesPercent >= 0) ? '#F93C65' : '#00B69B',
                            fontSize: '15px',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        {contractsPercent !== null &&
                            (!(!contractsPercent || contractsPercent >= 0) ? (
                                <TrendingDown style={{ marginRight: '6px' }} />
                            ) : (
                                <TrendingUp style={{ marginRight: '6px' }} />
                            ))}
                        {contractsPercent !== null ? contractsPercent + '%' : t('COMMON.DASHBOARD.NO_CHANGE')}
                        <Typography
                            sx={{
                                ml: '6px',
                                color: '#4f4f4f',
                                fontSize: '16px'
                            }}
                        >
                            {t('COMMON.REWARD_DISCIPLINE.LAST_MONTH')}
                        </Typography>
                    </Box>
                </Paper>
            </Box>
        </Box>
    )
}

export default Page
