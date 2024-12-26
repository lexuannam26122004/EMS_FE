import React from 'react'
import { Box, Typography } from '@mui/material'

const Timeline: React.FC = () => {
    const getRandomColor = (): string => {
        const hue = Math.floor(Math.random() * 360) // Giá trị hue từ 0 đến 360 (đủ các màu sắc)
        const saturation = 70 + Math.random() * 30 // Độ bão hòa từ 70% đến 100%
        const lightness = 50 + Math.random() * 20 // Độ sáng từ 50% đến 70%
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`
    }

    const events = [
        { date: '24 Dec 2024 - 9:47 PM', content: '1983, orders, $4220', color: getRandomColor() },
        { date: '23 Dec 2024 - 8:47 PM', content: '12 Invoices have been paid', color: getRandomColor() },
        { date: '22 Dec 2024 - 7:47 PM', content: 'Order #37745 from September', color: getRandomColor() },
        { date: '21 Dec 2024 - 6:47 PM', content: 'New order placed #XF-2356', color: getRandomColor() },
        { date: '20 Dec 2024 - 5:47 PM', content: 'New order placed #XF-2346', color: getRandomColor() }
    ]

    return (
        <Box
            sx={{
                position: 'relative',
                Width: '100%',
                margin: 'auto',
                padding: '40px'
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    width: '4px',
                    backgroundColor: '#444',
                    top: 0,
                    bottom: 0,
                    left: '50%'
                }}
            />

            {events.map((event, index) => (
                <Box
                    key={index}
                    sx={{
                        padding: '10px 20px',
                        position: 'relative',
                        backgroundColor: '#2b2b3c',
                        borderRadius: '8px',
                        margin: '20px 0',
                        width: 'calc(50%)',
                        left: index % 2 === 0 ? 'calc(0% - 19px)' : 'calc(50% + 21px)',
                        borderLeft: index % 2 === 0 ? `4px solid ${event.color}` : 'none',
                        borderRight: index % 2 !== 0 ? `4px solid ${event.color}` : 'none',
                        color: '#fff',
                        textAlign: index % 2 === 0 ? 'left' : 'right',
                        '&:after': {
                            content: '""',
                            position: 'absolute',
                            width: '20px',
                            height: '20px',
                            backgroundColor: event.color,
                            border: '4px solid #1f1f2e',
                            borderRadius: '50%',
                            top: '15px',
                            left: index % 2 === 0 ? 'calc(100% + 10px)' : 'auto',
                            right: index % 2 !== 0 ? 'calc(100% + 10px)' : 'auto'
                        }
                    }}
                >
                    <Typography sx={{ color: '#aaa', fontSize: '0.9em', marginBottom: '5px' }}>{event.date}</Typography>
                    <Typography sx={{ fontSize: '1.1em' }}>{event.content}</Typography>
                </Box>
            ))}
        </Box>
    )
}

const App: React.FC = () => {
    return (
        <Box
            sx={{
                backgroundColor: '#1f1f2e',
                padding: '20px'
            }}
        >
            <Typography
                variant='h1'
                sx={{
                    textAlign: 'center',
                    color: '#fff',
                    fontSize: '2rem',
                    marginBottom: '20px'
                }}
            >
                Order Timeline
            </Typography>
            <Timeline />
        </Box>
    )
}

export default App
