'use client'

import { Box, Link, Tab, Tabs, Typography } from '@mui/material'
import Grid2 from '@mui/material/Grid2'
import { AccountLock, Cogs } from 'mdi-material-ui'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import PermissionForUser from './PermissionForUser'
import PermissionForRole from './PermissionForRole'

const Permissions = () => {
    const { t } = useTranslation('common')
    const [tab, setTab] = useState<number | null>(null)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedTab = sessionStorage.getItem('PermissionPage')
            if (storedTab !== null) {
                setTab(parseInt(storedTab, 10))
            } else {
                setTab(0)
            }
        }
    }, [])

    const onChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue)
        typeof window !== 'undefined' && sessionStorage.setItem('PermissionPage', newValue.toString())
    }

    return (
        <Grid2 container spacing={6}>
            <Grid2 size={12}>
                <Typography variant='h5'>
                    <Link href='#'>{t('COMMON.PERMISSION.TITLE')}</Link>
                </Typography>
            </Grid2>

            <Grid2 size={12}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                        value={tab || 0}
                        variant='scrollable'
                        textColor='secondary'
                        aria-label='wrapped label tabs example'
                        onChange={onChangeTab}
                    >
                        <Tab
                            value={0}
                            key={0}
                            icon={<AccountLock />}
                            iconPosition='start'
                            label={t('COMMON.PERMISSION.TABS.PERMISSION_FOR_USER')}
                        />
                        <Tab
                            value={1}
                            key={1}
                            icon={<Cogs />}
                            iconPosition='start'
                            label={t('COMMON.PERMISSION.TABS.PERMISSION_FOR_ROLE')}
                        />
                    </Tabs>
                </Box>
            </Grid2>

            <Grid2 size={12}>
                {tab === 0 && <PermissionForUser />}
                {tab === 1 && <PermissionForRole />}
            </Grid2>
        </Grid2>
    )
}

export default Permissions
