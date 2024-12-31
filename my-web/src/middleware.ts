import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    const validPaths = [
        '/admin',
        '/admin/statistics',
        '/admin/employee',
        '/admin/contract',
        '/admin/salary',
        '/admin/schedular',
        '/admin/attendance',
        '/admin/time-off',
        '/admin/permission',
        '/admin/department',
        '/admin/role',
        '/admin/work-regulations',
        '/admin/insurance',
        '/admin/reward',
        '/admin/benefit',
        '/admin/discipline',
        '/admin/configuration',
        '/admin/holiday',
        //"/admin/error-report",

        '/admin/employee/create',
        '/admin/contract/create',
        '/admin/salary/create',
        '/admin/schedular/create',
        '/admin/attendance/create',
        '/admin/time-off/create',
        '/admin/permission/create',
        '/admin/department/create',
        '/admin/role/create',
        '/admin/work-regulations/create',
        '/admin/insurance/create',
        '/admin/reward/create',
        '/admin/benefit/create',
        '/admin/discipline/create',
        '/admin/configuration/create',
        '/admin/holiday/create',
        //"/admin/error-report/create",

        '/admin/employee/update',
        '/admin/contract/update',
        '/admin/salary/update',
        '/admin/schedular/update',
        '/admin/attendance/update',
        '/admin/time-off/update',
        '/admin/permission/update',
        '/admin/department/update',
        '/admin/role/update',
        '/admin/work-regulations/update',
        '/admin/insurance/update',
        '/admin/reward/update',
        '/admin/benefit/update',
        '/admin/discipline/update',
        '/admin/configuration/update',
        '/admin/holiday/update',
        //"/admin/error-report/update",

        '/admin/statistics/employee-contract',
        '/admin/statistics/attendance',
        '/admin/statistics/notifications-events',
        '/admin/statistics/rewards-disciplines',
        '/admin/statistics/salary',
        '/admin/statistics/benefits',
        '/admin/statistics/timeoff-errorreport'
    ]
    if (!validPaths.includes(pathname)) {
        return NextResponse.redirect(new URL('/404', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/admin/:path*']
}
