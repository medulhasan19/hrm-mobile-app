import { createSlice } from '@reduxjs/toolkit';
import { StorageKeys, storage } from '../../storage';

interface StateSlice {
    user: any;
    isLoggedIn: boolean;
}

const initialState: StateSlice = {
    user: null,
    isLoggedIn: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState: () => {
        const credentials = storage.getString(StorageKeys.User);

        if (credentials) {
            return {
                user: JSON.parse(credentials),
                isLoggedIn: true,
            };
        } else {
            return initialState;
        }
    },
    reducers: {
        login: (state, { payload }) => {
            state.isLoggedIn = true;
            storage.set(StorageKeys.User, JSON.stringify(payload));
        },
        logout: state => {
            state.user = null;
            state.isLoggedIn = false;
            storage.delete(StorageKeys.User);
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
