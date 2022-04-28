import { configureStore } from '@reduxjs/toolkit';
import activeImgReducer from '../features/counter/activeImgSlice';
import userAuthReducer from '../features/counter/userAuthSlice';
import profileStackReducer from '../features/counter/profileStackSlice';

export default configureStore({
  reducer: {
    activeImg: activeImgReducer,
    user: userAuthReducer,
    profileStack: profileStackReducer,
  }
  
})