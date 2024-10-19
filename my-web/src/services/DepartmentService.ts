import axios from './axios'

export const getDataDepartment = async () => {
    try {
        const result = await axios.get('/Timekeeping/GetAllDepartments')
        return result.data.Data
    } catch (error) {
        console.error('Error fetching data', error)
        throw error
    }
}
