import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './localization/en.json';
import bn from './localization/bn.json';
import { StorageKeys, storage } from './src/storage';

export const resources = {
    en,
    bn,
};

i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    resources: resources,
    lng: storage.getString(StorageKeys.Lang),
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
