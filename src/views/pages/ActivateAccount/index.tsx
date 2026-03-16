import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Input } from '@/views/components/ui/input';
import { Button } from '@/views/components/ui/button';
import { Label } from '@/views/components/ui/label';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/views/components/ui/form';
import { useActivateAccountController } from './useActivateAccountController';
import { motion } from 'motion/react';
import { ArrowLeft, KeyRound, ShieldCheck, Lock, AlertTriangle, Eye, EyeOff } from 'lucide-react';
import { MyCashLogo } from '@/views/components/icons/MyCashLogo';

export function ActivateAccount() {
  const {
    token,
    inviteData,
    isTokenInvalid,
    isValidatingToken,
    form,
    handleSubmit,
    isPending,
  } = useActivateAccountController();

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
        animate={{ y: [0, -30, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-20 left-10 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 30, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-20 right-10 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
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
            <p className="text-sm font-semibold text-foreground">Ativar conta</p>
            <p className="text-xs text-muted-foreground">Defina sua senha</p>
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

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="flex items-center justify-center mb-8">
          <MyCashLogo iconClassName="w-8 h-8" textClassName="text-xl font-bold" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-card rounded-2xl p-8 border border-border shadow-2xl"
        >
          {isValidatingToken ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Validando link...</p>
            </div>
          ) : !token || isTokenInvalid ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">Link inválido ou expirado</h2>
              <p className="text-muted-foreground">
                Este link de ativação é inválido ou expirou. Entre em contato com quem te convidou
                para receber um novo convite.
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-semibold text-foreground mb-2">Ativar conta</h2>
              <p className="text-muted-foreground mb-6">
                Defina uma senha para acessar a conta compartilhada.
              </p>

              {inviteData && (
                <div className="mb-6 p-4 rounded-lg bg-muted/50 space-y-2">
                  <p className="text-sm text-muted-foreground">Nome</p>
                  <p className="font-medium">{inviteData.name}</p>
                  <p className="text-sm text-muted-foreground mt-2">E-mail</p>
                  <p className="font-medium">{inviteData.email}</p>
                </div>
              )}

              <Form {...form}>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <Label htmlFor="newPassword">Nova senha</Label>
                        <FormControl>
                          <Input
                            id="newPassword"
                            type={showNewPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            className="bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-blue-500"
                            endAdornment={
                              <button
                                type="button"
                                onClick={() => setShowNewPassword((prev) => !prev)}
                                className="inline-flex items-center justify-center rounded text-muted-foreground hover:text-foreground transition-colors"
                                aria-label={showNewPassword ? 'Ocultar senha' : 'Visualizar senha'}
                              >
                                {showNewPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </button>
                            }
                            {...field}
                          />
                        </FormControl>
                        <p className="text-xs text-muted-foreground">Mínimo de 8 caracteres</p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmNewPassword"
                    render={({ field }) => (
                      <FormItem>
                        <Label htmlFor="confirmNewPassword">Confirmar nova senha</Label>
                        <FormControl>
                          <Input
                            id="confirmNewPassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            className="bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-blue-500"
                            endAdornment={
                              <button
                                type="button"
                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                                className="inline-flex items-center justify-center rounded text-muted-foreground hover:text-foreground transition-colors"
                                aria-label={
                                  showConfirmPassword ? 'Ocultar senha' : 'Visualizar senha'
                                }
                              >
                                {showConfirmPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </button>
                            }
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" isLoading={isPending} className="w-full">
                    Ativar conta
                  </Button>
                </form>
              </Form>
            </>
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
