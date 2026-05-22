import { StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing } from '../styles/theme';

interface FeedbackCardProps {
    title: string;
    message: string;
    tone?: 'info' | 'error' | 'success';
}

const toneConfig = {
    info: {
        backgroundColor: colors.infoSoft,
        icon: 'information-outline' as const,
        iconColor: colors.primary,
    },
    error: {
        backgroundColor: colors.dangerSoft,
        icon: 'alert-circle-outline' as const,
        iconColor: colors.danger,
    },
    success: {
        backgroundColor: colors.successSoft,
        icon: 'check-circle-outline' as const,
        iconColor: colors.success,
    },
};

export default function FeedbackCard({ title, message, tone = 'info' }: FeedbackCardProps) {
    const config = toneConfig[tone];

    return (
        <View style={[styles.card, { backgroundColor: config.backgroundColor, borderColor: config.iconColor }]}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.message}>{message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        gap: spacing.xs,
        borderRadius: radius.sm,
        padding: spacing.md,
        borderWidth: 1,
    },
    title: {
        color: colors.text,
        fontSize: 14,
        fontWeight: '600',
    },
    message: {
        color: colors.textMuted,
        fontSize: 12,
        lineHeight: 17,
    },
});