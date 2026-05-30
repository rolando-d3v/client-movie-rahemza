import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import stateSlice from './slices/estateSlice';
import userDataSlice from './slices/userDataSlice';
import authSlice from './slices/authSlice';

export const store = configureStore({
  reducer: {
    stateSlice,
    userDataSlice,
    authSlice
  }
});

// hook de redux toolkit dispatch y useSelector
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
