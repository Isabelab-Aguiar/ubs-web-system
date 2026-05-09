import { api } from '../client';
import type {
  CalendarEvent,
  WorkSchedule,
  CreateCalendarEventPayload,
  CreateWorkSchedulePayload,
} from '@/types/scheduling.types';

export const schedulingService = {
  listEvents: async (): Promise<CalendarEvent[]> => {
    const { data } = await api.get<CalendarEvent[]>('/scheduling/events');
    return data;
  },

  createEvent: async (payload: CreateCalendarEventPayload): Promise<CalendarEvent> => {
    const { data } = await api.post<CalendarEvent>('/scheduling/events', payload);
    return data;
  },

  deleteEvent: async (id: string): Promise<void> => {
    await api.delete(`/scheduling/events/${id}`);
  },

  listWorkSchedules: async (): Promise<WorkSchedule[]> => {
    const { data } = await api.get<WorkSchedule[]>('/scheduling/work-schedules');
    return data;
  },

  createWorkSchedule: async (payload: CreateWorkSchedulePayload): Promise<WorkSchedule> => {
    const { data } = await api.post<WorkSchedule>('/scheduling/work-schedules', payload);
    return data;
  },
};
