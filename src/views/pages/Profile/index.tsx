import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, KeyRound, Trash2, Wallet, CreditCard, PieChart, Target, Receipt } from 'lucide-react';
import { useAuth } from '@/app/hooks/useAuth';
import { useBankAccounts } from '@/app/hooks/useBankAccounts';
import { useTransactions } from '@/app/hooks/useTransactions';
import { useGoals } from '@/app/hooks/useGoals';
import { useCategories } from '@/app/hooks/useCategories';
import { useSubscription } from '@/app/hooks/useSubscription';
import { useProfileController } from './hooks/useProfileController';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '@/app/services/authService';
import { usersService } from '@/app/services/usersService';
import { useToast } from '@/app/hooks/useToast';
import { formatCurrency } from '@/app/utils/formatCurrency';
import { formatDate } from '@/app/utils/formatDate';
import { getDaysRemaining } from '@/app/utils/getDaysRemaining';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/views/components/ui/card';
import { Button } from '@/views/components/ui/button';
import { Input } from '@/views/components/ui/input';
import { Label } from '@/views/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/views/components/ui/dialog';
import { PageTour } from '@/views/components/Tour/PageTour';
import { profileTourSteps, TOUR_IDS } from '@/views/components/Tour/tours';

export function Profile() {
  const { user, signout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [deleteAccountOpen, setDeleteAccountOpen] = useState(false);
  const [deleteAccountPassword, setDeleteAccountPassword] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameValue, setNameValue] = useState(user?.name ?? '');

  const { changePasswordForm, handleChangePassword, isChangingPassword } = useProfileController(
    () => setChangePasswordOpen(false),
  );

  const { accounts, isFetching: isLoadingAccounts } = useBankAccounts();
  const currentDate = new Date();
  const { transactions: currentMonthTransactions, isLoading: isLoadingTransactions } =
    useTransactions({
      month: currentDate.getMonth(),
      year: currentDate.getFullYear(),
    });
  const { goals, isLoading: isLoadingGoals } = useGoals({});
  const { categories, isFetching: isLoadingCategories } = useCategories();
  const { subscription, isLoading: isLoadingSubscription } = useSubscription();

  const deleteAccountMutation = useMutation({
    mutationFn: authService.deleteAccount,
    mutationKey: ['deleteAccount'],
  });

  const updateProfileMutation = useMutation({
    mutationFn: (name: string) => usersService.updateProfile({ name }),
    mutationKey: ['updateProfile'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users', 'me'] });
      toast({ title: 'Sucesso', description: 'Nome atualizado com sucesso.' });
      setIsEditingName(false);
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Não foi possível atualizar o nome. Tente novamente.',
      });
    },
  });

  const handleSaveName = () => {
    const trimmed = nameValue.trim();
    if (!trimmed) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'O nome não pode ficar em branco.',
      });
      return;
    }
    if (trimmed === user?.name) {
      setIsEditingName(false);
      return;
    }
    updateProfileMutation.mutate(trimmed);
  };

  const handleCancelEditName = () => {
    setNameValue(user?.name ?? '');
    setIsEditingName(false);
  };

  const totalPatrimony = useMemo(
    () => accounts.reduce((sum, acc) => sum + acc.currentBalance, 0),
    [accounts],
  );

  const transactionsCount = currentMonthTransactions.length;

  const handleDeleteAccount = async () => {
    const password = deleteAccountPassword.trim();
    if (!password) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Informe sua senha atual para excluir a conta.',
      });
      return;
    }
    try {
      await deleteAccountMutation.mutateAsync({ password });
      setDeleteAccountOpen(false);
      setDeleteAccountPassword('');
      signout();
      navigate('/login', { replace: true });
      toast({ title: 'Conta excluída', description: 'Sua conta foi excluída com sucesso.' });
    } catch {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Não foi possível excluir a conta. Verifique sua senha e tente novamente.',
      });
    }
  };

  const handleCloseDeleteAccountModal = () => {
    setDeleteAccountOpen(false);
    setDeleteAccountPassword('');
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl">
      {/* Seção 1 – Dados pessoais */}
      <Card data-tour="profile-personal">
        <CardHeader className="flex flex-row items-center gap-2">
          <User className="h-5 w-5 text-muted-foreground" />
          <div>
            <CardTitle>Dados pessoais</CardTitle>
            <CardDescription>Informações da sua conta</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-muted-foreground">Nome</Label>
            {isEditingName ? (
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <Input
                  value={nameValue}
                  onChange={(e) => setNameValue(e.target.value)}
                  placeholder="Seu nome"
                  className="text-lg"
                />
                <div className="flex gap-2">
                  <Button
                    onClick={handleSaveName}
                    disabled={updateProfileMutation.isPending}
                    isLoading={updateProfileMutation.isPending}
                  >
                    Salvar
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleCancelEditName}
                    disabled={updateProfileMutation.isPending}
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <p className="text-lg font-medium">{user?.name ?? '—'}</p>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setNameValue(user?.name ?? '');
                    setIsEditingName(true);
                  }}
                  className="w-auto"
                >
                  Editar
                </Button>
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Label className="text-muted-foreground">E-mail</Label>
            <p className="text-lg font-medium text-muted-foreground opacity-70 select-none cursor-default">
              {user?.email ?? '—'}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Seção 2 – Segurança */}
      <Card data-tour="profile-security">
        <CardHeader className="flex flex-row items-center gap-2">
          <KeyRound className="h-5 w-5 text-muted-foreground" />
          <div>
            <CardTitle>Segurança</CardTitle>
            <CardDescription>Altere sua senha de acesso</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Button variant="outline" onClick={() => setChangePasswordOpen(true)}>
            Alterar senha
          </Button>
        </CardContent>
      </Card>

      {/* Seção – Assinatura */}
      <Card data-tour="profile-subscription">
        <CardHeader className="flex flex-row items-center gap-2">
          <Receipt className="h-5 w-5 text-muted-foreground" />
          <div>
            <CardTitle>Assinatura</CardTitle>
            <CardDescription>Gerencie sua assinatura do plano</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoadingSubscription ? (
            <p className="text-muted-foreground">Carregando...</p>
          ) : subscription ? (
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`text-sm font-medium ${subscription.isActive ? 'text-green-600' : 'text-muted-foreground'}`}
                >
                  {subscription.isTrial ? 'Trial' : subscription.isActive ? 'Ativa' : 'Cancelada'}
                </span>
                <span className="text-muted-foreground">·</span>
                <span className="text-sm">{formatCurrency(subscription.value)}/mês</span>
              </div>
              {subscription.isTrial && subscription.trialEndsAt ? (
                <p className="text-sm text-muted-foreground">
                  Trial até {formatDate(new Date(subscription.trialEndsAt))}
                  {getDaysRemaining(subscription.trialEndsAt) > 0 &&
                    ` (${getDaysRemaining(subscription.trialEndsAt)} dias restantes)`}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Próxima renovação: {formatDate(new Date(subscription.nextRenewalAt))}
                  {getDaysRemaining(subscription.nextRenewalAt) > 0 &&
                    ` (${getDaysRemaining(subscription.nextRenewalAt)} dias restantes)`}
                </p>
              )}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Você ainda não possui uma assinatura ativa.</p>
          )}
          <Button variant="outline" onClick={() => navigate('/profile/subscription')}>
            Gerenciar assinatura
          </Button>
        </CardContent>
      </Card>

      <Dialog open={changePasswordOpen} onOpenChange={setChangePasswordOpen}>
        <DialogContent className="rounded-2xl max-w-[90%] md:max-w-md bg-zinc-950 border border-zinc-800">
          <DialogHeader>
            <DialogTitle>Alterar senha</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Senha atual</Label>
              <Input
                id="currentPassword"
                type="password"
                placeholder="Senha atual"
                {...changePasswordForm.register('currentPassword')}
              />
              {changePasswordForm.formState.errors.currentPassword && (
                <p className="text-sm text-destructive">
                  {changePasswordForm.formState.errors.currentPassword.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">Nova senha</Label>
              <Input
                id="newPassword"
                type="password"
                placeholder="Nova senha"
                {...changePasswordForm.register('newPassword')}
              />
              {changePasswordForm.formState.errors.newPassword && (
                <p className="text-sm text-destructive">
                  {changePasswordForm.formState.errors.newPassword.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmNewPassword">Confirmar nova senha</Label>
              <Input
                id="confirmNewPassword"
                type="password"
                placeholder="Confirmar nova senha"
                {...changePasswordForm.register('confirmNewPassword')}
              />
              {changePasswordForm.formState.errors.confirmNewPassword && (
                <p className="text-sm text-destructive">
                  {changePasswordForm.formState.errors.confirmNewPassword.message}
                </p>
              )}
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setChangePasswordOpen(false)}
                disabled={isChangingPassword}
              >
                Cancelar
              </Button>
              <Button type="submit" isLoading={isChangingPassword}>
                Salvar
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Seção 3 – Conta */}
      <Card>
        <CardHeader>
          <CardTitle>Conta</CardTitle>
          <CardDescription>Resumo da sua conta e ações irreversíveis</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-3">Resumo da sua conta</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Wallet className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Contas bancárias</p>
                  <p className="text-lg font-semibold">
                    {isLoadingAccounts ? '—' : accounts.length}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <CreditCard className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Patrimônio total</p>
                  <p className="text-lg font-semibold">
                    {isLoadingAccounts ? '—' : formatCurrency(totalPatrimony)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <CreditCard className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Transações este mês</p>
                  <p className="text-lg font-semibold">
                    {isLoadingTransactions ? '—' : transactionsCount}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Target className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Metas ativas</p>
                  <p className="text-lg font-semibold">{isLoadingGoals ? '—' : goals.length}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 sm:col-span-2">
                <PieChart className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Categorias cadastradas</p>
                  <p className="text-lg font-semibold">
                    {isLoadingCategories ? '—' : categories.length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground mb-2">Zona de perigo</p>
            <Button
              variant="outline"
              onClick={() => setDeleteAccountOpen(true)}
              className="gap-2 border-red-900 hover:bg-red-900/20 text-red-900"
            >
              <Trash2 className="h-4 w-4" />
              Excluir conta
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={deleteAccountOpen}
        onOpenChange={(open) => !open && handleCloseDeleteAccountModal()}
      >
        <DialogContent className="rounded-2xl max-w-[90%] md:max-w-md bg-zinc-950 border border-zinc-800">
          <DialogHeader>
            <DialogTitle className="text-red-900">Excluir conta?</DialogTitle>
            <p className="text-sm text-muted-foreground">
              Esta ação é irreversível. Todos os seus dados serão perdidos. Digite sua senha atual
              para confirmar.
            </p>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="deleteAccountPassword">Senha atual</Label>
              <Input
                id="deleteAccountPassword"
                type="password"
                placeholder="Sua senha"
                value={deleteAccountPassword}
                onChange={(e) => setDeleteAccountPassword(e.target.value)}
                disabled={deleteAccountMutation.isPending}
              />
            </div>
            <div className="flex gap-2">
              <Button
                className="flex-1"
                variant="destructive"
                onClick={handleDeleteAccount}
                disabled={deleteAccountMutation.isPending || !deleteAccountPassword.trim()}
                isLoading={deleteAccountMutation.isPending}
              >
                Sim, desejo excluir
              </Button>
              <Button
                variant="outline"
                onClick={handleCloseDeleteAccountModal}
                disabled={deleteAccountMutation.isPending}
              >
                Cancelar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <PageTour tourId={TOUR_IDS.PROFILE} steps={profileTourSteps} />
    </div>
  );
}
