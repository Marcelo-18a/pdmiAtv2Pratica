import { Platform } from 'react-native';

export const colors = {
    background: '#F2F2F2',
    surface: '#FFFFFF',
    surfaceMuted: '#F8F8F8',
    primary: '#2F5BDA',
    primaryDark: '#2448AA',
    primarySoft: '#D5DEF8',
    secondary: '#4A5568',
    secondarySoft: '#E7EAF0',
    text: '#1F2937',
    textMuted: '#6B7280',
    border: '#C9CED8',
    success: '#3B7A57',
    warning: '#A16207',
    danger: '#B91C1C',
    dangerSoft: '#FCECEC',
    successSoft: '#EEF6F1',
    infoSoft: '#EDF2FF',
    cityTag: '#F0F2F5',
} as const;

export const spacing = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
} as const;

export const radius = {
    sm: 4,
    md: 8,
    lg: 10,
    xl: 12,
    pill: 999,
} as const;

export const shadows = {
    card: Platform.select({
        ios: {
            shadowColor: '#0F172A',
            shadowOpacity: 0.04,
            shadowRadius: 6,
            shadowOffset: { width: 0, height: 3 },
        },
        android: {
            elevation: 1,
        },
        default: {},
    }),
    button: Platform.select({
        ios: {
            shadowColor: '#1D4ED8',
            shadowOpacity: 0.08,
            shadowRadius: 4,
            shadowOffset: { width: 0, height: 2 },
        },
        android: {
            elevation: 1,
        },
        default: {},
    }),
} as const;