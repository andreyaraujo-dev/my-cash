import { httpClient } from '@/app/services/httpClient.ts';

export interface ForgotPasswordParams {
  email: string;
}

export async function forgotPassword({ email }: ForgotPasswordParams) {
  const { data } = await httpClient.post('/auth/forgot-password', { email });
  return data;
}
