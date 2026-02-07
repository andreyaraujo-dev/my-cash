import { httpClient } from '@/app/services/httpClient.ts';

export interface UpdateProfileParams {
  name: string;
}

export async function updateProfile({ name }: UpdateProfileParams) {
  const { data } = await httpClient.patch<{ name: string; email: string }>('/users/me', {
    name,
  });
  return data;
}
