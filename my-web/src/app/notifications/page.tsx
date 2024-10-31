'use client'
import { Box, Divider, Button, Paper, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Ellipsis } from 'lucide-react'
import { useState, useCallback } from 'react'

const NotificationsPage = () => {
    const { t } = useTranslation('common')
    const [clickedButton, setClickedButton] = useState(1)

    const handleClick = useCallback((key: number) => {
        setClickedButton(key)
    }, [])

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '15px 0' }}>
            <Paper sx={{ width: '700px', padding: '15px', borderRadius: '10px' }}>
                <Typography variant='h5' sx={{ fontWeight: 'bold', fontSize: '30px' }}>
                    {t('COMMON.NOTIFICATION.TITLE')}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '15px 0' }}>
                    <Box>
                        <Button
                            variant='outlined'
                            key={1}
                            onClick={() => handleClick(1)}
                            sx={{
                                marginRight: '15px',
                                backgroundColor: clickedButton === 1 ? '#EBF5FF' : 'transparent',
                                color: clickedButton === 1 ? '#0064D1' : 'black',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                padding: '5px 12px',
                                borderRadius: '30px',
                                borderColor: clickedButton === 1 ? '#EBF5FF' : '#d8d8d8',
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: clickedButton === 1 ? '#cdd5e3' : '#d8d8d8'
                                }
                            }}
                        >
                            {t('COMMON.NOTIFICATION.BUTTON.ALL')}
                        </Button>
                        <Button
                            variant='outlined'
                            key={2}
                            onClick={() => handleClick(2)}
                            sx={{
                                backgroundColor: clickedButton === 2 ? '#EBF5FF' : 'transparent',
                                color: clickedButton === 2 ? '#0064D1' : 'black',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                padding: '5px 12px',
                                borderRadius: '30px',
                                borderColor: clickedButton === 2 ? '#EBF5FF' : '#d8d8d8',
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: clickedButton === 2 ? '#cdd5e3' : '#d8d8d8'
                                }
                            }}
                        >
                            {t('COMMON.NOTIFICATION.BUTTON.UNREAD')}
                        </Button>
                    </Box>
                    <Box>
                        <Button
                            variant='outlined'
                            sx={{
                                backgroundColor: 'transparent',
                                color: 'black',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                padding: '5px 12px',
                                borderRadius: '30px',
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: '#d8d8d8'
                                }
                            }}
                        >
                            {t('COMMON.NOTIFICATION.BUTTON.MARK_ALL_AS_READ')}
                        </Button>
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', marginTop: '25px', flexDirection: 'column', alignItems: 'center' }}>
                    <svg
                        viewBox='0 0 112 112'
                        width='115'
                        height='115'
                        className='xfx01vb x1lliihq x1tzjh5l x1k90msu x2h7rmj x1qfuztq'
                    >
                        <rect
                            width='18.98'
                            height='18.98'
                            x='34.96'
                            y='82'
                            fill='#1876f2'
                            rx='9.49'
                            transform='rotate(-15 44.445 91.471)'
                        ></rect>
                        <circle cx='43.01' cy='26.27' r='6.85' fill='#64676b'></circle>
                        <path fill='#a4a7ab' d='M75.28 43.44a26.72 26.72 0 1 0-51.62 13.83L30 81l51.62-13.87z'></path>
                        <path fill='#a4a7ab' d='M90.78 75.64 26.33 92.9l3.22-13.63 51.62-13.83 9.61 10.2z'></path>
                        <rect
                            width='66.91'
                            height='8.88'
                            x='25.35'
                            y='80.75'
                            fill='#a4a7ab'
                            rx='4.44'
                            transform='rotate(-15 58.793 85.207)'
                        ></rect>
                    </svg>
                    <Typography variant='h6' sx={{ fontWeight: 'bold', fontSize: '22px', color: '#898383' }}>
                        {t('COMMON.NOTIFICATION.MESSAGES.NO_NOTIFICATION')}
                    </Typography>
                </Box>
            </Paper>
        </Box>
    )
}

export default NotificationsPage
