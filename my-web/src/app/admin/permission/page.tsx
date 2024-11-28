'use client'

import { Link, Typography } from '@mui/material'
import Grid2 from '@mui/material/Grid2'
import { useTranslation } from 'react-i18next'
import PermissionForRole from './PermissionForRole'

const Permissions = () => {
    const { t } = useTranslation('common')

    return (
        <Grid2 container spacing={3}>
            <Grid2 size={12}>
                <PermissionForRole />
            </Grid2>
        </Grid2>
    )
}

export default Permissions
