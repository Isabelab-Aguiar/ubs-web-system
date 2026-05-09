import { api } from '../client';
import type { LoginCredentials, LoginResponse, RefreshResponse } from '@/types/auth.types';

export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const { data } = await api.post<LoginResponse>('/auth/login', credentials);
    return data;
  },

  refresh: async (): Promise<RefreshResponse> => {
    const { data } = await api.post<RefreshResponse>('/auth/refresh');
    return data;
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
  },
};
