import { z } from 'zod';

const specialty = z.enum([
  'doctor',
  'nurse',
  'dentist',
  'pharmacist',
  'psychologist',
  'physiotherapist',
  'nutritionist',
  'social_worker',
  'gynecologist',
  'pediatrician',
]);

export const createProfessionalSchema = z.object({
  name: z.string().min(3),
  specialty,
  councilType: z.string().optional(),
  councilNumber: z.string().optional(),
  bio: z.string().max(500).optional(),
});

export const updateProfessionalSchema = createProfessionalSchema.partial();

export type CreateProfessionalValues = z.infer<typeof createProfessionalSchema>;
export type UpdateProfessionalValues = z.infer<typeof updateProfessionalSchema>;
