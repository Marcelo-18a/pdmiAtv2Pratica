# Consulta de DDD com Brasil API

Aplicação mobile construída com React Native, TypeScript e Expo para consultar informações de localidades brasileiras a partir de um código DDD.

## Estrutura do projeto

```bash
src/
 ├── components/
 ├── screens/
 ├── services/
 ├── types/
 └── styles/
```

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

- O input aceita apenas números e limita a entrada em dois dígitos.
- O botão fica desabilitado enquanto a requisição está em andamento ou quando o DDD ainda não está completo.
- O resultado anterior é limpo quando o usuário altera o DDD, mantendo a interface coerente.

## Dependências principais

- Expo SDK 54
- React Native 0.81
- React 19
- TypeScript
- `@expo/vector-icons`
