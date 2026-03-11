import { httpClient } from '@/app/services/httpClient';

interface CreateCheckoutSessionResponse {
  url: string;
}

function getBaseUrl(): string {
  return import.meta.env.VITE_APP_URL ?? window.location.origin;
}

export async function createCheckoutSession(): Promise<string> {
  const baseUrl = getBaseUrl();
  const successUrl = `${baseUrl}/profile/subscription?success=true`;
  const cancelUrl = `${baseUrl}/profile/subscription?canceled=true`;

  const { data } = await httpClient.post<CreateCheckoutSessionResponse>(
    '/subscriptions/checkout-session',
    { successUrl, cancelUrl },
  );

  return data.url;
}
