import type { Plan } from '@/app/entities/Plan';
import { httpClientPublic } from '../httpClient';

export async function getAll(): Promise<Plan[]> {
  const { data } = await httpClientPublic.get<Plan[]>('/plans');
  return data;
}
