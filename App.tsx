import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Root from './src/navigation/Root';
import { LightTheme } from './src/theme/theme';
import notifee, {
    AndroidImportance,
    IntervalTrigger,
    TimeUnit,
    TriggerType,
} from '@notifee/react-native';

const App = () => {
    useEffect(() => {
        scheduleDailyNotification();
    }, []);

    const scheduleDailyNotification = async () => {
        // Create a channel (required for Android)
        await notifee.createChannel({
            id: 'daily-reminder',
            name: 'Daily Reminder',
            importance: AndroidImportance.HIGH,
        });
        const now = new Date();
        const nextTriggerTime = new Date();
        nextTriggerTime.setHours(9, 0, 0, 0);

        if (now.getTime() > nextTriggerTime.getTime()) {
            nextTriggerTime.setDate(nextTriggerTime.getDate() + 1);
        }

        const initialInterval = nextTriggerTime.getTime() - now.getTime();
        const dailyInterval = 24 * 60 * 60 * 1000;

        const initialTrigger: IntervalTrigger = {
            type: TriggerType.INTERVAL,
            interval: initialInterval / (1000 * 60), // convert milliseconds to minutes
            timeUnit: TimeUnit.MINUTES,
        };

        const dailyTrigger: IntervalTrigger = {
            type: TriggerType.INTERVAL,
            interval: dailyInterval / (1000 * 60), // 1440 minutes (24 hours)
            timeUnit: TimeUnit.MINUTES,
        };

        const display = {
            title: 'Reminder for CheckIn',
            body: `This is your daily reminder for CheckIn at ${new Date()
                .toLocaleString()
                .split(',')
                .pop()}`,
            android: {
                channelId: 'daily-reminder',
                pressAction: {
                    id: 'default',
                },
            },
        };

        // Schedule the initial notification
        await notifee.createTriggerNotification(display, initialTrigger);

        // Schedule the daily repeating notification
        await notifee.createTriggerNotification(display, dailyTrigger);
    };
    return (
        <NavigationContainer theme={LightTheme}>
            <Root />
        </NavigationContainer>
    );
};

export default App;
