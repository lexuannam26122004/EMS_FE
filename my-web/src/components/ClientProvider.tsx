'use client'
import { Provider } from 'react-redux'
import store from '@/redux/store'
import Layout from '@/components/Layout'
import ToastContainer from '@/components/ToastContainer'

export default function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <Layout>
                <main>{children}</main>
            </Layout>
            <ToastContainer />
        </Provider>
    )
}
