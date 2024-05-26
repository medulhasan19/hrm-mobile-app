import {
    Text,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    View,
} from 'react-native';
import React, { useState } from 'react';
import { makeStyles } from '../../hooks/makeStyle';
import { useTranslation } from 'react-i18next';
import CustomTextInput from '../../components/TextInput/CustomTextInput';
import CustomButton from '../../components/Button/CustomButton';
import useAlert from '../../hooks/useAlert';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/feature/authSlice';

const Login = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { showError } = useAlert();

    const [email, setEmail] = useState('');
    const [pin, setPin] = useState('');

    const handleLogin = async () => {
        if (email && pin) {
            dispatch(login({ email, pin }));
        } else {
            showError(t('EmailAndPasswordRequired'));
        }
    };
    const styles = useStyle();
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <ScrollView style={styles.cont} keyboardShouldPersistTaps="always">
                <Text style={styles.title}>{t('LoginTitle')}</Text>
                <Text style={styles.subTitle}>{t('LoginSubTitle')}</Text>
                <View style={styles.inputCont}>
                    <CustomTextInput
                        label={t('LoginEmailLabel')}
                        style={styles.email}
                        placeholder="ali@gmail.com"
                        onChangeText={setEmail}
                    />
                    <CustomTextInput
                        label={t('LoginPasswordLabel')}
                        style={styles.email}
                        placeholder={t('LoginPasswordLabel')}
                        secureTextEntry={true}
                        onChangeText={setPin}
                    />
                    <CustomButton
                        title={t('Login')}
                        style={styles.login}
                        onPress={handleLogin}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default Login;

const useStyle = makeStyles(theme => ({
    cont: {
        paddingHorizontal: 20,
    },
    title: {
        color: theme.text[100],
        marginTop: 30,
        fontSize: 26,
    },
    subTitle: {
        color: theme.text[90],
        marginTop: 20,
        marginBottom: 40,
        fontSize: 16,
    },
    inputCont: {
        flex: 1,
        gap: 30,
    },
    email: {},
    login: {
        backgroundColor: theme.background[100],
        borderRadius: 30,
        marginTop: 20,
    },
}));
