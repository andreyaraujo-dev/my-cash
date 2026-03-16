import type { Step } from 'react-joyride';

export const TOUR_IDS = {
  HOME: 'tour-home',
  TRANSACTIONS: 'tour-transactions',
  ACCOUNTS: 'tour-accounts',
  CATEGORIES: 'tour-categories',
  REPORTS: 'tour-reports',
  GOALS: 'tour-goals',
  PROFILE: 'tour-profile',
  PEOPLE: 'tour-people',
} as const;

export const homeTourSteps: Step[] = [
  {
    target: '[data-tour="balance-card"]',
    title: 'Saldo Total',
    content:
      'Aqui você visualiza seu saldo total e pode ocultar os valores para maior privacidade.',
    disableBeacon: true,
  },
  {
    target: '[data-tour="accounts-section"]',
    title: 'Suas Contas',
    content: 'Gerencie suas contas bancárias. Adicione, edite ou acompanhe o saldo de cada uma.',
    disableBeacon: true,
  },
  {
    target: '[data-tour="recent-transactions"]',
    title: 'Transações Recentes',
    content: 'Veja suas últimas transações rapidamente e acesse a lista completa.',
    disableBeacon: true,
  },
];

export const transactionsTourSteps: Step[] = [
  {
    target: '[data-tour="new-transaction-btn"]',
    title: 'Nova Transação',
    content: 'Clique aqui para registrar uma nova receita ou despesa.',
    disableBeacon: true,
  },
  {
    target: '[data-tour="transactions-filters"]',
    title: 'Filtros',
    content: 'Use os filtros para buscar transações por período, tipo ou status.',
    disableBeacon: true,
  },
  {
    target: '[data-tour="transactions-status"]',
    title: 'Resumo',
    content: 'Acompanhe o resumo das suas despesas pagas, pendentes e o total de transações.',
    disableBeacon: true,
  },
];

export const accountsTourSteps: Step[] = [
  {
    target: '[data-tour="new-account-btn"]',
    title: 'Nova Conta',
    content:
      'Crie novas contas bancárias para organizar seu dinheiro por tipo: corrente, poupança ou investimento.',
    disableBeacon: true,
  },
  {
    target: '[data-tour="accounts-stats"]',
    title: 'Resumo por Tipo',
    content: 'Veja o resumo das suas contas por tipo: corrente, poupança e investimentos.',
    disableBeacon: true,
  },
  {
    target: '[data-tour="patrimony-card"]',
    title: 'Patrimônio',
    content: 'Acompanhe seu patrimônio total e a variação mensal.',
    disableBeacon: true,
  },
];

export const categoriesTourSteps: Step[] = [
  {
    target: '[data-tour="new-category-btn"]',
    title: 'Nova Categoria',
    content: 'Crie categorias para organizar suas receitas e despesas.',
    disableBeacon: true,
  },
  {
    target: '[data-tour="categories-summary"]',
    title: 'Resumo Geral',
    content: 'Veja o resumo: total de categorias, orçamento planejado e gastos realizados.',
    disableBeacon: true,
  },
  {
    target: '[data-tour="categories-list"]',
    title: 'Suas Categorias',
    content:
      'Cada categoria mostra seus gastos, orçamento e uma barra de progresso indicando o uso.',
    disableBeacon: true,
  },
];

export const reportsTourSteps: Step[] = [
  {
    target: '[data-tour="reports-date-range"]',
    title: 'Período',
    content: 'Selecione o período para gerar seus relatórios.',
    disableBeacon: true,
  },
  {
    target: '[data-tour="reports-metrics"]',
    title: 'Indicadores',
    content: 'Veja os indicadores financeiros: receitas, despesas, saldo médio e taxa de poupança.',
    disableBeacon: true,
  },
  {
    target: '[data-tour="reports-charts"]',
    title: 'Gráficos',
    content:
      'Analise seus dados através de gráficos de receitas vs despesas, gastos por categoria e evolução do saldo.',
    disableBeacon: true,
  },
];

export const goalsTourSteps: Step[] = [
  {
    target: '[data-tour="new-goal-btn"]',
    title: 'Nova Meta',
    content: 'Crie metas financeiras para acompanhar seus objetivos de poupança.',
    disableBeacon: true,
  },
  {
    target: '[data-tour="goals-filters"]',
    title: 'Filtros',
    content: 'Filtre suas metas por status, prioridade ou período.',
    disableBeacon: true,
  },
  {
    target: '[data-tour="goals-list"]',
    title: 'Suas Metas',
    content: 'Visualize suas metas, acompanhe o progresso e adicione valores a qualquer momento.',
    disableBeacon: true,
  },
];

export const profileTourSteps: Step[] = [
  {
    target: '[data-tour="profile-personal"]',
    title: 'Dados Pessoais',
    content: 'Edite seu nome e visualize seus dados de acesso.',
    disableBeacon: true,
  },
  {
    target: '[data-tour="profile-security"]',
    title: 'Segurança',
    content: 'Altere sua senha de acesso para manter sua conta segura.',
    disableBeacon: true,
  },
  {
    target: '[data-tour="profile-subscription"]',
    title: 'Assinatura',
    content: 'Gerencie seu plano de assinatura e acompanhe o status do trial.',
    disableBeacon: true,
  },
];

export const peopleTourSteps: Step[] = [
  {
    target: '[data-tour="new-person-btn"]',
    title: 'Convidar Pessoa',
    content: 'Convide familiares ou amigos para compartilhar o acesso à sua conta (até 4 pessoas).',
    disableBeacon: true,
  },
  {
    target: '[data-tour="people-list"]',
    title: 'Pessoas com Acesso',
    content:
      'Veja quem tem acesso à sua conta, edite níveis de permissão ou remova pessoas quando necessário.',
    disableBeacon: true,
  },
];
