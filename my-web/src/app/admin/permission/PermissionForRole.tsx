import { IAspNetRoleGetAll } from '@/models/AspNetRole'
import { useState, useMemo, useCallback } from 'react'
import { Columns } from './ColumnRoleList'
import { CircleEditOutline } from 'mdi-material-ui'

import { useGetAllRolesQuery } from '@/services/AspNetRoleService'
import { Button, Paper, Skeleton, Table, TableCell, TableBody } from '@mui/material'
import { TableSortLabel, Typography, TableContainer, TableHead, TableRow } from '@mui/material'
import sortTable, { getComparator } from '@/common/sortTable'
import { useTranslation } from 'react-i18next'
import PermissionForRoleModal from './PermissionForRoleModal'

export default function PermissionForRole() {
    const { t } = useTranslation('common')
    const [order, setOrder] = useState<'asc' | 'desc'>('asc')
    const [orderBy, setOrderBy] = useState<string>('')
    const [roleSelected, setRoleSelected] = useState<IAspNetRoleGetAll | null>(null)

    const { data: roleResponse, isLoading } = useGetAllRolesQuery()

    const roleData = (roleResponse?.Data?.Records as IAspNetRoleGetAll[]) || []

    const comparator = useMemo(() => getComparator(order, orderBy), [order, orderBy])
    const sortedRecords = useMemo(() => sortTable(roleData, comparator), [roleData, comparator])

    const handleSort = (property: string) => {
        setOrder(order === 'asc' ? 'desc' : 'asc')
        setOrderBy(property)
    }

    const handleOpenModal = useCallback(
        (data: IAspNetRoleGetAll | null) => {
            setRoleSelected(data)
        },
        [roleSelected]
    )

    return (
        <Paper
            elevation={0}
            sx={{
                width: '100%',
                overflow: 'hidden',
                borderTop: '1px solid var(--border-color)',
                borderLeft: '1px solid var(--border-color)',
                borderRight: '1px solid var(--border-color)',
                backgroundColor: 'var(--background-color)'
            }}
        >
            <TableContainer
                sx={{
                    maxHeight: '80vh',
                    overflow: 'auto',
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
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {Columns.map((column, idx) => {
                                return (
                                    <TableCell
                                        key={idx}
                                        align={column.align}
                                        sx={{
                                            minWidth: column.minWidth,
                                            maxWidth: column.maxWidth,
                                            width: column.width,
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            padding: '14px',
                                            textOverflow: 'ellipsis',
                                            backgroundColor: 'var(--background-color)',
                                            color: 'var(--text-color)',
                                            borderBottom: '1px solid var(--border-color)'
                                        }}
                                    >
                                        {column.sortable ? (
                                            <TableSortLabel
                                                active={column.id === orderBy}
                                                direction={orderBy === column.id ? order : 'asc'}
                                                onClick={() => handleSort(column.id)}
                                                sx={{
                                                    '& .MuiTableSortLabel-icon': {
                                                        color: 'var(--text-color) !important'
                                                    }
                                                }}
                                            >
                                                <Typography sx={{ color: 'var(--text-color)' }}>
                                                    {t(column.label)}
                                                </Typography>
                                            </TableSortLabel>
                                        ) : (
                                            <Typography sx={{ color: 'var(--text-color)' }}>
                                                {t(column.label)}
                                            </Typography>
                                        )}
                                    </TableCell>
                                )
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {isLoading
                            ? Array.from({ length: 8 }).map((_, index) => (
                                  <TableRow key={index}>
                                      {Columns.map((column, idx) => {
                                          return (
                                              <TableCell
                                                  key={idx}
                                                  align={column.align}
                                                  sx={{
                                                      minWidth: column.minWidth,
                                                      maxWidth: column.maxWidth,
                                                      width: column.width,
                                                      backgroundColor: 'var(--background-color)',
                                                      color: 'var(--text-color)',
                                                      borderBottom: '1px solid var(--border-color)'
                                                  }}
                                              >
                                                  <Skeleton
                                                      variant='text'
                                                      width='80%'
                                                      height={35}
                                                      sx={{
                                                          bgcolor: 'var(--skeleton-color)',
                                                          display: 'inline-block'
                                                      }}
                                                  />
                                              </TableCell>
                                          )
                                      })}
                                  </TableRow>
                              ))
                            : sortedRecords.map(row => {
                                  return (
                                      <TableRow
                                          role='checkbox'
                                          tabIndex={-1}
                                          key={row.Id}
                                          sx={{
                                              '&:hover': {
                                                  backgroundColor: 'var(--hover-color-table) !important' // Thêm !important để override style mặc định
                                              }
                                          }}
                                      >
                                          <TableCell
                                              align='center'
                                              sx={{
                                                  width: '5%',
                                                  minWidth: 50,
                                                  padding: '14px',
                                                  maxWidth: '200px',
                                                  borderBottom: '1px solid var(--border-color)'
                                              }}
                                          >
                                              <Typography
                                                  sx={{
                                                      overflow: 'hidden',
                                                      textOverflow: 'ellipsis',
                                                      whiteSpace: 'nowrap',
                                                      color: 'var(--text-color)'
                                                  }}
                                              >
                                                  {row.Id}
                                              </Typography>
                                          </TableCell>
                                          <TableCell
                                              sx={{
                                                  maxWidth: '200px',
                                                  width: '30%',
                                                  padding: '14px',
                                                  whiteSpace: 'nowrap',
                                                  overflow: 'hidden',
                                                  textOverflow: 'ellipsis',
                                                  borderBottom: '1px solid var(--border-color)'
                                              }}
                                          >
                                              <Typography
                                                  sx={{
                                                      overflow: 'hidden',
                                                      textOverflow: 'ellipsis',
                                                      whiteSpace: 'nowrap',
                                                      color: 'var(--text-color)'
                                                  }}
                                              >
                                                  {row.Name}
                                              </Typography>
                                          </TableCell>
                                          <TableCell
                                              align='center'
                                              sx={{
                                                  width: '5%',
                                                  padding: 0,
                                                  borderBottom: '1px solid var(--border-color)'
                                              }}
                                          >
                                              <Button
                                                  onClick={() => {
                                                      handleOpenModal(row)
                                                  }}
                                                  sx={{
                                                      '&:hover': {
                                                          backgroundColor: 'var(--hover-color)'
                                                      }
                                                  }}
                                              >
                                                  <CircleEditOutline style={{ color: 'green' }} />
                                              </Button>
                                          </TableCell>
                                      </TableRow>
                                  )
                              })}
                    </TableBody>
                </Table>
            </TableContainer>

            {roleSelected && (
                <PermissionForRoleModal
                    data={roleSelected}
                    open={!!roleSelected}
                    onClose={() => setRoleSelected(null)}
                />
            )}
        </Paper>
    )
}
