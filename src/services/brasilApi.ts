import { DDDResponse } from '../types/ddd';

function isStringArray(value: unknown): value is string[] {
    return Array.isArray(value) && value.every((item) => typeof item === 'string');
}

function isDDDResponse(value: unknown): value is DDDResponse {
    if (typeof value !== 'object' || value === null) {
        return false;
    }

    const candidate: { state?: unknown; cities?: unknown } = value;

    return typeof candidate.state === 'string' && isStringArray(candidate.cities);
}

export async function fetchDDDInfo(ddd: string): Promise<DDDResponse> {
    const response = await fetch(`https://brasilapi.com.br/api/ddd/v1/${ddd}`);

    if (response.status === 404) {
        throw new Error('DDD inválido. Verifique o código digitado e tente novamente.');
    }

    if (!response.ok) {
        throw new Error('Falha ao consultar a Brasil API. Tente novamente em instantes.');
    }

    const payload: unknown = await response.json();

    if (!isDDDResponse(payload)) {
        throw new Error('A resposta da API veio em um formato inesperado.');
    }

    return payload;
}