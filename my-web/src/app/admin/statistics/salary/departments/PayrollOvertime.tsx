'use client'
import React, { useState, useEffect } from 'react'
import ReactECharts from 'echarts-for-react'
import { Box, MenuItem, FormControl, Select, Paper, Typography, SelectChangeEvent } from '@mui/material'
import { useTheme } from 'next-themes'
import Loading from '@/components/Loading'

const data2024 = {
    'Human Resources': [
        { Key: '01-2024', Value: 181117088 },
        { Key: '02-2024', Value: 177942704 },
        { Key: '03-2024', Value: 184613041 },
        { Key: '04-2024', Value: 187154698 },
        { Key: '05-2024', Value: 194282778 },
        { Key: '06-2024', Value: 176947567 },
        { Key: '07-2024', Value: 182135793 },
        { Key: '08-2024', Value: 184887069 },
        { Key: '09-2024', Value: 183909528 },
        { Key: '10-2024', Value: 177427442 },
        { Key: '11-2024', Value: 179590869 }
    ],
    Finance: [
        { Key: '01-2024', Value: 207075861 },
        { Key: '02-2024', Value: 203480940 },
        { Key: '03-2024', Value: 199785549 },
        { Key: '04-2024', Value: 201412398 },
        { Key: '05-2024', Value: 197665631 },
        { Key: '06-2024', Value: 200936818 },
        { Key: '07-2024', Value: 192103767 },
        { Key: '08-2024', Value: 201642413 },
        { Key: '09-2024', Value: 197949503 },
        { Key: '10-2024', Value: 202921067 },
        { Key: '11-2024', Value: 197744399 }
    ],
    'IT Services': [
        { Key: '01-2024', Value: 285196774 },
        { Key: '02-2024', Value: 285078377 },
        { Key: '03-2024', Value: 279611276 },
        { Key: '04-2024', Value: 280046524 },
        { Key: '05-2024', Value: 275984165 },
        { Key: '06-2024', Value: 271174858 },
        { Key: '07-2024', Value: 285869450 },
        { Key: '08-2024', Value: 280666779 },
        { Key: '09-2024', Value: 286332259 },
        { Key: '10-2024', Value: 276198295 },
        { Key: '11-2024', Value: 289058843 }
    ],
    Marketing: [
        { Key: '01-2024', Value: 437115275 },
        { Key: '02-2024', Value: 442754307 },
        { Key: '03-2024', Value: 444903860 },
        { Key: '04-2024', Value: 446866236 },
        { Key: '05-2024', Value: 431301960 },
        { Key: '06-2024', Value: 446710333 },
        { Key: '07-2024', Value: 457875238 },
        { Key: '08-2024', Value: 446228088 },
        { Key: '09-2024', Value: 444715692 },
        { Key: '10-2024', Value: 435651338 },
        { Key: '11-2024', Value: 424474056 }
    ],
    Sales: [
        { Key: '01-2024', Value: 282441392 },
        { Key: '02-2024', Value: 274177744 },
        { Key: '03-2024', Value: 288142628 },
        { Key: '04-2024', Value: 280250558 },
        { Key: '05-2024', Value: 280841141 },
        { Key: '06-2024', Value: 283514930 },
        { Key: '07-2024', Value: 283841266 },
        { Key: '08-2024', Value: 284923689 },
        { Key: '09-2024', Value: 286625153 },
        { Key: '10-2024', Value: 281537044 },
        { Key: '11-2024', Value: 276096454 }
    ],
    Operations: [
        { Key: '01-2024', Value: 423877957 },
        { Key: '02-2024', Value: 427176406 },
        { Key: '03-2024', Value: 420800404 },
        { Key: '04-2024', Value: 417517324 },
        { Key: '05-2024', Value: 406764498 },
        { Key: '06-2024', Value: 432165200 },
        { Key: '07-2024', Value: 422169546 },
        { Key: '08-2024', Value: 418791895 },
        { Key: '09-2024', Value: 430511552 },
        { Key: '10-2024', Value: 435979776 },
        { Key: '11-2024', Value: 429834669 }
    ],
    'Customer Support': [
        { Key: '01-2024', Value: 255021766 },
        { Key: '02-2024', Value: 256273275 },
        { Key: '03-2024', Value: 268499587 },
        { Key: '04-2024', Value: 262681882 },
        { Key: '05-2024', Value: 260588151 },
        { Key: '06-2024', Value: 266580146 },
        { Key: '07-2024', Value: 264272721 },
        { Key: '08-2024', Value: 266483144 },
        { Key: '09-2024', Value: 251679616 },
        { Key: '10-2024', Value: 261864084 },
        { Key: '11-2024', Value: 261256868 }
    ]
}

