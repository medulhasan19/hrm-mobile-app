import { createSlice } from '@reduxjs/toolkit';
import { StorageKeys, storage } from '../../storage';

interface StateSlice {
    isCheckedIn: boolean;
}

const initialState: StateSlice = {
    isCheckedIn: false,
};

const checkinSlice = createSlice({
    name: 'checkin',
    initialState: () => {
        const checkin = storage.getBoolean(StorageKeys.Checkin);

        if (checkin) {
            return {
                isCheckedIn: true,
            };
        } else {
            return initialState;
        }
    },
    reducers: {
        checkinFunc: state => {
            state.isCheckedIn = true;
            storage.set(StorageKeys.Checkin, true);
        },
        checkout: state => {
            state.isCheckedIn = false;
            storage.delete(StorageKeys.Checkin);
        },
    },
});

export const { checkinFunc, checkout } = checkinSlice.actions;
export default checkinSlice.reducer;
