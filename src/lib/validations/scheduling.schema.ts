import { z } from 'zod';

export const createEventSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  eventDate: z.string().min(1),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  category: z.enum(['meeting', 'training', 'campaign', 'holiday', 'other']),
  location: z.string().optional(),
});

export const createWorkScheduleSchema = z.object({
  professionalId: z.string().uuid(),
  weekday: z.enum(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']),
  startTime: z.string(),
  endTime: z.string(),
  location: z.string().optional(),
  activityType: z.string().optional(),
});

export type CreateEventValues = z.infer<typeof createEventSchema>;
export type CreateWorkScheduleValues = z.infer<typeof createWorkScheduleSchema>;
