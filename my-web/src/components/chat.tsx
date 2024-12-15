import { MessageCircleMore } from 'lucide-react'
import { Box, Button, Fab, Tooltip, Typography } from '@mui/material'
import { useState } from 'react'
import { CloseIcon } from 'yet-another-react-lightbox'

export default function ChatButton() {
    const [isOpen, setIsOpen] = useState(false)
    const [isAppear, setIsAppear] = useState(true)

    const handleToggleChat = () => {
        setIsOpen(true)
        setIsAppear(false)
    }
    const handleCloseChat = () => {
        setIsOpen(false)
        setIsAppear(true)
    }

    return (
        <>
            {/* Nút chat */}
            {isAppear && (
                <Box
                    onClick={() => handleToggleChat()}
                    sx={{
                        position: 'fixed',
                        bottom: '1rem',
                        right: '1rem',
                        zIndex: 1000,
                        animation: `${isAppear ? 'slideUp' : 'slideDown'} 0.5s ease forwards`
                    }}
                >
                    <Tooltip title='Chat với chúng tôi' placement='left'>
                        <Box
                            color='primary'
                            sx={{
                                width: '400px',
                                position: 'relative',
                                gap: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                backgroundColor: 'var(--button-color)',
                                '&:hover': {
                                    backgroundColor: 'var(--hover-button-color)'
                                },
                                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                                transition: 'all 0.3s ease',
                                borderTopLeftRadius: '8px',
                                borderTopRightRadius: '8px'
                            }}
                        >
                            <MessageCircleMore style={{ marginLeft: '10px' }} size={28} color='white' />
                            <Typography sx={{ padding: '5px', fontSize: '20px', color: 'white' }}>Chat</Typography>
                        </Box>
                    </Tooltip>
                </Box>
            )}

            {/* Chat box (hiển thị khi isOpen = true) */}
            {isOpen && (
                <Box
                    sx={{
                        position: 'fixed',
                        bottom: '2rem',
                        right: '0.5rem',
                        width: '400px',
                        height: '500px',
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                        zIndex: 999,
                        overflow: 'hidden',
                        animation: 'slideUp 0.3s ease-out'
                    }}
                >
                    {/* Thêm nội dung chat box ở đây */}
                    <Box
                        sx={{
                            p: 2,
                            borderBottom: '1px solid var(--border-color)',
                            backgroundColor: 'var(--button-color)',
                            color: 'white',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        Chat với chúng tôi
                        <Button
                            onClick={() => handleCloseChat()} // Thay thế bằng logic đóng của bạn
                            sx={{
                                minWidth: 'auto',
                                padding: '6px',
                                color: 'white',
                                backgroundColor: 'transparent', // Nền trong suốt
                                borderRadius: '50%',
                                transition: 'background-color 0.3s',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)' // Màu nền khi hover
                                }
                            }}
                        >
                            <CloseIcon />
                        </Button>
                    </Box>
                    <Box sx={{ p: 2 }}>{/* Nội dung chat */}</Box>
                </Box>
            )}
            <style>
                {`
                @keyframes slideUp {
                    0% {
                    transform: translateY(100%);
                    opacity: 0;
                    }
                    100% {
                    transform: translateY(0);
                    opacity: 1;
                    }
                }

                @keyframes slideDown {
                    0% {
                    transform: translateY(0);
                    opacity: 1;
                    }
                    100% {
                    transform: translateY(100%);
                    opacity: 0;
                    }
                }
                `}
            </style>

            {/* CSS cho animation */}
            {/* <style jsx global>{`
                @keyframes slideUp {
                    from {
                        transform: translateY(100px);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
            `}</style> */}
        </>
    )
}
