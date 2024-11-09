'use client'
import React, { useEffect } from 'react'
import Sidebar, { SidebarItem } from '@/components/Sidebar'
import { Box } from '@mui/material'
import { Wallet } from 'lucide-react'
import { Unlock, Calendar, House, Bell, Settings } from 'lucide-react'
import { usePathname } from 'next/navigation'
import i18n from '@/i18n/i18n'
import { BiCalendarStar } from 'react-icons/bi'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const pathname = usePathname() // Lấy đường dẫn hiện tại

    useEffect(() => {
        // Chỉ khởi tạo một lần
        i18n.changeLanguage('vi') // Hoặc ngôn ngữ khác mà bạn muốn
    }, [])

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <Sidebar>
                <SidebarItem icon={<House />} text='Home' route='/' active={pathname === '/'} />
                <SidebarItem icon={<Calendar />} text='Employee' route='/employee' active={pathname === '/employee'} />
                <SidebarItem
                    icon={<Calendar />}
                    text='Timekeeping'
                    route='/timekeeping'
                    alert={true}
                    active={pathname === '/timekeeping'}
                />
                <SidebarItem
                    icon={<Unlock />}
                    text='Permission'
                    route='/permission'
                    active={pathname === '/permission'}
                />
                <SidebarItem
                    icon={<Bell />}
                    text='Notifications'
                    route='/notifications'
                    active={pathname === '/notifications'}
                />
                <SidebarItem icon={<Wallet />} text='Salary' route='/salary' active={pathname === '/salary'} />
                <SidebarItem
                    icon={
                        <BiCalendarStar
                            size={24}
                            style={{ display: 'flex', alignItems: 'center' }} // Căn giữa và khoảng cách giữa icon và text
                        />
                    }
                    text='Holiday'
                    route='/holiday'
                    active={pathname === '/holiday'}
                />
            </Sidebar>
            <Box
                component='main'
                sx={{
                    flex: 1,
                    padding: '0 5px',
                    height: '100%',
                    overflowY: 'auto',
                    backgroundColor: '#eeeeff',
                    '&::-webkit-scrollbar': {
                        width: '8px',
                        height: '8px'
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#919292',
                        borderRadius: '10px'
                    }
                }}
            >
                {children}
            </Box>
        </div>
    )
}

export default Layout
