import { api } from '../client';
import type { Announcement, CreateAnnouncementPayload } from '@/types/announcement.types';

export const announcementService = {
  list: async (): Promise<Announcement[]> => {
    const { data } = await api.get<Announcement[]>('/announcements');
    return data;
  },

  create: async (payload: CreateAnnouncementPayload): Promise<Announcement> => {
    const { data } = await api.post<Announcement>('/announcements', payload);
    return data;
  },

  update: async (id: string, payload: CreateAnnouncementPayload): Promise<Announcement> => {
    const { data } = await api.patch<Announcement>(`/announcements/${id}`, payload);
    return data;
  },

  remove: async (id: string): Promise<void> => {
    await api.delete(`/announcements/${id}`);
  },
};
