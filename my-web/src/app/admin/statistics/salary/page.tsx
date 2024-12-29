'use client'
import { Box } from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import DisplayInfo from './DisplayInfo'
import PayrollReport from './PayrollReport'
import GrossTotal from './GrossTotal'
import GrossTotalByAreas from './departments/GrossTotal'
import SpecialInfo from './SpecialInfo'
import PayrollShares from './departments/PayrollShares'
import PayrollOvertime from './departments/PayrollOvertime'
import SalaryTablePage from './SalaryTable'

export default function SalaryStatistic() {
    const { t } = useTranslation()
    return (
        <Box>
            <Box width='100%'>
                <DisplayInfo />
            </Box>
            <Box sx={{ width: '100%', marginTop: '20px' }}>
                <SpecialInfo />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px', gap: '20px' }}>
                <Box sx={{ width: 'calc(100% / 4 * 3 - 30px)' }}>
                    <PayrollReport />
                </Box>
                <Box sx={{ width: 'calc(100% / 4 + 30px)' }}>
                    <GrossTotal />
                </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px', gap: '20px' }}>
                <Box sx={{ width: 'calc(100% / 3)' }}>
                    <GrossTotalByAreas />
                </Box>
                <Box sx={{ width: 'calc(100% / 3)' }}>
                    <PayrollShares />
                </Box>
                <Box sx={{ width: 'calc(100% / 3)' }}>
                    <PayrollOvertime />
                </Box>
            </Box>
            <Box sx={{ width: '100%', marginTop: '20px' }}>
                <SalaryTablePage />
            </Box>
        </Box>
    )
}
