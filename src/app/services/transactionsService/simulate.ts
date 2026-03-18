import { httpClient } from '../httpClient';
import type { SimulateParams, SimulateResponse } from '@/app/entities/Simulation';

export async function simulate(params: SimulateParams): Promise<SimulateResponse> {
  const { data } = await httpClient.get<SimulateResponse>('/transactions/simulate', { params });
  return data;
}
