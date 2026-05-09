import { Badge } from '@/components/ui/badge';
import type { DemandPriority } from '@/types/spontaneous-demand.types';

const config: Record<
  DemandPriority,
  { label: string; variant: 'neutral' | 'info' | 'warning' | 'danger' }
> = {
  low: { label: 'Baixa', variant: 'neutral' },
  medium: { label: 'Média', variant: 'info' },
  high: { label: 'Alta', variant: 'warning' },
  urgent: { label: 'Urgente', variant: 'danger' },
};

export function PriorityBadge({ priority }: { priority: DemandPriority }) {
  const { label, variant } = config[priority];
  return <Badge variant={variant}>{label}</Badge>;
}
