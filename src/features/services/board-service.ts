import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { IColumn } from '../../models/column'

export const boardAPI = createApi({
  reducerPath: 'boardAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  tagTypes: ['Columns'],
  endpoints: (build) => ({
    fetchAllColumns: build.query<IColumn[], null>({
      query: () => ({
        url: '/columns'
      }),
      providesTags: ['Columns']
    }),
    createColumn: build.mutation<IColumn, IColumn>({
      query: (column) => ({
        url: '/columns',
        method: 'POST',
        body: column
      }),
      invalidatesTags: ['Columns']
    }),
    updateColumn: build.mutation<IColumn, IColumn>({
      query: (column) => ({
        url: `/columns/${column.code}`,
        method: 'PUT',
        body: column
      }),
      invalidatesTags: ['Columns']
    }),
    deleteColumn: build.mutation<IColumn, IColumn>({
      query: (column) => ({
        url: `/columns/${column.code}`,
        method: 'DELETE',
        body: column
      }),
      invalidatesTags: ['Columns']
    })
  })
})
