//import library
import { configureStore } from '@reduxjs/toolkit'

//import path file Reducer
import userReducer from '../features/user/userSlice'
import tokenReducer from '../features/user/tokenSlice'

//handle and export
export const store = configureStore({
  reducer: {
    user: userReducer,
    token: tokenReducer,
  },
})