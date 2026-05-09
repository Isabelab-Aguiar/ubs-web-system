import { z } from 'zod';

const announcementCategory = z.enum(['vaccine', 'campaign', 'notice', 'urgent']);
const announcementTargetPage = z.enum(['home', 'vaccines', 'services', 'all']);

export const createAnnouncementSchema = z.object({
  title: z.string().min(5).max(255),
  content: z.string().min(10),
  category: announcementCategory,
  targetPage: announcementTargetPage,
  showOnHomepage: z.boolean().default(false),
  expiresAt: z.string().optional(),
});

export const updateAnnouncementSchema = createAnnouncementSchema.partial();

export type CreateAnnouncementValues = z.infer<typeof createAnnouncementSchema>;
export type UpdateAnnouncementValues = z.infer<typeof updateAnnouncementSchema>;
