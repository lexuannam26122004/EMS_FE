'use client'

import { Box, Paper, Typography } from '@mui/material'
import { TrendingDown, TrendingUp } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

function Page() {
    const { t } = useTranslation('common')
    const totalNotify = 29
    const notifyPercent = 25.5
    const totalEvent = 12
    const eventPercent = -20.5
    const rate = 75
    const ratePercent = 25.5

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '24px'
            }}
        >
            <Paper
                sx={{
                    width: 'calc(100% / 3)',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: 'var(--background-item)',
                    justifyContent: 'space-between',
                    borderRadius: '15px',
                    padding: '20px 24px 20px'
                }}
            >
                <Box>
                    <Typography
                        sx={{
                            fontSize: '16px',
                            fontWeight: 'bold',
                            color: 'var(--text-label-color)'
                        }}
                    >
                        {t('COMMON.STAT_NOTIFY.TOTAL_NOTIFY')}
                    </Typography>
                    <Typography
                        sx={{
                            color: 'var(--text-color)',
                            fontSize: '34px',
                            margin: '12px 0',
                            fontWeight: 'bold'
                        }}
                    >
                        {totalNotify}
                    </Typography>
                    <Box
                        sx={{
                            mt: '10px',
                            color: 'var(--text-color)', //!(!rewardPercent || rewardPercent >= 0) ? '#F93C65' : '#00B69B',
                            fontSize: '15px',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        {notifyPercent !== null &&
                            (!(!notifyPercent || notifyPercent >= 0) ? (
                                <img
                                    src='/images/down.svg'
                                    style={{ marginRight: '6px', width: '26px', height: '26px' }}
                                />
                            ) : (
                                <img
                                    src='/images/up.svg'
                                    style={{ marginRight: '6px', width: '26px', height: '26px' }}
                                />
                            ))}
                        {notifyPercent !== null ? notifyPercent + '%' : t('COMMON.DASHBOARD.NO_CHANGE')}
                        <Typography
                            sx={{
                                ml: '6px',
                                color: 'var(--text-color)',
                                fontSize: '16px'
                            }}
                        >
                            {t('COMMON.REWARD_DISCIPLINE.LAST_MONTH')}
                        </Typography>
                    </Box>
                </Box>

                <Box
                    sx={{
                        backgroundColor: 'var(--header-table-dashboard)',
                        borderRadius: '50%',
                        padding: '0px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <img
                        src='/images/notify.svg'
                        alt='notify'
                        style={{
                            width: '120px',
                            height: '120px'
                        }}
                    />
                </Box>
            </Paper>

            <Paper
                sx={{
                    width: 'calc(100% / 3)',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: 'var(--background-item)',
                    justifyContent: 'space-between',
                    borderRadius: '15px',
                    padding: '20px 24px 20px'
                }}
            >
                <Box>
                    <Typography
                        sx={{
                            fontSize: '16px',
                            fontWeight: 'bold',
                            color: 'var(--text-label-color)'
                        }}
                    >
                        {t('COMMON.STAT_NOTIFY.READ_NOTIFY_RATE')}
                    </Typography>
                    <Typography
                        sx={{
                            color: 'var(--text-color)',
                            fontSize: '34px',
                            margin: '12px 0',
                            fontWeight: 'bold'
                        }}
                    >
                        {rate + '%'}
                    </Typography>
                    <Box
                        sx={{
                            mt: '10px',
                            color: 'var(--text-color)', //!(!rewardPercent || rewardPercent >= 0) ? '#F93C65' : '#00B69B',
                            fontSize: '15px',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        {ratePercent !== null &&
                            (!(!ratePercent || ratePercent >= 0) ? (
                                <img
                                    src='/images/down.svg'
                                    style={{ marginRight: '6px', width: '26px', height: '26px' }}
                                />
                            ) : (
                                <img
                                    src='/images/up.svg'
                                    style={{ marginRight: '6px', width: '26px', height: '26px' }}
                                />
                            ))}
                        {ratePercent !== null ? ratePercent + '%' : t('COMMON.DASHBOARD.NO_CHANGE')}
                        <Typography
                            sx={{
                                ml: '6px',
                                color: 'var(--text-color)',
                                fontSize: '16px'
                            }}
                        >
                            {t('COMMON.REWARD_DISCIPLINE.LAST_MONTH')}
                        </Typography>
                    </Box>
                </Box>

                <Box
                    sx={{
                        backgroundColor: 'var(--header-table-dashboard)',
                        borderRadius: '50%',
                        padding: '0px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <img
                        src='/images/read.svg'
                        alt='notify'
                        style={{
                            width: '120px',
                            height: '120px'
                        }}
                    />
                </Box>
            </Paper>

            <Paper
                sx={{
                    width: 'calc(100% / 3)',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: 'var(--background-item)',
                    justifyContent: 'space-between',
                    borderRadius: '15px',
                    padding: '20px 24px 20px'
                }}
            >
                <Box>
                    <Typography
                        sx={{
                            fontSize: '16px',
                            fontWeight: 'bold',
                            color: 'var(--text-label-color)'
                        }}
                    >
                        {t('COMMON.STAT_NOTIFY.TOTAL_EVENTS')}
                    </Typography>
                    <Typography
                        sx={{
                            color: 'var(--text-color)',
                            fontSize: '34px',
                            margin: '12px 0',
                            fontWeight: 'bold'
                        }}
                    >
                        {totalEvent}
                    </Typography>
                    <Box
                        sx={{
                            mt: '10px',
                            color: 'var(--text-color)', //!(!rewardPercent || rewardPercent >= 0) ? '#F93C65' : '#00B69B',
                            fontSize: '15px',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        {eventPercent !== null &&
                            (!(!eventPercent || eventPercent >= 0) ? (
                                <img
                                    src='/images/down.svg'
                                    style={{ marginRight: '6px', width: '26px', height: '26px' }}
                                />
                            ) : (
                                <img
                                    src='/images/up.svg'
                                    style={{ marginRight: '6px', width: '26px', height: '26px' }}
                                />
                            ))}
                        {eventPercent !== null ? eventPercent + '%' : t('COMMON.DASHBOARD.NO_CHANGE')}
                        <Typography
                            sx={{
                                ml: '6px',
                                color: 'var(--text-color)',
                                fontSize: '16px'
                            }}
                        >
                            {t('COMMON.REWARD_DISCIPLINE.LAST_MONTH')}
                        </Typography>
                    </Box>
                </Box>

                <Box
                    sx={{
                        backgroundColor: 'var(--header-table-dashboard)',
                        borderRadius: '50%',
                        padding: '0px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <img
                        src='/images/event.svg'
                        alt='notify'
                        style={{
                            width: '120px',
                            height: '120px'
                        }}
                    />
                </Box>
            </Paper>
        </Box>
    )
}

export default Page
