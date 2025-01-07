'use client'

import { useEffect, useState } from 'react'

const GetPublicIP = () => {
    const [ipAddress, setIpAddress] = useState<string>('')

    useEffect(() => {
        const fetchPublicIP = async () => {
            try {
                const response = await fetch('https://api.ipify.org?format=json')
                const data = await response.json()
                setIpAddress(data.ip)
            } catch (error) {
                console.error('Error fetching public IP:', error)
            }
        }

        fetchPublicIP()
    }, [])

    return (
        <div>
            <h1>Your Public IP Address</h1>
            <p>{ipAddress || 'Fetching...'}</p>
        </div>
    )
}

export default GetPublicIP
