'use client'
import { Box, Button, Paper, Typography, Skeleton } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { SearchForUser, useChangeAllReadMutation } from '@/services/NotificationsService'
import { useState, useCallback, useEffect } from 'react'
import ListNotification from './ListNotifications'
import { IFilterNotificationsForUserVModel } from '@/models/Notifications'
import { useSelector } from 'react-redux'
import { notificationsSelector, notificationsSlice } from '@/redux/slices/notificationsSlice'
import { useDispatch } from 'react-redux'
import NotificationModal from './NotificationModal'

const NotificationsPage = () => {
    const { t } = useTranslation('common')
    const [isRead, setIsRead] = useState(1)
    const [isLoading, setIsLoading] = useState(true)
    const dispatch = useDispatch()
    const [notificationId, setNotificationId] = useState<number | null>(null)

    const fetchNotifications = async (filter: IFilterNotificationsForUserVModel) => {
        setIsLoading(true)
        try {
            const dataResponse = await SearchForUser(filter)
            dispatch(notificationsSlice.actions.updateNotifications(dataResponse?.Data.Records || []))
        } catch (error) {
            console.error('Failed to fetch notifications:', error)
        } finally {
            setTimeout(() => {
                setIsLoading(false)
            }, 500)
        }
    }

    const notifications = useSelector(notificationsSelector)

    const handleClick = useCallback((key: number) => {
        setIsRead(key)
    }, [])

    const [changeAllRead] = useChangeAllReadMutation()

    const handleClickMarkAll = useCallback(
        async (userId: string) => {
            await changeAllRead(userId).unwrap()
            const updatedNotifications = notifications.map(notification => ({
                ...notification,
                IsRead: true
            }))
            dispatch(notificationsSlice.actions.updateNotifications(updatedNotifications))
        },
        [changeAllRead, notifications]
    )

    useEffect(() => {
        const initialFilter: IFilterNotificationsForUserVModel = {
            userId: 'CC001',
            isRead: isRead === 1 ? undefined : false
        }
        fetchNotifications(initialFilter)
    }, [isRead])

    const totalRecords = notifications.length

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '15px 0' }}>
            <Paper sx={{ width: '700px', borderRadius: '12px' }}>
                <Typography variant='h5' sx={{ fontWeight: 'bold', padding: '15px', fontSize: '24px' }}>
                    {t('COMMON.NOTIFICATION.TITLE')}
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        padding: '0 15px',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <Box>
                        <Button
                            variant='outlined'
                            key={1}
                            onClick={() => handleClick(1)}
                            sx={{
                                marginRight: '15px',
                                backgroundColor: isRead === 1 ? '#EBF5FF' : 'transparent',
                                color: isRead === 1 ? '#0064D1' : 'black',
                                fontSize: '15px',
                                fontWeight: 'bold',
                                padding: '5px 12px',
                                borderRadius: '30px',
                                borderColor: isRead === 1 ? '#EBF5FF' : '#d8d8d8',
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: isRead === 1 ? '#cdd5e3' : '#d8d8d8'
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
                                backgroundColor: isRead === 2 ? '#EBF5FF' : 'transparent',
                                color: isRead === 2 ? '#0064D1' : 'black',
                                fontSize: '15px',
                                fontWeight: 'bold',
                                padding: '5px 12px',
                                borderRadius: '30px',
                                borderColor: isRead === 2 ? '#EBF5FF' : '#d8d8d8',
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: isRead === 2 ? '#cdd5e3' : '#d8d8d8'
                                }
                            }}
                        >
                            {t('COMMON.NOTIFICATION.BUTTON.UNREAD')}
                        </Button>
                    </Box>
                    <Box>
                        <Button
                            variant='outlined'
                            onClick={() => handleClickMarkAll('CC001')}
                            sx={{
                                backgroundColor: 'transparent',
                                color: 'black',
                                fontSize: '15px',
                                fontWeight: 'bold',
                                padding: '5px 12px',
                                borderRadius: '30px',
                                borderColor: '#d8d8d8',
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

                {isLoading ? (
                    <Box
                        sx={{
                            marginTop: '10px',
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            padding: '15px'
                        }}
                    >
                        {Array.from({ length: 8 }).map((_, index) => (
                            <Box
                                key={index}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    width: '100%',
                                    marginBottom: '15px'
                                }}
                            >
                                <Skeleton
                                    variant='circular'
                                    width={58}
                                    height={58}
                                    sx={{
                                        flexShrink: 0,
                                        bgcolor: '#f8f8fa'
                                    }}
                                />
                                <Skeleton
                                    variant='text'
                                    width='100%'
                                    height={30}
                                    sx={{
                                        marginLeft: '15px',
                                        marginTop: '0',
                                        borderRadius: '13px',
                                        bgcolor: '#f8f8fa'
                                    }}
                                />
                            </Box>
                        ))}
                    </Box>
                ) : totalRecords === 0 || totalRecords === undefined ? (
                    <Box
                        sx={{
                            display: 'flex',
                            padding: '15px',
                            marginTop: '25px',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                    >
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
                            <path
                                fill='#a4a7ab'
                                d='M75.28 43.44a26.72 26.72 0 1 0-51.62 13.83L30 81l51.62-13.87z'
                            ></path>
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
                ) : (
                    <Box sx={{ padding: '15px 7.5px 7.5px' }}>
                        <ListNotification setNotificationId={setNotificationId} />
                    </Box>
                )}
            </Paper>
            {notificationId && (
                <NotificationModal
                    notificationId={notificationId}
                    open={!!notificationId}
                    handleClose={() => setNotificationId(null)}
                />
            )}
        </Box>
    )
}

export default NotificationsPage
