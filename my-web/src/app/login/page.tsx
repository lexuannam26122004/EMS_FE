'use client'
import React, { useState } from 'react'
import { Box, TextField, Button } from '@mui/material'
import { useToast } from '@/hooks/useToast'
import { IAspNetUserGetAll } from '@/models/AspNetUser'
import { useGetAllUsersQuery } from '@/services/AspNetUserService'

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [loading, setLoading] = useState(false)
    const [userId, setUserId] = useState<string | null>(null)
    const toast = useToast()

    const { data: userResponse, isLoading: isLoading } = useGetAllUsersQuery()
    const employee = (userResponse?.Data?.Records as IAspNetUserGetAll[]) || []

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        setLoading(true)

        const loginData = {
            Email: email,
            Password: password
        }

        try {
            const response = await fetch('https://localhost:44381/api/Auth/Login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json-patch+json'
                },
                body: JSON.stringify(loginData)
            })

            const data = await response.json()

            if (response.ok) {
                localStorage.setItem('auth_token', data.Data.auth_token)

                setUserId(data.Data.id)
                const users = employee.find(ep => ep.Id === userId)
                toast(`Đăng nhập thành công! Chào mừng ${users?.FullName}`, 'success')
            } else {
                toast('Đăng nhập thất bại!', 'error')
            }
        } catch (err) {
            console.error(err)
            toast('Đã xảy ra lỗi. Vui lòng thử lại sau!', 'error')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}
        >
            <form
                onSubmit={handleSubmit}
                style={{
                    backgroundColor: '#fff',
                    padding: '40px',
                    borderRadius: '12px',
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
                    width: '100%',
                    maxWidth: '400px',
                    textAlign: 'center'
                }}
            >
                <TextField
                    label='Tên đăng nhập'
                    variant='outlined'
                    fullWidth
                    margin='normal'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <TextField
                    label='Mật khẩu'
                    type='password'
                    variant='outlined'
                    fullWidth
                    margin='normal'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <Button
                    type='submit'
                    variant='contained'
                    fullWidth
                    sx={{
                        padding: '15px',
                        backgroundColor: loading ? '#bbb' : '#1877f2',
                        color: 'white',
                        borderRadius: '8px',
                        fontSize: '18px'
                    }}
                    disabled={loading}
                >
                    {loading || isLoading ? 'Đang xử lý...' : 'Đăng nhập'}
                </Button>
                <a
                    href='#'
                    style={{
                        textDecoration: 'none',
                        color: '#1877f2',
                        marginTop: '10px',
                        display: 'block',
                        fontSize: '16px'
                    }}
                >
                    Quên mật khẩu?
                </a>
            </form>
        </Box>
    )
}

export default LoginForm
