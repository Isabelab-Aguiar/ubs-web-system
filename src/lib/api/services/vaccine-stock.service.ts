import { api } from '../client';
import type {
  VaccineStock,
  CreateVaccineStockPayload,
  UpdateVaccineQuantityPayload,
} from '@/types/vaccine-stock.types';

export const vaccineStockService = {
  list: async (belowMinimum?: boolean): Promise<VaccineStock[]> => {
    const { data } = await api.get<VaccineStock[]>('/vaccine-stock', {
      params: belowMinimum ? { belowMinimum: true } : undefined,
    });
    return data;
  },

  create: async (payload: CreateVaccineStockPayload): Promise<VaccineStock> => {
    const { data } = await api.post<VaccineStock>('/vaccine-stock', payload);
    return data;
  },

  updateQuantity: async (
    id: string,
    payload: UpdateVaccineQuantityPayload,
  ): Promise<VaccineStock> => {
    const { data } = await api.patch<VaccineStock>(`/vaccine-stock/${id}/quantity`, payload);
    return data;
  },
};
