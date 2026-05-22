# Consulta de DDD com Brasil API

Aplicação mobile construída com React Native, TypeScript e Expo para consultar informações de localidades brasileiras a partir de um código DDD.

## Funcionalidades

- Campo de entrada com validação para aceitar apenas números.
- Consulta dinâmica da Brasil API em `https://brasilapi.com.br/api/ddd/v1/{ddd}`.
- Tratamento de erro para campo vazio, DDD inválido e falha de conexão.
- Estado de carregamento com `ActivityIndicator`.
- Exibição do resultado com estado, quantidade de cidades e `FlatList`.
- Interface limpa, moderna e responsiva com `SafeAreaView` e `KeyboardAvoidingView`.

## Estrutura do projeto

```bash
src/
 ├── components/
 ├── screens/
 ├── services/
 ├── types/
 └── styles/
```

### Onde cada funcionalidade foi implementada

- `App.tsx`: ponto de entrada da aplicação, com `SafeAreaProvider`, decoração visual e renderização da tela principal.
- `src/screens/HomeScreen.tsx`: controla estado, validação, efeitos com `useEffect` e fluxo de busca.
- `src/services/brasilApi.ts`: contém a chamada à Brasil API e a validação do retorno.
- `src/types/ddd.ts`: define a interface `DDDResponse`.
- `src/components/DddInput.tsx`: campo de texto com máscara numérica e mensagens de apoio/erro.
- `src/components/PrimaryButton.tsx`: botão principal com estado de loading e efeito visual.
- `src/components/FeedbackCard.tsx`: card reutilizável para mensagens amigáveis de erro ou informação.
- `src/components/ResultCard.tsx`: exibe o resultado e a lista de cidades usando `FlatList`.
- `src/styles/theme.ts`: concentra cores, espaçamentos, sombras e bordas.

## Como executar

1. Instale as dependências.

```bash
npm install
```

2. Inicie o projeto.

```bash
npx expo start
```

3. Abra no simulador, em um dispositivo físico ou no Expo Go.

## Observações técnicas

- O projeto usa TypeScript com tipagem explícita, sem `any`.
- O input aceita apenas números e limita a entrada em dois dígitos.
- O botão fica desabilitado enquanto a requisição está em andamento ou quando o DDD ainda não está completo.
- O resultado anterior é limpo quando o usuário altera o DDD, mantendo a interface coerente.

## Dependências principais

- Expo SDK 54
- React Native 0.81
- React 19
- TypeScript
- `@expo/vector-icons`