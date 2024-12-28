'use client'

import { Box, Button, Paper, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

function Page() {
    const { t } = useTranslation('common')

    return (
        <Box>
            <Paper
                elevation={1}
                sx={{
                    width: '100%',
                    borderRadius: '15px',
                    padding: '24px',
                    backgroundColor: 'var(--background-item)'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <Box
                        sx={{
                            width: '5px',
                            height: '100%',
                            backgroundColor: 'red',
                            borderRadius: '4px',
                            mr: '10px'
                        }}
                    />
                    <Typography>{t('COMMON.ATTENDANCE.DETAIL_EMPLOYEE')}</Typography>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '15px'
                    }}
                >
                    <Button
                        sx={{
                            padding: '10px',
                            borderRadius: '10px'
                        }}
                    >
                        {t('COMMON.ATTENDANCE.DOWNLOAD_INFO')}
                    </Button>
                </Box>
            </Paper>
        </Box>
    )
}

export default Page
