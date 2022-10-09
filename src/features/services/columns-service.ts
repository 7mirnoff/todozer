import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'

export const columnAPI = createApi({
  reducerPath: 'boardAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://localhost:3000' }),
  endpoints: (build) => ({
    fetchColumns: build.query({
      query: () => ({
        url: '/getColumns'
      })
    })
  })
})
