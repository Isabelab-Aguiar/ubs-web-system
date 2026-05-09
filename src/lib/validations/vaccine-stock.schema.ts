import { z } from 'zod';

export const createVaccineStockSchema = z.object({
  name: z.string().min(2),
  targetAgeGroup: z.enum(['infantil', 'adolescente', 'adulto', 'idoso', 'gestante', 'universal']),
  currentQuantity: z.coerce.number().min(0),
  minimumQuantity: z.coerce.number().min(1),
  batchNumber: z.string().optional(),
  expirationDate: z.string().optional(),
});

export const updateVaccineStockSchema = createVaccineStockSchema.partial();

export type CreateVaccineStockValues = z.infer<typeof createVaccineStockSchema>;
export type UpdateVaccineStockValues = z.infer<typeof updateVaccineStockSchema>;
