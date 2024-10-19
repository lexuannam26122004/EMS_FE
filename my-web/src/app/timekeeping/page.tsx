'use client'

import React, { useEffect, useCallback, useMemo, useState, CSSProperties } from 'react'
import { getData, postData } from '@/services/TimekeepingService'
import Layout from '@/components/Layout'
import { Box, Paper, Typography } from '@mui/material'
import { TextField, InputAdornment, Button } from '@mui/material'
import { Table, TableBody, TableCell, TableHead, TableRow, TableContainer } from '@mui/material'
import { ITimekeepingGetById, IFilterTimekeeping } from '@/models/Timekeeping'
import { IAspNetUserGetAll } from '@/models/AspNetUser'
import { IAspNetRoleGetAll } from '@/models/AspNetRole'
import { IDepartmentGetAll } from '@/models/Department'
import { getDataUser } from '@/services/AspNetUserService'
import { getDataRole } from '@/services/AspNetRoleService'
import { getDataDepartment } from '@/services/DepartmentService'
import SearchIcon from '@mui/icons-material/Search'
import debounce from 'lodash.debounce'

interface TimekeepingPageProps {
    filterModel?: IFilterTimekeeping
}

const TimekeepingPage: React.FC<TimekeepingPageProps> = ({
    filterModel = { Month: new Date().getMonth() + 1, Year: new Date().getFullYear() }
}) => {
    const [data, setData] = useState<ITimekeepingGetById[]>([])
    const [users, setUsers] = useState<IAspNetUserGetAll[]>([])
    const [roles, setRoles] = useState<IAspNetRoleGetAll[]>([])
    const [filters, setFilters] = useState({
        roles: [] as string[],
        departments: [] as string[]
    })
    const [departments, setDepartments] = useState<IDepartmentGetAll[]>([])

    const handleCheckboxChange = useCallback(
        debounce((name: string, type: 'roles' | 'departments') => {
            setFilters(prevFilters => ({
                ...prevFilters,
                [type]: prevFilters[type].includes(name)
                    ? prevFilters[type].filter(item => item !== name)
                    : [...prevFilters[type], name]
            }))
        }, 100),
        []
    )

    const fetchData = useCallback(async () => {
        try {
            const [roleData, userData, timekeepingData, departmentData]: [
                IAspNetRoleGetAll[],
                IAspNetUserGetAll[],
                ITimekeepingGetById[],
                IDepartmentGetAll[]
            ] = await Promise.all([getDataRole(), getDataUser(), getData(), getDataDepartment()])
            setRoles(roleData)
            setUsers(userData)
            setData(timekeepingData)
            setDepartments(departmentData)
            setFilters({
                roles: roleData.map(role => role.Name),
                departments: departmentData.map(department => department.Name)
            })
        } catch (error) {
            console.error('Error fetching data', error)
        }
    }, [])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    const daysInMonth = useMemo(
        () => Array.from({ length: new Date(filterModel.Year, filterModel.Month, 0).getDate() }, (_, i) => i + 1),
        [filterModel.Year, filterModel.Month]
    )

    const renderTableCell = useCallback(
        (day: number, user: IAspNetUserGetAll) => {
            const date = new Date(filterModel.Year, filterModel.Month - 1, day)
            const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' })
            const isSunday = dayOfWeek === 'Sun'

            const timekeepingData = data.find(
                timekeeping => new Date(timekeeping.Date).getDate() === day && timekeeping.UserId === user.Id
            )

            const cellStyles: CSSProperties = {
                textAlign: 'center',
                padding: '0 5px',
                borderRight: '1px solid #e0e0e0',
                backgroundColor: !isSunday
                    ? typeof timekeepingData !== 'undefined'
                        ? timekeepingData.CheckInTime.slice(0, 5) > checkIn
                            ? '#ffe5e5'
                            : '#e4ffe4'
                        : '#fff1e2'
                    : '#f3f0f0'
            }

            return (
                <TableCell key={day} style={cellStyles}>
                    {timekeepingData ? (
                        <span
                            style={{
                                fontSize: '10px',
                                color: timekeepingData.CheckInTime.slice(0, 5) > checkIn ? 'red' : '#00a900'
                            }}
                        >
                            {timekeepingData.CheckInTime.slice(0, 5)}
                            <div style={{ margin: '-8px 0' }}>---</div>
                            {timekeepingData.CheckOutTime.slice(0, 5)}
                        </span>
                    ) : (
                        ''
                    )}
                </TableCell>
            )
        },
        [data, filterModel.Year, filterModel.Month]
    )

    const memoizedUsers = useMemo(
        () =>
            users.filter(
                user =>
                    filters.roles.includes(user.Roles?.at(0) ?? '') && filters.departments.includes(user.DepartmentName)
            ),
        [users, filters]
    )

    const UserRow = React.memo(
        ({
            user,
            daysInMonth,
            renderTableCell
        }: {
            user: IAspNetUserGetAll
            daysInMonth: number[]
            renderTableCell: any
        }) => (
            <TableRow key={user.Id}>
                <TableCell
                    style={{
                        position: 'sticky',
                        left: 0,
                        backgroundColor: 'white',
                        minWidth: '14vw',
                        textAlign: 'left',
                        padding: '4px 10px',
                        borderRight: '1px solid #e0e0e0'
                    }}
                >
                    <img
                        src={
                            user.AvatarPath ||
                            'https://localhost:44381/avatars/aa1678f0-75b0-48d2-ae98-50871178e9bd.jfif'
                        }
                        alt='Avatar'
                        style={{
                            width: '35px',
                            height: '35px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            float: 'left',
                            marginRight: '11px'
                        }}
                    />
                    <div style={{ overflow: 'hidden', flexGrow: 1 }}>
                        <p
                            style={{
                                fontWeight: 'bold',
                                margin: 0,
                                marginTop: '1px',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }}
                        >
                            {user.FullName}
                        </p>
                        <p
                            style={{
                                fontWeight: '500',
                                color: '#1879b3',
                                fontSize: '10px',
                                margin: 0,
                                marginTop: '-2px',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }}
                        >
                            {user.Roles?.at(0)} - {user.DepartmentName}
                        </p>
                    </div>
                </TableCell>
                {daysInMonth.map(day => renderTableCell(day, user))}
            </TableRow>
        )
    )

    const checkIn = '08:00'
    const employee = 178
    const workingDays = 4124
    const absences = 603
    const lates = 1711
    const latesPercent = '41.5%'
    const absencesPercent = '14.6%'

    return (
        <Layout>
            <Box display='flex' mt={2}>
                {/* Phần hiển thị bảng */}
                <Box flex={4} mr={0.7} style={{ overflowX: 'auto', overflowY: 'auto' }}>
                    <Paper elevation={3} style={{ padding: '0px', height: 'calc(100vh - 80px)', position: 'relative' }}>
                        <TableContainer
                            style={{
                                borderLeft: '1px solid #e0e0e0',
                                borderTop: '1px solid #e0e0e0',
                                maxHeight: '100%'
                            }}
                        >
                            <Table>
                                <TableHead>
                                    <TableRow style={{ position: 'sticky', top: 0, zIndex: 3 }}>
                                        <TableCell
                                            style={{
                                                position: 'sticky',
                                                left: 0,
                                                backgroundColor: 'white',
                                                zIndex: 5,
                                                minWidth: '3vw',
                                                whiteSpace: 'nowrap',
                                                padding: '4px 10px',
                                                borderRight: '1px solid #e0e0e0'
                                            }}
                                        ></TableCell>

                                        {daysInMonth.map(day => {
                                            const date = new Date(filterModel.Year, filterModel.Month - 1, day)
                                            const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' })

                                            const isSunday = dayOfWeek === 'Sun'
                                            const isSundayOrSaturday = isSunday || dayOfWeek === 'Sat'

                                            return (
                                                <TableCell
                                                    key={day}
                                                    style={{
                                                        textAlign: 'center',
                                                        fontSize: '10px',
                                                        position: 'sticky',
                                                        backgroundColor: 'white',
                                                        top: 0,
                                                        color: 'gray',
                                                        zIndex: 2,
                                                        padding: '0 10px',
                                                        borderRight: '1px solid #e0e0e0'
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            fontWeight: 'bold',
                                                            color: isSundayOrSaturday ? '#ff3939' : 'gray',
                                                            fontSize: '10px'
                                                        }}
                                                    >
                                                        {dayOfWeek.toUpperCase()}
                                                    </span>
                                                    <div style={{ margin: '-10px 0' }} />
                                                    {day.toString().padStart(2, '0') + '/' + filterModel.Month}
                                                </TableCell>
                                            )
                                        })}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {memoizedUsers.map(user => {
                                        return (
                                            <UserRow
                                                key={user.Id}
                                                user={user}
                                                daysInMonth={daysInMonth}
                                                renderTableCell={renderTableCell}
                                            />
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Box>

                <Box flex={1}>
                    <Paper elevation={1} style={{ padding: '9px 5px 10px 5px', minHeight: '16vh', display: 'flex' }}>
                        <Box
                            flex={1}
                            display='flex'
                            flexDirection='column'
                            justifyContent='space-between'
                            borderRight='1px solid #e0e0e0'
                        >
                            <Box textAlign='center'>
                                <Typography variant='subtitle1' style={{ fontSize: '16px', color: '#1dcafa' }}>
                                    {employee}
                                </Typography>
                                <Typography variant='body2' style={{ fontSize: '10px' }}>
                                    Employees
                                </Typography>
                            </Box>
                            <Box textAlign='center'>
                                <Typography variant='subtitle1' style={{ fontSize: '16px', color: 'rgb(46, 233, 46)' }}>
                                    {workingDays}
                                </Typography>
                                <Typography variant='body2' style={{ fontSize: '10px' }}>
                                    Working Days
                                </Typography>
                            </Box>
                        </Box>
                        <Box
                            flex={1}
                            display='flex'
                            flexDirection='column'
                            justifyContent='space-between'
                            borderRight='1px solid #e0e0e0'
                        >
                            <Box textAlign='center'>
                                <Typography variant='subtitle1' style={{ fontSize: '16px', color: '#ff3939' }}>
                                    {lates}
                                </Typography>
                                <Typography variant='body2' style={{ fontSize: '10px' }}>
                                    Lates
                                </Typography>
                            </Box>
                            <Box textAlign='center'>
                                <Typography variant='subtitle1' style={{ fontSize: '16px', color: '#ff3939' }}>
                                    {latesPercent}
                                </Typography>
                                <Typography variant='body2' style={{ fontSize: '10px' }}>
                                    Lates
                                </Typography>
                            </Box>
                        </Box>
                        <Box flex={1} display='flex' flexDirection='column' justifyContent='space-between'>
                            <Box textAlign='center'>
                                <Typography variant='subtitle1' style={{ fontSize: '16px', color: 'rgb(252 129 30)' }}>
                                    {absences}
                                </Typography>
                                <Typography variant='body2' style={{ fontSize: '10px' }}>
                                    Absences
                                </Typography>
                            </Box>
                            <Box textAlign='center'>
                                <Typography variant='subtitle1' style={{ fontSize: '16px', color: 'rgb(252 129 30)' }}>
                                    {absencesPercent}
                                </Typography>
                                <Typography variant='body2' style={{ fontSize: '10px' }}>
                                    Absences
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>
                    <Paper elevation={1} style={{ marginTop: '10px', padding: '10px' }}>
                        <Typography variant='h6' style={{ fontSize: '11px', color: 'gray' }}>
                            Filter by Roles
                        </Typography>
                        <div style={{ marginTop: '10px' }}>
                            {roles.map(role => (
                                <div key={role.Id}>
                                    <label
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            fontSize: '15px',
                                            color: '#146ca1',
                                            marginTop: '2px',
                                            fontWeight: '600'
                                        }}
                                    >
                                        <input
                                            type='checkbox'
                                            checked={filters.roles.includes(role.Name)}
                                            onChange={() => handleCheckboxChange(role.Name, 'roles')}
                                            style={{
                                                width: '15px',
                                                height: '15px',
                                                marginRight: '8px',
                                                transform: 'scale(0.8)'
                                            }}
                                        />
                                        {role.Name}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </Paper>

                    <Paper elevation={1} style={{ marginTop: '10px', padding: '10px' }}>
                        <Typography variant='h6' style={{ fontSize: '11px', color: 'gray' }}>
                            Filter by Departments
                        </Typography>
                        <div style={{ marginTop: '10px' }}>
                            {departments.map(department => (
                                <div key={department.Id}>
                                    <label
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            fontSize: '15px',
                                            color: '#146ca1',
                                            marginTop: '2px',
                                            fontWeight: '600'
                                        }}
                                    >
                                        <input
                                            type='checkbox'
                                            checked={filters.departments.includes(department.Name)}
                                            onChange={() => handleCheckboxChange(department.Name, 'departments')}
                                            style={{
                                                width: '15px',
                                                height: '15px',
                                                marginRight: '8px',
                                                transform: 'scale(0.8)'
                                            }}
                                        />
                                        {department.Name}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </Paper>
                </Box>
            </Box>
        </Layout>
    )
}

export default TimekeepingPage
