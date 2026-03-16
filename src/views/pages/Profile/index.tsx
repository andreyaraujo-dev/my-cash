import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  KeyRound,
  Trash2,
  Wallet,
  CreditCard,
  PieChart,
  Target,
  Receipt,
} from 'lucide-react';
import { useAuth } from '@/app/hooks/useAuth';
import { useBankAccounts } from '@/app/hooks/useBankAccounts';
import { useTransactions } from '@/app/hooks/useTransactions';
import { useGoals } from '@/app/hooks/useGoals';
import { useCategories } from '@/app/hooks/useCategories';
import { useSubscription } from '@/app/hooks/useSubscription';
import { useAccessPolicy } from '@/app/hooks/useAccessPolicy';
import { useProfileController } from './hooks/useProfileController';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '@/app/services/authService';
import { usersService } from '@/app/services/usersService';
import { subscriptionsService } from '@/app/services/subscriptionsService';
import type { Plan } from '@/app/entities/Plan';
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
import { PageTour } from '@/views/components/Tour/PageTour';
import { profileTourSteps, TOUR_IDS } from '@/views/components/Tour/tours';
import { useGetMe } from '@/app/hooks/useGetMe';
import { getApiErrorMessage } from '@/app/utils/getApiErrorMessage';
import { MfaSetupDialog } from './components/MfaSetupDialog';
import { MfaDisableDialog } from './components/MfaDisableDialog';
import { ConfirmDeleteAccountDialog } from './components/ConfirmDeleteAccountDialog';
import { ChangePasswordDialog } from './components/ChangePasswordDialog';
import { ChoosePlanModal } from '@/views/components/ChoosePlanModal';

