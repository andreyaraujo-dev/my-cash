import { useEffect, useState } from 'react';
import Clarity from '@microsoft/clarity';
import { Button } from '@/views/components/ui/button';
import { localStorageKeys } from '@/app/config/localStorageKeys';

type ClarityConsentStatus = 'accepted' | 'rejected' | null;

function getStoredConsent(): ClarityConsentStatus {
  const storedConsent = localStorage.getItem(localStorageKeys.COOKIE_CONSENT);

  if (storedConsent === 'accepted' || storedConsent === 'rejected') {
    return storedConsent;
  }

  return null;
}

export function InitializeClarity() {
  const clarityId = import.meta.env.VITE_CLARITY_ID;
  const isProduction = import.meta.env.MODE === 'production';
  const [consentStatus, setConsentStatus] = useState<ClarityConsentStatus>(() =>
    getStoredConsent(),
  );

  useEffect(() => {
    if (!clarityId || !isProduction || consentStatus !== 'accepted') {
      return;
    }

    Clarity.init(clarityId);
    Clarity.consentV2({ ad_Storage: 'granted', analytics_Storage: 'granted' });
  }, [clarityId, consentStatus, isProduction]);

  function handleConsent(status: Exclude<ClarityConsentStatus, null>) {
    localStorage.setItem(localStorageKeys.COOKIE_CONSENT, status);
    setConsentStatus(status);
  }

  if (!clarityId || !isProduction || consentStatus) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 rounded-md border border-border bg-background p-4 shadow-lg md:left-auto md:max-w-md">
      <p className="text-sm text-foreground">
        Usamos cookies para melhorar sua experiência. Ao aceitar, você concorda com a coleta de
        dados de uso para analytics.
      </p>

      <div className="mt-3 flex gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-auto"
          onClick={() => handleConsent('rejected')}
        >
          Recusar
        </Button>

        <Button
          type="button"
          variant="blue-primary"
          size="sm"
          className="w-auto"
          onClick={() => handleConsent('accepted')}
        >
          Aceitar
        </Button>
      </div>
    </div>
  );
}
