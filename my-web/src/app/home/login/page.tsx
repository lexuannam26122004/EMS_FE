'use client'
import React, { useState, useEffect } from 'react'
import { Box, TextField, Button } from '@mui/material'
import { useToast } from '@/hooks/useToast'

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSuccess, setIsSuccess] = useState<boolean | null>(null)
    const [isError, setIsError] = useState<boolean | null>(null)
    const [loading, setLoading] = useState(false)
    const toast = useToast()
    useEffect(() => {
        if (isSuccess === true) {
            toast('Đăng nhập thành công!', 'success')
        }
        if (isError === true) {
            toast('Đăng nhập thất bại!', 'error')
        }
    }, [isSuccess, isError]) 

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        setLoading(true)
        setIsSuccess(null)
        setIsError(null)

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
                setIsSuccess(true) 
            } else {
                setIsError(true) 
            }
        } catch (err) {
            console.error(err)
            setIsError(true) 
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
                    {loading ? 'Đang xử lý...' : 'Đăng nhập'}
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
