import { httpClient } from '@/app/services/httpClient.ts';

export interface UpdatePasswordParams {
  currentPassword: string;
  newPassword: string;
}

export async function updatePassword({ currentPassword, newPassword }: UpdatePasswordParams) {
  await httpClient.patch('/auth/password', { currentPassword, newPassword });
}
