import { Badge } from '@/components/ui/badge';

interface EventCategoryBadgeProps {
  category: string;
}

type BadgeVariant = 'neutral' | 'info' | 'accent' | 'warning';

const config: Record<string, { label: string; variant: BadgeVariant }> = {
  meeting: { label: 'Reunião', variant: 'neutral' },
  training: { label: 'Treinamento', variant: 'info' },
  campaign: { label: 'Campanha', variant: 'accent' },
  holiday: { label: 'Feriado', variant: 'warning' },
  other: { label: 'Outro', variant: 'neutral' },
};

export function EventCategoryBadge({ category }: EventCategoryBadgeProps) {
  const entry = config[category] ?? { label: category, variant: 'neutral' as BadgeVariant };
  return <Badge variant={entry.variant}>{entry.label}</Badge>;
}
