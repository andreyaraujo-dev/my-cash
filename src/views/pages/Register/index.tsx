import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Input } from '@/views/components/ui/input.tsx';
import { Button } from '@/views/components/ui/button.tsx';
import { useRegisterController } from '@/views/pages/Register/useRegisterController.tsx';
import { motion } from 'motion/react';
import { Shield, BarChart3, Zap, Users, Award, Target, Eye, EyeOff } from 'lucide-react';
import { Label } from '@/views/components/ui/label';
import { MyCashIcon } from '@/views/components/icons/MyCashIcon';

export function Register() {
  const { register, handleSubmit, isPending } = useRegisterController();
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
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-20 right-10 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"
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
        className="absolute bottom-20 left-10 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl"
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
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl"
      />

      {/* Floating Feature Cards - Desktop */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="hidden md:block absolute left-8 top-1/4 bg-gradient-to-br from-blue-600/20 to-blue-500/10 border border-blue-500/30 rounded-2xl p-4 backdrop-blur-sm max-w-[220px]"
      >
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 rounded-lg p-2">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Segurança</p>
            <p className="text-xs text-muted-foreground">Nível bancário</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="hidden md:block absolute left-12 top-1/2 bg-gradient-to-br from-green-600/20 to-green-500/10 border border-green-500/30 rounded-2xl p-4 backdrop-blur-sm max-w-[220px]"
      >
        <div className="flex items-center gap-3">
          <div className="bg-green-600 rounded-lg p-2">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Análises</p>
            <p className="text-xs text-muted-foreground">Relatórios detalhados</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="hidden md:block absolute right-8 top-1/3 bg-gradient-to-br from-orange-600/20 to-orange-500/10 border border-orange-500/30 rounded-2xl p-4 backdrop-blur-sm max-w-[220px]"
      >
        <div className="flex items-center gap-3">
          <div className="bg-orange-600 rounded-lg p-2">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Rapidez</p>
            <p className="text-xs text-muted-foreground">Configure em 2 min</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="hidden md:block absolute right-12 top-2/3 bg-gradient-to-br from-purple-600/20 to-purple-500/10 border border-purple-500/30 rounded-2xl p-4 backdrop-blur-sm max-w-[220px]"
      >
        <div className="flex items-center gap-3">
          <div className="bg-purple-600 rounded-lg p-2">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Comunidade</p>
            <p className="text-xs text-muted-foreground">+50k usuários</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
        className="hidden md:block absolute left-1/4 bottom-20 bg-gradient-to-br from-cyan-600/20 to-cyan-500/10 border border-cyan-500/30 rounded-2xl p-4 backdrop-blur-sm max-w-[220px]"
      >
        <div className="flex items-center gap-3">
          <div className="bg-cyan-600 rounded-lg p-2">
            <Award className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Confiável</p>
            <p className="text-xs text-muted-foreground">Reconhecido no mercado</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="hidden md:block absolute right-1/4 bottom-20 bg-gradient-to-br from-pink-600/20 to-pink-500/10 border border-pink-500/30 rounded-2xl p-4 backdrop-blur-sm max-w-[220px]"
      >
        <div className="flex items-center gap-3">
          <div className="bg-pink-600 rounded-lg p-2">
            <Target className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Objetivos</p>
            <p className="text-xs text-muted-foreground">Alcance suas metas</p>
          </div>
        </div>
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
        <Shield className="w-6 h-6 text-blue-500" />
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
        <Zap className="w-6 h-6 text-orange-500" />
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
        <Target className="w-6 h-6 text-green-500" />
      </motion.div>

      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 3.2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="md:hidden absolute bottom-44 right-8 bg-purple-600/10 rounded-full p-3 backdrop-blur-sm"
      >
        <Award className="w-6 h-6 text-purple-500" />
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <MyCashIcon className="w-8 h-8 text-foreground" />
          <span className="text-xl font-bold text-foreground">myCash</span>
        </div>

        {/* Card de Cadastro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-card rounded-2xl p-8 border border-border shadow-2xl"
        >
          <h2 className="text-2xl font-semibold text-foreground mb-2">Criar sua conta</h2>
          <p className="text-muted-foreground mb-8">Comece a gerenciar suas finanças hoje</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground">
                Nome completo
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Seu nome"
                {...register('name')}
                required
                autoComplete="off"
                className="bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-blue-500"
              />
            </div>

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
                autoComplete="off"
                className="bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">
                Senha
              </Label>
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                {...register('password')}
                required
                minLength={6}
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
              <p className="text-xs text-muted-foreground">Mínimo de 6 caracteres</p>
            </div>

            <Button type="submit" isLoading={isPending}>
              Criar conta
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Já tem uma conta?{' '}
              <Link to="/login" className="text-blue-800 hover:text-blue-900 font-medium">
                Fazer login
              </Link>
            </p>
          </div>
        </motion.div>

        {/* Trust Indicators Below Form - Mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="md:hidden mt-6 space-y-3"
        >
          <div className="flex items-center gap-3 bg-blue-600/10 border border-blue-500/30 rounded-xl p-3 backdrop-blur-sm">
            <Shield className="w-5 h-5 text-blue-500" />
            <div>
              <p className="text-sm text-foreground font-medium">Seguro</p>
              <p className="text-xs text-muted-foreground">Proteção de nível bancário</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-orange-600/10 border border-orange-500/30 rounded-xl p-3 text-center backdrop-blur-sm">
              <Award className="w-5 h-5 text-orange-500 mx-auto mb-1" />
              <p className="text-xs text-muted-foreground">+50k usuários</p>
            </div>
            <div className="bg-green-600/10 border border-green-500/30 rounded-xl p-3 text-center backdrop-blur-sm">
              <Zap className="w-5 h-5 text-green-500 mx-auto mb-1" />
              <p className="text-xs text-muted-foreground">Setup em 2 min</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
