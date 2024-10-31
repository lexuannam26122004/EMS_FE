import { userApi } from '@/services/AspNetUserService'
import { roleApi } from '@/services/AspNetRoleService'
import { departmentApi } from '@/services/DepartmentService'
import { configureStore } from '@reduxjs/toolkit'
import { timekeepingApi } from '@/services/TimekeepingService'
import { sysFunctionApi } from '@/services/SysFunctionService'
import { toastSlice } from './slices/toastSlice'
import { tablePermissionSlice } from './slices/tablePermissionSlice'

export const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        [roleApi.reducerPath]: roleApi.reducer,
        [departmentApi.reducerPath]: departmentApi.reducer,
        [timekeepingApi.reducerPath]: timekeepingApi.reducer,
        [sysFunctionApi.reducerPath]: sysFunctionApi.reducer,
        [toastSlice.name]: toastSlice.reducer,
        [tablePermissionSlice.name]: tablePermissionSlice.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(
            userApi.middleware,
            roleApi.middleware,
            departmentApi.middleware,
            timekeepingApi.middleware,
            sysFunctionApi.middleware
        )
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store
