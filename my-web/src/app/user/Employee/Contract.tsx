import { Avatar, Box, Button, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useRef, useEffect, useState } from 'react'
import ErrorPage from '@/app/user/requests/ErrorPage'
import { Download, AlertCircle } from 'lucide-react'

interface ContractProps {
    aspnetUserId: string
}

const Contract: React.FC<ContractProps> = ({ aspnetUserId }) => {
    const { t } = useTranslation('common')
    const [openErrorReport, setopenErrorReport] = useState(false)
    const prevOpen = useRef(open)
    useEffect(() => {
        prevOpen.current = open
    }, [open, aspnetUserId])

    return (
        <Box
            sx={{
                width: '100%',
                boxShadow: 'var(--box-shadow-paper)',
                borderRadius: '30px',
                padding: '35px',
                backgroundColor: 'var(--attendance-bg1)'
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: '35px'
                    }}
                >
                    <Box
                        sx={{
                            width: '5px',
                            height: '42px',
                            backgroundColor: '#4effca',
                            borderRadius: '4px',
                            mr: '14px'
                        }}
                    />
                    <Typography
                        sx={{
                            color: 'var(--text-color)',
                            fontSize: '21px',
                            fontWeight: 'bold'
                        }}
                    >
                        {t('Thông tin chi tiết hợp đồng')}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '18px'
                    }}
                >
                    <Button
                        sx={{
                            padding: '8px 12px',
                            borderRadius: '8px',
                            height: '41.5px',
                            mb: 'auto',
                            fontWeight: 'bold',
                            display: 'flex',
                            gap: '10px',
                            color: '#040506',
                            backgroundColor: '#4effca',
                            textTransform: 'none',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Download size={20} />
                        {t('COMMON.ATTENDANCE.DOWNLOAD_INFO')}
                    </Button>

                    <Button
                        sx={{
                            padding: '8px 12px',
                            borderRadius: '8px',
                            height: '41.5px',
                            mb: 'auto',
                            fontWeight: 'bold',
                            display: 'flex',
                            gap: '10px',
                            color: '#040506',
                            backgroundColor: '#ff4e4e',
                            textTransform: 'none',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        onClick={() => setopenErrorReport(true)}
                    >
                        <AlertCircle size={20} />
                        {t('Báo lỗi')}
                    </Button>
                </Box>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '40px'
                }}
            >
                <Avatar
                    src='https://assets.minimals.cc/public/assets/images/mock/avatar/avatar-25.webp'
                    sx={{
                        width: '120px',
                        height: '120px'
                    }}
                />

                <Box>
                    <Typography
                        sx={{
                            fontSize: '20px',
                            fontWeight: 'bold',
                            color: 'var(--text-color)'
                        }}
                    >
                        {'Phụ trách : Lê Ngọc Ngà'}
                    </Typography>

                    <Box
                        sx={{
                            mt: '20px',
                            display: 'flex',
                            gap: '45px',
                            alignItems: 'center'
                        }}
                    >
                        <Box>
                            <Typography
                                sx={{
                                    color: 'var(--sub-title-color)',
                                    fontSize: '15px'
                                }}
                            >
                                {t('Tên hợp đồng')}
                            </Typography>
                            <Typography
                                sx={{
                                    mt: '4px',
                                    color: 'var(--text-color)',
                                    fontSize: '17px'
                                }}
                            >
                                {'Sales Manager Contract'}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography
                                sx={{
                                    color: 'var(--sub-title-color)',
                                    fontSize: '15px'
                                }}
                            >
                                {t('Ngày bắt đầu')}
                            </Typography>
                            <Typography
                                sx={{
                                    mt: '4px',
                                    color: 'var(--text-color)',
                                    fontSize: '17px'
                                }}
                            >
                                {'12/18/2024'}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography
                                sx={{
                                    color: 'var(--sub-title-color)',
                                    fontSize: '15px'
                                }}
                            >
                                {t('Ngày kết thúc')}
                            </Typography>
                            <Typography
                                sx={{
                                    mt: '4px',
                                    color: 'var(--text-color)',
                                    fontSize: '17px'
                                }}
                            >
                                {'3/18/2025'}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography
                                sx={{
                                    color: 'var(--sub-title-color)',
                                    fontSize: '15px'
                                }}
                            >
                                {t('Lương cơ bản')}
                            </Typography>
                            <Typography
                                sx={{
                                    mt: '4px',
                                    color: 'var(--text-color)',
                                    fontSize: '17px'
                                }}
                            >
                                {'8000000'}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography
                                sx={{
                                    color: 'var(--sub-title-color)',
                                    fontSize: '15px'
                                }}
                            >
                                {t('Số ngày làm việc')}
                            </Typography>
                            <Typography
                                sx={{
                                    mt: '4px',
                                    color: 'var(--text-color)',
                                    fontSize: '17px'
                                }}
                            >
                                {'8'}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography
                                sx={{
                                    color: 'var(--sub-title-color)',
                                    fontSize: '15px'
                                }}
                            >
                                {t('Số ngày thử việc')}
                            </Typography>
                            <Typography
                                sx={{
                                    mt: '4px',
                                    color: 'var(--text-color)',
                                    fontSize: '17px'
                                }}
                            >
                                {'7'}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography
                                sx={{
                                    color: 'var(--sub-title-color)',
                                    fontSize: '15px'
                                }}
                            >
                                {t('Chế độ làm việc')}
                            </Typography>
                            <Typography
                                sx={{
                                    mt: '4px',
                                    color: 'var(--text-color)',
                                    fontSize: '17px'
                                }}
                            >
                                {'Full-time'}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <ErrorPage
                handleToggle={() => setopenErrorReport(false)}
                open={openErrorReport}
                reportedBy={aspnetUserId}
                type={'COMMON.SIDEBAR.CONTRACT'}
                typeId={''}
            />
        </Box>
    )
}

export default Contract
