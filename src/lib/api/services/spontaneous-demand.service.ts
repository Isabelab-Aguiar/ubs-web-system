import { api } from '../client';
import type {
  SpontaneousDemand,
  CreateSpontaneousDemandPayload,
  UpdateDemandStatusPayload,
} from '@/types/spontaneous-demand.types';

export const spontaneousDemandService = {
  list: async (): Promise<SpontaneousDemand[]> => {
    const { data } = await api.get<SpontaneousDemand[]>('/spontaneous-demand');
    return data;
  },

  create: async (payload: CreateSpontaneousDemandPayload): Promise<SpontaneousDemand> => {
    const { data } = await api.post<SpontaneousDemand>('/spontaneous-demand', payload);
    return data;
  },

  updateStatus: async (
    id: string,
    payload: UpdateDemandStatusPayload,
  ): Promise<SpontaneousDemand> => {
    const { data } = await api.patch<SpontaneousDemand>(
      `/spontaneous-demand/${id}/status`,
      payload,
    );
    return data;
  },
};
