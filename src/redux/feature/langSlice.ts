import { createSlice } from '@reduxjs/toolkit';
import { StorageKeys, storage } from '../../storage';

interface StateSlice {
    lang: string;
}

const initialState: StateSlice = {
    lang: 'en',
};

const langSlice = createSlice({
    name: 'lang',
    initialState: () => {
        const lang = storage.getString(StorageKeys.Lang);

        if (lang) {
            return {
                lang: lang,
            };
        } else {
            return initialState;
        }
    },
    reducers: {
        storeLang: (state, { payload }) => {
            state.lang = payload;
            storage.set(StorageKeys.Lang, payload);
        },
    },
});

export const { storeLang } = langSlice.actions;
export default langSlice.reducer;