const data2023 = {
    'Human Resources': [
        { Key: '01-2023', Value: 175867438 },
        { Key: '02-2023', Value: 178496762 },
        { Key: '03-2023', Value: 182033607 },
        { Key: '04-2023', Value: 184557247 },
        { Key: '05-2023', Value: 177457223 },
        { Key: '06-2023', Value: 178800588 },
        { Key: '07-2023', Value: 181736070 },
        { Key: '08-2023', Value: 178721177 },
        { Key: '09-2023', Value: 176305364 },
        { Key: '10-2023', Value: 180404787 },
        { Key: '11-2023', Value: 176826878 },
        { Key: '12-2023', Value: 184652196 }
    ],
    Finance: [
        { Key: '01-2023', Value: 196733949 },
        { Key: '02-2023', Value: 199911871 },
        { Key: '03-2023', Value: 201757194 },
        { Key: '04-2023', Value: 201926771 },
        { Key: '05-2023', Value: 198737579 },
        { Key: '06-2023', Value: 209020638 },
        { Key: '07-2023', Value: 199905054 },
        { Key: '08-2023', Value: 198836151 },
        { Key: '09-2023', Value: 201683245 },
        { Key: '10-2023', Value: 197350954 },
        { Key: '11-2023', Value: 198374248 },
        { Key: '12-2023', Value: 192278957 }
    ],
    'IT Services': [
        { Key: '01-2023', Value: 291875121 },
        { Key: '02-2023', Value: 280300135 },
        { Key: '03-2023', Value: 281679230 },
        { Key: '04-2023', Value: 274194800 },
        { Key: '05-2023', Value: 281677160 },
        { Key: '06-2023', Value: 277110813 },
        { Key: '07-2023', Value: 290504929 },
        { Key: '08-2023', Value: 277480741 },
        { Key: '09-2023', Value: 287602700 },
        { Key: '10-2023', Value: 277825678 },
        { Key: '11-2023', Value: 284400114 },
        { Key: '12-2023', Value: 270575807 }
    ],
    Marketing: [
        { Key: '01-2023', Value: 450320408 },
        { Key: '02-2023', Value: 437852759 },
        { Key: '03-2023', Value: 448512181 },
        { Key: '04-2023', Value: 439767434 },
        { Key: '05-2023', Value: 438520630 },
        { Key: '06-2023', Value: 452010197 },
        { Key: '07-2023', Value: 455237586 },
        { Key: '08-2023', Value: 439018560 },
        { Key: '09-2023', Value: 447945118 },
        { Key: '10-2023', Value: 448043636 },
        { Key: '11-2023', Value: 443678194 },
        { Key: '12-2023', Value: 435422633 }
    ],
    Sales: [
        { Key: '01-2023', Value: 280049596 },
        { Key: '02-2023', Value: 278066215 },
        { Key: '03-2023', Value: 281913207 },
        { Key: '04-2023', Value: 287017594 },
        { Key: '05-2023', Value: 272317790 },
        { Key: '06-2023', Value: 280895215 },
        { Key: '07-2023', Value: 272517649 },
        { Key: '08-2023', Value: 279587850 },
        { Key: '09-2023', Value: 281924369 },
        { Key: '10-2023', Value: 275461966 },
        { Key: '11-2023', Value: 281599150 },
        { Key: '12-2023', Value: 280413690 }
    ],
    Operations: [
        { Key: '01-2023', Value: 419653923 },
        { Key: '02-2023', Value: 427003743 },
        { Key: '03-2023', Value: 432374721 },
        { Key: '04-2023', Value: 436814432 },
        { Key: '05-2023', Value: 427636151 },
        { Key: '06-2023', Value: 418370858 },
        { Key: '07-2023', Value: 433013709 },
        { Key: '08-2023', Value: 428852685 },
        { Key: '09-2023', Value: 414725838 },
        { Key: '10-2023', Value: 416648091 },
        { Key: '11-2023', Value: 425895059 },
        { Key: '12-2023', Value: 423926045 }
    ],
    'Customer Support': [
        { Key: '01-2023', Value: 266604845 },
        { Key: '02-2023', Value: 258418054 },
        { Key: '03-2023', Value: 262262406 },
        { Key: '04-2023', Value: 260991572 },
        { Key: '05-2023', Value: 261576339 },
        { Key: '06-2023', Value: 256566185 },
        { Key: '07-2023', Value: 263567365 },
        { Key: '08-2023', Value: 252668334 },
        { Key: '09-2023', Value: 254730862 },
        { Key: '10-2023', Value: 263775744 },
        { Key: '11-2023', Value: 263922045 },
        { Key: '12-2023', Value: 262919984 }
    ]
}

