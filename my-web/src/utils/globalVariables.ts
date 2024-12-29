export interface User {
    Id: string
    FullName: string
    Roles: string[]
    AvatarPath: string | null
}

const API_URL = 'https://localhost:44381/api/Auth/Me'

export const fetchUserData = async (): Promise<User | null> => {
    try {
        const token = localStorage.getItem('auth_token')
        if (!token) {
            console.error('Không tìm thấy token xác thực')
            return null
        }

        const userResponse = await fetch(API_URL, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (!userResponse.ok) {
            console.error('Không thể lấy dữ liệu người dùng:', userResponse.statusText)
            return null
        }

        const userData = await userResponse.json()

        if (userData.Data) {
            localStorage.setItem('userData', JSON.stringify(userData.Data))
            return userData.Data
        } else {
            console.error('Không có dữ liệu người dùng')
            return null
        }
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu người dùng:', error)
        return null
    }
}


fetchUserData()

export const getUserData = (): User | null => {
    const data = localStorage.getItem('userData')
    return data ? JSON.parse(data) : null
}

export const getUserId = (): string => {
    const userData = getUserData()
    return userData?.Id || ''
}

export const getFullName = (): string => {
    const userData = getUserData()
    return userData?.FullName || ''
}

export const getRoles = (): string[] => {
    const userData = getUserData()
    return userData?.Roles || []
}

export const getAvatarPath = (): string => {
    const userData = getUserData()
    return userData?.AvatarPath || ''
}

export const userId: string = getUserId()
export const userSentNotificationId = getUserId()
export const fullName = getFullName()
export const roles = getRoles()
export const avatarPath = 'https://localhost:44381/'+getAvatarPath()
