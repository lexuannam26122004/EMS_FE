import { INotificationsForUser } from '@/models/Notifications'
import React, { useMemo, useCallback, useRef, useState, useEffect } from 'react'
import { Box, Typography, Avatar, Popper, Paper, MenuItem, styled } from '@mui/material'
import { Ellipsis, Check, Trash2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useChangeNotificationReadMutation, useDeleteNotificationMutation } from '@/services/NotificationsService'
import { useDispatch, useSelector } from 'react-redux'
import { useToast } from '@/hooks/useToast'
import NotificationModal from './NotificationModal'
import { notificationsSelector, notificationsSlice } from '@/redux/slices/notificationsSlice'
import DOMPurify from 'dompurify'

function getTimeDifferenceText(sentTime: string) {
    const now = new Date()
    const sentDate = new Date(sentTime)
    const diffInSeconds = Math.floor((now.getTime() - sentDate.getTime()) / 1000)

    if (diffInSeconds < 60) return `${diffInSeconds} giây trước`
    const diffInMinutes = Math.floor(diffInSeconds / 60)
    if (diffInMinutes < 60) return `${diffInMinutes} phút trước`
    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours} giờ trước`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays} ngày trước`
    const diffInWeeks = Math.floor(diffInDays / 7)
    if (diffInWeeks < 5) return `${diffInWeeks} tuần trước`
    const diffInMonths = Math.floor(diffInDays / 30)
    if (diffInMonths < 12) return `${diffInMonths} tháng trước`
    const diffInYears = Math.floor(diffInMonths / 12)
    return `${diffInYears} năm trước`
}

const icons: Record<string, string> = {
    Salary: '/images/salary_icon.png',
    Reward: '/images/reward_icon.png',
    Insurance: '/images/insurance_icon.png',
    Holiday: '/images/holiday_icon.png',
    Benefit: '/images/benefit_icon.png',
    Discipline: '/images/discipline_icon.png',
    Timekeeping: '/images/timekeeping_icon.png',
    Public: '/images/public_icon.png'
}

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
    padding: '7.5px',
    fontSize: '14px',
    fontWeight: 'bold',
    '&:hover': {
        backgroundColor: '#f0f0f0',
        borderRadius: '5px'
    }
}))

interface ListNotificationsProps {
    setNotificationId: (notificationId: number | null) => void
}

