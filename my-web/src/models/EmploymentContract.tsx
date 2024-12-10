export interface IEmploymentContractSearch {
    Id: string
    IsActive: boolean
    CreatedBy?: string
    CreatedDate?: Date
    UpdatedBy?: string
    UpdatedDate?: Date
    UserId: string
    ContractName: string
    StartDate: Date
    EndDate: Date
    BasicSalary: number
    Clause?: string
}

export interface IEmploymentContractCreate {
    UserId: string
    ContractName: string
    StartDate: Date
    EndDate: Date
    BasicSalary: number
    Clause: string
    IsActive: boolean
    ProbationPeriod: number
    WorkingHours: number
    TerminationClause: string
    ContractFileId: number
    TypeContract: string
    ManagerId: string
}

export interface IEmploymentContractUpdate {
    Id: string
    UserId: string
    ContractName: string
    StartDate: Date
    EndDate: Date
    BasicSalary: number
    Clause: string
    IsActive: boolean
    ProbationPeriod: number
    WorkingHours: number
    TerminationClause: string
    ContractFileId: number
    TypeContract: string
    ManagerId: string
}
