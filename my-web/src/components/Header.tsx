'use client'

import * as React from 'react'
import Stack from '@mui/material/Stack'
import ColorModeIconDropdown from './ColorModeIconDropdown'
import Search from './Search'
import { Box, Divider, Typography } from '@mui/material'
import LanguageMenu from './LanguageMenu'
import NotificationMenu from './NotificationMenu'
import AvatarMenu from './AvatarMenu'
import { usePathname } from 'next/navigation'
import { usePathMaps } from '@/utils/usePathMaps'
export default function Header() {
    const pathname = usePathname()
    const { mapPathName, mapParentPathName } = usePathMaps()

    const path = mapPathName[pathname]

    const parentPath = mapParentPathName[pathname]

    return (
        <Stack
            direction='row'
            sx={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                maxWidth: { sm: '100%', md: '1700px' },
                height: '60px',
                position: 'sticky',
                top: 0,
                zIndex: 1000,
                backgroundColor: 'rgba(255, 255, 255, 0.2)', // Tạo nền mờ
                backdropFilter: 'blur(10px)', // Làm mờ phần nền phía sau header
                WebkitBackdropFilter: 'blur(10px)', // Hỗ trợ Safari
                padding: '0 24px'
            }}
            spacing={2}
        >
            <Stack
                direction='row'
                sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}
            >
                {path && parentPath ? (
                    <Typography
                        sx={{
                            userSelect: 'none',
                            fontWeight: 'bold',
                            fontSize: '18px',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        {/* {parentPath}
                        <MoveRight style={{ margin: '0 8px' }} /> */}
                        {path}
                    </Typography>
                ) : (
                    <Box> </Box>
                )}
                <Box className='flex items-center gap-4'>
                    <Search />
                    <Divider
                        orientation='vertical'
                        flexItem
                        sx={{ width: '1.5px', mr: 1, ml: 1, borderColor: 'var(--border-color)' }}
                    />
                    <LanguageMenu />
                    <ColorModeIconDropdown />
                    <NotificationMenu />
                    <AvatarMenu />
                </Box>
            </Stack>
        </Stack>
    )
}
