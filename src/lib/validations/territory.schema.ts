import { z } from 'zod';

export const createMicroAreaSchema = z.object({
  code: z.string().min(1).max(10),
  name: z.string().min(3),
  streets: z.array(z.string()).min(1),
});

export const createAcsAgentSchema = z.object({
  name: z.string().min(3),
  phone: z.string().min(10).max(20),
  microAreaId: z.string().uuid(),
});

export type CreateMicroAreaValues = z.infer<typeof createMicroAreaSchema>;
export type CreateAcsAgentValues = z.infer<typeof createAcsAgentSchema>;
