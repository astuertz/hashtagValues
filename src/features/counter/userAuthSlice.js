import { createSlice } from '@reduxjs/toolkit'

export const userAuthSlice = createSlice({
  name: 'user',
  initialState: {
    value: null,
    isConfirmed: false,
    sub: null,
    isConfiged: false,
    forcedUpdate: false,
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
    setProfConfiged: (state) => {
      state.isConfiged = true
    },
    forceUpdate: (state, action) => {
      state.forcedUpdate = action.payload
    }
  }
})

export const { validateUser, signOutUser, confirmUser, updateSub, setProfConfiged, forceUpdate, } = userAuthSlice.actions

export default userAuthSlice.reducer