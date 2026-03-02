import { useMemo } from 'react';
import {
  PREMIUM_ROUTES,
  ROUTES_ALLOWED_WHEN_RESTRICTED,
  isAllowedWhenRestricted,
} from '@/app/config/accessPolicy';
import { useSubscription } from '@/app/hooks/useSubscription';

function isDateInFuture(date: string) {
  return new Date(date).getTime() >= Date.now();
}

export function useAccessPolicy() {
  const { subscription, isLoading } = useSubscription();

  const accessPolicy = useMemo(() => {
    const trialEndsAt = subscription?.trialEndsAt;
    const isTrial = Boolean(subscription?.isTrial && trialEndsAt);
    const isTrialActive = Boolean(isTrial && trialEndsAt && isDateInFuture(trialEndsAt));
    const isTrialExpired = Boolean(isTrial && trialEndsAt && !isDateInFuture(trialEndsAt));

    const hasActiveSubscription = Boolean(subscription?.isActive && !subscription?.isTrial);
    const isRestricted = Boolean(subscription && isTrialExpired && !hasActiveSubscription);

    return {
      isTrialActive,
      isTrialExpired,
      hasActiveSubscription,
      isRestricted,
      premiumRoutes: PREMIUM_ROUTES,
      allowedRoutes: isRestricted ? ROUTES_ALLOWED_WHEN_RESTRICTED : null,
      canAccess: (pathname: string) => (isRestricted ? isAllowedWhenRestricted(pathname) : true),
    };
  }, [subscription]);

  return {
    subscription,
    isLoading,
    ...accessPolicy,
  };
}
