import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getUserProfile } from '../../services/index'

export const fetchUserProfile = createAsyncThunk(
  'getUserProfile/fetch',
  async (_, thunkApi) => {
    try {
      const res = await getUserProfile()
      const user = res?.data?.data || res?.data?.user || res?.user || res?.data || res
      return user
    } catch (err) {
      const message = err?.response?.data?.message || err?.message || 'Failed to load profile'
      return thunkApi.rejectWithValue(message)
    }
  }
)

const initialState = {
  profile: null,
  status: 'idle',
  error: null,
}

const getUserProfileSlice = createSlice({
  name: 'getUserProfile',
  initialState,
  reducers: {
    clearUser(state) {
      state.profile = null
      state.status = 'idle'
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.profile = action.payload
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || 'Failed to load profile'
      })
  },
})

export const { clearUser } = getUserProfileSlice.actions
export default getUserProfileSlice.reducer

export const selectGetUserProfile = (state) => state.getUserProfile.profile
export const selectGetUserProfileStatus = (state) => state.getUserProfile.status
export const selectGetUserProfileError = (state) => state.getUserProfile.error


