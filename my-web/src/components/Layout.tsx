'use client'
import React, { useEffect } from 'react'
import Sidebar, { SidebarItem } from '@/components/Sidebar'
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css'
// import { IconButton } from '@mui/material'
import { Wallet } from 'lucide-react'
import { Unlock, Calendar, Settings } from 'lucide-react'
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
                <SidebarItem icon={<Settings />} text='Settings' route='/' active={pathname === '/'} />
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
            <PerfectScrollbar style={{ flex: 1 }}>
                <main style={{ padding: '0 5px', height: '100%', overflowY: 'scroll', backgroundColor: '#eeeeff' }}>
                    {children}
                </main>
            </PerfectScrollbar>
        </div>
    )
}

export default Layout
