import { createSlice } from '@reduxjs/toolkit'

export const userAuthSlice = createSlice({
  name: 'user',
  initialState: {
    value: null,
    isConfirmed: false
  },
  reducers: {
    validateUser: (state, action) => {
      state.value = action.payload
    },
    signOutUser: (state) => {
      state.value = null
    },
    confirmUser: (state) => {
      state.isConfirmed = true
    },
  }
})

export const { validateUser, signOutUser, confirmUser } = userAuthSlice.actions

export default userAuthSlice.reducer