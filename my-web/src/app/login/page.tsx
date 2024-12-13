'use client'
import React, { useState } from 'react'
import { Box, TextField, Button, CircularProgress } from '@mui/material'
import { useToast } from '@/hooks/useToast'
import { IAspNetUserGetAll } from '@/models/AspNetUser'
import { useGetAllUsersQuery } from '@/services/AspNetUserService'
import Image from 'next/image'

const Navbar: React.FC = () => {
    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                backgroundColor: 'white',
                padding: '20px 40px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                zIndex: 1000,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    fontWeight: 'bold',
                    fontSize: '24px'
                }}
            >
                <Image
                    src='/images/logo.png'
                    alt='Logo'
                    width={100} 
                    height={100} 
                    style={{
                        marginRight: '10px', 
                        objectFit: 'contain' 
                    }}
                />
                <span>NPM SYSTEM</span>
            </div>

            <ul
                style={{
                    listStyle: 'none',
                    display: 'flex',
                    gap: '30px'
                }}
            >
                <li>
                    <a
                        href='#'
                        style={{
                            textDecoration: 'none',
                            color: '#333',
                            fontSize: '16px',
                            fontWeight: '500',
                            padding: '10px 20px',
                            borderRadius: '8px'
                        }}
                    >
                        Product
                    </a>
                </li>
                <li>
                    <a
                        href='#'
                        style={{
                            textDecoration: 'none',
                            color: '#333',
                            fontSize: '16px',
                            fontWeight: '500',
                            padding: '10px 20px',
                            borderRadius: '8px'
                        }}
                    >
                        Solutions
                    </a>
                </li>
                <li>
                    <a
                        href='#'
                        style={{
                            textDecoration: 'none',
                            color: '#333',
                            fontSize: '16px',
                            fontWeight: '500',
                            padding: '10px 20px',
                            borderRadius: '8px'
                        }}
                    >
                        Pricing
                    </a>
                </li>
                <li>
                    <a
                        href='#'
                        style={{
                            textDecoration: 'none',
                            color: '#333',
                            fontSize: '16px',
                            fontWeight: '500',
                            padding: '10px 20px',
                            borderRadius: '8px'
                        }}
                    >
                        Resources
                    </a>
                </li>
            </ul>
            <div
                style={{
                    display: 'flex',
                    gap: '20px',
                    paddingRight: '40px'
                }}
            >
                <button
                    style={{
                        padding: '10px 20px',
                        fontSize: '16px',
                        fontWeight: '500',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        backgroundColor: '#1877f2',
                        color: 'white'
                    }}
                >
                    Log In
                </button>
            </div>
        </div>
    )
}

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [loading, setLoading] = useState(false)
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
                const users = employee.find(ep => ep.Id === data.Data.id)
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

    if (isLoading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '500px',
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
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '80px'
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
                    sx={{
                        color: 'var(--text-color)',
                        '& fieldset': {
                            borderRadius: '8px',
                            color: 'var(--text-color)',
                            borderColor: 'var(--border-color)'
                        },
                        '& .MuiInputBase-root': { paddingRight: '0px' },
                        '& .MuiInputBase-input': {
                            color: 'var(--text-color)',
                            fontSize: '16px'
                        },
                        '& .MuiOutlinedInput-root:hover fieldset': {
                            borderColor: 'var(--hover-color)'
                        },
                        '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                            borderColor: 'var(--selected-color)'
                        },
                        '& .MuiInputLabel-root': {
                            color: 'var(--text-label-color)'
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: 'var(--selected-color)'
                        }
                    }}
                    variant='outlined'
                    fullWidth
                    margin='normal'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <TextField
                    label='Mật khẩu'
                    sx={{
                        color: 'var(--text-color)',
                        '& fieldset': {
                            borderRadius: '8px',
                            color: 'var(--text-color)',
                            borderColor: 'var(--border-color)'
                        },
                        '& .MuiInputBase-root': { paddingRight: '0px' },
                        '& .MuiInputBase-input': {
                            color: 'var(--text-color)',
                            fontSize: '16px'
                        },
                        '& .MuiOutlinedInput-root:hover fieldset': {
                            borderColor: 'var(--hover-color)'
                        },
                        '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                            borderColor: 'var(--selected-color)'
                        },
                        '& .MuiInputLabel-root': {
                            color: 'var(--text-label-color)'
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: 'var(--selected-color)'
                        }
                    }}
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

const Page: React.FC = () => {
    return (
        <div>
            <Navbar />
            <header>
                <section
                    className='content'
                    style={{ display: 'flex', justifyContent: 'space-between', marginTop: '100px', padding: '0 20px' }}
                >
                    <div
                        className='image-container'
                        style={{
                            position: 'relative',
                            width: '60%',
                            height: '600px',
                            borderRadius: '10px',
                            overflow: 'hidden'
                        }}
                    >
                        <Image
                            src='/images/download.jpg'
                            alt='Teamwork Image'
                            layout='fill'
                            objectFit='cover'
                            style={{
                                borderRadius: '10px',
                                animation: 'slideFromLeft 1.5s ease-out',
                                objectFit: 'cover'
                            }}
                        />
                    </div>
                    <div
                        className='text-container'
                        style={{ textAlign: 'left', paddingRight: '40px', height: '600px' }}
                    >
                        <div className='intro' style={{ marginBottom: '40px' }}>
                            <h2 style={{ fontSize: '28px', color: '#1877f2' }}>Giới thiệu về hệ thống</h2>
                            <p style={{ fontSize: '16px', color: '#666' }}>
                                Ứng dụng giúp bạn quản lý các thông tin nhân viên, theo dõi công việc, và tối ưu hóa quy
                                trình làm việc.
                            </p>
                            <LoginForm />
                        </div>
                    </div>
                </section>
            </header>
        </div>
    )
}

export default Page
