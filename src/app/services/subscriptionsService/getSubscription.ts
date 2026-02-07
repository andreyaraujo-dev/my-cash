import { httpClient } from '@/app/services/httpClient';
import { Subscription } from '@/app/entities/Subscription';

export async function getSubscription(): Promise<Subscription | null> {
  try {
    const { data } = await httpClient.get<Subscription>('/subscriptions/me');
    return data;
  } catch (error: unknown) {
    const status = (error as { response?: { status?: number } })?.response?.status;
    if (status === 404) return null;
    throw error;
  }
}
