'use client'
import { IFilterEmploymentContract } from '@/models/EmploymentContract'
import { formatDate } from '@/utils/formatDate'
import {
    Box,
    Select,
    Pagination,
    Typography,
    Tooltip,
    SelectChangeEvent,
    Paper,
    TableRow,
    TableBody,
    Table,
    TableCell,
    TableHead,
    TableContainer,
    TextField,
    InputAdornment,
    TableSortLabel,
    Avatar
} from '@mui/material'
import { ClipboardCheck } from 'lucide-react'
import { useEffect, useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import SearchIcon from '@mui/icons-material/Search'
import { useRouter } from 'next/navigation'
import { useGetContractsExpiringSoonQuery } from '@/services/EmploymentContractService'

function getStatusBgColor(status: string): string {
    if (status === 'Rejected') {
        return 'var(--bg-danger-color)'
    } else if (status === 'Pending') {
        return 'var(--bg-warning-color)'
    } else if (status === 'Resolved') {
        return 'var(--bg-success-color)'
    } else {
        return 'var(--bg-closed-color)'
    }
}

function getStatusTextColor(status: string): string {
    if (status === 'Rejected') {
        return 'var(--text-danger-color)'
    } else if (status === 'Pending') {
        return 'var(--text-warning-color)'
    } else if (status === 'Resolved') {
        return 'var(--text-success-color)'
    } else {
        return 'var(--text-closed-color)'
    }
}

function getStatusBgColor1(status: string): string {
    if (status === 'Rejected') {
        return 'var(--bg-danger-color1)'
    } else if (status === 'Pending') {
        return 'var(--bg-warning-color1)'
    } else if (status === 'Resolved') {
        return 'var(--bg-success-color1)'
    } else {
        return 'var(--bg-closed-color1)'
    }
}

function getStatusTextColor1(status: string): string {
    if (status === 'Rejected') {
        return 'var(--text-danger-color1)'
    } else if (status === 'Pending') {
        return 'var(--text-warning-color1)'
    } else if (status === 'Resolved') {
        return 'var(--text-success-color1)'
    } else {
        return 'var(--text-closed-color1)'
    }
}

interface IGetAllErrorReport {
    Id: number
    FullNameReported: string
    AvatarReportedPath: string
    EmployeeIdReported: string
    ReportedDate: string
    Type: string
    TypeId: string
    Description: string
    Status: string
    AvatarResolvedPath: string
    FullNameResolved: string | null
    ResolvedDate: string | null
    ResolutionDetails: string | null
}

interface IProps {
    errorsData: IGetAllErrorReport[]
    totalRecords: number
    type: number
}

function TableErrorReport({ errorsData, totalRecords, type }: IProps) {
    const { t } = useTranslation('common')
    const router = useRouter()
    const [selected, setSelected] = useState<number[]>([])
    const [openDialog, setOpenDialog] = useState(false)
    const [selectedRow, setSelectedRow] = useState<number | null>(null)
    const [order, setOrder] = useState<'asc' | 'desc'>('asc')
    const [orderBy, setOrderBy] = useState<string>('')
    // const [selectedConfig, setSelectedConfig] = useState<IGetAllSysConfiguration | null>(null)
    const [openModal, setOpenModal] = useState(false)

    // const handleClickDetail = (config: IGetAllSysConfiguration) => {
    //     setSelectedConfig(config)
    //     setOpenModal(true)
    // }

    const handleSort = (property: string) => {
        if (orderBy === property) {
            setOrder(order === 'asc' ? 'desc' : 'asc')
        } else {
            setOrder('asc')
        }
        setOrderBy(property)
    }

    return (
        <TableContainer
            sx={{
                '&::-webkit-scrollbar': {
                    width: '7px',
                    height: '7px'
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: 'var(--scrollbar-color)',
                    borderRadius: '10px'
                }
            }}
        >
            <Table>
                <TableHead>
                    <TableRow
                        sx={{
                            backgroundColor: 'var(--header-table-dashboard)',
                            '&:last-child td, &:last-child th': {
                                border: 'none'
                            }
                        }}
                    >
                        <TableCell sx={{ borderColor: 'var(--border-color)', padding: '16px 24px' }}>
                            <TableSortLabel
                                active={'FullNameReported' === orderBy}
                                direction={orderBy === 'FullNameReported' ? order : 'asc'}
                                onClick={() => handleSort('FullNameReported')}
                                sx={{
                                    '& .MuiTableSortLabel-icon': {
                                        color: 'var(--text-color) !important'
                                    }
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontWeight: 'bold',
                                        color: 'var(--text-color)',
                                        fontSize: '16px',
                                        overflow: 'hidden',
                                        maxWidth: '260px',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap'
                                    }}
                                >
                                    {t('COMMON.ERROR_REPORT.FULL_NAME_REPORTED')}
                                </Typography>
                            </TableSortLabel>
                        </TableCell>

                        <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                            <TableSortLabel
                                active={'Type' === orderBy}
                                direction={orderBy === 'Type' ? order : 'asc'}
                                onClick={() => handleSort('Type')}
                                sx={{
                                    '& .MuiTableSortLabel-icon': {
                                        color: 'var(--text-color) !important'
                                    },
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontWeight: 'bold',
                                        color: 'var(--text-color)',
                                        fontSize: '16px',
                                        textAlign: 'center',
                                        maxWidth: '280px',
                                        overflow: 'hidden',
                                        ml: '8px',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap'
                                    }}
                                >
                                    {t('COMMON.ERROR_REPORT.TYPE')}
                                </Typography>
                            </TableSortLabel>
                        </TableCell>

                        <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                            <TableSortLabel
                                active={'ReportedDate' === orderBy}
                                direction={orderBy === 'ReportedDate' ? order : 'asc'}
                                onClick={() => handleSort('ReportedDate')}
                                sx={{
                                    '& .MuiTableSortLabel-icon': {
                                        color: 'var(--text-color) !important'
                                    }
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontWeight: 'bold',
                                        color: 'var(--text-color)',
                                        maxWidth: '400px',
                                        fontSize: '16px',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap'
                                    }}
                                >
                                    {t('COMMON.ERROR_REPORT.REPORTED_DATE')}
                                </Typography>
                            </TableSortLabel>
                        </TableCell>

                        <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                            <Typography
                                sx={{
                                    fontWeight: 'bold',
                                    color: 'var(--text-color)',
                                    fontSize: '16px',
                                    textAlign: 'center',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                {t('COMMON.ERROR_REPORT.STATUS')}
                            </Typography>
                        </TableCell>

                        {type >= 3 && (
                            <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                <TableSortLabel
                                    active={'FullNameResolved' === orderBy}
                                    direction={orderBy === 'FullNameResolved' ? order : 'asc'}
                                    onClick={() => handleSort('FullNameResolved')}
                                    sx={{
                                        '& .MuiTableSortLabel-icon': {
                                            color: 'var(--text-color) !important'
                                        }
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontWeight: 'bold',
                                            color: 'var(--text-color)',
                                            fontSize: '16px',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        }}
                                    >
                                        {t('COMMON.ERROR_REPORT.FULL_NAME_RESOLVED')}
                                    </Typography>
                                </TableSortLabel>
                            </TableCell>
                        )}

                        {type >= 3 && (
                            <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                <TableSortLabel
                                    active={'ResolvedDate' === orderBy}
                                    direction={orderBy === 'ResolvedDate' ? order : 'asc'}
                                    onClick={() => handleSort('ResolvedDate')}
                                    sx={{
                                        '& .MuiTableSortLabel-icon': {
                                            color: 'var(--text-color) !important'
                                        }
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontWeight: 'bold',
                                            color: 'var(--text-color)',
                                            fontSize: '16px',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        }}
                                    >
                                        {t('COMMON.ERROR_REPORT.RESOLVED_DATE')}
                                    </Typography>
                                </TableSortLabel>
                            </TableCell>
                        )}

                        <TableCell sx={{ borderColor: 'var(--border-color)', padding: '16px 24px' }}>
                            <Typography
                                sx={{
                                    fontWeight: 'bold',
                                    color: 'var(--text-color)',
                                    fontSize: '16px',
                                    overflow: 'hidden',
                                    textAlign: 'center',
                                    maxWidth: '280px',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                {t('COMMON.ERROR_REPORT.ACTION')}
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {errorsData &&
                        errorsData.map((row: IGetAllErrorReport, index: number) => (
                            <TableRow
                                key={index}
                                sx={{
                                    '&:last-child td, &:last-child th': {
                                        border: 'none'
                                    }
                                }}
                            >
                                <TableCell
                                    sx={{
                                        borderColor: 'var(--border-color)',
                                        // borderStyle: 'dashed',
                                        padding: '16px 0 16px 24px'
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '14px'
                                        }}
                                    >
                                        <Avatar
                                            sx={{
                                                mt: '-2px'
                                            }}
                                            src={
                                                row.AvatarReportedPath ||
                                                'https://localhost:44381/avatars/aa1678f0-75b0-48d2-ae98-50871178e9bd.jfif'
                                            }
                                        />

                                        <Box>
                                            <Typography
                                                sx={{
                                                    color: 'var(--text-color)',
                                                    fontSize: '16px',
                                                    maxWidth: '260px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                {row.FullNameReported}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    color: 'var(--created-date-color)',
                                                    fontSize: '16px',
                                                    mt: '-0px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                {row.EmployeeIdReported}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </TableCell>

                                <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                    <Box
                                        sx={{
                                            color: '#6bd6eb',
                                            fontSize: '15px',
                                            overflow: 'hidden',
                                            borderRadius: '8px',
                                            border: '1px dashed var(--border-color)',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            padding: '5px',
                                            maxWidth: '280px',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        }}
                                    >
                                        {row.Type}
                                    </Box>
                                </TableCell>

                                <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                    <Typography
                                        sx={{
                                            color: 'var(--text-color)',
                                            fontSize: '16px',
                                            maxWidth: '280px',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        }}
                                    >
                                        {formatDate(row.ReportedDate)}
                                    </Typography>
                                </TableCell>

                                <TableCell sx={{ borderColor: 'var(--border-color)', padding: '11px' }}>
                                    <Box
                                        sx={{
                                            borderRadius: '8px',
                                            padding: '5px',
                                            display: 'flex',
                                            minWidth: '100px',
                                            justifyContent: 'center',
                                            backgroundColor: getStatusBgColor(row.Status)
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontSize: '15px',
                                                overflow: 'hidden',
                                                color: getStatusTextColor(row.Status),
                                                width: 'auto',
                                                fontWeight: 'bold',
                                                display: 'inline-block',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap'
                                            }}
                                        >
                                            {row.Status}
                                        </Typography>
                                    </Box>
                                </TableCell>

                                {row.FullNameResolved && type >= 3 && (
                                    <TableCell sx={{ borderColor: 'var(--border-color)', padding: '0 16px' }}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '14px'
                                            }}
                                        >
                                            <Avatar
                                                src={
                                                    row.AvatarReportedPath ||
                                                    'https://localhost:44381/avatars/aa1678f0-75b0-48d2-ae98-50871178e9bd.jfif'
                                                }
                                            />

                                            <Box>
                                                <Typography
                                                    sx={{
                                                        color: 'var(--text-color)',
                                                        fontSize: '16px',
                                                        maxWidth: '260px',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        whiteSpace: 'nowrap'
                                                    }}
                                                >
                                                    {row.FullNameReported}
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        color: 'var(--created-date-color)',
                                                        fontSize: '16px',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        whiteSpace: 'nowrap'
                                                    }}
                                                >
                                                    {row.EmployeeIdReported}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                )}

                                {row.ResolvedDate && type >= 3 && (
                                    <TableCell sx={{ borderColor: 'var(--border-color)' }}>
                                        <Typography
                                            sx={{
                                                color: 'var(--text-color)',
                                                fontSize: '16px',
                                                maxWidth: '280px',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap'
                                            }}
                                        >
                                            {formatDate(row.ResolvedDate)}
                                        </Typography>
                                    </TableCell>
                                )}

                                <TableCell
                                    sx={{
                                        padding: '16px 24px',
                                        borderColor: 'var(--border-color)',
                                        width: '146px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <Box
                                        display='flex'
                                        alignItems='center'
                                        justifyContent='center'
                                        sx={{
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <Tooltip title={t('COMMON.ERROR_REPORT.CONSIDER')}>
                                            <Box
                                                display='flex'
                                                alignItems='center'
                                                justifyContent='center'
                                                sx={{
                                                    color: '#00d100',
                                                    borderRadius: '50%',
                                                    width: '42px',
                                                    height: '42px',
                                                    '&:hover': {
                                                        backgroundColor: 'var(--hover-color)'
                                                    }
                                                }}
                                            >
                                                <ClipboardCheck />
                                            </Box>
                                        </Tooltip>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TableErrorReport