import { httpClient } from '@/app/services/httpClient.ts';

export interface MfaDisableParams {
  password: string;
}

export async function mfaDisable({ password }: MfaDisableParams) {
  await httpClient.post('/auth/mfa/disable', { password });
}
