import { httpClientPublic } from '@/app/services/httpClient';

export interface ValidateTokenResponse {
  name: string;
  email: string;
}

export async function validateToken(token: string): Promise<ValidateTokenResponse> {
  const { data } = await httpClientPublic.get<ValidateTokenResponse>(`/people/activate/${token}`);
  return data;
}
