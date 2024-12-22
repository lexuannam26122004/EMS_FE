import { TrendingUp } from '@mui/icons-material'
import formatNumberWithUnit from '@/utils/formatNumberWithUnit'
import { useTranslation } from 'react-i18next'
import { Paper, Typography } from '@mui/material'
import { Box } from '@mui/material'
import { TrendingDown, UserRoundSearch, CircleUserRound, ExternalLink } from 'lucide-react'
import { useGetEmployeeStatsByMonthAndYearQuery } from '@/services/EmploymentContractService'

interface IEmployeeStats {
    StartCount: number
    StartPercentChange: number
    EndCount: number
    EndPercentChange: number
}

function DepartmentInfo() {
    const { t } = useTranslation('common')

    const date = new Date()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const { data: response } = useGetEmployeeStatsByMonthAndYearQuery({ Month: month, Year: year })

    const data = response?.Data as IEmployeeStats

    const totalEmployee = 109
    const employeePercent = 5.2
    const timeOff = 56
    const timeOffPercent = 10
    const totalEmployeeLayoff = data?.EndCount
    const layoffPercent = data?.EndPercentChange
    const newEmployees = data?.StartCount
    const newEmployeePercent = data?.StartPercentChange
    const laborCosts = 1200000000
    const laborCostsPercent = 14.47
    const promotions = 12
    const promotionPercent = 24
    const isDown = 1
    const departmentStyles: { [key: number]: { backgroundImage: string; color: string } } = {
        1: {
            backgroundImage: 'linear-gradient(135deg, rgb(147, 155, 163), #34495e)',
            color: '#FFFFFF'
        },
        2: {
            backgroundImage: 'linear-gradient(135deg, rgb(255, 100, 100), rgb(255, 150, 150))',
            color: '#000000'
        },
        3: {
            backgroundImage: 'linear-gradient(135deg, rgb(34, 193, 195), rgb(253, 187, 45))',
            color: '#FF6347'
        },
        4: {
            backgroundImage: 'linear-gradient(135deg, rgb(100, 200, 255), rgb(50, 150, 255))',
            color: '#1E90FF'
        },
        5: {
            backgroundImage: 'linear-gradient(135deg, rgb(255, 204, 255), rgb(255, 102, 204))',
            color: '#8A2BE2'
        },
        6: {
            backgroundImage: 'linear-gradient(135deg, rgb(255, 223, 186), rgb(255, 165, 0))',
            color: '#FFD700'
        },
        7: {
            backgroundImage: 'linear-gradient(135deg, rgb(93, 109, 126), rgb(48, 63, 77))',
            color: '#2F4F4F'
        },
        8: {
            backgroundImage: 'linear-gradient(135deg, rgb(204, 255, 204), rgb(0, 204, 102))',
            color: '#32CD32'
        },
        9: {
            backgroundImage: 'linear-gradient(135deg, rgb(252, 85, 85), rgb(255, 112, 67))',
            color: '#DC143C'
        },
        10: {
            backgroundImage: 'linear-gradient(135deg, rgb(72, 61, 139), rgb(255, 99, 71))',
            color: '#800080'
        }
    }
    const papers = Array.from({ length: 10 }, (_, index) => ({
        id: index + 1,
        memberId: `CC00${index + 1}`,
        memberName: `Người dùng ${index + 1}`,
        memberCount: 69
    }))
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: '24px',
                overflow: 'auto',
                '&::-webkit-scrollbar': {
                    width: '10px',
                    height: '10px',
                    backgroundColor: 'var(--background-after-color)'
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: 'var(--scrollbar-color)',
                    borderRadius: '10px'
                },
                backgroundColor: 'var(--background-after-color)'
            }}
        >
            {papers.map(paper => {
                const departmentStyle = departmentStyles[paper.id] || {}
                return (
                    <Paper
                        key={paper.id}
                        elevation={0}
                        sx={{
                            backgroundImage:
                                departmentStyle.backgroundImage ||
                                'linear-gradient(135deg, rgb(147, 155, 163), #34495e)',
                            backgroundSize: 'cover',
                            flexShrink: 0,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            borderRadius: '15px',
                            padding: '20px 22px',
                            width: '450px'
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                position: 'relative',
                                gap: '5px'
                            }}
                        >
                            <Box
                                sx={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '50%',
                                    overflow: 'hidden'
                                }}
                            >
                                <img
                                    src='/images/workforce.png'
                                    alt='Logo'
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    }}
                                />
                            </Box>
                            <Box>
                                <Typography
                                    sx={{
                                        color: departmentStyle.color || '#FFFFFF',
                                        fontWeight: 'bold',
                                        fontSize: '30px'
                                    }}
                                >
                                    {t('Phòng nhân sự')}
                                </Typography>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '5px'
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            backgroundImage: 'linear-gradient(135deg,rgb(75, 77, 68),rgb(48, 55, 61))',
                                            borderRadius: '15px',
                                            padding: '8px 12px',
                                            gap: '5px'
                                        }}
                                    >
                                        <Box sx={{ fontSize: '10px', color: '#C6E2FF', display: 'flex' }}>
                                            <UserRoundSearch />
                                        </Box>
                                        <Typography
                                            sx={{
                                                color: '#C6E2FF',
                                                fontWeight: 'bold',
                                                fontSize: '10px'
                                            }}
                                        >
                                            {t('CC001')}
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            backgroundImage: 'linear-gradient(135deg,rgb(75, 77, 68),rgb(48, 55, 61))',
                                            borderRadius: '15px',
                                            padding: '8px 12px',
                                            gap: '5px'
                                        }}
                                    >
                                        <Box sx={{ fontSize: '10px', color: '#C6E2FF', display: 'flex' }}>
                                            <CircleUserRound />
                                        </Box>
                                        <Typography
                                            sx={{
                                                color: '#C6E2FF',
                                                fontWeight: 'bold',
                                                fontSize: '10px'
                                            }}
                                        >
                                            {t('Trần Văn Minh')}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                    padding: '10px 10px',
                                    borderRadius: '180px',
                                    background: 'rgb(147, 155, 163)'
                                }}
                                onClick={() => {
                                    alert('Box đã được click!')
                                }}
                            >
                                <Box sx={{ fontSize: '30px', color: '#FFFFFF', display: 'flex' }}>
                                    <ExternalLink />
                                </Box>
                            </Box>
                        </Box>

                        <Box
                            sx={{
                                mt: '10px',
                                color: departmentStyle.color || '#FFFFFF',
                                fontSize: '30px',
                                fontWeight: 'bold',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1px'
                            }}
                        >
                            {69}
                            <Typography
                                sx={{
                                    ml: '6px',
                                    color: '#C6E2FF',
                                    fontSize: '16px',
                                    mt: '7px'
                                }}
                            >
                                {t('thành viên')}
                            </Typography>
                        </Box>
                    </Paper>
                )
            })}
        </Box>
    )
}

export default DepartmentInfo
