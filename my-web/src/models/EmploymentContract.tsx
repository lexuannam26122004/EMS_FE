export interface IEmploymentContractSearch {
    Id: string; 
    IsActive: boolean;
    CreatedBy?: string; 
    CreatedDate?: Date; 
    UpdatedBy?: string;
    UpdatedDate?: Date;
    UserId: string;
    ContractName: string;
    StartDate: Date;
    EndDate: Date;
    BasicSalary: number; 
    Clause?: string; 
}
