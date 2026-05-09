import { api } from '../client';
import type {
  HealthProfessional,
  CreateHealthProfessionalPayload,
} from '@/types/health-professional.types';

export const healthProfessionalService = {
  list: async (): Promise<HealthProfessional[]> => {
    const { data } = await api.get<HealthProfessional[]>('/health-professionals');
    return data;
  },

  create: async (payload: CreateHealthProfessionalPayload): Promise<HealthProfessional> => {
    const { data } = await api.post<HealthProfessional>('/health-professionals', payload);
    return data;
  },

  remove: async (id: string): Promise<void> => {
    await api.delete(`/health-professionals/${id}`);
  },
};
