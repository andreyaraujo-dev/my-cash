import { httpClient } from '@/app/services/httpClient.ts';

export interface DeleteAccountParams {
  password: string;
}

export async function deleteAccount({ password }: DeleteAccountParams) {
  await httpClient.delete('/auth/account', { data: { password } });
}
