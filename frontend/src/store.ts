import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/index';

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development
});

export type AppDispatch = typeof store.dispatch; // To use dispatch in your components with proper types
export type RootState = ReturnType<typeof store.getState>; // To get the RootState type from the store

export default store;
