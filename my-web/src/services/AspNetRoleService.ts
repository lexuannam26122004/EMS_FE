import axios from './axios'

export const getDataRole = async () => {
    try {
        const response = await axios.get('/AspNetRole/GetAll')
        return response.data.Data.Records
    } catch (error) {
        console.error('Error fetching data', error)
        throw error
    }
}
