import { MMKV } from 'react-native-mmkv';

export enum StorageKeys {
    User = 'user',
    Checkin = 'checkin',
    Lang = 'lang',
}

export const storage = new MMKV();
