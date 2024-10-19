import axios from './axios'

export const getDataUser = async () => {
    try {
        const response = await axios.get('/AspNetUser/GetAll')
        return response.data.Data.Records
    } catch (error) {
        console.error('Error fetching data', error)
        throw error
    }
}
