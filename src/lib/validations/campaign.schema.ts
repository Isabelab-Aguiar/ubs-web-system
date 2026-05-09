import { z } from 'zod';

export const createCampaignSchema = z.object({
  title: z.string().min(5),
  subtitle: z.string().optional(),
  description: z.string().min(10),
  category: z.string().min(2),
  targetAudience: z.string().optional(),
  location: z.string().optional(),
  contact: z.string().optional(),
  startDate: z.string().min(1),
  endDate: z.string().optional(),
  scheduleTime: z.string().optional(),
  isUrgent: z.boolean(),
  isFeatured: z.boolean(),
  showOnHomepage: z.boolean(),
});

export const updateCampaignSchema = createCampaignSchema.partial();

export type CreateCampaignValues = z.infer<typeof createCampaignSchema>;
export type UpdateCampaignValues = z.infer<typeof updateCampaignSchema>;