export function Profile() {
  const { user, signout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [deleteAccountOpen, setDeleteAccountOpen] = useState(false);
  const [deleteAccountPassword, setDeleteAccountPassword] = useState('');
  const [showDeleteAccountPassword, setShowDeleteAccountPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [showMfaDisablePassword, setShowMfaDisablePassword] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameValue, setNameValue] = useState(user?.name ?? '');
  const [mfaSetupOpen, setMfaSetupOpen] = useState(false);
  const [mfaDisableOpen, setMfaDisableOpen] = useState(false);
  const [choosePlanModalOpen, setChoosePlanModalOpen] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [mfaQrCodeDataUrl, setMfaQrCodeDataUrl] = useState('');
  const [mfaSetupToken, setMfaSetupToken] = useState('');
  const [mfaDisablePassword, setMfaDisablePassword] = useState('');

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
  const { isRestricted } = useAccessPolicy();

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

  const mfaSetupMutation = useMutation({
    mutationFn: authService.mfaSetup,
    mutationKey: ['mfaSetup'],
  });

  const mfaVerifySetupMutation = useMutation({
    mutationFn: authService.mfaVerifySetup,
    mutationKey: ['mfaVerifySetup'],
  });

  const mfaDisableMutation = useMutation({
    mutationFn: authService.mfaDisable,
    mutationKey: ['mfaDisable'],
  });

  const { refetch: refetchMe } = useGetMe(!!user);

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

  const handleSelectPlan = async (plan: Plan) => {
    setCheckoutLoading(true);
    try {
      const url = await subscriptionsService.createCheckoutSession(plan.id);
      window.location.href = url;
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: getApiErrorMessage(error) ?? 'Não foi possível iniciar o checkout. Tente novamente.',
      });
      setCheckoutLoading(false);
    }
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

  const handleOpenMfaSetup = async () => {
    setMfaSetupOpen(true);
    setMfaSetupToken('');
    setMfaQrCodeDataUrl('');

    try {
      const { qrCodeDataUrl } = await mfaSetupMutation.mutateAsync();
      setMfaQrCodeDataUrl(qrCodeDataUrl);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: getApiErrorMessage(error) ?? 'Não foi possível iniciar a configuração do MFA.',
      });
    }
  };

  const handleCloseMfaSetupModal = () => {
    if (mfaSetupMutation.isPending || mfaVerifySetupMutation.isPending) {
      return;
    }

    setMfaSetupOpen(false);
    setMfaSetupToken('');
    setMfaQrCodeDataUrl('');
  };

  const handleConfirmMfaSetup = async () => {
    const token = mfaSetupToken.trim();
    if (!/^\d{6}$/.test(token)) {
      toast({
        variant: 'destructive',
        title: 'Código inválido',
        description: 'Informe um código MFA de 6 dígitos.',
      });
      return;
    }

    try {
      await mfaVerifySetupMutation.mutateAsync({ token });
      await refetchMe();
      setMfaSetupOpen(false);
      setMfaSetupToken('');
      setMfaQrCodeDataUrl('');
      queryClient.invalidateQueries({ queryKey: ['users', 'me'] });
      toast({ title: 'MFA habilitado', description: 'A autenticação em duas etapas foi ativada.' });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: getApiErrorMessage(error) ?? 'Não foi possível validar o código MFA.',
      });
    }
  };

  const handleCloseMfaDisableModal = () => {
    if (mfaDisableMutation.isPending) {
      return;
    }

    setMfaDisableOpen(false);
    setMfaDisablePassword('');
    setShowMfaDisablePassword(false);
  };

  const handleDisableMfa = async () => {
    const password = mfaDisablePassword.trim();
    if (!password) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Informe sua senha para desabilitar o MFA.',
      });
      return;
    }

    try {
      await mfaDisableMutation.mutateAsync({ password });
      await refetchMe();
      handleCloseMfaDisableModal();
      queryClient.invalidateQueries({ queryKey: ['users', 'me'] });
      toast({
        title: 'MFA desabilitado',
        description: 'A autenticação em duas etapas foi desativada.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description:
          getApiErrorMessage(error) ?? 'Não foi possível desabilitar o MFA. Verifique sua senha.',
      });
    }
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
            <CardDescription>Altere sua senha e configure seu MFA</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button className="w-auto" variant="outline" onClick={() => setChangePasswordOpen(true)}>
            Alterar senha
          </Button>

          <div className="rounded-lg bg-muted/50 p-4 border border-border">
            <div className="space-y-1">
              <p className="font-medium">MFA por aplicativo</p>
              <p className="text-sm text-muted-foreground">
                Status atual: {user?.isMfaEnabled ? 'habilitado' : 'desabilitado'}
              </p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {!user?.isMfaEnabled ? (
                <Button
                  className="w-auto"
                  variant="outline"
                  onClick={handleOpenMfaSetup}
                  isLoading={mfaSetupMutation.isPending}
                >
                  Habilitar MFA por app
                </Button>
              ) : (
                <Button
                  className="w-auto"
                  variant="outline"
                  onClick={() => setMfaDisableOpen(true)}
                >
                  Desabilitar MFA
                </Button>
              )}
            </div>
          </div>
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
                <span className="text-sm font-medium">
                  Plano {subscription.plan === 'PREMIUM' ? 'Premium' : 'Basic'}
                </span>
                <span className="text-muted-foreground">·</span>
                <span className="text-sm">
                  {subscription.isTrial ? 'Gratuito' : `${formatCurrency(subscription.value)}/mês`}
                </span>
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
            <p className="text-sm text-muted-foreground">
              Você ainda não possui uma assinatura ativa.
            </p>
          )}
          <div className="flex flex-wrap gap-2">
            {(isRestricted || !subscription?.isActive) && (
              <Button
                onClick={() => setChoosePlanModalOpen(true)}
                disabled={checkoutLoading}
                isLoading={checkoutLoading}
              >
                Assinar
              </Button>
            )}
            {subscription?.isActive && !subscription.isTrial && (
              <>
                {subscription.plan === 'BASIC' && (
                  <Button onClick={() => navigate('/profile/subscription?upgrade=premium')}>
                    Fazer upgrade para Premium
                  </Button>
                )}
                {subscription.plan === 'PREMIUM' && (
                  <Button
                    variant="outline"
                    onClick={() => navigate('/profile/subscription?downgrade=basic')}
                  >
                    Voltar para Basic
                  </Button>
                )}
              </>
            )}
            <Button variant="outline" onClick={() => navigate('/profile/subscription')}>
              Gerenciar assinatura
            </Button>
          </div>
        </CardContent>
      </Card>

      <ChangePasswordDialog
        open={changePasswordOpen}
        onOpenChange={setChangePasswordOpen}
        onSubmit={handleChangePassword}
        form={changePasswordForm}
        isChangingPassword={isChangingPassword}
        showCurrentPassword={showCurrentPassword}
        setShowCurrentPassword={setShowCurrentPassword}
        showNewPassword={showNewPassword}
        setShowNewPassword={setShowNewPassword}
        showConfirmNewPassword={showConfirmNewPassword}
        setShowConfirmNewPassword={setShowConfirmNewPassword}
      />

      <MfaSetupDialog
        open={mfaSetupOpen}
        onOpenChange={handleCloseMfaSetupModal}
        qrCodeDataUrl={mfaQrCodeDataUrl}
        mfaSetupToken={mfaSetupToken}
        setMfaSetupToken={setMfaSetupToken}
        isLoadingSetup={mfaSetupMutation.isPending}
        isVerifyingSetup={mfaVerifySetupMutation.isPending}
        onRetrySetup={handleOpenMfaSetup}
        onConfirmSetup={handleConfirmMfaSetup}
      />

      <MfaDisableDialog
        open={mfaDisableOpen}
        onOpenChange={handleCloseMfaDisableModal}
        mfaDisablePassword={mfaDisablePassword}
        setMfaDisablePassword={setMfaDisablePassword}
        showMfaDisablePassword={showMfaDisablePassword}
        setShowMfaDisablePassword={setShowMfaDisablePassword}
        isDisablingMfa={mfaDisableMutation.isPending}
        onDisableMfa={handleDisableMfa}
      />

      <ChoosePlanModal
        open={choosePlanModalOpen}
        onOpenChange={setChoosePlanModalOpen}
        onSelectPlan={handleSelectPlan}
        isLoading={checkoutLoading}
      />

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

      <ConfirmDeleteAccountDialog
        open={deleteAccountOpen}
        onOpenChange={(open) => !open && handleCloseDeleteAccountModal()}
        deleteAccountPassword={deleteAccountPassword}
        setDeleteAccountPassword={setDeleteAccountPassword}
        showDeleteAccountPassword={showDeleteAccountPassword}
        setShowDeleteAccountPassword={setShowDeleteAccountPassword}
        isDeletingAccount={deleteAccountMutation.isPending}
        onDeleteAccount={handleDeleteAccount}
        onClose={handleCloseDeleteAccountModal}
      />

      <PageTour tourId={TOUR_IDS.PROFILE} steps={profileTourSteps} />
    </div>
  );
}
