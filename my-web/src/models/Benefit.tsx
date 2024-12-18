export interface IBenefitCreate {
    Name: string
    BenefitContribution: number
    BenefitTypeId: number
}

export interface IBenefitGetAll extends IBenefitCreate {
    Id: string
    NameOfBenefitType: string
    CreatedDate: string
    CreatedBy: string
}

export interface IBenefitGetAllType {
    Id: number
    Name: string
}

export interface IBenefitUpdate {
    Id: string
    Name: string
    BenefitContribution: number
    BenefitTypeId: number
}

export interface IBenefitTypeCreate {
    Name: string
    Description: string
}
