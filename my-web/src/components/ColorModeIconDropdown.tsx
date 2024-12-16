'use client'

import * as React from 'react'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import Box from '@mui/material/Box'
import { IconButtonOwnProps } from '@mui/material/IconButton'
import { useTheme } from 'next-themes'
import { useTranslation } from 'react-i18next'

export default function ColorModeIconDropdown(props: IconButtonOwnProps) {
    const { t } = useTranslation('common')
    const { resolvedTheme, setTheme } = useTheme()
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
    }

    return (
        <Box>
            <Box
                onClick={handleClick}
                sx={{
                    cursor: 'pointer',
                    borderRadius: '8px',
                    width: 40,
                    height: 40,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid var(--border-color)',
                    '&:hover': {
                        backgroundColor: 'var(--hover-color)',
                        borderColor: 'var(--hover-color)'
                    }
                }}
            >
                {resolvedTheme === 'light' && (
                    <SunIcon className='h-[23px] w-[23px] rotate-0 scale-100 transition-all' />
                )}
                {resolvedTheme === 'dark' && (
                    <MoonIcon className='h-[23px] w-[23px] rotate-0 scale-100 transition-all' />
                )}
            </Box>
        </Box>
    )
}
