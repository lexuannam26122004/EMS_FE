import { MessageCircleMore } from 'lucide-react'
import { Box, Fab, Tooltip, Typography } from '@mui/material'
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
                    bottom: '0rem',
                    right: '0.5rem',
                    zIndex: 1000
                }}
            >
                <Tooltip title='Chat với chúng tôi' placement='left'>
                    <Box
                        color='primary'
                        onClick={handleToggleChat}
                        sx={{
                            width: '400px',
                            position: 'relative',
                            gap: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            //height: '30px',
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
