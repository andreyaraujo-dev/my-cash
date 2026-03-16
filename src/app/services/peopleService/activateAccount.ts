import { httpClientPublic } from '@/app/services/httpClient';

export interface ActivateAccountParams {
  token: string;
  newPassword: string;
}

export interface ActivateAccountResponse {
  message: string;
}

export async function activateAccount(
  params: ActivateAccountParams,
): Promise<ActivateAccountResponse> {
  const { data } = await httpClientPublic.post<ActivateAccountResponse>('/people/activate', params);
  return data;
}
