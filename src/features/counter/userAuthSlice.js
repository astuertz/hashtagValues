import { createSlice } from '@reduxjs/toolkit'

export const userAuthSlice = createSlice({
  name: 'user',
  initialState: {
    value: null
  },
  reducers: {
    validateUser: (state, action) => {
      state.value = action.payload
    },
    signOutUser: (state) => {
      state.value = null
    },
  }
})

export const { validateUser, signOutUser } = userAuthSlice.actions

export default userAuthSlice.reducer