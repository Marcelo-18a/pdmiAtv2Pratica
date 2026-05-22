import { ActivityIndicator, Pressable, StyleSheet, Text, ViewStyle } from 'react-native';

import { colors, radius, shadows, spacing } from '../styles/theme';

interface PrimaryButtonProps {
    label: string;
    onPress: () => void;
    loading?: boolean;
    disabled?: boolean;
}

export default function PrimaryButton({ label, onPress, loading = false, disabled = false }: PrimaryButtonProps) {
    const isDisabled = disabled || loading;

    return (
        <Pressable
            accessibilityRole="button"
            accessibilityState={{ disabled: isDisabled, busy: loading }}
            onPress={onPress}
            style={({ pressed }) => [
                styles.button,
                isDisabled && styles.buttonDisabled,
                pressed && !isDisabled && styles.buttonPressed,
            ]}
            disabled={isDisabled}
        >
            {loading ? <ActivityIndicator color={colors.surface} /> : <Text style={styles.label}>{label}</Text>}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        minHeight: 46,
        borderRadius: radius.sm,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: spacing.md,
        ...shadows.button,
    } as ViewStyle,
    buttonPressed: {
        backgroundColor: colors.primaryDark,
    },
    buttonDisabled: {
        backgroundColor: '#99A7CC',
    },
    label: {
        color: colors.surface,
        fontSize: 15,
        fontWeight: '600',
    },
});