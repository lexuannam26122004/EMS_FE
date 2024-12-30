'use client'
import {
    Paper,
    Typography,
    Box,
    LinearProgress,
    LinearProgressProps,
    styled,
    linearProgressClasses,
    Tooltip
} from '@mui/material'
import { ArrowUp, BadgeHelp } from 'lucide-react'
import React, { useState } from 'react'
//import { useTranslation } from 'react-i18next'

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <BorderLinearProgress variant='determinate' {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant='body2' sx={{ color: 'black' }}>{`${props.value}%`}</Typography>
            </Box>
        </Box>
    )
}

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[200],
        ...theme.applyStyles('dark', {
            backgroundColor: theme.palette.grey[800]
        })
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: '#1a90ff',
        ...theme.applyStyles('dark', {
            backgroundColor: '#308fe8'
        })
    }
}))
export default function DisplayInfo() {
    //const { t } = useTranslation()
    const [progress, setProgress] = useState(50)
    setProgress(60)
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '24px',
                flexDirection: 'column'
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '24px'
                }}
            >
                <Paper
                    elevation={0}
                    sx={{
                        border: '1px solid #00a76f',
                        width: 'calc(100% / 3)',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: '#eefff9',
                        justifyContent: 'space-between',
                        borderRadius: '15px',
                        padding: '24px',
                        position: 'relative'
                    }}
                >
                    <Box width={'100%'}>
                        <Typography
                            sx={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                color: '#637381'
                            }}
                        >
                            GROSS PAYROLL TOTAL
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                        >
                            <Typography
                                sx={{
                                    color: '#09090b',
                                    fontSize: '34px',
                                    margin: '10px 5px',
                                    fontWeight: 'bold'
                                }}
                            >
                                đ1.03B
                            </Typography>
                            <Box
                                sx={{
                                    position: 'absolute',
                                    right: '30px',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                                <ArrowUp color='#33FF33'></ArrowUp>
                                <Typography fontWeight={'bold'} color='#33FF33' style={{ marginLeft: '10px' }}>
                                    320.01M
                                </Typography>
                                <Tooltip title={'tăng 3 triệu so với tháng trước'}>
                                    <BadgeHelp color='#33FF33' style={{ marginLeft: '10px' }}></BadgeHelp>
                                </Tooltip>
                            </Box>
                        </Box>
                        <Box sx={{ width: '100%' }}>
                            <LinearProgressWithLabel value={progress} />
                        </Box>
                        <Box
                            sx={{
                                mt: '5px',
                                color: '#09090b', //!(!rewardPercent || rewardPercent >= 0) ? '#F93C65' : '#00B69B',
                                fontSize: '15px',
                                fontWeight: 'bold',
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            <Box sx={{ backgroundColor: '#1a90ff', width: 15, height: 15, borderRadius: '5px' }}></Box>
                            <Typography
                                sx={{
                                    ml: '6px',
                                    color: '#09090b',
                                    fontSize: '16px',
                                    mt: '5px'
                                }}
                            >
                                đ818.47M take-homes
                            </Typography>
                        </Box>
                    </Box>

                    {/* <Box sx={{ width: '60px', height: '40px', position: 'absolute', right: '24px' }}>
                    <ReactECharts
                        option={getOption(dataSet.OnTime, colors[0])}
                        style={{ width: '100%', height: '100%' }}
                    />
                </Box> */}
                </Paper>
                <Paper
                    elevation={0}
                    sx={{
                        border: '1px solid #FF6699',
                        width: 'calc(100% / 3)',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: '#FFCCCC',
                        justifyContent: 'space-between',
                        borderRadius: '15px',
                        padding: '24px',
                        position: 'relative'
                    }}
                >
                    <Box width={'100%'}>
                        <Typography
                            sx={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                color: '#637381'
                            }}
                        >
                            NET PAYROLL TOTAL
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                        >
                            <Typography
                                sx={{
                                    color: '#09090b',
                                    fontSize: '34px',
                                    margin: '10px 5px',
                                    fontWeight: 'bold'
                                }}
                            >
                                đ1.03B
                            </Typography>
                            <Box
                                sx={{
                                    position: 'absolute',
                                    right: '30px',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                                <ArrowUp color='#33FF33'></ArrowUp>
                                <Typography fontWeight={'bold'} color='#33FF33' style={{ marginLeft: '10px' }}>
                                    320.01M
                                </Typography>
                                <Tooltip title={'tăng 3 triệu so với tháng trước'}>
                                    <BadgeHelp color='#33FF33' style={{ marginLeft: '10px' }}></BadgeHelp>
                                </Tooltip>
                            </Box>
                        </Box>
                        <Box sx={{ width: '100%' }}>
                            <LinearProgressWithLabel value={progress} />
                        </Box>
                        <Box
                            sx={{
                                mt: '5px',
                                color: '#09090b', //!(!rewardPercent || rewardPercent >= 0) ? '#F93C65' : '#00B69B',
                                fontSize: '15px',
                                fontWeight: 'bold',
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            <Box sx={{ backgroundColor: '#1a90ff', width: 15, height: 15, borderRadius: '5px' }}></Box>
                            <Typography
                                sx={{
                                    ml: '6px',
                                    color: '#09090b',
                                    fontSize: '16px',
                                    mt: '5px'
                                }}
                            >
                                Net RPE: đ8.47M
                            </Typography>
                        </Box>
                    </Box>

                    {/* <Box sx={{ width: '60px', height: '40px', position: 'absolute', right: '24px' }}>
                    <ReactECharts
                        option={getOption(dataSet.OnTime, colors[0])}
                        style={{ width: '100%', height: '100%' }}
                    />
                </Box> */}
                </Paper>
                <Paper
                    elevation={0}
                    sx={{
                        border: '1px solid #FFCC33',
                        width: 'calc(100% / 3)',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: '#FFFFCC',
                        justifyContent: 'space-between',
                        borderRadius: '15px',
                        padding: '24px',
                        position: 'relative'
                    }}
                >
                    <Box width={'100%'}>
                        <Typography
                            sx={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                color: '#637381'
                            }}
                        >
                            BASIC TOTAL
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                        >
                            <Typography
                                sx={{
                                    color: '#09090b',
                                    fontSize: '34px',
                                    margin: '10px 5px',
                                    fontWeight: 'bold'
                                }}
                            >
                                đ1.03B
                            </Typography>
                            <Box
                                sx={{
                                    position: 'absolute',
                                    right: '30px',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                                <ArrowUp color='#33FF33'></ArrowUp>
                                <Typography fontWeight={'bold'} color='#33FF33' style={{ marginLeft: '10px' }}>
                                    320.01M
                                </Typography>
                                <Tooltip title={'tăng 3 triệu so với tháng trước'}>
                                    <BadgeHelp color='#33FF33' style={{ marginLeft: '10px' }}></BadgeHelp>
                                </Tooltip>
                            </Box>
                        </Box>
                        <Box sx={{ width: '100%' }}>
                            <LinearProgressWithLabel value={progress} />
                        </Box>
                        <Box
                            sx={{
                                mt: '5px',
                                color: '#09090b', //!(!rewardPercent || rewardPercent >= 0) ? '#F93C65' : '#00B69B',
                                fontSize: '15px',
                                fontWeight: 'bold',
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            <Box sx={{ backgroundColor: '#1a90ff', width: 15, height: 15, borderRadius: '5px' }}></Box>
                            <Typography
                                sx={{
                                    ml: '6px',
                                    color: '#09090b',
                                    fontSize: '16px',
                                    mt: '5px'
                                }}
                            >
                                Basic Salary RPE: đ8.47M
                            </Typography>
                        </Box>
                    </Box>

                    {/* <Box sx={{ width: '60px', height: '40px', position: 'absolute', right: '24px' }}>
                    <ReactECharts
                        option={getOption(dataSet.OnTime, colors[0])}
                        style={{ width: '100%', height: '100%' }}
                    />
                </Box> */}
                </Paper>
            </Box>
        </Box>
    )
}
