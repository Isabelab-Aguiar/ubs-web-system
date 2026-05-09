import { api } from '../client';
import type { Campaign, CreateCampaignPayload } from '@/types/campaign.types';

export const campaignService = {
  list: async (): Promise<Campaign[]> => {
    const { data } = await api.get<Campaign[]>('/campaigns');
    return data;
  },

  create: async (payload: CreateCampaignPayload): Promise<Campaign> => {
    const { data } = await api.post<Campaign>('/campaigns', payload);
    return data;
  },

  remove: async (id: string): Promise<void> => {
    await api.delete(`/campaigns/${id}`);
  },
};
