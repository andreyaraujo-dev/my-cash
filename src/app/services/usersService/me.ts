import { httpClient } from '@/app/services/httpClient.ts';

export interface MeResponse {
  name: string;
  email: string;
  isMfaEnabled?: boolean;
}

export async function me() {
  const { data } = await httpClient.get<MeResponse>('/users/me');
  return data;
}
