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
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer
                sx={{
                    maxHeight: '80vh',
                    overflow: 'auto',
                    '&::-webkit-scrollbar': {
                        width: '8px',
                        height: '8px'
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#919292',
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
                                            textOverflow: 'ellipsis'
                                        }}
                                    >
                                        {column.sortable ? (
                                            <TableSortLabel
                                                active={column.id === orderBy}
                                                direction={orderBy === column.id ? order : 'asc'}
                                                onClick={() => handleSort(column.id)}
                                            >
                                                <Typography>{t(column.label)}</Typography>
                                            </TableSortLabel>
                                        ) : (
                                            <Typography>{t(column.label)}</Typography>
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
                                                      width: column.width
                                                  }}
                                              >
                                                  <Skeleton
                                                      variant='text'
                                                      width='80%'
                                                      height={35}
                                                      sx={{
                                                          bgcolor: '#f8f8fa',
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
                                      <TableRow hover role='checkbox' tabIndex={-1} key={row.Id}>
                                          <TableCell
                                              align='center'
                                              sx={{
                                                  width: '5%',
                                                  minWidth: 50,
                                                  maxWidth: '200px'
                                              }}
                                          >
                                              <Typography
                                                  sx={{
                                                      overflow: 'hidden',
                                                      textOverflow: 'ellipsis',
                                                      whiteSpace: 'nowrap'
                                                  }}
                                              >
                                                  {row.Id}
                                              </Typography>
                                          </TableCell>
                                          <TableCell
                                              sx={{
                                                  maxWidth: '200px',
                                                  width: '30%',
                                                  whiteSpace: 'nowrap',
                                                  overflow: 'hidden',
                                                  textOverflow: 'ellipsis'
                                              }}
                                          >
                                              <Typography
                                                  sx={{
                                                      overflow: 'hidden',
                                                      textOverflow: 'ellipsis',
                                                      whiteSpace: 'nowrap'
                                                  }}
                                              >
                                                  {row.Name}
                                              </Typography>
                                          </TableCell>
                                          <TableCell
                                              align='center'
                                              sx={{
                                                  width: '5%'
                                              }}
                                          >
                                              <Button
                                                  onClick={() => {
                                                      handleOpenModal(row)
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
