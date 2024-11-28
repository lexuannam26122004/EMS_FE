import { MenuItem, Menu, Typography, Popper, Grow, MenuList, Paper, ClickAwayListener } from '@mui/material'
import { Box } from '@mui/material'
import LanguageIcon from '@mui/icons-material/Language'
import { useTranslation } from 'react-i18next'
import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'

const LanguageMenu = () => {
    const { t } = useTranslation('common')
    const anchorRef = useRef<HTMLDivElement | null>(null)
    const [open, setOpen] = useState(false)
    const { language, setLanguage } = useLanguage()

    const handleToggle = () => {
        setOpen(prev => !prev)
    }

    const handleChangeLanguage = (language: string) => {
        setLanguage(language)
        setOpen(false)
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

    return (
        <Box>
            <Box
                ref={anchorRef}
                onClick={handleToggle}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    borderRadius: '6px',
                    border: '1px solid var(--border-color)',
                    cursor: 'pointer',
                    '&:hover': {
                        backgroundColor: 'var(--hover-color)',
                        borderColor: 'var(--hover-color)'
                    },
                    ...(open && {
                        backgroundColor: 'var(--hover-color)',
                        borderColor: 'var(--hover-color)'
                    })
                }}
            >
                <LanguageIcon sx={{ fontSize: 28 }} />
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
                            marginTop: '5px',
                            transformOrigin: 'right top'
                        }}
                    >
                        <Paper
                            elevation={0}
                            sx={{
                                backgroundColor: 'var(--background-color)',
                                border: '1px solid var(--border-color)',
                                padding: '0 8px'
                            }}
                        >
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    autoFocusItem={false}
                                    id='language-menu'
                                    onKeyDown={handleListKeyDown}
                                    sx={{
                                        backgroundColor: 'var(--background-color)',
                                        borderRadius: '6px'
                                    }}
                                >
                                    <MenuItem
                                        sx={{
                                            color: 'var(--text-color)',
                                            borderRadius: '4px',
                                            '&:hover': { backgroundColor: 'var(--hover-color)' },
                                            ...(language === 'vi' && {
                                                backgroundColor: 'var(--selected-color)',
                                                '&:hover': { backgroundColor: 'var(--selected-color)' }
                                            }),
                                            padding: '6px 20px',
                                            mb: '3px'
                                        }}
                                        onClick={() => handleChangeLanguage('vi')}
                                    >
                                        {t('COMMON.LANGUAGE.VI')}
                                    </MenuItem>
                                    <MenuItem
                                        sx={{
                                            color: 'var(--text-color)',
                                            borderRadius: '4px',
                                            '&:hover': { backgroundColor: 'var(--hover-color)' },
                                            ...(language === 'en' && {
                                                backgroundColor: 'var(--selected-color)',
                                                '&:hover': { backgroundColor: 'var(--selected-color)' }
                                            }),
                                            padding: '6px 20px'
                                        }}
                                        onClick={() => handleChangeLanguage('en')}
                                    >
                                        {t('COMMON.LANGUAGE.EN')}
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

export default LanguageMenu
