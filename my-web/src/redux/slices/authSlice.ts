import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@/redux/store'

// Định nghĩa kiểu dữ liệu cho Function (quyền)
interface FunctionRights {
    IsAllowAll: boolean
    IsAllowView: boolean
    IsAllowEdit: boolean
    IsAllowCreate: boolean
    IsAllowPrint: boolean
    IsAllowDelete: boolean
}

// Định nghĩa kiểu dữ liệu cho menu item
export interface MenuItem {
    Id: number
    Name: string
    PathTo: string
    NameController: string | null
    Function: FunctionRights
}

// State của Redux lưu menu và quyền
interface MenuLeftState {
    [key: string]: FunctionRights
}

const initialState: MenuLeftState = {}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Payload là dữ liệu chứa MenuLeft
        updateAuth: (state, action: PayloadAction<MenuItem[]>) => {
            action.payload.forEach(menu => {
                state[menu.Name] = menu.Function // Lưu quyền của từng menu vào Redux
            })
        }
    }
})

export const { updateAuth } = authSlice.actions

export const authSelector = (state: RootState) => state.auth

export default authSlice.reducer
