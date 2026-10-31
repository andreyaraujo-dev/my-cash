# Guia de uso

## Pré-requisitos

- Node.js 20+
- Fincheck API em execução

## Preparar o ambiente

```bash
npm install
cp .env.example .env
```

Defina `VITE_API_URL` com a URL da Fincheck API e `VITE_APP_URL` com a URL deste frontend.

## Executar

```bash
npm run dev
```

Abra a URL informada pelo Vite.

## Fluxo recomendado

1. Crie uma conta ou faça login.
2. Cadastre uma conta bancária.
3. Crie categorias para receitas e despesas.
4. Registre transações e altere seus status quando necessário.
5. Acompanhe o saldo e os relatórios.
6. Crie metas e registre suas operações.
7. Configure compartilhamento, notificações ou assinatura quando esses recursos estiverem disponíveis para o usuário.

Se a tela não carregar dados, confira primeiro `VITE_API_URL`, o status da API e o token de autenticação no navegador.

## Build e pré-visualização

```bash
npm run build
npm run preview
```
