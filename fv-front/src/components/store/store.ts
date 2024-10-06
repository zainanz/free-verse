import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import postSlice from './postSlice';

const store = configureStore({
    reducer: {
        auth: authSlice,
        post: postSlice
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
