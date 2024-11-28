'use client'

import './page.css'
import React, { useState } from 'react'
import { IAspNetUserGetAll } from '@/models/AspNetUser'
import { useGetAllUsersQuery } from '@/services/AspNetUserService'

const StripedTable: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('')

    const { data: userResponse, isLoading: loading } = useGetAllUsersQuery()

    const users = (userResponse?.Data?.Records as IAspNetUserGetAll[]) || []

    if (loading) {
        return <div>Loading...</div>
    }

    const filteredUsers = users.filter(
        user =>
            user.FullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.Email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.PhoneNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.DepartmentName?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className='card-body'>
            <div className='form-control bg-transparent border-0' style={{ width: '400px' }}>
                <input
                    type='text'
                    className='search-input'
                    placeholder='Search by name or email...'
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
            </div>

            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Department</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map(user => (
                        <tr key={user.Id}>
                            <td className='py-1'>
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
                            </td>
                            <td>{user.FullName || 'N/A'}</td>
                            <td>{user.Email}</td>
                            <td>{user.PhoneNumber || 'N/A'}</td>
                            <td>{user.DepartmentName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

// Component EmploymentContract
export default function Employee() {
    return (
        <div className='container'>
            <StripedTable />
        </div>
    )
}
