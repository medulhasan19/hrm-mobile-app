import { Text, Pressable, StyleProp, ViewStyle } from 'react-native';
import React from 'react';
import { makeStyles } from '../../hooks/makeStyle';

interface Props {
    title: string;
    style?: StyleProp<ViewStyle>;
    onPress: () => void;
}

const CustomButton: React.FC<Props> = ({ title, style, onPress }) => {
    const styles = useStyle();
    return (
        <Pressable style={[style, styles.cont]} onPress={onPress}>
            <Text style={styles.title}>{title}</Text>
        </Pressable>
    );
};

export default CustomButton;

const useStyle = makeStyles(theme => ({
    cont: {},
    title: {
        textAlign: 'center',
        paddingVertical: 15,
        fontSize: 20,
        color: theme.white,
    },
}));
