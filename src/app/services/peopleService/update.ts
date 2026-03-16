import { Person, SharedAccessLevel } from '@/app/entities/Person';
import { httpClient } from '@/app/services/httpClient';

export interface UpdatePersonParams {
  id: string;
  accessLevel?: SharedAccessLevel;
}

export async function update({ id, accessLevel }: UpdatePersonParams): Promise<Person> {
  const { data } = await httpClient.patch<Person>(`/people/${id}`, { accessLevel });
  return data;
}
