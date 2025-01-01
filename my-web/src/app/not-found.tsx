'use client'

import { Button, Typography, Box } from '@mui/material'
import { useRouter } from 'next/navigation'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

const Custom404Page: FC = () => {
    const router = useRouter()
    const { t } = useTranslation('common')

    const handleClick = () => {
        router.push('/admin')
    }

    return (
        <Box
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                textAlign: 'center'
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    height: '70px',
                    left: 24,
                    right: 24,
                    backdropFilter: 'blur(10px)',
                    backgroundColor: 'var(--header-maim-color)',
                    zIndex: 1100
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                        height: '100%'
                    }}
                >
                    <img
                        onClick={handleClick}
                        src='/images/logo.png'
                        style={{
                            cursor: 'pointer',
                            height: '50px',
                            transition: 'all 300ms ease-in-out'
                        }}
                    />
                </Box>
            </Box>

            <Box
                sx={{
                    flex: 1,
                    padding: '100px 0 80px',
                    margin: '0 400px',
                    textAlign: 'center',
                    color: '#fff'
                }}
            >
                <Typography variant='h3' sx={{ fontWeight: 'bold', color: 'var(--text-color)' }}>
                    Sorry, page not found!
                </Typography>
                <Typography variant='h6' sx={{ mt: 4, color: 'var(--sub-title-color)' }}>
                    Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be sure to
                    check your spelling.
                </Typography>

                <Box
                    sx={{
                        backgroundImage:
                            'url(https://assets.minimals.cc/public/assets/illustrations/characters/character-6.webp)',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: '65% 60%',
                        backgroundSize: '140px',
                        margin: '0 auto',
                        mt: 12,
                        width: '450px'
                    }}
                >
                    <img src='/images/404.svg' style={{ width: '100%', height: 'auto' }} />
                </Box>

                <Button
                    variant='contained'
                    color='primary'
                    sx={{
                        flex: 1,
                        mt: 12,
                        fontSize: '16px',
                        padding: '10px 24px',
                        fontWeight: 'bold',
                        color: 'var(--text-button-accept)',
                        backgroundColor: 'var(--bg-button-accept)',
                        borderRadius: '8px',
                        '&:hover': {
                            backgroundColor: 'var(--bg-button-accept-hover)'
                        },
                        textTransform: 'none'
                    }}
                    onClick={handleClick}
                >
                    {t('COMMON.BUTTON.GO_BACK_HOME')}
                </Button>
            </Box>
        </Box>
    )
}

export default Custom404Page
