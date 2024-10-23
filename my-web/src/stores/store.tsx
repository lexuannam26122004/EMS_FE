import { userApi } from '@/services/AspNetUserService'
import { roleApi } from '@/services/AspNetRoleService'
import { departmentApi } from '@/services/DepartmentService'
import { configureStore } from '@reduxjs/toolkit'
import { timekeepingApi } from '@/services/TimekeepingService'

export const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        [roleApi.reducerPath]: roleApi.reducer,
        [departmentApi.reducerPath]: departmentApi.reducer,
        [timekeepingApi.reducerPath]: timekeepingApi.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
            .concat(userApi.middleware)
            .concat(roleApi.middleware)
            .concat(departmentApi.middleware)
            .concat(timekeepingApi.middleware) // Nếu cần, thêm middleware của departmentApi
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store
