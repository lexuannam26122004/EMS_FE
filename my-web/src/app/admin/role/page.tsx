'use client'
import Chart from './ChartRoles'
import DisplayInfo from './DisplayInfo'
import Page from './RulesTable'
import { Box } from '@mui/material'

const App: React.FC = () => {
    return (
        <Box>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'calc(100% / 3 * 2 - 8px) calc(100% / 3 - 16px)',
                    gap: '24px'
                }}
            >
                {/* Cột bên trái */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        height: '100%', // Đảm bảo chiều cao của cột được chia đều
                        gap: '24px'
                    }}
                >
                    <DisplayInfo />
                </Box>
                <Box>
                    <Chart />
                </Box>

                {/* Cột bên phải */}
            </Box>
            <Page />
        </Box>
    )
}

export default App