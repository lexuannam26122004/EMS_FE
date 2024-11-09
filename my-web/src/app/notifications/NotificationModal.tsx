import React from 'react'
import { Box, Paper, Modal, Typography, Avatar, Divider, Skeleton } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useGetNotificationByIdQuery } from '@/services/NotificationsService'
import { INotificationGetById } from '@/models/Notifications'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import DOMPurify from 'dompurify'
import ImageGrid from './ImageGrid'

interface NotificationModalProps {
    notificationId: number
    open: boolean
    handleClose: () => void
}

function getTimeDifferenceText(sentTime: string) {
    const now = new Date()
    const sentDate = new Date(sentTime)
    const diffInSeconds = Math.floor((now.getTime() - sentDate.getTime()) / 1000)

    if (diffInSeconds < 60) return `${diffInSeconds} giây trước`
    const diffInMinutes = Math.floor(diffInSeconds / 60)
    if (diffInMinutes < 60) return `${diffInMinutes} phút trước`
    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours} giờ trước`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays} ngày trước`
    const diffInWeeks = Math.floor(diffInDays / 7)
    if (diffInWeeks < 5) return `${diffInWeeks} tuần trước`
    const diffInMonths = Math.floor(diffInDays / 30)
    if (diffInMonths < 12) return `${diffInMonths} tháng trước`
    const diffInYears = Math.floor(diffInMonths / 12)
    return `${diffInYears} năm trước`
}

