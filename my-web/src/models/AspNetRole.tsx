export interface IAspNetRoleGetAll {
    Id: string
    Name: string
    IsActive?: boolean | null
    ConcurrencyStamp: string
    NormalizedName: string
    CreatedDate?: Date | null
    CreatedBy: string
    UpdatedDate?: Date | null
    UpdatedBy: string
}
