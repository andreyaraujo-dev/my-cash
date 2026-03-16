import { Person } from '@/app/entities/Person';
import { httpClient } from '@/app/services/httpClient';

export async function getAll(): Promise<Person[]> {
  const { data } = await httpClient.get<Person[]>('/people');
  return data;
}
