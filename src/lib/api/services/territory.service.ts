import { api } from '../client';
import type {
  MicroArea,
  AcsAgent,
  CreateMicroAreaPayload,
  CreateAcsAgentPayload,
} from '@/types/territory.types';

export const territoryService = {
  listMicroAreas: async (): Promise<MicroArea[]> => {
    const { data } = await api.get<MicroArea[]>('/territory/micro-areas');
    return data;
  },

  createMicroArea: async (payload: CreateMicroAreaPayload): Promise<MicroArea> => {
    const { data } = await api.post<MicroArea>('/territory/micro-areas', payload);
    return data;
  },

  listAcsAgents: async (): Promise<AcsAgent[]> => {
    const { data } = await api.get<AcsAgent[]>('/territory/acs-agents');
    return data;
  },

  createAcsAgent: async (payload: CreateAcsAgentPayload): Promise<AcsAgent> => {
    const { data } = await api.post<AcsAgent>('/territory/acs-agents', payload);
    return data;
  },
};
