export interface ISalaryGetAll {
    Id: string
    FullName: string
    UserId: string
    Date: Date
    BasicSalary: number
    Timekeeping: number
    Insurance: number
    Benefit: number
    Reward: number
    Discipline: number
    PITax: number
    TotalSalary: number
    IsActive: number
    IsPaid: boolean
    PayrollPeriod: string
}

export interface IUnpaidSalary extends ISalaryGetAll {
    AvatarPath: string
}

export interface ISalaryByLevel {
    period: string
    under10: number
    between10and20: number
    between20and30: number
    between30and40: number
    greaterThan40: number
}
export interface TotalIncome {
    payrollPeriod: string
    TotalIncome: number
    TotalSalary: number
}
