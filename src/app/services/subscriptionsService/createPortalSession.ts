import { httpClient } from '@/app/services/httpClient';

interface CreatePortalSessionResponse {
  url: string;
}

function getBaseUrl(): string {
  return import.meta.env.VITE_APP_URL ?? window.location.origin;
}

export async function createPortalSession(): Promise<string> {
  const baseUrl = getBaseUrl();
  const returnUrl = `${baseUrl}/profile/subscription`;

  const { data } = await httpClient.post<CreatePortalSessionResponse>(
    '/subscriptions/portal-session',
    { returnUrl },
  );

  return data.url;
}
