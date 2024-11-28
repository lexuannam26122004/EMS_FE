import { INotificationsForUser } from '@/models/Notifications'
import React, { useCallback, useRef, useState, useEffect } from 'react'
import { Box, Typography, Avatar, Popper, Paper, MenuItem, styled } from '@mui/material'
import { Ellipsis, Check, Trash2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useChangeNotificationReadMutation, useDeleteNotificationMutation } from '@/services/NotificationsService'
import { useDispatch, useSelector } from 'react-redux'
import { useToast } from '@/hooks/useToast'
import { notificationsSelector, notificationsSlice } from '@/redux/slices/notificationsSlice'
import { iconsForNotification, getTimeDifferenceText } from '@/utils/calcForNotification'

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
    padding: '7.5px',
    fontSize: '14px',
    fontWeight: 'bold',
    color: 'var(--text-color)',
    '&:hover': {
        backgroundColor: 'var(--hover-color)',
        borderRadius: '5px'
    }
}))

interface ListNotificationsProps {
    setNotificationId: (notificationId: number | null) => void
}

const NotificationsComponent = React.memo(({ setNotificationId }: ListNotificationsProps) => {
    const { t } = useTranslation('common')

    const dispatch = useDispatch()
    const notifications = useSelector(notificationsSelector)

    console.log(notifications)

    const toast = useToast()
    const [changeNotificationRead, resultChange] = useChangeNotificationReadMutation()
    const [deleteNotification, resultDelete] = useDeleteNotificationMutation()
    const [isHovered, setIsHovered] = useState(false)
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
                              backgroundColor: 'var(--hover-color)',
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
                    padding: '7.5px 0.5px 7.5px 7.5px'
                }}
                onClick={() => handleClickNotification(notification)}
            >
                {!notification.IsRead && (
                    <div className={`absolute right-2 top-1/2 w-3 h-3 rounded-full bg-[red] -translate-y-1/2`} />
                )}
                <Avatar
                    src={iconsForNotification[notification.Type]}
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
                        width: 'calc(100% - 95px)'
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
                            whiteSpace: 'nowrap',
                            color: 'var(--text-color)'
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
                            whiteSpace: 'nowrap',
                            color: 'var(--text-color)'
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
                        className={notification.IsRead ? 'text-gray-500' : 'text-[var(--text-role-color)] font-bold'}
                    >
                        {getTimeDifferenceText(notification.SentTime, t)}
                    </Typography>
                </Box>
            </div>

            <Box
                className='absolute right-7 group-hover:opacity-100 cursor-pointer'
                sx={{
                    backgroundColor: 'var(--background-color)',
                    padding: '5px',
                    borderRadius: '50%',
                    opacity: anchorEl && selectedNotification?.Id === notification.Id ? 1 : 0,
                    zIndex: 10,
                    border: '1px solid var(--border-color)',
                    '&:hover': {
                        backgroundColor: 'var(--hover-color)'
                    }
                }}
                onClick={event => handleClick(event, notification)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <Ellipsis style={{ color: 'var(--text-color)' }} />
            </Box>

            <Popper
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                placement='bottom'
                modifiers={[
                    {
                        name: 'offset',
                        options: {
                            offset: [0, 4]
                        }
                    }
                ]}
                sx={{
                    zIndex: 2000,
                    width: '250px',
                    position: 'relative'
                }}
            >
                <Box
                    sx={{
                        padding: '7.5px',
                        transition: 'none',
                        backgroundColor: 'var(--background-color)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '6px'
                    }}
                >
                    <StyledMenuItem onClick={() => handleAction('mark')} onMouseDown={e => e.stopPropagation()}>
                        <Check style={{ color: 'var(--text-color)', width: '21px', margin: '0 10px 0 -2px' }} />
                        {selectedNotification?.IsRead
                            ? t('COMMON.NOTIFICATION.MENU.MARK_AS_UNREAD')
                            : t('COMMON.NOTIFICATION.MENU.MARK_AS_READ')}
                    </StyledMenuItem>
                    <StyledMenuItem onClick={() => handleAction('delete')} onMouseDown={e => e.stopPropagation()}>
                        <Trash2 style={{ color: 'var(--text-color)', width: '21px', margin: '-1px 10px 0 -2px' }} />
                        {t('COMMON.NOTIFICATION.MENU.DELETE')}
                    </StyledMenuItem>
                </Box>
            </Popper>
        </Box>
    ))
})

export default NotificationsComponent
