import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Input } from '@/views/components/ui/input.tsx';
import { Button } from '@/views/components/ui/button.tsx';
import { useLoginController } from '@/views/pages/Login/useLoginController.tsx';
import { motion } from 'motion/react';
import {
  TrendingUp,
  LineChart,
  Wallet,
  CreditCard,
  PieChart,
  DollarSign,
  Eye,
  EyeOff,
} from 'lucide-react';
import { Label } from '@/views/components/ui/label';
import { MyCashLogo } from '@/views/components/icons/MyCashLogo';
import { VerifyMfaDialog } from './components/VerifyMfaDialog';

export function Login() {
  const {
    handleSubmit,
    register,
    isPending,
    isMfaModalOpen,
    handleMfaModalOpenChange,
    handleMfaSubmit,
    mfaControl,
    mfaErrors,
    trustDevice,
    setTrustDevice,
    isVerifyingMfa,
  } = useLoginController();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern */}
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

      {/* Floating Background Elements */}
      <motion.div
        animate={{
          y: [0, -30, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-20 left-10 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          y: [0, 30, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-20 right-10 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl"
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
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"
      />

      {/* Floating Stats Cards */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="hidden md:block absolute left-8 top-1/4 bg-gradient-to-br from-blue-600/20 to-blue-500/10 border border-blue-500/30 rounded-2xl p-4 backdrop-blur-sm max-w-[200px]"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-blue-600 rounded-lg p-2">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Crescimento</p>
            <p className="text-lg font-bold text-foreground">+32%</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">Este mês</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="hidden md:block absolute left-12 top-1/2 bg-gradient-to-br from-green-600/20 to-green-500/10 border border-green-500/30 rounded-2xl p-4 backdrop-blur-sm max-w-[200px]"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-green-600 rounded-lg p-2">
            <LineChart className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Investimentos</p>
            <p className="text-lg font-bold text-foreground">R$ 48k</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">Total investido</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="hidden md:block absolute right-8 top-1/3 bg-gradient-to-br from-orange-600/20 to-orange-500/10 border border-orange-500/30 rounded-2xl p-4 backdrop-blur-sm max-w-[200px]"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-orange-600 rounded-lg p-2">
            <Wallet className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Carteiras</p>
            <p className="text-lg font-bold text-foreground">3</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">Ativas agora</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="hidden md:block absolute right-12 top-2/3 bg-gradient-to-br from-purple-600/20 to-purple-500/10 border border-purple-500/30 rounded-2xl p-4 backdrop-blur-sm max-w-[200px]"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-purple-600 rounded-lg p-2">
            <CreditCard className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Transações</p>
            <p className="text-lg font-bold text-foreground">142</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">Este mês</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
        className="hidden md:block absolute left-1/4 bottom-20 bg-gradient-to-br from-cyan-600/20 to-cyan-500/10 border border-cyan-500/30 rounded-2xl p-4 backdrop-blur-sm max-w-[200px]"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-cyan-600 rounded-lg p-2">
            <PieChart className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Economia</p>
            <p className="text-lg font-bold text-foreground">R$ 2.4k</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">Poupado este mês</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="hidden md:block absolute right-1/4 bottom-20 bg-gradient-to-br from-pink-600/20 to-pink-500/10 border border-pink-500/30 rounded-2xl p-4 backdrop-blur-sm max-w-[200px]"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-pink-600 rounded-lg p-2">
            <DollarSign className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Receitas</p>
            <p className="text-lg font-bold text-foreground">R$ 12.8k</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">Este mês</p>
      </motion.div>

      {/* Floating Icons - Mobile */}
      <motion.div
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="md:hidden absolute top-20 left-8 bg-blue-600/10 rounded-full p-3 backdrop-blur-sm"
      >
        <DollarSign className="w-6 h-6 text-blue-500" />
      </motion.div>

      <motion.div
        animate={{
          y: [0, 20, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="md:hidden absolute top-32 right-8 bg-orange-600/10 rounded-full p-3 backdrop-blur-sm"
      >
        <PieChart className="w-6 h-6 text-orange-500" />
      </motion.div>

      <motion.div
        animate={{
          y: [0, -15, 0],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="md:hidden absolute bottom-32 left-8 bg-green-600/10 rounded-full p-3 backdrop-blur-sm"
      >
        <TrendingUp className="w-6 h-6 text-green-500" />
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <MyCashLogo iconClassName="w-8 h-8" textClassName="text-xl font-bold" />
        </div>

        {/* Card de Login */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-card rounded-2xl p-8 border border-border shadow-2xl"
        >
          <h2 className="text-2xl font-semibold text-foreground mb-2">Bem-vindo de volta</h2>
          <p className="text-muted-foreground mb-8">Faça login para acessar sua conta</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                {...register('email')}
                required
                className="bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-foreground">
                  Senha
                </Label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-800 hover:text-blue-900 font-medium"
                >
                  Esqueci minha senha
                </Link>
              </div>
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                {...register('password')}
                required
                className="bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-blue-500"
                endAdornment={
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="inline-flex items-center justify-center rounded text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={showPassword ? 'Ocultar senha' : 'Visualizar senha'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                }
              />
            </div>

            <Button type="submit" isLoading={isPending}>
              Entrar
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Não tem uma conta?{' '}
              <Link to="/register" className="text-blue-800 hover:text-blue-900 font-medium">
                Criar conta
              </Link>
            </p>
          </div>
        </motion.div>

        {/* Quick Stats Below Form - Mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="md:hidden mt-6 grid grid-cols-3 gap-3"
        >
          <div className="bg-blue-600/10 border border-blue-500/30 rounded-xl p-3 text-center backdrop-blur-sm">
            <p className="text-2xl font-bold text-blue-500">+32%</p>
            <p className="text-xs text-muted-foreground mt-1">Crescimento</p>
          </div>
          <div className="bg-orange-600/10 border border-orange-500/30 rounded-xl p-3 text-center backdrop-blur-sm">
            <p className="text-2xl font-bold text-orange-500">3</p>
            <p className="text-xs text-muted-foreground mt-1">Carteiras</p>
          </div>
          <div className="bg-green-600/10 border border-green-500/30 rounded-xl p-3 text-center backdrop-blur-sm">
            <p className="text-2xl font-bold text-green-500">48k</p>
            <p className="text-xs text-muted-foreground mt-1">Investido</p>
          </div>
        </motion.div>
      </motion.div>

      <VerifyMfaDialog
        isMfaModalOpen={isMfaModalOpen}
        handleMfaModalOpenChange={handleMfaModalOpenChange}
        handleMfaSubmit={handleMfaSubmit}
        mfaControl={mfaControl}
        mfaErrors={mfaErrors}
        trustDevice={trustDevice}
        setTrustDevice={setTrustDevice}
        isVerifyingMfa={isVerifyingMfa}
      />
    </div>
  );
}
