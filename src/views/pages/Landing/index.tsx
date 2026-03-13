import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import { useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  CreditCard,
  DollarSign,
  Home,
  Layers,
  Menu,
  PieChart,
  Sparkles,
  Target,
  TrendingUp,
  UserPlus,
  Wallet,
  X,
  Zap,
} from 'lucide-react';
import { MyCashLogo } from '@/views/components/icons/MyCashLogo';

export function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const navBg = useTransform(scrollYProgress, [0, 0.05], [0.92, 1]);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden w-full">
      {/* ========== NAVBAR ========== */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-border/50">
        <motion.div
          style={{ opacity: navBg }}
          className="absolute inset-0 bg-background/95 backdrop-blur-xl"
        />
        <div className="relative max-w-7xl mx-auto flex items-center justify-between px-6 h-16 lg:h-20">
          <Link to="/" className="shrink-0 text-foreground">
            <MyCashLogo iconClassName="w-8 h-8" textClassName="text-xl font-bold" />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <button
              type="button"
              onClick={() => scrollTo('features')}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Funcionalidades
            </button>
            <button
              type="button"
              onClick={() => scrollTo('how-it-works')}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Como funciona
            </button>
            <button
              type="button"
              onClick={() => scrollTo('pricing')}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Preços
            </button>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/login"
              className="text-sm text-foreground hover:text-foreground transition-colors px-5 py-2.5 border border-border bg-card/90 hover:bg-accent rounded-lg font-medium"
            >
              Entrar
            </Link>
            <Link
              to="/register"
              className="text-sm bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2.5 rounded-lg transition-colors font-medium"
            >
              Criar conta grátis
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-muted-foreground hover:text-foreground p-2"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border/50 px-6 pb-6 pt-4 space-y-4"
          >
            <button
              type="button"
              onClick={() => scrollTo('features')}
              className="block w-full text-left text-muted-foreground hover:text-foreground py-2"
            >
              Funcionalidades
            </button>
            <button
              type="button"
              onClick={() => scrollTo('how-it-works')}
              className="block w-full text-left text-muted-foreground hover:text-foreground py-2"
            >
              Como funciona
            </button>
            <button
              type="button"
              onClick={() => scrollTo('pricing')}
              className="block w-full text-left text-muted-foreground hover:text-foreground py-2"
            >
              Preços
            </button>
            <div className="flex flex-col gap-3 pt-2">
              <Link
                to="/login"
                className="text-center text-foreground border border-border bg-card rounded-lg py-2.5 hover:bg-accent transition-colors font-medium"
              >
                Entrar
              </Link>
              <Link
                to="/register"
                className="text-center bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg py-2.5 font-medium transition-colors"
              >
                Criar conta grátis
              </Link>
            </div>
          </motion.div>
        )}
      </nav>

      {/* ========== HERO ========== */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
        {/* Dot pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 2px 2px, hsl(var(--foreground)) 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        {/* Animated blobs */}
        <motion.div
          animate={{ y: [0, -40, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 left-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 40, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-3xl"
        />

        {/* Floating stat cards — desktop */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="hidden lg:block absolute left-8 top-[28%] bg-gradient-to-br from-blue-600/20 to-blue-500/10 border border-blue-500/30 rounded-2xl p-4 backdrop-blur-sm max-w-[200px]"
        >
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 rounded-lg p-2">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Crescimento</p>
              <p className="text-lg font-bold text-foreground">+32%</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="hidden lg:block absolute left-12 top-[55%] bg-gradient-to-br from-green-600/20 to-green-500/10 border border-green-500/30 rounded-2xl p-4 backdrop-blur-sm max-w-[200px]"
        >
          <div className="flex items-center gap-3">
            <div className="bg-green-600 rounded-lg p-2">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Economia</p>
              <p className="text-lg font-bold text-foreground">R$ 2.4k</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="hidden lg:block absolute right-8 top-[30%] bg-gradient-to-br from-orange-600/20 to-orange-500/10 border border-orange-500/30 rounded-2xl p-4 backdrop-blur-sm max-w-[200px]"
        >
          <div className="flex items-center gap-3">
            <div className="bg-orange-600 rounded-lg p-2">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Carteiras</p>
              <p className="text-lg font-bold text-foreground">3 ativas</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="hidden lg:block absolute right-12 top-[60%] bg-gradient-to-br from-purple-600/20 to-purple-500/10 border border-purple-500/30 rounded-2xl p-4 backdrop-blur-sm max-w-[200px]"
        >
          <div className="flex items-center gap-3">
            <div className="bg-purple-600 rounded-lg p-2">
              <CreditCard className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Transações</p>
              <p className="text-lg font-bold text-foreground">142</p>
            </div>
          </div>
        </motion.div>

        {/* Hero content */}
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-blue-600/15 border border-blue-500/30 rounded-full px-4 py-1.5 mb-8"
            >
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-600 dark:text-blue-300 font-medium">
                7 dias grátis para experimentar
              </span>
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight tracking-tight mb-6"
          >
            Controle suas finanças{' '}
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              de forma inteligente
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Gerencie receitas, despesas, metas e investimentos em um só lugar. Tenha o controle
            total da sua vida financeira com dashboards intuitivos e relatórios detalhados.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/register"
              className="group flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3.5 rounded-xl transition-all font-semibold text-base shadow-lg shadow-primary/30 hover:shadow-primary/50"
            >
              Comece grátis
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/login"
              className="flex items-center gap-2 border border-border hover:border-muted-foreground text-muted-foreground hover:text-foreground px-8 py-3.5 rounded-xl transition-all font-medium text-base"
            >
              Já tenho conta
            </Link>
          </motion.div>

          {/* Mobile floating badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="lg:hidden mt-10 grid grid-cols-3 gap-3"
          >
            <div className="bg-blue-600/10 border border-blue-500/30 rounded-xl p-3 text-center backdrop-blur-sm">
              <p className="text-xl font-bold text-blue-400">+32%</p>
              <p className="text-xs text-muted-foreground mt-1">Crescimento</p>
            </div>
            <div className="bg-orange-600/10 border border-orange-500/30 rounded-xl p-3 text-center backdrop-blur-sm">
              <p className="text-xl font-bold text-orange-400">3</p>
              <p className="text-xs text-muted-foreground mt-1">Carteiras</p>
            </div>
            <div className="bg-green-600/10 border border-green-500/30 rounded-xl p-3 text-center backdrop-blur-sm">
              <p className="text-xl font-bold text-green-400">2.4k</p>
              <p className="text-xs text-muted-foreground mt-1">Economia</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== HOW IT WORKS ========== */}
      <section id="how-it-works" className="relative py-24 lg:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-sm text-blue-400 font-semibold tracking-wider uppercase">
              Simples e rápido
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4">Como funciona?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              Comece a organizar suas finanças em apenas 3 passos simples.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                icon: UserPlus,
                color: 'blue',
                title: 'Crie sua conta',
                desc: 'Cadastre-se gratuitamente em menos de 1 minuto e comece seu trial de 7 dias.',
              },
              {
                step: '02',
                icon: Wallet,
                color: 'green',
                title: 'Adicione suas contas',
                desc: 'Configure suas contas bancárias e categorize receitas e despesas.',
              },
              {
                step: '03',
                icon: BarChart3,
                color: 'orange',
                title: 'Acompanhe tudo',
                desc: 'Visualize dashboards, relatórios e acompanhe suas metas em tempo real.',
              },
            ].map((item, i) => {
              const colorMap: Record<
                string,
                { bg: string; border: string; text: string; glow: string }
              > = {
                blue: {
                  bg: 'bg-blue-600',
                  border: 'border-blue-500/30',
                  text: 'text-blue-400',
                  glow: 'from-blue-600/20 to-blue-500/5',
                },
                green: {
                  bg: 'bg-green-600',
                  border: 'border-green-500/30',
                  text: 'text-green-400',
                  glow: 'from-green-600/20 to-green-500/5',
                },
                orange: {
                  bg: 'bg-orange-600',
                  border: 'border-orange-500/30',
                  text: 'text-orange-400',
                  glow: 'from-orange-600/20 to-orange-500/5',
                },
              };
              const c = colorMap[item.color];
              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className={`relative bg-gradient-to-br ${c.glow} border ${c.border} rounded-2xl p-8 backdrop-blur-sm`}
                >
                  <span
                    className={`text-6xl font-black ${c.text} opacity-20 absolute top-4 right-6`}
                  >
                    {item.step}
                  </span>
                  <div className={`${c.bg} rounded-xl p-3 w-fit mb-5`}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== FEATURES ========== */}
      <section id="features" className="relative py-24 lg:py-32 px-6">
        {/* Subtle blob */}
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl"
        />

        <div className="relative max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-sm text-blue-400 font-semibold tracking-wider uppercase">
              Tudo que você precisa
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4">
              Funcionalidades completas
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              Ferramentas poderosas para você ter o controle total das suas finanças.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Home,
                color: 'blue',
                title: 'Dashboard completo',
                desc: 'Visão geral das suas finanças com saldo, contas e transações recentes.',
              },
              {
                icon: CreditCard,
                color: 'purple',
                title: 'Controle de transações',
                desc: 'Registre receitas e despesas com categorias, filtros e recorrências.',
              },
              {
                icon: Layers,
                color: 'orange',
                title: 'Categorias personalizadas',
                desc: 'Organize seus gastos com categorias criadas por você.',
              },
              {
                icon: PieChart,
                color: 'cyan',
                title: 'Relatórios detalhados',
                desc: 'Gráficos de evolução do saldo, despesas por categoria e receitas vs despesas.',
              },
              {
                icon: Target,
                color: 'green',
                title: 'Metas financeiras',
                desc: 'Defina objetivos e acompanhe seu progresso até alcançá-los.',
              },
              {
                icon: Wallet,
                color: 'pink',
                title: 'Múltiplas contas',
                desc: 'Gerencie diversas contas bancárias e veja o patrimônio total.',
              },
            ].map((item, i) => {
              const colorMap: Record<
                string,
                { bg: string; border: string; gradFrom: string; gradTo: string }
              > = {
                blue: {
                  bg: 'bg-blue-600',
                  border: 'border-blue-500/20',
                  gradFrom: 'from-blue-600/10',
                  gradTo: 'to-transparent',
                },
                purple: {
                  bg: 'bg-purple-600',
                  border: 'border-purple-500/20',
                  gradFrom: 'from-purple-600/10',
                  gradTo: 'to-transparent',
                },
                orange: {
                  bg: 'bg-orange-600',
                  border: 'border-orange-500/20',
                  gradFrom: 'from-orange-600/10',
                  gradTo: 'to-transparent',
                },
                cyan: {
                  bg: 'bg-cyan-600',
                  border: 'border-cyan-500/20',
                  gradFrom: 'from-cyan-600/10',
                  gradTo: 'to-transparent',
                },
                green: {
                  bg: 'bg-green-600',
                  border: 'border-green-500/20',
                  gradFrom: 'from-green-600/10',
                  gradTo: 'to-transparent',
                },
                pink: {
                  bg: 'bg-pink-600',
                  border: 'border-pink-500/20',
                  gradFrom: 'from-pink-600/10',
                  gradTo: 'to-transparent',
                },
              };
              const c = colorMap[item.color];
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`group bg-card border ${c.border} rounded-2xl p-6 hover:border-opacity-50 transition-all relative overflow-hidden`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${c.gradFrom} ${c.gradTo} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />
                  <div className="relative">
                    <div className={`${c.bg} rounded-xl p-3 w-fit mb-4`}>
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== PRICING ========== */}
      <section id="pricing" className="relative py-24 lg:py-32 px-6">
        <div className="max-w-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-sm text-blue-400 font-semibold tracking-wider uppercase">
              Simples e transparente
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4">Preços</h2>
            <p className="text-muted-foreground max-w-md mx-auto text-lg">
              Um único plano com tudo incluso. Comece grátis, pague somente quando quiser continuar.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* Glow effect behind card */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 rounded-3xl blur-xl opacity-60" />

            <div className="relative bg-card border border-border rounded-2xl p-8 sm:p-10 overflow-hidden">
              {/* Corner glow */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <Sparkles className="w-6 h-6 text-blue-400" />
                  </motion.div>
                  <span className="bg-blue-600/15 border border-blue-500/30 text-blue-600 dark:text-blue-300 text-sm font-semibold px-3 py-1 rounded-full">
                    7 dias grátis
                  </span>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-1">Plano Completo</h3>
                  <p className="text-muted-foreground text-sm">Acesso a todas as funcionalidades</p>
                </div>

                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-sm text-muted-foreground">R$</span>
                  <span className="text-5xl font-black">9</span>
                  <span className="text-2xl font-bold">,90</span>
                  <span className="text-muted-foreground ml-1">/mês</span>
                </div>

                <div className="space-y-4 mb-8">
                  {[
                    'Dashboard completo com visão geral',
                    'Transações ilimitadas',
                    'Categorias personalizadas',
                    'Relatórios e gráficos detalhados',
                    'Metas financeiras',
                    'Múltiplas contas bancárias',
                    'Exportação de relatórios',
                    'Suporte prioritário',
                  ].map((benefit) => (
                    <div key={benefit} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                      <span className="text-muted-foreground text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>

                <Link
                  to="/register"
                  className="flex items-center justify-center gap-2 w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3.5 rounded-xl transition-colors font-semibold text-base shadow-lg shadow-primary/30"
                >
                  Comece seu trial grátis
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <p className="text-center text-xs text-muted-foreground mt-4">
                  Sem compromisso. Cancele a qualquer momento.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section className="relative py-24 lg:py-32 px-6 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl"
        />

        <div className="relative max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 mb-6">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span className="text-sm text-yellow-600 dark:text-yellow-300 font-medium">
                Comece agora mesmo
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Pronto para transformar sua{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                vida financeira
              </span>
              ?
            </h2>

            <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
              Junte-se a milhares de pessoas que já organizam suas finanças com o myCash. Comece
              grátis hoje mesmo.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/register"
                className="group flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3.5 rounded-xl transition-all font-semibold text-base shadow-lg shadow-primary/30 hover:shadow-primary/50"
              >
                Criar conta grátis
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/login"
                className="flex items-center gap-2 border border-border hover:border-muted-foreground text-muted-foreground hover:text-foreground px-8 py-3.5 rounded-xl transition-all font-medium text-base"
              >
                Entrar na minha conta
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="border-t border-border py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <MyCashLogo iconClassName="w-7 h-7" textClassName="text-lg font-bold" />
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <button
              type="button"
              onClick={() => scrollTo('features')}
              className="hover:text-muted-foreground transition-colors"
            >
              Funcionalidades
            </button>
            <button
              type="button"
              onClick={() => scrollTo('pricing')}
              className="hover:text-muted-foreground transition-colors"
            >
              Preços
            </button>
            <Link to="/login" className="hover:text-muted-foreground transition-colors">
              Entrar
            </Link>
          </div>

          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} myCash. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
