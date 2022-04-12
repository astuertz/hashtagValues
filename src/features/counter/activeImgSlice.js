import { createSlice } from '@reduxjs/toolkit'

export const activeImgSlice = createSlice({
  name: 'activeImg',
  initialState: {
    value: 0
  },
  reducers: {
    increment: state => {
      state.value += 1
    },
    decrement: state => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
    reset: (state) => {
      state.value = 0
    },
    setToAmount: (state, action) => {
      state.value = action.payload
    },
  }
})

export const { increment, decrement, incrementByAmount, reset, setToAmount } = activeImgSlice.actions

export default activeImgSlice.reducer