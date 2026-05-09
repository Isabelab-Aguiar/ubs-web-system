import { Badge } from '@/components/ui/badge';
import type { AnnouncementCategory } from '@/types/announcement.types';

const config: Record<
  AnnouncementCategory,
  { label: string; variant: 'info' | 'accent' | 'neutral' | 'danger' }
> = {
  vaccine: { label: 'Vacinação', variant: 'info' },
  campaign: { label: 'Campanha', variant: 'accent' },
  notice: { label: 'Informativo', variant: 'neutral' },
  urgent: { label: 'Urgente', variant: 'danger' },
};

export function AnnouncementCategoryBadge({ category }: { category: AnnouncementCategory }) {
  const { label, variant } = config[category];
  return <Badge variant={variant}>{label}</Badge>;
}
