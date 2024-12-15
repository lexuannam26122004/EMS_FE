import { userApi } from '@/services/AspNetUserService'
import { roleApi } from '@/services/AspNetRoleService'
import { departmentApi } from '@/services/DepartmentService'
import { configureStore } from '@reduxjs/toolkit'
import { timekeepingApi } from '@/services/TimekeepingService'
import { sysFunctionApi } from '@/services/SysFunctionService'
import { notificationsApi } from '@/services/NotificationsService'
import { toastSlice } from './slices/toastSlice'
import { tablePermissionSlice } from './slices/tablePermissionSlice'
import { notificationsSlice } from './slices/notificationsSlice'
import { countNewNotificationSlice } from './slices/countNewNotificationSlice'
import { sysConfigurationApis } from '@/services/SysConfigurationService'
import { holidayApi } from '@/services/HolidayService'
import { EmploymentContractApi } from '@/services/EmploymentContractService'
import { TimeOffApi } from '@/services/TimeOffService'

import { selectedUsersToNotifySlice } from './slices/selectedUsersToNotifySlice'
import { selectedRolesToNotifySlice } from './slices/selectedRolesToNotifySlice'
import { selectedDepartmentsToNotifySlice } from './slices/selectedDepartmentsToNotifySlice'
import { workShiftApis } from '@/services/WorkShiftService'
import { salaryApi } from '@/services/SalaryService'
import { benefitApi } from '@/services/BenefitService'

export const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        [roleApi.reducerPath]: roleApi.reducer,
        [departmentApi.reducerPath]: departmentApi.reducer,
        [timekeepingApi.reducerPath]: timekeepingApi.reducer,
        [sysFunctionApi.reducerPath]: sysFunctionApi.reducer,
        [toastSlice.name]: toastSlice.reducer,
        [tablePermissionSlice.name]: tablePermissionSlice.reducer,
        [notificationsSlice.name]: notificationsSlice.reducer,
        [notificationsApi.reducerPath]: notificationsApi.reducer,
        [countNewNotificationSlice.name]: countNewNotificationSlice.reducer,
        [sysConfigurationApis.reducerPath]: sysConfigurationApis.reducer,
        [holidayApi.reducerPath]: holidayApi.reducer,
        [EmploymentContractApi.reducerPath]: EmploymentContractApi.reducer,
        [TimeOffApi.reducerPath]: TimeOffApi.reducer,
        [selectedUsersToNotifySlice.name]: selectedUsersToNotifySlice.reducer,
        [selectedRolesToNotifySlice.name]: selectedRolesToNotifySlice.reducer,
        [selectedDepartmentsToNotifySlice.name]: selectedDepartmentsToNotifySlice.reducer,
        [workShiftApis.reducerPath]: workShiftApis.reducer,
        [salaryApi.reducerPath]: salaryApi.reducer,
        [benefitApi.reducerPath]: benefitApi.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(
            userApi.middleware,
            roleApi.middleware,
            departmentApi.middleware,
            timekeepingApi.middleware,
            sysFunctionApi.middleware,
            notificationsApi.middleware,
            sysConfigurationApis.middleware,
            holidayApi.middleware,
            EmploymentContractApi.middleware,
            TimeOffApi.middleware,
            workShiftApis.middleware,
            salaryApi.middleware,
            benefitApi.middleware
        )
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store
