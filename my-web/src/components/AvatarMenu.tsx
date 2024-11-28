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
import { CalendarClock } from 'lucide-react'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import { PencilLine } from 'lucide-react'
import { useRouter } from 'next/navigation'

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
                sx={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}
            >
                <Avatar sx={{ width: 40, height: 40 }} />
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
                            marginTop: '5.5px',
                            transformOrigin: 'right top'
                        }}
                    >
                        <Paper
                            elevation={0}
                            sx={{
                                backgroundColor: 'var(--background-color)',
                                border: '1px solid var(--border-color)',
                                padding: '0 8px',
                                minWidth: '208px'
                            }}
                        >
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    autoFocusItem={false}
                                    id='avatar-menu'
                                    onKeyDown={handleListKeyDown}
                                    sx={{
                                        backgroundColor: 'var(--background-color)',
                                        borderRadius: '6px',
                                        minWidth: '208px'
                                    }}
                                >
                                    <MenuItem sx={{ padding: '8px', cursor: 'default' }}>
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
                                    <Divider sx={{ margin: '0 -8px', borderColor: 'var(--border-color)' }} />

                                    <MenuItem
                                        onClick={handleCreateNotification}
                                        sx={{
                                            color: 'var(--text-color)',
                                            borderRadius: '4px',
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
                                            borderRadius: '4px',
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
                                            borderRadius: '4px',
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
                                            borderRadius: '4px',
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
                                            borderRadius: '4px',
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
                                            borderRadius: '4px',
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
