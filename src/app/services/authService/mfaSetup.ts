import { httpClient } from '@/app/services/httpClient.ts';

export interface MfaSetupResponse {
  qrCodeDataUrl: string;
}

export async function mfaSetup() {
  const { data } = await httpClient.post<MfaSetupResponse>('/auth/mfa/setup');
  return data;
}
