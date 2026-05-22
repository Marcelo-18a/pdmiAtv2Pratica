import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing } from '../styles/theme';
import { DDDResponse } from '../types/ddd';

interface ResultCardProps {
    result: DDDResponse | null;
    loading: boolean;
    searchAttempted: boolean;
}

export default function ResultCard({ result, loading, searchAttempted }: ResultCardProps) {
    const hasResult = result !== null;
    const cities = result?.cities ?? [];

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <View style={styles.headerTextBlock}>
                    <Text style={styles.sectionTitle}>Resultado da busca</Text>
                </View>
            </View>

            {loading ? (
                <View style={styles.stateContainer}>
                    <ActivityIndicator size="large" color={colors.primary} />
                    <Text style={styles.stateTitle}>Carregando...</Text>
                </View>
            ) : hasResult ? (
                <View style={styles.resultBlock}>
                    <View style={styles.summaryRow}>
                        <View style={styles.summaryCard}>
                            <Text style={styles.summaryLabel}>Estado</Text>
                            <Text style={styles.summaryValue}>{result.state}</Text>
                        </View>
                        <View style={styles.summaryCard}>
                            <Text style={styles.summaryLabel}>Cidades</Text>
                            <Text style={styles.summaryValue}>{cities.length}</Text>
                        </View>
                    </View>

                    <Text style={styles.listTitle}>Cidades encontradas</Text>

                    <FlatList
                        data={cities}
                        keyExtractor={(item, index) => `${item}-${index}`}
                        scrollEnabled={false}
                        numColumns={1}
                        renderItem={({ item }) => (
                            <Text style={styles.cityName}>- {item}</Text>
                        )}
                        ListEmptyComponent={
                            <View style={styles.emptyListState}>
                                <Text style={styles.emptyListTitle}>Sem cidades</Text>
                                <Text style={styles.emptyListDescription}>A API não trouxe cidades para esse DDD.</Text>
                            </View>
                        }
                    />
                </View>
            ) : (
                <View style={styles.stateContainer}>
                    <Text style={styles.stateTitle}>{searchAttempted ? 'Sem resultado' : 'Resultado vazio'}</Text>
                    <Text style={styles.stateDescription}>
                        {searchAttempted
                            ? 'Confira o DDD e tente de novo.'
                            : 'Digite um DDD e toque em Buscar.'}
                    </Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        gap: spacing.md,
        borderRadius: radius.sm,
        padding: spacing.md,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    headerTextBlock: {
        flex: 1,
        gap: spacing.xs,
    },
    sectionTitle: {
        color: colors.text,
        fontSize: 16,
        fontWeight: '600',
    },
    stateContainer: {
        gap: spacing.xs,
        paddingVertical: spacing.md,
    },
    stateTitle: {
        color: colors.text,
        fontSize: 14,
        fontWeight: '600',
    },
    stateDescription: {
        color: colors.textMuted,
        fontSize: 12,
        lineHeight: 17,
    },
    resultBlock: {
        gap: spacing.sm,
    },
    summaryRow: {
        flexDirection: 'row',
        gap: spacing.md,
    },
    summaryCard: {
        flex: 1,
        gap: spacing.xs,
        borderRadius: radius.sm,
        padding: spacing.sm,
        backgroundColor: colors.surfaceMuted,
    },
    summaryLabel: {
        color: colors.textMuted,
        fontSize: 11,
        fontWeight: '600',
    },
    summaryValue: {
        color: colors.text,
        fontSize: 16,
        fontWeight: '600',
    },
    listTitle: {
        color: colors.text,
        fontSize: 13,
        fontWeight: '600',
    },
    cityName: {
        color: colors.text,
        fontSize: 12,
        marginBottom: spacing.xs,
    },
    emptyListState: {
        gap: spacing.xs,
        paddingVertical: spacing.sm,
    },
    emptyListTitle: {
        color: colors.text,
        fontSize: 12,
        fontWeight: '600',
    },
    emptyListDescription: {
        color: colors.textMuted,
        fontSize: 11,
        lineHeight: 16,
    },
});