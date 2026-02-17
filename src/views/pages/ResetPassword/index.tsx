import { Link } from 'react-router-dom';
import { Input } from '@/views/components/ui/input';
import { Button } from '@/views/components/ui/button';
import { Label } from '@/views/components/ui/label';
import { useResetPasswordController } from './useResetPasswordController';
import { motion } from 'motion/react';
import { ArrowLeft, KeyRound, ShieldCheck, Lock, AlertTriangle } from 'lucide-react';

export function ResetPassword() {
  const { handleSubmit, register, errors, isPending, hasToken } = useResetPasswordController();

  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, hsl(var(--foreground)) 1px, transparent 0)',
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

      {/* Floating Cards - Desktop */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="hidden md:block absolute left-8 top-1/3 bg-gradient-to-br from-blue-600/20 to-blue-500/10 border border-blue-500/30 rounded-2xl p-4 backdrop-blur-sm max-w-[200px]"
      >
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 rounded-lg p-2">
            <KeyRound className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Nova senha</p>
            <p className="text-xs text-muted-foreground">Defina com segurança</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="hidden md:block absolute right-8 top-1/3 bg-gradient-to-br from-green-600/20 to-green-500/10 border border-green-500/30 rounded-2xl p-4 backdrop-blur-sm max-w-[200px]"
      >
        <div className="flex items-center gap-3">
          <div className="bg-green-600 rounded-lg p-2">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Protegido</p>
            <p className="text-xs text-muted-foreground">Criptografia forte</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="hidden md:block absolute left-12 top-2/3 bg-gradient-to-br from-purple-600/20 to-purple-500/10 border border-purple-500/30 rounded-2xl p-4 backdrop-blur-sm max-w-[200px]"
      >
        <div className="flex items-center gap-3">
          <div className="bg-purple-600 rounded-lg p-2">
            <Lock className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Privacidade</p>
            <p className="text-xs text-muted-foreground">Seus dados protegidos</p>
          </div>
        </div>
      </motion.div>

      {/* Floating Icons - Mobile */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="md:hidden absolute top-20 left-8 bg-blue-600/10 rounded-full p-3 backdrop-blur-sm"
      >
        <KeyRound className="w-6 h-6 text-blue-500" />
      </motion.div>

      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="md:hidden absolute top-32 right-8 bg-green-600/10 rounded-full p-3 backdrop-blur-sm"
      >
        <ShieldCheck className="w-6 h-6 text-green-500" />
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <div className="flex items-center justify-center gap-3">
          <img src="/cash-logo.svg" alt="myCash" className="w-44 h-44" />
        </div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-card rounded-2xl p-8 border border-border shadow-2xl"
        >
          {hasToken ? (
            <>
              <h2 className="text-2xl font-semibold text-foreground mb-2">Redefinir senha</h2>
              <p className="text-muted-foreground mb-8">Crie uma nova senha para sua conta.</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-foreground">
                    Nova senha
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    {...register('newPassword')}
                    required
                    className="bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-blue-500"
                  />
                  {errors.newPassword && (
                    <p className="text-sm text-red-500">{errors.newPassword.message}</p>
                  )}
                  <p className="text-xs text-muted-foreground">Mínimo de 8 caracteres</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-foreground">
                    Confirmar nova senha
                  </Label>
                  <Input
                    id="confirmNewPassword"
                    type="password"
                    placeholder="••••••••"
                    {...register('confirmNewPassword')}
                    required
                    className="bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-blue-500"
                  />
                  {errors.confirmNewPassword && (
                    <p className="text-sm text-red-500">{errors.confirmNewPassword.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  isLoading={isPending}
                >
                  Redefinir senha
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">Link inválido</h2>
              <p className="text-muted-foreground">
                Este link de recuperação é inválido ou expirou. Solicite um novo link de
                recuperação.
              </p>
            </div>
          )}

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-blue-800 hover:text-blue-900 font-medium inline-flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Voltar para o login
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
