import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { colors, radius, spacing } from '../styles/theme';

interface DddInputProps {
    value: string;
    onChangeText: (text: string) => void;
    helperText: string;
    errorText?: string;
}

export default function DddInput({ value, onChangeText, helperText, errorText }: DddInputProps) {
    return (
        <View style={styles.wrapper}>
            <Text style={styles.label}>DDD</Text>
            <View style={[styles.inputContainer, Boolean(errorText) && styles.inputContainerError]}>
                <MaterialCommunityIcons name="phone-classic" size={20} color={colors.primary} />
                <TextInput
                    accessibilityLabel="Campo para digitar o DDD"
                    keyboardType="number-pad"
                    maxLength={2}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder="11"
                    placeholderTextColor={colors.textMuted}
                    style={styles.input}
                />
            </View>
            <Text style={[styles.helper, Boolean(errorText) && styles.helperError]}>{errorText ?? helperText}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        gap: spacing.sm,
    },
    label: {
        color: colors.text,
        fontSize: 13,
        fontWeight: '600',
    },
    inputContainer: {
        minHeight: 50,
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        borderRadius: radius.sm,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.surface,
        paddingHorizontal: spacing.md,
    },
    inputContainerError: {
        borderColor: colors.danger,
        backgroundColor: colors.surface,
    },
    input: {
        flex: 1,
        color: colors.text,
        fontSize: 16,
        fontWeight: '500',
        paddingVertical: 0,
        letterSpacing: 0,
    },
    helper: {
        color: colors.textMuted,
        fontSize: 11,
        lineHeight: 16,
    },
    helperError: {
        color: colors.danger,
        fontWeight: '500',
    },
});