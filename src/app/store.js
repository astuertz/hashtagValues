import { configureStore } from '@reduxjs/toolkit';
import activeImgReducer from '../features/counter/activeImgSlice';

export default configureStore({
  reducer: {
    activeImg: activeImgReducer
  }
})