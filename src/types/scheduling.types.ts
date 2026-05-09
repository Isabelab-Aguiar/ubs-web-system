export type EventCategory = 'meeting' | 'training' | 'campaign' | 'holiday' | 'other';

export interface CalendarEventType {
  id: string;
  title: string;
  description?: string;
  category: EventCategory;
  eventDate: string;
  startTime: string;
  endTime: string;
  location?: string;
  createdAt: string;
}

export type CalendarEvent = CalendarEventType;

export interface WorkSchedule {
  id: string;
  professionalId: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

export interface CreateCalendarEventPayload {
  title: string;
  description?: string;
  category: EventCategory;
  eventDate: string;
  startTime: string;
  endTime: string;
  location?: string;
}

export interface CreateWorkSchedulePayload {
  professionalId: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}