const NotificationsComponent = React.memo(({ setNotificationId }: ListNotificationsProps) => {
    const dispatch = useDispatch()
    const notifications = useSelector(notificationsSelector)

    const toast = useToast()

    const { t } = useTranslation('common')
    const arrowRef = useRef(null)
    const [changeNotificationRead, resultChange] = useChangeNotificationReadMutation()
    const [deleteNotification, resultDelete] = useDeleteNotificationMutation()
    const [isHovered, setIsHovered] = useState(false)
    const [placement, setPlacement] = useState('bottom')
    const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null)
    const [selectedNotification, setSelectedNotification] = useState<INotificationsForUser | null>(null)

    const handleClick = useCallback(
        (event: React.MouseEvent<HTMLDivElement, MouseEvent>, notification: INotificationsForUser) => {
            setAnchorEl(anchorEl ? null : event.currentTarget)
            setSelectedNotification(notification)
        },
        [anchorEl]
    )

    const handleClickNotification = useCallback(
        async (notification: INotificationsForUser) => {
            if (notification.Type === 'Public') {
                setNotificationId(notification.NotificationId)
                if (!notification.IsRead) {
                    await changeNotificationRead(notification.Id).unwrap()
                }
            }
        },
        [setNotificationId]
    )

    const handleAction = useCallback(
        async (action: string) => {
            if (action === 'mark' && selectedNotification) {
                await changeNotificationRead(selectedNotification.Id).unwrap()
            } else if (action === 'delete' && selectedNotification) {
                await deleteNotification(selectedNotification.Id).unwrap()
            }
            setAnchorEl(null)
            setSelectedNotification(null)
        },
        [deleteNotification, changeNotificationRead, selectedNotification]
    )

    useEffect(() => {
        if (resultDelete.isSuccess) {
            const updatedNotifications = notifications.filter(n => n.Id !== resultDelete.originalArgs)
            dispatch(notificationsSlice.actions.updateNotifications(updatedNotifications))
            toast(t('COMMON.NOTIFICATION.MESSAGE.SUCCESS.DELETE_NOTIFICATION'), 'success')
        } else if (resultDelete.isError) {
            toast(t('COMMON.NOTIFICATION.MESSAGE.ERROR.DELETE_NOTIFICATION'), 'error')
        }
    }, [resultDelete])

    useEffect(() => {
        if (resultChange.isSuccess) {
            const updatedNotifications = notifications.map(n =>
                n.Id === resultChange.originalArgs ? { ...n, IsRead: !n.IsRead } : n
            )
            dispatch(notificationsSlice.actions.updateNotifications(updatedNotifications))
        }
    }, [resultChange.isSuccess])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (anchorEl && !anchorEl.contains(event.target as Node)) {
                setAnchorEl(null)
                setSelectedNotification(null)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [anchorEl])

    return notifications.map(notification => (
        <Box
            key={notification.Id}
            sx={{
                width: '100%',
                userSelect: 'none',
                ...(isHovered
                    ? {}
                    : {
                          '&:hover': {
                              backgroundColor: '#f0f0f0',
                              borderRadius: '10px'
                          }
                      })
            }}
            className={`relative flex items-center rounded-md cursor-pointer group `}
        >
            <div
                className='flex-1 flex items-center'
                style={{
                    width: '100%',
                    padding: '7.5px'
                }}
                onClick={() => handleClickNotification(notification)}
            >
                {!notification.IsRead && (
                    <div className={`absolute right-2 top-1/2 w-3 h-3 rounded-full bg-blue-500 -translate-y-1/2`} />
                )}
                <Avatar
                    src={icons[notification.Type]}
                    style={{
                        borderRadius: '50%',
                        objectFit: 'cover',
                        width: '58px',
                        height: '58px',
                        border: '1px solid #fdd'
                    }}
                    alt=''
                />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'left',
                        marginLeft: '10px',
                        width: 'calc(100% - 85px)'
                    }}
                >
                    <Typography
                        variant='h6'
                        sx={{
                            width: '100%',
                            fontWeight: 'bold',
                            fontSize: '14px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {notification.Title}
                    </Typography>
                    <Typography
                        variant='h6'
                        component='div'
                        sx={{
                            marginTop: '-3px',
                            width: '100%',
                            fontSize: '14px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {new DOMParser().parseFromString(notification.Content, 'text/html').body.textContent}
                    </Typography>
                    <Typography
                        variant='h6'
                        sx={{
                            marginTop: '-3px',
                            fontSize: '12px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        }}
                        className={notification.IsRead ? `text-gray-500` : `text-blue-500 font-bold`}
                    >
                        {getTimeDifferenceText(notification.SentTime)}
                    </Typography>
                </Box>
            </div>

            <Box
                className='absolute right-7 group-hover:opacity-100 cursor-pointer'
                sx={{
                    backgroundColor: 'white',
                    padding: '5px',
                    borderRadius: '50%',
                    opacity: anchorEl && selectedNotification?.Id === notification.Id ? 1 : 0,
                    zIndex: 10,
                    border: '1px solid #cecece',
                    '&:hover': {
                        backgroundColor: '#f0f0f0'
                    }
                }}
                onClick={event => handleClick(event, notification)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <Ellipsis />
            </Box>

            <Popper
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                placement='bottom'
                modifiers={[
                    {
                        name: 'offset',
                        options: {
                            offset: [0, 12]
                        }
                    },
                    {
                        name: 'arrow',
                        options: {
                            element: arrowRef.current
                        }
                    },
                    {
                        name: 'updatePlacement',
                        enabled: true,
                        phase: 'main',
                        fn: ({ state }) => {
                            setPlacement(state.placement)
                        }
                    }
                ]}
                sx={{ zIndex: 100, width: '250px', position: 'relative' }}
            >
                <div
                    style={{
                        width: 0,
                        height: 0,
                        borderLeft: '8px solid transparent',
                        borderRight: '8px solid transparent',
                        ...(placement === 'bottom' && {
                            borderBottom: '8px solid white',
                            top: '-8px'
                        }),
                        ...(placement === 'top' && {
                            borderTop: '8px solid white',
                            bottom: '-8px'
                        }),
                        position: 'absolute',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: -1,
                        filter: 'drop-shadow(0px -1px 2px rgba(0,0,0,0.02))'
                    }}
                    ref={arrowRef}
                ></div>

                <Paper
                    elevation={1}
                    sx={{
                        padding: '7.5px',
                        transition: 'none',
                        ...(placement === 'bottom' && { boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.05)' }),
                        ...(placement === 'top' && { boxShadow: '0px -2px 6px rgba(0, 0, 0, 0.05)' })
                    }}
                >
                    <StyledMenuItem onClick={() => handleAction('mark')} onMouseDown={e => e.stopPropagation()}>
                        <Check style={{ color: 'primary.main', width: '21px', margin: '0 10px 0 -2px' }} />
                        {selectedNotification?.IsRead
                            ? t('COMMON.NOTIFICATION.MENU.MARK_AS_UNREAD')
                            : t('COMMON.NOTIFICATION.MENU.MARK_AS_READ')}
                    </StyledMenuItem>
                    <StyledMenuItem onClick={() => handleAction('delete')} onMouseDown={e => e.stopPropagation()}>
                        <Trash2 style={{ color: 'primary.main', width: '21px', margin: '-1px 10px 0 -2px' }} />
                        {t('COMMON.NOTIFICATION.MENU.DELETE')}
                    </StyledMenuItem>
                </Paper>
            </Popper>
        </Box>
    ))
})

export default NotificationsComponent
