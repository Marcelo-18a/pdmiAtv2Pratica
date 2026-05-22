import { useEffect, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';

import DddInput from '../components/DddInput';
import FeedbackCard from '../components/FeedbackCard';
import PrimaryButton from '../components/PrimaryButton';
import ResultCard from '../components/ResultCard';
import { fetchDDDInfo } from '../services/brasilApi';
import { colors, radius, spacing } from '../styles/theme';
import { DDDResponse } from '../types/ddd';

function getHelperText(ddd: string): string {
    if (ddd.length === 0) {
        return 'Digite apenas números. O código deve ter exatamente 2 dígitos.';
    }

    if (ddd.length === 1) {
        return 'Falta 1 dígito para completar a consulta.';
    }

    return 'DDD completo. Toque em Buscar para consultar a Brasil API.';
}

function getValidationMessage(ddd: string): string {
    if (ddd.length === 0) {
        return 'O campo DDD não pode ficar vazio.';
    }

    if (ddd.length !== 2) {
        return 'O DDD deve conter exatamente 2 dígitos numéricos.';
    }

    return '';
}

export default function HomeScreen() {
    const [ddd, setDdd] = useState<string>('');
    const [submittedDdd, setSubmittedDdd] = useState<string>('');
    const [result, setResult] = useState<DDDResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [searchAttempted, setSearchAttempted] = useState<boolean>(false);
    const [searchRequestId, setSearchRequestId] = useState<number>(0);

    useEffect(() => {
        setResult(null);
        setError('');
        setSearchAttempted(false);
    }, [ddd]);

    useEffect(() => {
        if (searchRequestId === 0) {
            return;
        }

        let isCancelled = false;

        async function runSearch(): Promise<void> {
            const validationMessage = getValidationMessage(submittedDdd);

            setSearchAttempted(true);

            if (validationMessage.length > 0) {
                setError(validationMessage);
                setResult(null);
                setLoading(false);
                return;
            }

            setLoading(true);
            setError('');
            Keyboard.dismiss();

            try {
                const data = await fetchDDDInfo(submittedDdd);

                if (!isCancelled) {
                    setResult(data);
                }
            } catch (caughtError: unknown) {
                if (!isCancelled) {
                    const message =
                        caughtError instanceof Error ? caughtError.message : 'Falha inesperada ao consultar o DDD.';
                    setResult(null);
                    setError(message);
                }
            } finally {
                if (!isCancelled) {
                    setLoading(false);
                }
            }
        }

        void runSearch();

        return () => {
            isCancelled = true;
        };
    }, [searchRequestId, submittedDdd]);

    const handleChangeDdd = (text: string): void => {
        const onlyDigits = text.replace(/\D/g, '').slice(0, 2);
        setDdd(onlyDigits);
    };

    const handleSearch = async (): Promise<void> => {
        setSubmittedDdd(ddd);
        setSearchRequestId((currentValue) => currentValue + 1);
    };

    const helperText = getHelperText(ddd);

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.keyboardAvoidingView}>
            <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                <View style={styles.heroCard}>
                    <Text style={styles.title}>Consulta de DDD</Text>
                    <Text style={styles.subtitle}>Digite 2 números e veja o estado e as cidades retornadas pela Brasil API.</Text>
                </View>

                <View style={styles.formCard}>
                    <DddInput value={ddd} onChangeText={handleChangeDdd} helperText={helperText} errorText={error} />
                    <PrimaryButton label="Buscar" onPress={handleSearch} loading={loading} />
                </View>

                {error.length > 0 ? <FeedbackCard title="Não foi possível concluir a busca" message={error} tone="error" /> : null}

                <ResultCard result={result} loading={loading} searchAttempted={searchAttempted} />
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    keyboardAvoidingView: {
        flex: 1,
    },
    content: {
        flexGrow: 1,
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.lg,
        paddingBottom: spacing.xl,
        gap: spacing.md,
    },
    heroCard: {
        borderRadius: radius.md,
        padding: spacing.md,
        backgroundColor: colors.surface,
        gap: spacing.xs,
        borderWidth: 1,
        borderColor: colors.border,
    },
    title: {
        color: colors.text,
        fontSize: 22,
        fontWeight: '700',
        lineHeight: 28,
    },
    subtitle: {
        color: colors.textMuted,
        fontSize: 13,
        lineHeight: 18,
    },
    formCard: {
        gap: spacing.md,
        borderRadius: radius.md,
        padding: spacing.md,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
    },
});