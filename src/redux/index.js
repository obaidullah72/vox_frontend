import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import getUserProfileReducer from './slices/getUserProfileSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    getUserProfile: getUserProfileReducer,
  },
})


