import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { IColumn } from '../../models/column'

export const boardAPI = createApi({
  reducerPath: 'boardAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://localhost:3000' }),
  endpoints: (build) => ({
    fetchAllColumns: build.query<IColumn[], null>({
      query: () => ({
        url: '/getColumns'
      })
    })
  })
})
