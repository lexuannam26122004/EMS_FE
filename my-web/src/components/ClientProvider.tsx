'use client'

import { usePathname } from 'next/navigation'
import { Provider } from 'react-redux'
import store from '@/redux/store'
import LayoutAdmin from '@/components/Layout'
import ToastContainer from '@/components/ToastContainer'
import { ThemeProvider } from '@/components/theme-provider'

export default function ClientProviders({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const isAdmin = pathname.startsWith('/admin')
    return (
        <Provider store={store}>
            <ThemeProvider enableSystem attribute='class' defaultTheme='system' disableTransitionOnChange>
                {isAdmin ? (
                    <LayoutAdmin>
                        <main>{children}</main>
                    </LayoutAdmin>
                ) : (
                    <main>{children}</main>
                )}
                <ToastContainer />
            </ThemeProvider>
        </Provider>
    )
}
