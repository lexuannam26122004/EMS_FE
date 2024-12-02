import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface EmploymentContractResponse {
    Success: boolean
    Data: any
}

const apiPath = 'https://localhost:44381/api/admin/EmploymentContract';

export const EmploymentContractApi = createApi({
  reducerPath: 'EmploymentContractApi',
  baseQuery: fetchBaseQuery({ baseUrl: apiPath }),
  endpoints: (builder) => ({
    
    searchEmploymentContracts: builder.query<EmploymentContractResponse, void>({
      query: () => 'Search/search'
    }),
  }),
});


export const { useSearchEmploymentContractsQuery } = EmploymentContractApi;
