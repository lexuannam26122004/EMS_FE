interface User {
    Id: string;
    FullName: string;
    Roles: string[];
    AvatarPath: string | null;
}

export const getUserData = (): User => {
    const data = localStorage.getItem('userData')
    return data ? JSON.parse(data) : null
}

export const getUserId = (): string => {
    const userData = getUserData()
    return userData?.Id || ''
}

export const getUserSentNotificationId = (): string => {
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
export const userSentNotificationId = getUserSentNotificationId()
export const fullName = getFullName()
export const roles = getRoles()
export const avatarPath = getAvatarPath()
