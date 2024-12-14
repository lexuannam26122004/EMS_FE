'use client'
import React, { useState, useEffect } from 'react'
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
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '50px'
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

const ImageLayout: React.FC = () => {
    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                height: '100vh',
                background: 'linear-gradient(to right, #ffffff 50%, #00ddff 50%)'
            }}
        >
            <div className='image-container' style={{ paddingTop: '50px', paddingLeft: '50px' }}>
                <img
                    src='https://static.wixstatic.com/media/84770f_4753af9912144e469acb7dac3bdbba0e~mv2.png/v1/fill/w_583,h_395,al_c,lg_1,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/back2%20-%20top%20-%20UPDATE.png'
                    alt='Image 1'
                    style={{
                        width: '500px',
                        height: '300px',
                        objectFit: 'cover'
                    }}
                />
            </div>
            <div className='image-container' style={{ paddingTop: '350px', paddingLeft: '550px' }}>
                <img
                    src='https://static.wixstatic.com/media/c837a6_fbd50d9a9dac48068f4c34b5934d6404~mv2.png/v1/fill/w_583,h_395,al_c,lg_1,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/back1%20-%20buttom.png'
                    alt='Image 2'
                    style={{
                        width: '500px',
                        height: '300px',
                        objectFit: 'cover'
                    }}
                />
            </div>
            <div className='image-container' style={{ paddingTop: '200px', paddingLeft: '300px' }}>
                <img
                    src='https://static.wixstatic.com/media/c837a6_ee52c320bae548ea9f1f3730d7f6ff39~mv2.png/v1/crop/x_0,y_0,w_486,h_330/fill/w_583,h_395,al_c,lg_1,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Group%2028.png'
                    alt='Image 3'
                    style={{
                        width: '500px',
                        height: '300px',
                        objectFit: 'cover'
                    }}
                />
            </div>

            {/* Top-right content */}
            <div
                className='top-right-content'
                style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    padding: '15px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    zIndex: 2,
                    animation: ' slideFromRight 1.5s ease-out forwards'
                }}
            >
                <h3>Content Title</h3>
                <p>This is some content displayed in the top-right corner of the screen.</p>
                <p>This is some content displayed in the top-right corner of the screen.</p>
                <p>This is some content displayed in the top-right corner of the screen.</p>
                <p>This is some content displayed in the top-right corner of the screen.</p>
                <p>This is some content displayed in the top-right corner of the screen.</p>
                <p>This is some content displayed in the top-right corner of the screen.</p>
            </div>

            <style>{`
        .image-container {
          flex: 1;
          position: absolute;
          max-width: 100%;
          overflow: hidden;
          border-radius: 10px;
          opacity: 0;
          z-index: 1;
          animation: slideFromRight 1.5s ease-out forwards;
        }

        @keyframes slideFromRight {
          0% {
            transform: translateX(100%);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .image-container:nth-child(1) {
          animation-delay: 0s;
        }

        .image-container:nth-child(2) {
          animation-delay: 0.5s;
        }

        .image-container:nth-child(3) {
          animation-delay: 1s;
        }

        .image-container:hover {
          opacity: 0.8;
        }
      `}</style>
        </div>
    )
}

const Page: React.FC = () => {
    return (
        <div>
            <Navbar />
            <header>
                <section
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginTop: '100px',
                        padding: '0 20px',
                        width: '100%'
                    }}
                >
                    <div
                        style={{
                            position: 'relative',
                            flex: 1, // Đảm bảo div này chiếm 50% không gian
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
                        style={{
                            textAlign: 'left',
                            paddingRight: '40px',
                            height: '600px',
                            flex: 1 // Đảm bảo div này chiếm 50% không gian
                        }}
                    >
                        <div className='intro' style={{ marginBottom: '40px', paddingLeft: '60px' }}>
                            <h2 style={{ fontSize: '28px', color: '#1877f2' }}>Đăng nhập vào hệ thống</h2>
                            <p style={{ fontSize: '16px', color: '#666' }}>
                                Để truy cập và quản lý thông tin nhân viên, theo dõi công việc, và tối ưu hóa quy trình
                                làm việc, vui lòng đăng nhập vào hệ thống.
                            </p>
                            <LoginForm />
                        </div>
                    </div>
                </section>

                <section
                    className='content'
                    style={{ display: 'flex', justifyContent: 'space-between', marginTop: '100px', padding: '0 20px' }}
                >
                    <ImageLayout />
                </section>
            </header>

            <style jsx>{`
                @keyframes slideFromLeft {
                    0% {
                        transform: translate(-100%, 0);
                    }
                    100% {
                        transform: translate(0, 0);
                    }
                }
            `}</style>
        </div>
    )
}

export default Page
