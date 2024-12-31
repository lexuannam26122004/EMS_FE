import { TableContainer, Table, TableRow, TableBody, TableCell, Box, CircularProgress } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useSearchEmploymentContractsQuery } from '@/services/EmploymentContractService'
import { IEmploymentContractSearch } from '@/models/EmploymentContract'
import { IAspNetUserGetAll } from '@/models/AspNetUser'
import { useGetAllUsersQuery } from '@/services/AspNetUserService'

interface ContractProps {
    aspnetUserId: string
}

const Contract: React.FC<ContractProps> = ({ aspnetUserId }) => {
    const { t } = useTranslation('common')

    const { data: contractResponse, isLoading: isContractsLoading } = useSearchEmploymentContractsQuery()
    const { data: userResponse, isLoading: isuserscontractLoading } = useGetAllUsersQuery()

    const contract = (contractResponse?.Data?.Records as IEmploymentContractSearch[]) || []
    const employee = (userResponse?.Data?.Records as IAspNetUserGetAll[]) || []

    const userscontract = contract.find(ct => ct.UserId === aspnetUserId)
    const matchedEmployee = employee.find(emp => emp.Id === userscontract?.UserId)
    const matchedManager = employee.find(emp => emp.Id === userscontract?.ManagerId)

    if (isContractsLoading || isuserscontractLoading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '400px',
                    backgroundColor: '#f5f5f5'
                }}
            >
                <CircularProgress />
            </Box>
        )
    }

    return (
        <Box
            sx={{
                padding: '20px',
                backgroundColor: 'var(--hover-color)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                borderRadius: '12px',
                overflow: 'hidden',
                height: '600px',
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
                    marginBottom: '10px',
                    borderRadius: '12px'
                }}
            >
                Thông tin hợp đồng
            </Box>

            <TableContainer
                sx={{
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    borderRadius: '12px',
                    overflow: 'auto',
                    height: '480px',
                    width: '100%',
                    '&::-webkit-scrollbar': {
                        width: '0px',
                        height: '0px',
                        backgroundColor: 'var(--hover-color)'
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#888',
                        borderRadius: '10px',
                        transition: 'background-color 0.3s ease'
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                        backgroundColor: '#555'
                    },
                    '&::-webkit-scrollbar-corner': {
                        borderRadius: '10px'
                    },
                    color: 'var(--text-color)'
                }}
            >
                <Table sx={{ borderRadius: '12px', overflow: 'hidden', backgroundColor: 'var(--background-color)' }}>
                    <TableBody>
                        {[
                            { label: t('ID'), value: userscontract?.Id },
                            {
                                label: t('COMMON.CONTRACT.INFORMATION'),
                                value: `${matchedEmployee?.EmployeeId || 'N/A'} ${matchedEmployee?.FullName || 'N/A'}`
                            },

                            {
                                label: t('COMMON.CONTRACT.INFORMATIONMANAGER'),
                                value: `${matchedManager?.EmployeeId || 'N/A'} ${matchedManager?.FullName || 'N/A'}`
                            },

                            { label: t('COMMON.CONTRACT.CONTRACTNAME'), value: userscontract?.ContractName || 'N/A' },
                            {
                                label: t('COMMON.CONTRACT.STARTDATE'),
                                value:
                                    userscontract?.StartDate && !isNaN(new Date(userscontract?.StartDate).getTime())
                                        ? new Date(userscontract?.StartDate).toLocaleDateString()
                                        : 'N/A'
                            },
                            {
                                label: t('COMMON.CONTRACT.ENDDATE'),
                                value:
                                    userscontract?.EndDate && !isNaN(new Date(userscontract?.EndDate).getTime())
                                        ? new Date(userscontract?.EndDate).toLocaleDateString()
                                        : 'N/A'
                            },
                            { label: t('COMMON.CONTRACT.CLAUSE'), value: userscontract?.Clause || 'N/A' },
                            { label: t('COMMON.CONTRACT.BASICSALARY'), value: userscontract?.BasicSalary || 'N/A' },
                            {
                                label: t('COMMON.CONTRACT.PROBATIONPERIOD'),
                                value: userscontract?.ProbationPeriod || 'N/A'
                            },
                            { label: t('COMMON.CONTRACT.WORKINGHOURS'), value: userscontract?.WorkingHours || 'N/A' },
                            { label: t('COMMON.CONTRACT.TYPECONTRACT'), value: userscontract?.TypeContract || 'N/A' },
                            {
                                label: t('COMMON.CONTRACT.TERMINATIONCLAUSE'),
                                value: userscontract?.TerminationClause || 'N/A'
                            },
                            { label: t('COMMON.CONTRACT.APPENDIX'), value: userscontract?.Appendix || 'N/A' }
                        ].map((item, index) => (
                            <TableRow
                                key={index}
                                sx={{
                                    color: 'var(--text-color)',
                                    backgroundColor: index % 2 === 0 ? 'var(--hover-color)' : 'var(--background-color)',
                                    transition: 'background-color 0.3s ease'
                                }}
                            >
                                <TableCell
                                    sx={{
                                        fontSize: '18px',
                                        fontWeight: '600',
                                        paddingLeft: '30px',
                                        paddingRight: '20px',
                                        width: '40%',
                                        color: 'var(--text-color)'
                                    }}
                                >
                                    {item.label}:
                                </TableCell>
                                <TableCell
                                    sx={{
                                        fontSize: '16px',
                                        paddingLeft: '20px',
                                        paddingRight: '30px',
                                        color: 'var(--text-color)'
                                    }}
                                >
                                    {item.value}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default Contract