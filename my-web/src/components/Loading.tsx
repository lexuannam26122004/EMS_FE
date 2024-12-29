// components/Loading.js
import { Box, LinearProgress, keyframes } from '@mui/material'

const slide = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
`

export default function Loading() {
    return (
        <Box>
            <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '2.5px',
                    backgroundColor: 'transparent',
                    overflow: 'hidden',
                    zIndex: 9999999
                }}
            >
                <Box
                    sx={{
                        width: '100%', // Chiều dài của "đường chạy"
                        height: '100%',
                        backgroundColor: '#19c346', // Đổi màu tùy ý
                        animation: `${slide} 0.8s forwards` // Hiệu ứng chạy
                    }}
                />
            </Box>
            <Box
                sx={{
                    width: '100%',
                    height: 'calc(100vh - 150px)',
                    display: 'flex', // Sử dụng flexbox để căn giữa
                    alignItems: 'center', // Căn giữa theo trục dọc
                    justifyContent: 'center' // Căn giữa theo trục ngang
                }}
            >
                <Box
                    sx={{
                        width: '40%',
                        textAlign: 'center',
                        position: 'relative'
                    }}
                >
                    <LinearProgress
                        sx={{
                            height: 4,
                            backgroundColor: 'var(--button-alert-color)',
                            borderRadius: '2px',
                            '& .MuiLinearProgress-bar': {
                                backgroundColor: 'var(--text-color)'
                            }
                        }}
                    />
                </Box>
            </Box>
        </Box>
    )
}
