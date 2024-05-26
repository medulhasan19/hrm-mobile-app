import { View, Text, StyleProp, ViewStyle, TextInput } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';
import { makeStyles } from '../../hooks/makeStyle';

interface Props {
    label: string;
    style: StyleProp<ViewStyle>;
    placeholder?: string;
    secureTextEntry?: boolean;
    onChangeText?: (text: string) => void;
}

const CustomTextInput: React.FC<Props> = ({
    label,
    style,
    placeholder,
    secureTextEntry,
    onChangeText,
}) => {
    const styles = useStyle();
    const theme = useTheme();
    return (
        <View style={style}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                placeholderTextColor={theme.text[100]}
                onChangeText={onChangeText}
            />
        </View>
    );
};

export default CustomTextInput;

const useStyle = makeStyles(theme => ({
    label: {
        marginBottom: 20,
        fontSize: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: theme.text[90],
        borderRadius: 30,
        paddingHorizontal: 20,
        color: theme.text[100],
    },
}));
