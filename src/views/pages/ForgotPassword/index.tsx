import { Link } from 'react-router-dom';
import { Input } from '@/views/components/ui/input';
import { Button } from '@/views/components/ui/button';
import { Label } from '@/views/components/ui/label';
import { useForgotPasswordController } from './useForgotPasswordController';
import { motion } from 'motion/react';
import { Mail, ArrowLeft, KeyRound, ShieldCheck, Lock } from 'lucide-react';

export function ForgotPassword() {
  const { handleSubmit, register, isPending, isEmailSent } = useForgotPasswordController();

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
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-20 left-10 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl"
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
        className="absolute bottom-20 right-10 w-80 h-80 bg-orange-600/5 rounded-full blur-3xl"
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
            <p className="text-sm font-semibold text-white">Recuperação</p>
            <p className="text-xs text-gray-400">Simples e rápida</p>
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
            <p className="text-sm font-semibold text-white">Seguro</p>
            <p className="text-xs text-gray-400">Link com validade</p>
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
            <p className="text-sm font-semibold text-white">Privacidade</p>
            <p className="text-xs text-gray-400">Seus dados protegidos</p>
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
          className="bg-[#1a1a1a] rounded-2xl p-8 border border-[#2a2a2a] shadow-2xl shadow-black/50"
        >
          {!isEmailSent ? (
            <>
              <h2 className="text-2xl font-semibold text-white mb-2">Esqueceu sua senha?</h2>
              <p className="text-gray-400 mb-8">
                Informe seu e-mail e enviaremos um link para redefinir sua senha.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-200">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    {...register('email')}
                    required
                    className="bg-[#0a0a0a] border-[#2a2a2a] text-white placeholder:text-gray-500 focus:border-blue-500"
                  />
                </div>

                <Button
                  type="submit"
                  className="bg-blue-800 hover:bg-blue-900 text-white"
                  isLoading={isPending}
                >
                  Enviar link de recuperação
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-green-500" />
              </div>
              <h2 className="text-2xl font-semibold text-white mb-2">Verifique seu e-mail</h2>
              <p className="text-gray-400 mb-2">
                Enviamos um link de recuperação para o seu e-mail. O link é válido por 1 hora.
              </p>
              <p className="text-gray-500 text-sm">
                Não recebeu? Verifique a caixa de spam ou tente novamente.
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
