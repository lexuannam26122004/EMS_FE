// src/services/apiService.ts
import Axios from 'axios'

const axios = Axios.create({
    baseURL: 'https://localhost:44381/api/admin',
    headers: {
        'Content-Type': 'application/json'
    }
})

export default axios
