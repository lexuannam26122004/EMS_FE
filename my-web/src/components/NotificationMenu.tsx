import Badge from '@mui/material/Badge'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'
import { Box, ClickAwayListener, Grow, Menu, MenuList, Paper, Popper } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import NotificationsPage from '@/app/admin/notification/page'
import { usePathname } from 'next/navigation'
import { useSelector, useDispatch } from 'react-redux'
import { countNewNotificationSelector, countNewNotificationSlice } from '@/redux/slices/countNewNotificationSlice'
import { useGetCountIsNewQuery } from '@/services/NotificationsService'
import { userId } from '@/utils/globalVariables'

const NotificationMenu = () => {
    const pathname = usePathname()
    const anchorRef = useRef<HTMLDivElement | null>(null)
    const [open, setOpen] = useState(false)
    const [hover, setHover] = useState(false)
    const dispatch = useDispatch()
    const { data: response, isFetching } = useGetCountIsNewQuery(userId)

    const unreadCount = useSelector(countNewNotificationSelector)

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        if (pathname === '/admin/notification') {
            return
        }
        setOpen(prev => !prev)
    }

    useEffect(() => {
        if (!isFetching && response?.Data) {
            dispatch(countNewNotificationSlice.actions.updateCountNewNotification(response.Data))
        }
    }, [isFetching, response])

    useEffect(() => {
        if (pathname === '/admin/notification') {
            setOpen(false)
            setHover(true)
        } else {
            setHover(false)
        }
    }, [pathname, hover])

    const handleClose = (event: Event | React.SyntheticEvent) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return
        }
        setOpen(false)
    }

    const handleListKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Tab' || event.key === 'Escape') {
            event.preventDefault()
            setOpen(false)
        }
    }

    const prevOpen = useRef(open)
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current?.focus()
        }
        prevOpen.current = open
    }, [open])

    return (
        <Box>
            <Badge
                badgeContent={unreadCount}
                color='error'
                max={99}
                invisible={unreadCount === 0}
                sx={{
                    userSelect: 'none',
                    '& .MuiBadge-badge': {
                        padding: '0 5px',
                        right: 4,
                        top: 4,
                        backgroundColor: 'red',
                        fontSize: '12px'
                    }
                }}
            >
                <Box
                    ref={anchorRef}
                    onClick={handleClick}
                    sx={{
                        cursor: !hover ? 'pointer' : 'default',
                        padding: '5px',
                        borderRadius: '6px',
                        border: '1px solid var(--border-color)',
                        ...(hover && {
                            backgroundColor: 'var(--hover-color)',
                            borderColor: 'var(--hover-color)'
                        }),
                        ...(open && {
                            backgroundColor: 'var(--hover-color)',
                            borderColor: 'var(--hover-color)'
                        }),
                        '&:hover': {
                            backgroundColor: 'var(--hover-color)',
                            borderColor: 'var(--hover-color)'
                        }
                    }}
                >
                    <NotificationsOutlinedIcon
                        sx={{
                            fontSize: 28
                        }}
                    />
                </Box>
            </Badge>

            <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                placement='bottom-end'
                disablePortal
            >
                {({ TransitionProps }) => (
                    <Grow
                        {...TransitionProps}
                        timeout={0}
                        style={{
                            marginTop: '5px',
                            transformOrigin: 'right top'
                        }}
                    >
                        <Paper
                            elevation={0}
                            sx={{
                                borderRadius: '6px',
                                padding: 0,
                                border: '1px solid var(--border-color)',
                                backgroundColor: 'var(--background-color)',
                                display: 'flex',
                                flexDirection: 'column',
                                overflow: 'hidden'
                            }}
                        >
                            <ClickAwayListener onClickAway={handleClose}>
                                <Box
                                    sx={{
                                        maxHeight: '84vh',
                                        overflowY: 'auto',
                                        scrollbarGutter: 'stable',
                                        '&::-webkit-scrollbar': {
                                            width: '7px',
                                            height: '7px',
                                            backgroundColor: 'var(--background-color)'
                                        },
                                        '&::-webkit-scrollbar-thumb': {
                                            backgroundColor: 'var(--scrollbar-color)',
                                            borderRadius: '10px'
                                        }
                                    }}
                                >
                                    <NotificationsPage menu={true} />
                                </Box>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </Box>
    )
}

export default NotificationMenu
