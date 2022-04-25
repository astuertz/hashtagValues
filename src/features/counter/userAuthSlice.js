import { createSlice } from '@reduxjs/toolkit'

export const userAuthSlice = createSlice({
  name: 'user',
  initialState: {
    value: null,
    isConfirmed: false,
    sub: null,
  },
  reducers: {
    validateUser: (state, action) => {
      state.value = action.payload
    },
    signOutUser: (state) => {
      state.value = null;
      state.sub = null;
      state.isConfirmed = false;
    },
    confirmUser: (state) => {
      state.isConfirmed = true
    },
    updateSub: (state, action) => {
      state.sub = action.payload
    },
  }
})

export const { validateUser, signOutUser, confirmUser, updateSub } = userAuthSlice.actions

export default userAuthSlice.reducer