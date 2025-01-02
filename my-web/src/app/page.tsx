'use client'
import { Box } from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'

const Navbar: React.FC = () => {
    const [isVisible, setIsVisible] = useState(true)
    const [prevScrollPos, setPrevScrollPos] = useState(0)
    const router = useRouter()
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset
            if (currentScrollPos > prevScrollPos) {
                setIsVisible(false)
            } else {
                setIsVisible(true)
            }
            setPrevScrollPos(currentScrollPos)
        }
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [prevScrollPos])

    return (
        <div
            style={{
                position: 'fixed',
                top: isVisible ? '30px' : '-100px',
                left: 700,
                width: '50%',
                height: '80px',
                backgroundColor: 'white',
                padding: '20px 40px',
                zIndex: 1000,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderRadius: '100px',
                background: 'white',
                boxShadow: '0 0 15px 5px rgba(3, 215, 148, 0.3)',
                transition: 'top 0.3s ease-in-out'
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
                <img
                    src='/images/logo.png'
                    alt='Logo'
                    style={{
                        width: 100,
                        marginRight: '10px',
                        objectFit: 'contain'
                    }}
                />
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
                        style={{
                            textDecoration: 'none',
                            color: '#333',
                            fontSize: '16px',
                            fontWeight: '500',
                            borderRadius: '8px',
                            cursor: 'pointer'
                        }}
                        onClick={() => {
                            window.scrollTo({
                                top: 0,
                                behavior: 'smooth'
                            })
                        }}
                    >
                        Trang chủ
                    </a>
                </li>
                <li>
                    <a
                        style={{
                            textDecoration: 'none',
                            color: '#333',
                            fontSize: '16px',
                            fontWeight: '500',
                            borderRadius: '8px',
                            cursor: 'pointer'
                        }}
                        onClick={() => {
                            window.scrollTo({
                                top: 850,
                                behavior: 'smooth'
                            })
                        }}
                    >
                        Giới thiệu
                    </a>
                </li>

                <li>
                    <a
                        style={{
                            textDecoration: 'none',
                            color: '#333',
                            fontSize: '16px',
                            fontWeight: '500',
                            borderRadius: '8px',
                            cursor: 'pointer'
                        }}
                        onClick={() => {
                            window.scrollTo({
                                top: 1750,
                                behavior: 'smooth'
                            })
                        }}
                    >
                        Lợi ích
                    </a>
                </li>

                <li>
                    <a
                        style={{
                            textDecoration: 'none',
                            color: '#333',
                            fontSize: '16px',
                            fontWeight: '500',
                            borderRadius: '8px',
                            cursor: 'pointer'
                        }}
                        onClick={() => {
                            window.scrollTo({
                                top: 3000,
                                behavior: 'smooth'
                            })
                        }}
                    >
                        Liên hệ
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
                        backgroundColor: '#00b049',
                        color: 'white'
                    }}
                    onClick={() => router.push('/login')}
                >
                    Log In
                </button>
            </div>
        </div>
    )
}

export default function Home() {
    return (
        <Box
            sx={{
                backgroundImage: 'url(/images/Homepage.svg)',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                width: '100%',
                height: '505vh'
            }}
        >
            <Navbar />
        </Box>
    )
}
