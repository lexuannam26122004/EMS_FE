// src/app/page.tsx
'use client'

import React, { useEffect, useState } from 'react'
import { getData, postData } from '@/services/TimekeepingService'

const Page = () => {
    const [data, setData] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getData()
                setData(result)
            } catch (error) {
                console.error('Error fetching data', error)
            }
        }

        fetchData()
    }, [])

    const handlePostData = async () => {
        try {
            const result = await postData({
                UserId: 'CC003',
                Date: '2024-10-13T00:00:00',
                CheckInTime: '13:00:00',
                CheckOutTime: '18:00:00',
                CheckInIP: '168.123.123'
            })
            console.log('Data posted successfully', result)
        } catch (error) {
            console.error('Error posting data', error)
        }
    }

    return (
        <div>
            <h1>Data from Backend</h1>
            {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
            <button onClick={handlePostData}>Post Data</button>
        </div>
    )
}

export default Page
