'use client'
import { Box } from '@mui/material'
import { useGetAllUsersQuery } from '@/services/AspNetUserService'
import { IAspNetUserGetAll } from '@/models/AspNetUser'
import { useDispatch } from 'react-redux'
import { useToast } from '@/hooks/useToast'

const Home = () => {
    const { data: response, isLoading } = useGetAllUsersQuery()

    const userData = response?.Data.Records as IAspNetUserGetAll[]

    const toast = useToast()

    const showToast = () => {
        toast('Hello, I am a toast!', 'success')
    }

    return (
        <Box>
            <h1>Welcome to the Home Page</h1>
            <button onClick={showToast}>Please click me!</button>
            {!isLoading && (
                <ul>
                    {userData?.map((item, index) => (
                        <li key={index}>{item.UserName}</li>
                    ))}
                </ul>
            )}
        </Box>
    )
}

export default Home
