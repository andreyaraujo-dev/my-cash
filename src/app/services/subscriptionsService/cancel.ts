import { httpClient } from '@/app/services/httpClient';

export async function cancel() {
  await httpClient.patch('/subscriptions/cancel');
}
