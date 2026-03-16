import { httpClient } from '@/app/services/httpClient.ts';
import { SharedAccessLevel } from '@/app/entities/Person';

export interface MeResponse {
  name: string;
  email: string;
  isMfaEnabled?: boolean;
  sharedAccessLevel?: SharedAccessLevel | null;
  isAccountOwner?: boolean;
}

export async function me() {
  const { data } = await httpClient.get<MeResponse>('/users/me');
  return data;
}