function NotificationModal({ notificationId, open, handleClose }: NotificationModalProps) {
    const { t } = useTranslation()
    const { data: responseData, isFetching, refetch } = useGetNotificationByIdQuery(notificationId)
    const notificationData = responseData?.Data as INotificationGetById | undefined
    const [showError, setShowError] = useState(false)
    const [showSkeleton, setShowSkeleton] = useState(true)
    useEffect(() => {
        if (open) {
            setShowError(false)
            setShowSkeleton(true) // true
            refetch()
        }
    }, [open, refetch])

    useEffect(() => {
        if (!isFetching) {
            setShowError(!notificationData)
            const timer = setTimeout(() => setShowSkeleton(false), 200)
            return () => clearTimeout(timer)
        }
    }, [isFetching, notificationData])

    return (
        <Modal open={open} sx={{ padding: 10 }} onClose={handleClose}>
            <Paper
                sx={{
                    width: '50vw',
                    maxWidth: '1000px',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    borderRadius: '10px',
                    transform: 'translate(-50%, -50%)'
                }}
            >
                <Box
                    sx={{
                        paddingBlock: 1.8,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: '1',
                        position: 'relative'
                    }}
                >
                    {showSkeleton ? (
                        <Skeleton
                            variant='text'
                            width='70%'
                            height={30}
                            sx={{
                                borderRadius: '13px',
                                bgcolor: '#f8f8fa'
                            }}
                        />
                    ) : showError ? (
                        <Typography
                            variant='h6'
                            sx={{
                                fontWeight: 'Bold',
                                fontSize: '20px',
                                textAlign: 'center',
                                margin: 'auto',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            {t('COMMON.NOTIFICATION.GET_NOTIFICATION_BY_ID.NOT_FOUND')}
                        </Typography>
                    ) : (
                        <Typography
                            variant='h6'
                            sx={{
                                fontWeight: 'Bold',
                                fontSize: '20px',
                                textAlign: 'center',
                                margin: 'auto',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            {t('COMMON.NOTIFICATION.GET_NOTIFICATION_BY_ID.TITLE') + notificationData?.FullName}
                        </Typography>
                    )}
                    <Box
                        className='absolute right-4 cursor-pointer'
                        sx={{
                            backgroundColor: 'white',
                            padding: '5px',
                            borderRadius: '50%',
                            border: '1px solid #cecece',
                            '&:hover': {
                                backgroundColor: '#f0f0f0'
                            }
                        }}
                        onClick={handleClose}
                    >
                        <X />
                    </Box>
                </Box>
                <Divider sx={{ zIndex: '1' }} />
                <Box
                    sx={{
                        height: '85vh',
                        width: '100%',
                        flexGrow: 1,
                        paddingInline: 2,
                        paddingBlock: 1.8,
                        borderWidth: '0px',
                        borderStyle: 'solid',
                        borderColor: 'divider',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        overflow: 'auto',
                        '&::-webkit-scrollbar': {
                            width: '8px',
                            height: '8px'
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: '#919292',
                            borderRadius: '10px'
                        }
                    }}
                >
                    {showSkeleton ? (
                        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 3, height: '100%' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Skeleton
                                    variant='circular'
                                    width='42px'
                                    height='42px'
                                    sx={{ bgcolor: '#f8f8fa', marginRight: '10px' }}
                                />
                                <Box>
                                    <Skeleton
                                        variant='text'
                                        width='200px'
                                        height='30px'
                                        sx={{ borderRadius: '13px', bgcolor: '#f8f8fa' }}
                                    />
                                    <Skeleton
                                        variant='text'
                                        width='130px'
                                        height='30px'
                                        sx={{ borderRadius: '13px', bgcolor: '#f8f8fa', mt: '-10px' }}
                                    />
                                </Box>
                            </Box>
                            <Skeleton
                                variant='rectangular'
                                height={150}
                                width='80%'
                                sx={{ borderRadius: '16px', bgcolor: '#f8f8fa' }}
                            />
                            <Skeleton
                                variant='rectangular'
                                height={200}
                                width='70%'
                                sx={{ borderRadius: '16px', bgcolor: '#f0f0f5' }}
                            />
                            <Skeleton
                                variant='rectangular'
                                height={100}
                                width='90%'
                                sx={{ borderRadius: '16px', bgcolor: '#f5f5f9' }}
                            />
                        </Box>
                    ) : showError ? (
                        <img src='/images/Error.gif' alt='' />
                    ) : (
                        <Box width='100%' height='100%' display='flex' flexDirection='column'>
                            <Box sx={{ display: 'flex', alignContent: 'center' }}>
                                <Avatar
                                    src={notificationData?.AvatarPath}
                                    alt=''
                                    style={{
                                        width: '45px',
                                        height: '45px',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                        marginRight: '12px'
                                    }}
                                />
                                <Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: '1.5px' }}>
                                        <Typography
                                            variant='h6'
                                            sx={{
                                                fontWeight: 'Bold',
                                                fontSize: '15px',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap'
                                            }}
                                        >
                                            {notificationData?.FullName}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                backgroundColor: '#ffe7e7',
                                                color: '#a60b0a',
                                                padding: '3px 9px',
                                                borderRadius: '13px',
                                                fontSize: '13px',
                                                fontWeight: 'medium',
                                                height: 'fit-content'
                                            }}
                                        >
                                            {notificationData?.Role}
                                        </Typography>
                                    </Box>
                                    <Typography
                                        variant='h6'
                                        sx={{ color: 'red', fontSize: '11px', mt: '-2px' }}
                                        className='text-gray-500'
                                    >
                                        {getTimeDifferenceText(notificationData?.SentTime || '')}
                                    </Typography>
                                </Box>
                            </Box>

                            <Typography variant='h6' sx={{ fontSize: '15px', mt: '10px', fontWeight: 'Bold' }}>
                                {notificationData?.Title}
                            </Typography>

                            <Typography
                                variant='h6'
                                component='div'
                                sx={{
                                    fontSize: '15px',
                                    mt: '10px',
                                    '& p': { marginBottom: '0.5rem' },
                                    '& ul': {
                                        paddingLeft: '1.5rem',
                                        marginBottom: '0.5rem'
                                    },
                                    '& li': { marginBottom: '0.3rem' },
                                    '& strong': { fontWeight: 600 },
                                    '& br': { display: 'block', marginBottom: '0.5rem' },
                                    // Thêm style cho links nếu có
                                    '& a': {
                                        color: 'primary.main',
                                        textDecoration: 'none',
                                        '&:hover': {
                                            textDecoration: 'underline'
                                        }
                                    }
                                }}
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(notificationData?.Content || '')
                                }}
                            />

                            {notificationData?.ListFile && notificationData.ListFile.length > 0 && (
                                <Box>
                                    <Divider
                                        sx={{ borderColor: '#b6b6b6', mt: '10px', marginLeft: -1, marginRight: -2 }}
                                    />
                                    <ImageGrid images={notificationData.ListFile} />
                                </Box>
                            )}
                        </Box>
                    )}
                </Box>
            </Paper>
        </Modal>
    )
}

export default NotificationModal
