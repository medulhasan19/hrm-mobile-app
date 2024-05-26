import { DefaultTheme } from '@react-navigation/native';

export const LightTheme = {
    ...DefaultTheme,
    black: '#000000',
    white: '#FFFFFF',
    text: {
        100: '#222222',
        90: '#888888',
    },
    background: {
        100: '#283FB1',
        90: '#F8F9FC',
        80: '#EFF2F7',
        70: '#E63F32',
    },
    border: {
        100: '#D3D9DE',
    },
};

export type CustomTheme = typeof LightTheme;

declare module '@react-navigation/native' {
    export function useTheme(): CustomTheme;
}
