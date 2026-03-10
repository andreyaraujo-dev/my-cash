import { httpClient } from '@/app/services/httpClient.ts';

export interface MfaVerifyParams {
  mfaTempToken: string;
  token: string;
  trustDevice?: boolean;
  deviceFingerprint?: string;
}

export interface MfaVerifyResponse {
  accessToken: string;
}

export async function mfaVerify({
  mfaTempToken,
  token,
  trustDevice,
  deviceFingerprint,
}: MfaVerifyParams) {
  const { data } = await httpClient.post<MfaVerifyResponse>('/auth/mfa/verify', {
    mfaTempToken,
    token,
    trustDevice,
    deviceFingerprint,
  });
  return data;
}
