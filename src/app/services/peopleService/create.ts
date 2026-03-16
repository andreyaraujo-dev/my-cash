import { Person, SharedAccessLevel } from '@/app/entities/Person';
import { httpClient } from '@/app/services/httpClient';

export interface CreatePersonParams {
  name: string;
  email: string;
  accessLevel: SharedAccessLevel;
}

export async function create(params: CreatePersonParams): Promise<Person> {
  const { data } = await httpClient.post<Person>('/people', params);
  return data;
}
