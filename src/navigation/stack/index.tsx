import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './Screens';
import Login from '../../screens/Login/Login';
import Dashboard from '../../screens/Dashboard/Dashboard';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigation = () => {
    const auth = useSelector((state: RootState) => state.auth);

    return (
        <Stack.Navigator
            screenOptions={{
                header: () => null,
            }}>
            {!auth.isLoggedIn && (
                <>
                    <Stack.Screen name="Login" component={Login} />
                </>
            )}
            {auth.isLoggedIn && (
                <>
                    <Stack.Screen name="Dashboard" component={Dashboard} />
                </>
            )}
        </Stack.Navigator>
    );
};

export default StackNavigation;
