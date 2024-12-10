import { MessageCircleMore } from 'lucide-react'
import { Box, Fab, Tooltip } from '@mui/material'
import { useState } from 'react'

export default function ChatButton() {
    const [isOpen, setIsOpen] = useState(false)

    const handleToggleChat = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
            {/* Nút chat */}
            <Box
                sx={{
                    position: 'fixed',
                    bottom: '2rem',
                    right: '2rem',
                    zIndex: 1000
                }}
            >
                <Tooltip title='Chat với chúng tôi' placement='left'>
                    <Fab
                        color='primary'
                        onClick={handleToggleChat}
                        sx={{
                            width: '60px',
                            height: '60px',
                            backgroundColor: 'var(--button-color)',
                            '&:hover': {
                                backgroundColor: 'var(--hover-button-color)'
                            },
                            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        <MessageCircleMore size={28} color='white' />
                    </Fab>
                </Tooltip>
            </Box>

            {/* Chat box (hiển thị khi isOpen = true) */}
            {isOpen && (
                <Box
                    sx={{
                        position: 'fixed',
                        bottom: '6rem',
                        right: '2rem',
                        width: '350px',
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
                            color: 'white'
                        }}
                    >
                        Chat với chúng tôi
                    </Box>
                    <Box sx={{ p: 2 }}>{/* Nội dung chat */}</Box>
                </Box>
            )}

            {/* CSS cho animation */}
            <style jsx global>{`
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
            `}</style>
        </>
    )
}
