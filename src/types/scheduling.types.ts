export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  location?: string;
  createdAt: string;
}

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
  startDate: string;
  endDate: string;
  location?: string;
}

export interface CreateWorkSchedulePayload {
  professionalId: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}
