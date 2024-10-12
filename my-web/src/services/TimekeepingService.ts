import axios from './axios'

export const getData = async () => {
    try {
        const response = await axios.get('/Timekeeping/Search') // Thay thế bằng endpoint của bạn
        return response.data
    } catch (error) {
        console.error('Error fetching data', error)
        throw error
    }
}

export const postData = async (data: any) => {
    try {
        const response = await axios.post('/Timekeeping/Create', data) // Thay thế bằng endpoint của bạn
        return response.data
    } catch (error) {
        console.error('Error posting data', error)
        throw error
    }
}
