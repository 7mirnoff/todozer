import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit'

import { boardAPI } from '../features/services/board-service'

const rootReducer = combineReducers({
  [boardAPI.reducerPath]: boardAPI.reducer
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(boardAPI.middleware)
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
