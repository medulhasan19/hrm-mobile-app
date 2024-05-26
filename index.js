/**
 * @format
 */

import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import './i18n';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import notifee from '@notifee/react-native';

notifee.onBackgroundEvent(async ({ type, detail }) => {});
const AppProvider = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
};

AppRegistry.registerComponent(appName, () => AppProvider);
