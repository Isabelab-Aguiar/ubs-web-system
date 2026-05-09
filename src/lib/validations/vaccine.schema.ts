import { z } from 'zod';

export const createVaccineSchema = z.object({
  name: z.string().min(3),
  targetAgeGroup: z.string().min(2),
  currentQuantity: z.number().int().min(0),
  minimumQuantity: z.number().int().min(1).default(10),
  batchNumber: z.string().optional(),
  expirationDate: z.string().optional(),
});

export const updateQuantitySchema = z.object({
  currentQuantity: z.number().int().min(0),
});

export type CreateVaccineValues = z.infer<typeof createVaccineSchema>;
export type UpdateQuantityValues = z.infer<typeof updateQuantitySchema>;
