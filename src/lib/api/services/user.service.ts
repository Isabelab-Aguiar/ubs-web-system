import { api } from '../client';
import type { User, CreateUserPayload } from '@/types/user.types';

export const userService = {
  list: async (): Promise<User[]> => {
    const { data } = await api.get<User[]>('/users');
    return data;
  },

  create: async (payload: CreateUserPayload): Promise<User> => {
    const { data } = await api.post<User>('/users', payload);
    return data;
  },

  remove: async (id: string): Promise<void> => {
    await api.delete(`/users/${id}`);
  },
};
