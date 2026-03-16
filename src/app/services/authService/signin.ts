import { httpClient } from '@/app/services/httpClient.ts';

export interface SigninParams {
  email: string;
  password: string;
  deviceFingerprint?: string;
}

export interface SigninSuccessResponse {
  accessToken: string;
}

export interface SigninMfaRequiredResponse {
  mfaTempToken: string;
  mfaRequired?: boolean;
}

export type SigninResponse = SigninSuccessResponse | SigninMfaRequiredResponse;

export async function signin({ email, password, deviceFingerprint }: SigninParams) {
  const { data } = await httpClient.post<SigninResponse>('/auth/signin', {
    email,
    password,
    deviceFingerprint,
  });
  return data;
}
