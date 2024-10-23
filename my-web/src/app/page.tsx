'use client'
import { Box } from '@mui/material'
import { useGetAllUsersQuery } from '@/services/AspNetUserService'
import { IAspNetUserGetAll } from '@/models/AspNetUser'

const Home = () => {
    const { data: response, isLoading } = useGetAllUsersQuery()

    const userData = response?.Data.Records as IAspNetUserGetAll[]

    return (
        <Box>
            <h1>Welcome to the Home Page</h1>
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
