import { httpClient } from '../httpClient';

export async function updateStatus(id: string) {
  const { data } = await httpClient.patch(`/transactions/status/${id}`);

  return data;
}
