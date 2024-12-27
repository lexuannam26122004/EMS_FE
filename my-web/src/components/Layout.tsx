'use client'
import React, { useEffect, useRef } from 'react'
import Sidebar, { SidebarItem, TypographyItem } from '@/components/Sidebar'
import { Alert, Box, Divider } from '@mui/material'
import { Building2, Wallet } from 'lucide-react'
import {
    ShieldCheck,
    Calendar,
    CalendarDays,
    Network,
    Home,
    ScrollText,
    Landmark,
    Gift,
    Scale,
    Clock,
    CalendarClock,
    SlidersHorizontal
} from 'lucide-react'
import {
    ChartNoAxesCombined,
    Users,
    FileSignature,
    Stethoscope,
    Award,
    CalendarX,
    BellRing,
    CalendarHeart
} from 'lucide-react'
import { usePathname } from 'next/navigation'
import Header from './Header'
import { useTranslation } from 'react-i18next'
import NotificationRealTime from './NotificationRealTime'
import Chat from './chat'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const pathname = usePathname()

    const { t } = useTranslation('common')

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <Sidebar>
                <TypographyItem text={t('COMMON.SIDEBAR.DASHBOARD')} />
                <SidebarItem
                    icon={<Home />}
                    text={t('COMMON.SIDEBAR.HOME')}
                    route='/admin'
                    active={pathname === '/admin'}
                />
                <SidebarItem
                    icon={<ChartNoAxesCombined />}
                    text={t('COMMON.SIDEBAR.STATISTICS')}
                    // route='/statistics'
                    // active={pathname === '/statistics'}
                >
                    <SidebarItem
                        icon={<ChartNoAxesCombined />}
                        text={t('COMMON.SIDEBAR.EMPLOYEE-CONTRACT')}
                        route='/admin/statistics/employee-contract'
                    />

                    <SidebarItem
                        icon={<ChartNoAxesCombined />}
                        text={t('COMMON.SIDEBAR.TIMEOFF-ERRORREPORT')}
                        route='/admin/statistics/timeoff-errorreport'
                    />

                    <SidebarItem
                        icon={<ChartNoAxesCombined />}
                        text={t('COMMON.SIDEBAR.ATTENDANCE')}
                        route='/admin/statistics/attendance'
                    />
                    <SidebarItem
                        icon={<ChartNoAxesCombined />}
                        text={t('COMMON.SIDEBAR.BENEFITS')}
                        route='/admin/statistics/benefits'
                    />
                    <SidebarItem
                        icon={<ChartNoAxesCombined />}
                        text={t('COMMON.SIDEBAR.REWARDS_DISCIPLINE')}
                        route='/admin/statistics/rewards-disciplines'
                    />
                    <SidebarItem
                        icon={<ChartNoAxesCombined />}
                        text={t('COMMON.SIDEBAR.ACTIVITIES_EVENTS')}
                        route='/admin/statistics/activities-event'
                    />
                    <SidebarItem
                        icon={<ChartNoAxesCombined />}
                        text={t('COMMON.SIDEBAR.REPORTS_SYSTEM')}
                        route='/statistics/report-system'
                    />
                </SidebarItem>
                <Divider sx={{ marginTop: '15px', marginBottom: '10px', borderColor: 'var(--border-color)' }} />
                <TypographyItem text={t('COMMON.SIDEBAR.HUMAN_RESOURCES')} />
                <SidebarItem
                    icon={<Users />}
                    text={t('COMMON.SIDEBAR.EMPLOYEE')}
                    route='/admin/employee'
                    active={pathname === '/admin/employee'}
                />
                <SidebarItem
                    icon={<FileSignature />}
                    text={t('COMMON.SIDEBAR.CONTRACT')}
                    route='/admin/contract'
                    active={pathname === '/admin/contract'}
                />
                <SidebarItem
                    icon={<Wallet />}
                    text={t('COMMON.SIDEBAR.SALARY')}
                    route='/admin/salary'
                    active={pathname === '/admin/salary'}
                />
                <SidebarItem
                    icon={<CalendarClock />}
                    text={t('COMMON.SIDEBAR.SCHEDULAR')}
                    route='/admin/schedular'
                    active={pathname === '/admin/schedular'}
                />
                <SidebarItem
                    icon={<CalendarDays />}
                    text={t('COMMON.SIDEBAR.TIMEKEEPING')}
                    route='/admin/timekeeping'
                    alert={true}
                    active={pathname === '/admin/timekeeping'}
                />
                <SidebarItem
                    icon={<CalendarX />}
                    text={t('COMMON.SIDEBAR.TIME_OFF')}
                    route='/admin/time-off'
                    alert={true}
                    active={pathname === '/admin/time-off'}
                />
                <SidebarItem
                    icon={<ShieldCheck />}
                    text={t('COMMON.SIDEBAR.PERMISSION')}
                    route='/admin/permission'
                    active={pathname === '/admin/permission'}
                />
                <Divider sx={{ marginTop: '15px', marginBottom: '10px', borderColor: 'var(--border-color)' }} />
                <TypographyItem text={t('COMMON.SIDEBAR.ORGANIZATION_DESIGN')} />
                <SidebarItem
                    icon={<Building2 />}
                    text={t('COMMON.SIDEBAR.DEPARTMENT')}
                    route='/admin/department'
                    active={pathname === '/admin/department'}
                />
                <SidebarItem
                    icon={<Landmark />}
                    text={t('COMMON.SIDEBAR.ROLE')}
                    route='/admin/role'
                    active={pathname === '/admin/role'}
                />
                <SidebarItem
                    icon={<Network />}
                    text={t('COMMON.SIDEBAR.ORG_STRUCTURE')}
                    route='/admin/org-structure'
                    active={pathname === '/admin/org-structure'}
                />
                <Divider sx={{ marginTop: '15px', marginBottom: '10px', borderColor: 'var(--border-color)' }} />
                <TypographyItem text={t('COMMON.SIDEBAR.REGULATIONS_AND_POLICIES')} />
                <SidebarItem
                    icon={<ScrollText />}
                    text={t('COMMON.SIDEBAR.WORK_REGULATIONS')}
                    route='/admin/work-regulations'
                    active={pathname === '/admin/work-regulations'}
                />
                <SidebarItem
                    icon={<Clock />}
                    text={t('COMMON.SIDEBAR.WORK_SHIFT')}
                    route='/admin/work-shift'
                    alert={false}
                    active={pathname === '/admin/work-shift'}
                />
                <SidebarItem
                    icon={<Stethoscope />}
                    text={t('COMMON.SIDEBAR.INSURANCE')}
                    route='/admin/insurance'
                    active={pathname === '/admin/insurance'}
                />
                <SidebarItem
                    icon={<Award />}
                    text={t('COMMON.SIDEBAR.REWARD')}
                    route='/admin/reward'
                    active={pathname === '/admin/reward'}
                />
                <SidebarItem
                    icon={<Gift />}
                    text={t('COMMON.SIDEBAR.BENEFIT')}
                    route='/admin/benefit'
                    active={pathname === '/admin/benefit'}
                />
                <SidebarItem
                    icon={<Scale />}
                    text={t('COMMON.SIDEBAR.DISCIPLINE')}
                    route='/admin/discipline'
                    active={pathname === '/admin/discipline'}
                />
                <SidebarItem
                    icon={<Calendar />}
                    text={t('COMMON.SIDEBAR.HOLIDAY')}
                    route='/admin/holiday'
                    active={pathname === '/admin/holiday'}
                />
                <SidebarItem
                    icon={<SlidersHorizontal />}
                    text={t('COMMON.SIDEBAR.CONFIGURATION')}
                    route='/admin/configuration'
                    active={pathname === '/admin/configuration'}
                />
            </Sidebar>
            <Box
                component='main'
                sx={{
                    flex: 1,
                    height: '100%',
                    overflowY: 'auto',
                    backgroundColor: 'var(--background-color)'
                }}
            >
                <Header />
                <Box
                    sx={{
                        flex: 1,
                        height: 'calc(100vh - 60px)',
                        position: 'relative',
                        scrollbarGutter: 'stable both-edges',
                        '&::-webkit-scrollbar': {
                            width: '7px',
                            height: '7px',
                            backgroundColor: 'var(--background-after-color)'
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: 'var(--scrollbar-color)',
                            borderRadius: '10px'
                        },
                        backgroundColor: 'var(--background-after-color)',
                        overflowY: 'auto'
                    }}
                >
                    <Box
                        sx={{
                            padding: '24px 17px',
                            minHeight: '100%'
                        }}
                    >
                        {children}
                    </Box>
                </Box>
            </Box>

            <NotificationRealTime />
            <Chat />
        </div>
    )
}

export default Layout
