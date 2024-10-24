'use client'

import React, { useState } from 'react'
import Sidebar, { SidebarItem } from '@/components/Sidebar'
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css'
import { IconButton } from '@mui/material'
import { Calendar, Settings, Wallet} from 'lucide-react'
import MenuIcon from '@mui/icons-material/Menu'
import { useRouter, usePathname } from 'next/navigation'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isNavbarOpen, setIsNavbarOpen] = useState(true)
    const pathname = usePathname() // Lấy đường dẫn hiện tại

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <Sidebar>
                <SidebarItem
                    icon={<Calendar />}
                    text='Timekeeping'
                    route='/timekeeping'
                    alert={true}
                    active={pathname === '/timekeeping'}
                />
                <SidebarItem icon={<Settings />} text='Settings' route='/' active={pathname === '/'} />
                <SidebarItem icon={<Wallet />} text='Salary' route='/salary' active={pathname === '/salary'} />
            </Sidebar>
            <PerfectScrollbar style={{ flex: 1 }}>
                <main style={{ padding: '0 5px', height: '100%', overflowY: 'scroll' }}>
                    <IconButton
                        onClick={() => {
                            setIsNavbarOpen(true)
                        }}
                        style={{ margin: '10px', visibility: isNavbarOpen ? 'hidden' : 'visible' }}
                    >
                        <MenuIcon />
                    </IconButton>
                    {children}
                </main>
            </PerfectScrollbar>
        </div>
    )
}

export default Layout
