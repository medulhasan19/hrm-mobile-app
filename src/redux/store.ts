import { configureStore } from '@reduxjs/toolkit';
import authSlice from './feature/authSlice';
import checkinSlice from './feature/checkinSlice';
import langSlice from './feature/langSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice,
        checkin: checkinSlice,
        lang: langSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
