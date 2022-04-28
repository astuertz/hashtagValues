import { createSlice } from '@reduxjs/toolkit'

export const profileStackSlice = createSlice({
  name: 'profileStack',
  initialState: {
    value: [],
  },
  reducers: {
    updateUsersArray: (state, action) => {
      state.value = action.payload
    },
  }
})

export const { updateUsersArray } = profileStackSlice.actions

export default profileStackSlice.reducer