const data2022 = {
    'Human Resources': [
        {
            Key: '01-2022',
            Value: 181435752
        },
        {
            Key: '02-2022',
            Value: 185246890
        },
        {
            Key: '03-2022',
            Value: 181957292
        },
        {
            Key: '04-2022',
            Value: 172947009
        },
        {
            Key: '05-2022',
            Value: 178189271
        },
        {
            Key: '06-2022',
            Value: 180472712
        },
        {
            Key: '07-2022',
            Value: 184918872
        },
        {
            Key: '08-2022',
            Value: 182984617
        },
        {
            Key: '09-2022',
            Value: 177108653
        },
        {
            Key: '10-2022',
            Value: 187975141
        },
        {
            Key: '11-2022',
            Value: 176447882
        },
        {
            Key: '12-2022',
            Value: 185605768
        }
    ],
    Finance: [
        {
            Key: '01-2022',
            Value: 203297563
        },
        {
            Key: '02-2022',
            Value: 203076257
        },
        {
            Key: '03-2022',
            Value: 194512285
        },
        {
            Key: '04-2022',
            Value: 201712607
        },
        {
            Key: '05-2022',
            Value: 197002192
        },
        {
            Key: '06-2022',
            Value: 197146715
        },
        {
            Key: '07-2022',
            Value: 195056950
        },
        {
            Key: '08-2022',
            Value: 191777832
        },
        {
            Key: '09-2022',
            Value: 193654820
        },
        {
            Key: '10-2022',
            Value: 204338599
        },
        {
            Key: '11-2022',
            Value: 194383299
        },
        {
            Key: '12-2022',
            Value: 203847708
        }
    ],
    'IT Services': [
        {
            Key: '01-2022',
            Value: 279645415
        },
        {
            Key: '02-2022',
            Value: 280228670
        },
        {
            Key: '03-2022',
            Value: 284821251
        },
        {
            Key: '04-2022',
            Value: 276171845
        },
        {
            Key: '05-2022',
            Value: 284446426
        },
        {
            Key: '06-2022',
            Value: 277988961
        },
        {
            Key: '07-2022',
            Value: 284427313
        },
        {
            Key: '08-2022',
            Value: 284812239
        },
        {
            Key: '09-2022',
            Value: 281478216
        },
        {
            Key: '10-2022',
            Value: 279686683
        },
        {
            Key: '11-2022',
            Value: 279049655
        },
        {
            Key: '12-2022',
            Value: 276065200
        }
    ],
    Marketing: [
        {
            Key: '01-2022',
            Value: 439869872
        },
        {
            Key: '02-2022',
            Value: 441787890
        },
        {
            Key: '03-2022',
            Value: 451913019
        },
        {
            Key: '04-2022',
            Value: 435108371
        },
        {
            Key: '05-2022',
            Value: 438443853
        },
        {
            Key: '06-2022',
            Value: 447911026
        },
        {
            Key: '07-2022',
            Value: 444007515
        },
        {
            Key: '08-2022',
            Value: 437819167
        },
        {
            Key: '09-2022',
            Value: 442034112
        },
        {
            Key: '10-2022',
            Value: 452929646
        },
        {
            Key: '11-2022',
            Value: 455472018
        },
        {
            Key: '12-2022',
            Value: 461258477
        }
    ],
    Sales: [
        {
            Key: '01-2022',
            Value: 287195332
        },
        {
            Key: '02-2022',
            Value: 281141352
        },
        {
            Key: '03-2022',
            Value: 280273187
        },
        {
            Key: '04-2022',
            Value: 284615945
        },
        {
            Key: '05-2022',
            Value: 281449169
        },
        {
            Key: '06-2022',
            Value: 280565051
        },
        {
            Key: '07-2022',
            Value: 281876601
        },
        {
            Key: '08-2022',
            Value: 284224498
        },
        {
            Key: '09-2022',
            Value: 279187468
        },
        {
            Key: '10-2022',
            Value: 272560671
        },
        {
            Key: '11-2022',
            Value: 280338259
        },
        {
            Key: '12-2022',
            Value: 286666759
        }
    ],
    Operations: [
        {
            Key: '01-2022',
            Value: 426772404
        },
        {
            Key: '02-2022',
            Value: 408100525
        },
        {
            Key: '03-2022',
            Value: 423461459
        },
        {
            Key: '04-2022',
            Value: 421200677
        },
        {
            Key: '05-2022',
            Value: 413207448
        },
        {
            Key: '06-2022',
            Value: 422765891
        },
        {
            Key: '07-2022',
            Value: 428045289
        },
        {
            Key: '08-2022',
            Value: 422362326
        },
        {
            Key: '09-2022',
            Value: 414920194
        },
        {
            Key: '10-2022',
            Value: 416585197
        },
        {
            Key: '11-2022',
            Value: 418353395
        },
        {
            Key: '12-2022',
            Value: 431506972
        }
    ],
    'Customer Support': [
        {
            Key: '01-2022',
            Value: 263087922
        },
        {
            Key: '02-2022',
            Value: 261882896
        },
        {
            Key: '03-2022',
            Value: 263721001
        },
        {
            Key: '04-2022',
            Value: 261752900
        },
        {
            Key: '05-2022',
            Value: 258375898
        },
        {
            Key: '06-2022',
            Value: 262666731
        },
        {
            Key: '07-2022',
            Value: 258085026
        },
        {
            Key: '08-2022',
            Value: 265180187
        },
        {
            Key: '09-2022',
            Value: 256743239
        },
        {
            Key: '10-2022',
            Value: 258046734
        },
        {
            Key: '11-2022',
            Value: 264556086
        },
        {
            Key: '12-2022',
            Value: 259643080
        }
    ]
}

