import React, { useState, useEffect, memo } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { IconButton, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import AssignmentIcon from '@mui/icons-material/Assignment'
import CloseIcon from '@mui/icons-material/Close'

interface NavbarProps {
    setIsNavbarOpen: (isOpen: boolean) => void
}

const Navbar: React.FC<NavbarProps> = ({ setIsNavbarOpen }) => {
    const [showCloseButton, setShowCloseButton] = useState(false)
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            const navElement = document.querySelector('nav')
            if (navElement && navElement.contains(event.target as Node)) {
                setShowCloseButton(true)
            } else {
                setShowCloseButton(false)
            }
        }

        document.addEventListener('mousemove', handleMouseMove)
        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
        }
    }, [])

    const isActive = (path: string) => pathname === path

    const handleNavigation = (path: string) => {
        if (pathname !== path) {
            router.push(path)
        }
    }

    return (
        <nav style={{ width: '100%', maxWidth: '250px', minWidth: '250px', backgroundColor: 'red' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <img src='/images/logo.png' style={{ width: '190px', marginLeft: '5px' }} />
                <IconButton
                    style={{
                        margin: '10px',
                        border: '1px solid #cecedc',
                        visibility: showCloseButton ? 'visible' : 'hidden'
                    }}
                    onClick={() => setIsNavbarOpen(false)}
                >
                    <CloseIcon style={{ fontSize: '18px' }} />
                </IconButton>
            </div>
            <List>
                <ListItemButton
                    onClick={() => handleNavigation('/')}
                    style={{ backgroundColor: isActive('/') ? 'yellow' : 'inherit' }}
                >
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText style={{ marginLeft: '-15px' }} primary='Dashboard' />
                </ListItemButton>
                <ListItemButton
                    onClick={() => handleNavigation('/timekeeping')}
                    style={{ backgroundColor: isActive('/timekeeping') ? 'yellow' : 'inherit' }}
                >
                    <ListItemIcon>
                        <AssignmentIcon />
                    </ListItemIcon>
                    <ListItemText style={{ marginLeft: '-15px' }} primary='Timekeeping' />
                </ListItemButton>
            </List>
        </nav>
    )
}

export default memo(Navbar)
