import { httpClient } from '@/app/services/httpClient.ts';

export interface ResetPasswordParams {
  token: string;
  newPassword: string;
}

export async function resetPassword({ token, newPassword }: ResetPasswordParams) {
  const { data } = await httpClient.post('/auth/reset-password', { token, newPassword });
  return data;
}
