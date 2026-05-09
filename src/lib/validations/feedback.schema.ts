import { z } from 'zod';

export const submitFeedbackSchema = z
  .object({
    type: z.enum(['praise', 'complaint', 'suggestion']),
    message: z.string().min(10).max(1000),
    category: z.string().optional(),
    isAnonymous: z.boolean().default(false),
    name: z.string().optional(),
    email: z.union([z.string().email(), z.literal('')]).optional(),
    phone: z.string().optional(),
  })
  .refine(
    (data) => {
      if (!data.isAnonymous) {
        return (data.name?.length ?? 0) >= 3;
      }
      return true;
    },
    { message: 'Nome deve ter pelo menos 3 caracteres', path: ['name'] },
  );

export type SubmitFeedbackValues = z.infer<typeof submitFeedbackSchema>;
