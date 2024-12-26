import {
    Avatar,
    Box,
    ClickAwayListener,
    Paper,
    MenuList,
    Divider,
    Grow,
    Popper,
    Typography,
    MenuItem
} from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import { PencilLine } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { avatarPath, fullName, roles } from '@/utils/globalVariables'
import { keyframes } from '@emotion/react'

const rotate = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`

const AvatarMenu = () => {
    const router = useRouter()
    const { t } = useTranslation('common')
    const anchorRef = useRef<HTMLDivElement | null>(null)
    const [open, setOpen] = useState(false)

    const handleToggle = () => {
        setOpen(prevOpen => !prevOpen)
    }

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

    const handleCreateNotification = () => {
        setOpen(false)
        router.push('/admin/notification/create')
    }

    return (
        <Box>
            <Box
                ref={anchorRef}
                onClick={handleToggle}
                sx={{
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    userSelect: 'none',
                    gap: '14px',
                    padding: '0 0 0 6px',
                    borderRadius: '6px'
                }}
            >
                <Box
                    sx={{
                        position: 'relative',
                        width: '41px',
                        height: '41px',
                        mt: '-1px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '50%', // Đảm bảo Box có hình tròn
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            backgroundImage: 'linear-gradient(orange, green)',
                            animation: `${rotate} 5s linear infinite`,
                            zIndex: 0
                        }
                    }}
                >
                    <Avatar src={avatarPath} sx={{ width: 39, height: 39 }} />
                </Box>
                <Box>
                    <Typography
                        variant='subtitle2'
                        sx={{
                            fontWeight: 600,
                            fontSize: '14px',
                            color: 'var(--text-color)'
                        }}
                    >
                        {fullName}
                    </Typography>
                    <Typography
                        variant='body2'
                        sx={{
                            mt: '-1.14px',
                            color: 'var(--text-role-color)',
                            fontSize: '12px'
                        }}
                    >
                        {roles}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        width: '20px',
                        height: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid var(--border-color)',
                        borderRadius: '50%',
                        padding: '2.5px'
                    }}
                >
                    {open ? <ChevronUp /> : <ChevronDown />}
                </Box>
            </Box>

            <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement='bottom-end'
                transition
                disablePortal
            >
                {({ TransitionProps }) => (
                    <Grow
                        {...TransitionProps}
                        timeout={0}
                        style={{
                            marginTop: '6px',
                            transformOrigin: 'right top'
                        }}
                    >
                        <Paper
                            elevation={0}
                            sx={{
                                backgroundImage:
                                    'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiBmaWxsPSJ1cmwoI3BhaW50MF9yYWRpYWxfMjc0OV8xNDUxODYpIiBmaWxsLW9wYWNpdHk9IjAuMTIiLz4KPGRlZnM+CjxyYWRpYWxHcmFkaWVudCBpZD0icGFpbnQwX3JhZGlhbF8yNzQ5XzE0NTE4NiIgY3g9IjAiIGN5PSIwIiByPSIxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgxMjAgMS44MTgxMmUtMDUpIHJvdGF0ZSgtNDUpIHNjYWxlKDEyMy4yNSkiPgo8c3RvcCBzdG9wLWNvbG9yPSIjMDBCOEQ5Ii8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzAwQjhEOSIgc3RvcC1vcGFjaXR5PSIwIi8+CjwvcmFkaWFsR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+Cg==), url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiBmaWxsPSJ1cmwoI3BhaW50MF9yYWRpYWxfMjc0OV8xNDUxODcpIiBmaWxsLW9wYWNpdHk9IjAuMTIiLz4KPGRlZnM+CjxyYWRpYWxHcmFkaWVudCBpZD0icGFpbnQwX3JhZGlhbF8yNzQ5XzE0NTE4NyIgY3g9IjAiIGN5PSIwIiByPSIxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgwIDEyMCkgcm90YXRlKDEzNSkgc2NhbGUoMTIzLjI1KSI+CjxzdG9wIHN0b3AtY29sb3I9IiNGRjU2MzAiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRkY1NjMwIiBzdG9wLW9wYWNpdHk9IjAiLz4KPC9yYWRpYWxHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4K)',
                                backgroundPosition: 'top right, bottom left',
                                backgroundSize: '50%, 50%',
                                backgroundRepeat: 'no-repeat',
                                backdropFilter: 'blur(20px)',
                                backgroundColor: 'var(--background-item)',
                                border: '1px solid var(--border-color)',
                                padding: '0 8px',
                                borderRadius: '10px',
                                minWidth: '208px'
                            }}
                        >
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    autoFocusItem={false}
                                    id='avatar-menu'
                                    onKeyDown={handleListKeyDown}
                                    sx={{
                                        borderRadius: '6px',
                                        minWidth: '208px'
                                    }}
                                >
                                    {/* <MenuItem sx={{ padding: '8px', cursor: 'default' }}>
                                        <Avatar sx={{ width: 40, height: 40 }} />
                                        <Box sx={{ ml: 2 }}>
                                            <Typography
                                                variant='subtitle2'
                                                sx={{
                                                    fontWeight: 600,
                                                    fontSize: '16px',
                                                    color: 'var(--text-color)'
                                                }}
                                            >
                                                Nam Lee
                                            </Typography>
                                            <Typography
                                                variant='body2'
                                                sx={{
                                                    color: 'var(--text-role-color)',
                                                    fontSize: '14px'
                                                }}
                                            >
                                                Manager
                                            </Typography>
                                        </Box>
                                    </MenuItem>
                                    <Divider sx={{ margin: '0 -8px', borderColor: 'var(--border-color)' }} /> */}

                                    <MenuItem
                                        onClick={handleCreateNotification}
                                        sx={{
                                            color: 'var(--text-color)',
                                            borderRadius: '6px',
                                            '&:hover': {
                                                backgroundColor: 'var(--hover-color)'
                                            }
                                        }}
                                    >
                                        <PencilLine style={{ marginRight: '16px' }} />
                                        {t('COMMON.AVATAR_MENU.CREATE_NOTIFICATION')}
                                    </MenuItem>
                                    <MenuItem
                                        onClick={handleClose}
                                        sx={{
                                            color: 'var(--text-color)',
                                            borderRadius: '6px',
                                            '&:hover': {
                                                backgroundColor: 'var(--hover-color)'
                                            }
                                        }}
                                    >
                                        <CalendarClock style={{ marginRight: '16px' }} />
                                        {t('COMMON.SIDEBAR.SCHEDULAR')}
                                    </MenuItem>
                                    <MenuItem
                                        onClick={handleClose}
                                        sx={{
                                            color: 'var(--text-color)',
                                            borderRadius: '6px',
                                            '&:hover': {
                                                backgroundColor: 'var(--hover-color)'
                                            }
                                        }}
                                    >
                                        <AccessTimeOutlinedIcon sx={{ mr: 2 }} />
                                        {t('COMMON.AVATAR_MENU.LOGIN_HISTORY')}
                                    </MenuItem>
                                    <MenuItem
                                        onClick={handleClose}
                                        sx={{
                                            color: 'var(--text-color)',
                                            borderRadius: '6px',
                                            '&:hover': {
                                                backgroundColor: 'var(--hover-color)'
                                            }
                                        }}
                                    >
                                        <SettingsOutlinedIcon sx={{ mr: 2 }} />
                                        {t('COMMON.AVATAR_MENU.SETTINGS')}
                                    </MenuItem>
                                    <MenuItem
                                        onClick={handleClose}
                                        sx={{
                                            color: 'var(--text-color)',
                                            borderRadius: '6px',
                                            '&:hover': {
                                                backgroundColor: 'var(--hover-color)'
                                            }
                                        }}
                                    >
                                        <HelpOutlineIcon sx={{ mr: 2 }} />
                                        {t('COMMON.AVATAR_MENU.HELP')}
                                    </MenuItem>
                                    <Divider sx={{ margin: '0 -8px', borderColor: 'var(--border-color)' }} />
                                    <MenuItem
                                        onClick={handleClose}
                                        sx={{
                                            color: 'var(--text-color)',
                                            borderRadius: '6px',
                                            '&:hover': {
                                                backgroundColor: 'var(--hover-color)'
                                            }
                                        }}
                                    >
                                        <LogoutOutlinedIcon sx={{ mr: 2 }} />
                                        {t('COMMON.AVATAR_MENU.LOGOUT')}
                                    </MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </Box>
    )
}

export default AvatarMenu
