'use client'
import { Provider } from 'react-redux'
import store from '@/redux/store'
import Layout from '@/components/Layout'
import ToastContainer from '@/components/ToastContainer'
import { ThemeProvider } from '@/components/theme-provider'

export default function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <ThemeProvider enableSystem attribute='class' defaultTheme='system' disableTransitionOnChange>
                <Layout>
                    <main>{children}</main>
                </Layout>
                <ToastContainer />
            </ThemeProvider>
        </Provider>
    )
}
