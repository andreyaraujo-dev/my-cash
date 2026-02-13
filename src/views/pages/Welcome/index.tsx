import { useNavigate } from 'react-router-dom';
import { Button } from '@/views/components/ui/button.tsx';
import { useAuth } from '@/app/hooks/useAuth.ts';
import { motion } from 'motion/react';
import {
  PartyPopper,
  Sparkles,
  Clock,
  CreditCard,
  ArrowRight,
  CheckCircle2,
  BarChart3,
  Shield,
  Zap,
} from 'lucide-react';

export function Welcome() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const firstName = user?.name?.split(' ')[0] ?? 'Usuário';

  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Floating Background Elements */}
      <motion.div
        animate={{
          y: [0, -30, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-20 right-10 w-64 h-64 bg-green-600/5 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          y: [0, 30, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-20 left-10 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl"
      />

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg relative z-10"
      >
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg shadow-white/20">
            <span className="text-2xl font-bold text-black">S</span>
          </div>
          <h1 className="text-3xl font-bold text-white">myCash</h1>
        </div>

        {/* Welcome Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-[#1a1a1a] rounded-2xl p-8 border border-[#2a2a2a] shadow-2xl shadow-black/50"
        >
          {/* Welcome Header */}
          <div className="flex items-center gap-3 mb-2">
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
            >
              <PartyPopper className="w-8 h-8 text-yellow-400" />
            </motion.div>
            <h2 className="text-2xl font-semibold text-white">Bem-vindo, {firstName}!</h2>
          </div>
          <p className="text-gray-400 mb-8">
            Sua conta foi criada com sucesso. Estamos felizes em ter você por aqui!
          </p>

          {/* Account Info */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="bg-[#0a0a0a] rounded-xl p-4 border border-[#2a2a2a] mb-6"
          >
            <h3 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Informações da conta
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Nome</span>
                <span className="text-sm text-white font-medium">{user?.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Email</span>
                <span className="text-sm text-white font-medium">{user?.email}</span>
              </div>
            </div>
          </motion.div>

          {/* Trial Info */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="bg-gradient-to-br from-blue-600/15 to-purple-600/15 rounded-xl p-4 border border-blue-500/30 mb-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-blue-600 rounded-lg p-2">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Período Gratuito Ativo</h3>
                <p className="text-xs text-blue-300">Aproveite todos os recursos por 7 dias</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-blue-900/30 rounded-lg p-3">
              <Clock className="w-4 h-4 text-blue-400 shrink-0" />
              <p className="text-sm text-blue-200">
                Você tem <span className="font-bold text-white">7 dias grátis</span> para explorar
                todas as funcionalidades do myCash sem compromisso.
              </p>
            </div>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.8 }}
            className="mb-8"
          >
            <h3 className="text-sm font-medium text-gray-400 mb-3">O que você pode fazer:</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                <span className="text-sm text-gray-300">Controlar suas receitas e despesas</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                <span className="text-sm text-gray-300">
                  Gerenciar contas bancárias e categorias
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                <span className="text-sm text-gray-300">Visualizar relatórios detalhados</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                <span className="text-sm text-gray-300">
                  Definir e acompanhar metas financeiras
                </span>
              </div>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 1.0 }}
          >
            <Button
              onClick={() => navigate('/', { replace: true })}
              className="bg-blue-800 hover:bg-blue-900 text-white"
            >
              Ir para o Dashboard
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Bottom Feature Cards - Mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="md:hidden mt-6 grid grid-cols-3 gap-3"
        >
          <div className="bg-blue-600/10 border border-blue-500/30 rounded-xl p-3 text-center backdrop-blur-sm">
            <Shield className="w-5 h-5 text-blue-500 mx-auto mb-1" />
            <p className="text-xs text-gray-400">Seguro</p>
          </div>
          <div className="bg-green-600/10 border border-green-500/30 rounded-xl p-3 text-center backdrop-blur-sm">
            <BarChart3 className="w-5 h-5 text-green-500 mx-auto mb-1" />
            <p className="text-xs text-gray-400">Análises</p>
          </div>
          <div className="bg-orange-600/10 border border-orange-500/30 rounded-xl p-3 text-center backdrop-blur-sm">
            <Zap className="w-5 h-5 text-orange-500 mx-auto mb-1" />
            <p className="text-xs text-gray-400">Rápido</p>
          </div>
        </motion.div>

        {/* Floating Feature Cards - Desktop */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="hidden md:block absolute -left-56 top-1/4 bg-gradient-to-br from-green-600/20 to-green-500/10 border border-green-500/30 rounded-2xl p-4 backdrop-blur-sm max-w-[200px]"
        >
          <div className="flex items-center gap-3">
            <div className="bg-green-600 rounded-lg p-2">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Análises</p>
              <p className="text-xs text-gray-400">Relatórios detalhados</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="hidden md:block absolute -left-48 top-2/3 bg-gradient-to-br from-blue-600/20 to-blue-500/10 border border-blue-500/30 rounded-2xl p-4 backdrop-blur-sm max-w-[200px]"
        >
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 rounded-lg p-2">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Segurança</p>
              <p className="text-xs text-gray-400">Nível bancário</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="hidden md:block absolute -right-56 top-1/3 bg-gradient-to-br from-orange-600/20 to-orange-500/10 border border-orange-500/30 rounded-2xl p-4 backdrop-blur-sm max-w-[200px]"
        >
          <div className="flex items-center gap-3">
            <div className="bg-orange-600 rounded-lg p-2">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Rapidez</p>
              <p className="text-xs text-gray-400">Tudo em tempo real</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
