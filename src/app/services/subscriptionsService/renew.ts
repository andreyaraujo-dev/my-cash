import { httpClient } from '@/app/services/httpClient';

export async function renew() {
  await httpClient.post('/subscriptions/renew');
}
