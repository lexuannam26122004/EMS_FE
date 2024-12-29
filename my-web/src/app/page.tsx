'use client'
import { Button } from '@mui/material'
import { ArrowRight } from 'lucide-react'
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
                backgroundColor: 'white',
                padding: '20px 40px',
                zIndex: 1000,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderRadius: '100px',
                background: 'white',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
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
                    >
                        Lợi ích
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
        <div className='min-h-screen'>
            <Navbar />
            <section className='relative h-[90vh] flex items-center'>
                <div className='container mx-auto px-4'>
                    <div className='max-w-3xl'>
                        <h1 className='text-5xl md:text-7xl font-bold mb-6 whitespace-nowrap'>
                            Xây Dựng Tương Lai
                            <span className='text-blue-600'> Số</span>
                        </h1>
                        <p className='text-xl text-gray-600 mb-8'>
                            Chúng tôi cung cấp giải pháp công nghệ toàn diện giúp doanh nghiệp của bạn phát triển trong
                            kỷ nguyên số.
                        </p>
                        <Button
                            variant='contained'
                            size='large'
                            endIcon={<ArrowRight />}
                            sx={{ borderRadius: '24px', textTransform: 'none' }}
                        >
                            Khám phá ngay
                        </Button>
                    </div>
                </div>

                <div className='absolute right-0 top-0 w-1/2 h-full opacity-10 bg-gradient-to-l from-blue-500' />
            </section>

            <section className='py-20 bg-gray-50'>
                <div className='container mx-auto px-4'>
                    <h2 className='text-3xl font-bold text-center mb-12'>Dịch Vụ Của Chúng Tôi</h2>

                    <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className='bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow'
                            >
                                <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4'>
                                    {feature.icon}
                                </div>
                                <h3 className='text-xl font-semibold mb-3'>{feature.title}</h3>
                                <p className='text-gray-600'>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className='py-20 bg-blue-600 text-white'>
                <div className='container mx-auto px-4'>
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-8 text-center'>
                        {stats.map((stat, index) => (
                            <div key={index}>
                                <div className='text-4xl font-bold mb-2'>{stat.value}</div>
                                <div className='text-blue-100'>{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

const features = [
    {
        icon: <span className='text-blue-600 text-2xl'>💡</span>,
        title: 'Giải Pháp Sáng Tạo',
        description: 'Đột phá với những ý tưởng sáng tạo và công nghệ tiên tiến.'
    },
    {
        icon: <span className='text-blue-600 text-2xl'>🚀</span>,
        title: 'Phát Triển Nhanh',
        description: 'Tối ưu quy trình, đẩy nhanh tiến độ phát triển sản phẩm.'
    },
    {
        icon: <span className='text-blue-600 text-2xl'>🛡️</span>,
        title: 'An Toàn & Bảo Mật',
        description: 'Đảm bảo an toàn dữ liệu với các giải pháp bảo mật hàng đầu.'
    }
]

const stats = [
    { value: '500+', label: 'Khách Hàng' },
    { value: '1000+', label: 'Dự Án' },
    { value: '50+', label: 'Chuyên Gia' },
    { value: '99%', label: 'Hài Lòng' }
]
