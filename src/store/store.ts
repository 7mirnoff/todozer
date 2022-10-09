import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit'
import columnReducer from './reducers/columns-slice'

const rootReducer = combineReducers({
  columnReducer
})

export const store = configureStore({
  reducer: rootReducer
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