export default function PayrollShares() {
    const { theme } = useTheme()
    const [loading, setLoading] = useState(true)
    const currentYear = 2024
    const [selectedYear, setSelectedYear] = useState<number>(currentYear)

    const [option, setOption] = useState<any>(null)

    const handleYearChange = (event: SelectChangeEvent<number>) => {
        setSelectedYear(event.target.value as number)
    }
    useEffect(() => {
        const selectedData = selectedYear === 2024 ? data2024 : selectedYear === 2023 ? data2023 : data2022

        // Extract categories (months) from the first department's data
        const categories = Object.values(selectedData)[0]?.map(item => item.Key) || []

        // Create series for the chart
        const series = Object.keys(selectedData).map(department => ({
            name: department,
            type: 'line',
            data: selectedData[department].map(item => item.Value)
        }))

        setOption({
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: Object.keys(selectedData),
                textStyle: {
                    color: theme === 'light' ? 'black' : '#fff',
                    fontFamily: 'Arial, sans-serif'
                }
            },
            grid: {
                left: '5%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: categories
            },
            yAxis: {
                type: 'value'
            },
            series: series
        })

        setLoading(false)
    }, [selectedYear, theme])
    if (loading) {
        return <Loading />
    }

    return (
        <Paper
            elevation={0}
            sx={{
                width: '100%',
                padding: '24px',
                backgroundColor: 'var(--background-item)',
                borderRadius: '15px',
                height: '100%',
                boxShadow: 'var(--box-shadow-paper)'
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    padding: '35px',
                    mb: '20px',
                    justifyContent: 'space-between'
                }}
            >
                <Typography fontSize={'20px'} fontWeight={'bold'} color='var(--text-color)'>
                    Payroll of departments over time
                </Typography>
                <FormControl sx={{ width: '90px' }} fullWidth>
                    <Select
                        defaultValue={currentYear}
                        onChange={handleYearChange}
                        sx={{
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'var(--border-color)'
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                border: '1px solid var(--border-color)' // Đặt border cho trạng thái focus
                            },
                            '& fieldset': {
                                borderRadius: '8px',
                                borderColor: 'var(--border-color)'
                            },
                            '& .MuiSelect-icon': {
                                color: 'var(--text-color)'
                            },
                            '& .MuiInputBase-input': {
                                color: 'var(--text-color)',
                                padding: '10px'
                            }
                        }}
                        MenuProps={{
                            PaperProps: {
                                elevation: 0,
                                sx: {
                                    width: '120px',
                                    mt: '2px',
                                    borderRadius: '8px',
                                    padding: '0 8px',
                                    backgroundImage:
                                        'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiBmaWxsPSJ1cmwoI3BhaW50MF9yYWRpYWxfMjc0OV8xNDUxODYpIiBmaWxsLW9wYWNpdHk9IjAuMTIiLz4KPGRlZnM+CjxyYWRpYWxHcmFkaWVudCBpZD0icGFpbnQwX3JhZGlhbF8yNzQ5XzE0NTE4NiIgY3g9IjAiIGN5PSIwIiByPSIxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgxMjAgMS44MTgxMmUtMDUpIHJvdGF0ZSgtNDUpIHNjYWxlKDEyMy4yNSkiPgo8c3RvcCBzdG9wLWNvbG9yPSIjMDBCOEQ5Ii8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzAwQjhEOSIgc3RvcC1vcGFjaXR5PSIwIi8+CjwvcmFkaWFsR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+Cg==), url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiBmaWxsPSJ1cmwoI3BhaW50MF9yYWRpYWxfMjc0OV8xNDUxODcpIiBmaWxsLW9wYWNpdHk9IjAuMTIiLz4KPGRlZnM+CjxyYWRpYWxHcmFkaWVudCBpZD0icGFpbnQwX3JhZGlhbF8yNzQ5XzE0NTE4NyIgY3g9IjAiIGN5PSIwIiByPSIxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgwIDEyMCkgcm90YXRlKDEzNSkgc2NhbGUoMTIzLjI1KSI+CjxzdG9wIHN0b3AtY29sb3I9IiNGRjU2MzAiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRkY1NjMwIiBzdG9wLW9wYWNpdHk9IjAiLz4KPC9yYWRpYWxHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4K)',
                                    backgroundPosition: 'top right, bottom left',
                                    backgroundSize: '50%, 50%',
                                    backgroundRepeat: 'no-repeat',
                                    backdropFilter: 'blur(20px)',
                                    backgroundColor: 'var(--background-item)',
                                    color: 'var(--text-color)',
                                    border: '1px solid var(--border-color)',
                                    '& .MuiMenuItem-root': {
                                        '&:hover': { backgroundColor: 'var(--hover-color)' },
                                        '&.Mui-selected': {
                                            backgroundColor: 'var(--background-selected-item)',
                                            '&:hover': { backgroundColor: 'var(--hover-color)' }
                                        }
                                    }
                                }
                            },
                            anchorOrigin: {
                                vertical: 'bottom',
                                horizontal: 'right' // Căn chỉnh bên phải
                            },
                            transformOrigin: {
                                vertical: 'top',
                                horizontal: 'right' // Căn chỉnh bên phải
                            }
                        }}
                    >
                        {[...Array(currentYear - 2021)].map((_, index) => {
                            const year = currentYear - index
                            return (
                                <MenuItem
                                    key={year}
                                    value={year}
                                    sx={{
                                        borderRadius: '6px',
                                        '&:last-child': {
                                            mt: '3px'
                                        }
                                    }}
                                >
                                    {year}
                                </MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
            </Box>
            {option ? (
                <ReactECharts option={option} style={{ width: '100%', height: '350px', marginTop: '10px' }} />
            ) : null}
        </Paper>
    )
}
