export interface IBenefitCreate {
    Name: string
    BenefitContribution: number
    BenefitTypeId: number
}

export interface IBenefitGetAll extends IBenefitCreate {
    Id: string
    NameOfBenefitType: string
}

export interface IBenefitGetAllType {
    Id: number
    Name: string
}
