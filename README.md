# MyCash

Aplicação web para controle financeiro pessoal, integrada à [Fincheck API](../fincheck-api).

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![React](https://img.shields.io/badge/React-TypeScript-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite)

## Visão geral

O MyCash permite acompanhar contas bancárias, categorias, transações, metas, relatórios e recursos de compartilhamento. A interface também contempla notificações e acesso a planos/assinaturas quando habilitados pela API.

## Stack

- React e TypeScript
- Vite
- React Router
- Tailwind CSS e componentes shadcn/ui
- Cliente HTTP para a Fincheck API

## Configuração local

Pré-requisitos: Node.js 20+ e a [Fincheck API](../fincheck-api) em execução.

```bash
npm install
cp .env.example .env
```

Configure `VITE_API_URL` para a URL da API e `VITE_APP_URL` para a URL do frontend. `VITE_CLARITY_ID` é opcional para telemetria.

## Executando

```bash
npm run dev
```

Acesse a URL exibida pelo Vite. Para produção:

```bash
npm run build
npm run preview
```

## Fluxo de uso

1. Crie uma conta ou entre com suas credenciais.
2. Cadastre contas bancárias e categorias.
3. Registre receitas e despesas e acompanhe seus status.
4. Crie metas e visualize relatórios financeiros.
5. Use o compartilhamento com pessoas e as notificações quando disponíveis no plano.

O passo a passo completo está em [`docs/USAGE.md`](docs/USAGE.md).

## Screenshots

Coloque prints do dashboard e dos fluxos do sistema em [`assets/screenshots/`](assets/screenshots/):

```md
<!-- ![Dashboard MyCash](assets/screenshots/dashboard.png) -->
```

## Qualidade

```bash
npm run lint
npm run build
```
