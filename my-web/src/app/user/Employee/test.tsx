import React from 'react'
import { Box, Typography } from '@mui/material'

const Timeline: React.FC = () => {
    const colors = [
        'hsl(0, 100%, 50%)',
        'hsl(30, 100%, 50%)',
        'hsl(60, 100%, 50%)',
        'hsl(120, 100%, 50%)',
        'hsl(180, 100%, 50%)',
        'hsl(240, 100%, 50%)'
    ]

    let colorIndex = 0

    const getRandomColor = (): string => {
        const color = colors[colorIndex]
        colorIndex = (colorIndex + 1) % colors.length
        return color
    }

    const hslToRgba = (hsl: string, alpha = 0.5): string => {
        const match = hsl.match(/\d+/g)
        if (!match) {
            throw new Error('Invalid HSL string')
        }
        const [h, s, l] = match.map(Number)
        const c = (1 - Math.abs((2 * l) / 100 - 1)) * (s / 100)
        const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
        const m = l / 100 - c / 2
        let r = 0,
            g = 0,
            b = 0

        if (h >= 0 && h < 60) {
            r = c
            g = x
            b = 0
        } else if (h >= 60 && h < 120) {
            r = x
            g = c
            b = 0
        } else if (h >= 120 && h < 180) {
            r = 0
            g = c
            b = x
        } else if (h >= 180 && h < 240) {
            r = 0
            g = x
            b = c
        } else if (h >= 240 && h < 300) {
            r = x
            g = 0
            b = c
        } else {
            r = c
            g = 0
            b = x
        }
        r = Math.round((r + m) * 255)
        g = Math.round((g + m) * 255)
        b = Math.round((b + m) * 255)

        return `rgba(${r}, ${g}, ${b}, ${alpha})`
    }

    const events = [
        {
            startDate: '24 Dec 2024 - 9:47 PM',
            endDate: '24 Dec 2024 - 10:47 PM',
            location: 'New York',
            content: {
                jobDescription: 'Software Developer',
                allowance: '$2000',
                note: 'Completed annual review'
            },
            color: getRandomColor()
        },
        {
            startDate: '23 Dec 2024 - 8:47 PM',
            endDate: '23 Dec 2024 - 9:47 PM',
            location: 'San Francisco',
            content: {
                jobDescription: 'Senior Developer',
                allowance: '$3000',
                note: 'Promoted to Senior Developer'
            },
            color: getRandomColor()
        },
        {
            startDate: '22 Dec 2024 - 7:47 PM',
            endDate: '22 Dec 2024 - 8:47 PM',
            location: 'Los Angeles',
            content: {
                jobDescription: 'Project Manager',
                allowance: '$2500',
                note: 'Project completed on time'
            },
            color: getRandomColor()
        },
        {
            startDate: '24 Dec 2024 - 9:47 PM',
            endDate: '24 Dec 2024 - 10:47 PM',
            location: 'New York',
            content: {
                jobDescription: 'Software Developer',
                allowance: '$2000',
                note: 'Completed annual review'
            },
            color: getRandomColor()
        },
        {
            startDate: '23 Dec 2024 - 8:47 PM',
            endDate: '23 Dec 2024 - 9:47 PM',
            location: 'San Francisco',
            content: {
                jobDescription: 'Senior Developer',
                allowance: '$3000',
                note: 'Promoted to Senior Developer'
            },
            color: getRandomColor()
        },
        {
            startDate: '22 Dec 2024 - 7:47 PM',
            endDate: '22 Dec 2024 - 8:47 PM',
            location: 'Los Angeles',
            content: {
                jobDescription: 'Project Manager',
                allowance: '$2500',
                note: 'Project completed on time'
            },
            color: getRandomColor()
        },
        {
            startDate: '24 Dec 2024 - 9:47 PM',
            endDate: '24 Dec 2024 - 10:47 PM',
            location: 'New York',
            content: {
                jobDescription: 'Software Developer',
                allowance: '$2000',
                note: 'Completed annual review'
            },
            color: getRandomColor()
        },
        {
            startDate: '23 Dec 2024 - 8:47 PM',
            endDate: '23 Dec 2024 - 9:47 PM',
            location: 'San Francisco',
            content: {
                jobDescription: 'Senior Developer',
                allowance: '$3000',
                note: 'Promoted to Senior Developer'
            },
            color: getRandomColor()
        },
        {
            startDate: '22 Dec 2024 - 7:47 PM',
            endDate: '22 Dec 2024 - 8:47 PM',
            location: 'Los Angeles',
            content: {
                jobDescription: 'Project Manager',
                allowance: '$2500',
                note: 'Project completed on time'
            },
            color: getRandomColor()
        }
    ]

    return (
        <Box
            sx={{
                padding: '20px',
                backgroundColor: 'var(--hover-color)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                borderRadius: '12px',
                overflow: 'hidden',
                height: '100%',
                border: '1px solid #e0e0e0',
                width: '100%'
            }}
        >
            <Box
                sx={{
                    position: 'sticky',
                    top: 0,
                    backgroundColor: 'var(--background-color)',
                    padding: '15px 20px',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: 'var(--text-color)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #e0e0e0',
                    zIndex: 2,
                    borderRadius: '12px'
                }}
            >
                {'Lịch sử chuyển phòng ban'}
            </Box>
            <Box
                sx={{
                    borderRadius: '12px',
                    marginTop: '24px',
                    backgroundColor: 'var(--hover-color)',
                    position: 'relative',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    paddingTop: '20px',
                    paddingBottom: '20px',
                    paddingRight: '20px',
                    overflowX: 'auto',
                    scrollBehavior: 'smooth',
                    touchAction: 'pan-x',
                    '&::-webkit-scrollbar': {
                        height: '8px' // Độ cao thanh cuộn
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: '#555', // Màu thanh cuộn
                        borderRadius: '4px'
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                        background: '#333'
                    }
                }}
            >
                <Box
                    sx={{
                        position: 'sticky',
                        left: 0,
                        right: 0,
                        height: '4px',
                        backgroundColor: '#333e47',
                        zIndex: 1,
                        width: '100%',
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            top: '-8px',
                            right: '-21px', // Adjust to position the arrow properly
                            width: '0',
                            height: '0',
                            borderTop: '10px solid transparent',
                            borderBottom: '10px solid transparent',
                            borderLeft: '24px solid #333e47' // Color matches the background color of the box
                        }
                    }}
                />

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: '-12px',
                        width: '100%',
                        gap: '80px' // Khoảng cách giữa các sự kiện
                    }}
                >
                    {events.map((event, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                position: 'relative',
                                minWidth: '200px' // Đảm bảo mỗi sự kiện có chiều rộng tối thiểu
                            }}
                        >
                            {/* Chấm tròn */}
                            <Box
                                sx={{
                                    width: '20px',
                                    height: '20px',
                                    backgroundColor: event.color,
                                    borderRadius: '50%',
                                    border: '2px solid #333e47',
                                    zIndex: 2,
                                    marginBottom: '10px' // Khoảng cách giữa chấm và nội dung
                                }}
                            />
                            {/* Nội dung sự kiện */}
                            <Box
                                sx={{
                                    padding: '10px',
                                    backgroundColor: hslToRgba(event.color, 0.2),
                                    borderRadius: '8px',
                                    zIndex: 2,
                                    width: '200px',
                                    textAlign: 'center',
                                    border: `2px solid ${event.color}`
                                }}
                            >
                                <Typography sx={{ fontSize: '0.9em', marginBottom: '5px', color: '#fff' }}>
                                    {event.startDate}
                                </Typography>
                                <Typography sx={{ fontSize: '1.1em', fontWeight: 'bold', color: '#fff' }}>
                                    {event.content.jobDescription}
                                </Typography>
                                <Typography sx={{ fontSize: '1em', color: '#fff' }}>
                                    Allowance: {event.content.allowance}
                                </Typography>
                                <Typography sx={{ fontSize: '1em', color: '#fff' }}>
                                    Note: {event.content.note}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    )
}

export default Timeline
