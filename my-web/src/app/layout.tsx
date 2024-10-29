'use client'
import localFont from 'next/font/local'
import './globals.css'
import Layout from '@/components/Layout'
import { Provider } from 'react-redux'
import store from '@/redux/store'
import ToastContainer from '@/components/ToastContainer'

const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900'
})
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900'
})

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang='en'>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <Provider store={store}>
                    <Layout>
                        <main>{children}</main>
                    </Layout>
                    <ToastContainer />
                </Provider>
            </body>
        </html>
    )
}
