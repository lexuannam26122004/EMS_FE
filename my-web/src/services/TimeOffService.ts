import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface TimeOffResponse {
    Success: boolean
    Data: any
}

const apiPath = 'https://localhost:44381/api/admin/TimeOff';

export const TimeOffApi = createApi({
  reducerPath: 'TimeOffApi',
  baseQuery: fetchBaseQuery({ baseUrl: apiPath }),
  endpoints: (builder) => ({
    
    searchTimeOff: builder.query<TimeOffResponse, void>({
      query: () => 'Search/search'
    }),
  }),
});


export const { useSearchTimeOffQuery } = TimeOffApi;
