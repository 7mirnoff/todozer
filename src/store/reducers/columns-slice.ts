import { IColumn } from '../../models/column'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IColumnsState {
  columns: IColumn[]
  isLoading: boolean
  error: string | null
}

const initialState: IColumnsState = {
  columns: [],
  isLoading: false,
  error: null
}

export const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    columnsFetching(state) {
      state.isLoading = true
    },
    columnsFetchingSuccess(state, action: PayloadAction<IColumn[]>) {
      state.isLoading = false
      state.error = null
      state.columns = action.payload
    },
    columnsFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false
      state.error = action.payload
    }
  }
})

export default columnsSlice.reducer
