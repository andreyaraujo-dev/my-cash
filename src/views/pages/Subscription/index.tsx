import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSubscription } from '@/app/hooks/useSubscription';
import { subscriptionsService } from '@/app/services/subscriptionsService';
import { useToast } from '@/app/hooks/useToast';
import { formatCurrency } from '@/app/utils/formatCurrency';
import { formatDate } from '@/app/utils/formatDate';
import { getApiErrorMessage } from '@/app/utils/getApiErrorMessage';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/views/components/ui/card';
import { Button } from '@/views/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/views/components/ui/dialog';
import { Skeleton } from '@/views/components/ui/skeleton';
import { Receipt, RotateCcw, XCircle, CreditCard } from 'lucide-react';
import { differenceInCalendarDays } from 'date-fns';
import { useAccessPolicy } from '@/app/hooks/useAccessPolicy';

export function SubscriptionPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { isRestricted } = useAccessPolicy();
  const { subscription, isLoading } = useSubscription();
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [portalLoading, setPortalLoading] = useState(false);

  useEffect(() => {
    const success = searchParams.get('success');
    const canceled = searchParams.get('canceled');

    if (success === 'true') {
      queryClient.invalidateQueries({ queryKey: ['subscription'] });
      setSearchParams({}, { replace: true });
      toast({ title: 'Assinatura ativada', description: 'Sua assinatura foi ativada com sucesso.' });
    } else if (canceled === 'true') {
      queryClient.invalidateQueries({ queryKey: ['subscription'] });
      setSearchParams({}, { replace: true });
      toast({
        title: 'Checkout cancelado',
        description: 'Você pode assinar a qualquer momento quando quiser.',
      });
    }
  }, [searchParams, setSearchParams, queryClient, toast]);

  const cancelMutation = useMutation({
    mutationFn: subscriptionsService.cancel,
    mutationKey: ['subscription', 'cancel'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscription'] });
      setCancelDialogOpen(false);
      toast({ title: 'Assinatura cancelada', description: 'Sua assinatura foi cancelada.' });
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: getApiErrorMessage(error) ?? 'Não foi possível cancelar a assinatura. Tente novamente.',
      });
    },
  });

  const handleCheckoutRedirect = async () => {
    setCheckoutLoading(true);
    try {
      const url = await subscriptionsService.createCheckoutSession();
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

  const handlePortalRedirect = async () => {
    setPortalLoading(true);
    try {
      const url = await subscriptionsService.createPortalSession();
      window.location.href = url;
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: getApiErrorMessage(error) ?? 'Não foi possível abrir o portal. Tente novamente.',
      });
      setPortalLoading(false);
    }
  };

  const handleCancelConfirm = () => {
    cancelMutation.mutate();
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 w-full max-w-2xl">
        <Skeleton className="h-32 w-full rounded-xl" />
        <Skeleton className="h-48 w-full rounded-xl" />
      </div>
    );
  }

  if (!subscription) {
    return (
      <div className="flex flex-col gap-6 w-full max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Assinatura</CardTitle>
            <CardDescription>Você ainda não possui uma assinatura ativa.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Button
              onClick={handleCheckoutRedirect}
              disabled={checkoutLoading}
              isLoading={checkoutLoading}
              className="gap-2"
            >
              <CreditCard className="h-4 w-4" />
              Assinar agora
            </Button>
            <Button variant="outline" onClick={() => navigate('/profile')}>
              Voltar ao perfil
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const referenceDate =
    subscription.isTrial && subscription.trialEndsAt
      ? subscription.trialEndsAt
      : subscription.nextRenewalAt;
  const daysLeft = differenceInCalendarDays(new Date(referenceDate), new Date());
  const daysLabel = daysLeft <= 0 ? 'Expirado' : `${daysLeft} dias restantes`;
  const canCancel = !isRestricted && subscription.isActive && !subscription.cancelRequestedAt;
  const canRenew =
    isRestricted ||
    !subscription.isActive ||
    subscription.cancelRequestedAt != null ||
    subscription.isTrial;
  const hasPaidSubscription = subscription.isActive && !subscription.isTrial;

  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl">
      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <Receipt className="h-5 w-5 text-muted-foreground" />
          <div>
            <CardTitle>Minha assinatura</CardTitle>
            <CardDescription>Detalhes e ações da sua assinatura</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {isRestricted && (
            <div className="rounded-lg border border-amber-900/50 bg-amber-900/10 p-4">
              <p className="text-sm font-medium text-amber-700">Seu período grátis terminou</p>
              <p className="text-xs text-muted-foreground mt-1">
                Assine agora para desbloquear novamente transações, contas, categorias, relatórios e
                metas.
              </p>
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-muted/50 p-4">
              <p className="text-xs text-muted-foreground">Status</p>
              <p
                className={`font-medium ${subscription.isActive ? 'text-green-600' : 'text-muted-foreground'}`}
              >
                {subscription.isTrial ? 'Trial' : subscription.isActive ? 'Ativa' : 'Cancelada'}
              </p>
            </div>
            <div className="rounded-lg bg-muted/50 p-4">
              <p className="text-xs text-muted-foreground">Valor</p>
              <p className="font-medium">{formatCurrency(subscription.value)}/mês</p>
            </div>
            <div className="rounded-lg bg-muted/50 p-4">
              <p className="text-xs text-muted-foreground">Início</p>
              <p className="font-medium">{formatDate(new Date(subscription.startDate))}</p>
            </div>
            <div className="rounded-lg bg-muted/50 p-4">
              <p className="text-xs text-muted-foreground">
                {subscription.isTrial ? 'Fim do trial' : 'Próxima renovação'}
              </p>
              <p className="font-medium">{formatDate(new Date(referenceDate))}</p>
            </div>
            <div className="rounded-lg bg-muted/50 p-4 sm:col-span-2">
              <p className="text-xs text-muted-foreground">Dias restantes</p>
              <p className="font-medium">{daysLabel}</p>
            </div>
          </div>

          {subscription.isTrial && subscription.trialEndsAt && (
            <p className="text-sm text-muted-foreground">
              Trial até {formatDate(new Date(subscription.trialEndsAt))}.
            </p>
          )}

          {subscription.cancelRequestedAt && (
            <div className="rounded-lg border border-amber-900/50 bg-amber-900/10 p-4">
              <p className="text-sm font-medium text-amber-700">Cancelamento solicitado</p>
              <p className="text-xs text-muted-foreground mt-1">
                Em {formatDate(new Date(subscription.cancelRequestedAt))}. Você pode renovar para
                continuar com acesso.
              </p>
            </div>
          )}

          <div className="flex flex-wrap gap-2 pt-2">
            {canCancel && (
              <Button
                variant="outline"
                className="gap-2 border-red-900 hover:bg-red-900/20 text-red-900"
                onClick={() => setCancelDialogOpen(true)}
              >
                <XCircle className="h-4 w-4" />
                Cancelar assinatura
              </Button>
            )}
            {canRenew && (
              <Button
                variant={isRestricted || subscription.isTrial ? 'default' : 'outline'}
                className="gap-2"
                onClick={handleCheckoutRedirect}
                disabled={checkoutLoading}
                isLoading={checkoutLoading}
              >
                {subscription.isTrial ? (
                  <CreditCard className="h-4 w-4" />
                ) : (
                  <RotateCcw className="h-4 w-4" />
                )}
                {subscription.isTrial
                  ? 'Assinar plano'
                  : isRestricted
                    ? 'Assinar agora'
                    : 'Renovar assinatura'}
              </Button>
            )}
            {hasPaidSubscription && (
              <Button
                variant="outline"
                className="gap-2"
                onClick={handlePortalRedirect}
                disabled={portalLoading}
                isLoading={portalLoading}
              >
                <CreditCard className="h-4 w-4" />
                Gerenciar no Stripe
              </Button>
            )}
            <Button variant="ghost" onClick={() => navigate('/profile')}>
              Voltar ao perfil
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <DialogContent className="rounded-2xl max-w-[90%] md:max-w-md bg-background border border-border">
          <DialogHeader>
            <DialogTitle className="text-red-900">Cancelar assinatura?</DialogTitle>
            <p className="text-sm text-muted-foreground">
              Você perderá o acesso ao plano após o período já pago. Deseja continuar?
            </p>
          </DialogHeader>
          <div className="flex gap-2">
            <Button
              className="flex-1"
              variant="destructive"
              onClick={handleCancelConfirm}
              disabled={cancelMutation.isPending}
              isLoading={cancelMutation.isPending}
            >
              Sim, cancelar
            </Button>
            <Button
              variant="outline"
              onClick={() => setCancelDialogOpen(false)}
              disabled={cancelMutation.isPending}
            >
              Não
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
