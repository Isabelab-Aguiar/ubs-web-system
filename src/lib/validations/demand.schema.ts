import { z } from 'zod';

export const createDemandSchema = z.object({
  patientName: z.string().min(3),
  patientBirthDate: z.string().optional(),
  chiefComplaint: z.string().min(5),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).default('medium'),
  notes: z.string().optional(),
});

export type CreateDemandValues = z.infer<typeof createDemandSchema>;
