import { httpClient } from '@/app/services/httpClient.ts';

export interface MfaVerifySetupParams {
  token: string;
}

export async function mfaVerifySetup({ token }: MfaVerifySetupParams) {
  await httpClient.post('/auth/mfa/verify-setup', { token });
}
