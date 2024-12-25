'use client'

import { Box, Paper, Typography } from '@mui/material'
import { TrendingDown, TrendingUp } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

function Page() {
    const { t } = useTranslation('common')

    const newEmployeesCount = 5
    const newEmployeesPercent = -7.5

    const currentEmployeesCount = 50
    const currentEmployeesPercent = 72.0

    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '24px',
                    height: '190px',
                    marginBottom: '24px',
                    marginTop: '24px'
                }}
            >
                <Paper
                    sx={{
                        width: '100%',
                        backgroundImage: 'url(/images/Subtract_green.svg)',
                        backgroundColor: 'var(--background-color-after)',
                        backgroundSize: 'cover',
                        borderRadius: '38px',
                        backgroundPosition: 'right center',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        padding: '24px',
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
                        {t('Tổng số nhân viên mới')}
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
                        width: '100%',
                        backgroundImage: 'url(/images/Subtract_orange.svg)',
                        backgroundColor: 'var(--background-color-after)',
                        backgroundSize: 'cover',
                        borderRadius: '38px',
                        backgroundPosition: 'right center',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        padding: '24px',
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
                        {t('Tổng số nhân viên trong công ty')}
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
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '24px',
                    height: '190px',
                    marginTop: '24px'
                }}
            >
                <Paper
                    sx={{
                        width: '100%',
                        backgroundImage: 'url(/images/Subtract_green.svg)',
                        backgroundColor: 'var(--background-color-after)',
                        backgroundSize: 'cover',
                        borderRadius: '38px',
                        backgroundPosition: 'right center',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        padding: '24px',
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
                        {t('Tổng số nhân viên mới')}
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
            </Box>
        </Box>
    )
}

export default Page
