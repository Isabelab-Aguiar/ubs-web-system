import { Badge } from '@/components/ui/badge';
import type { DemandStatus } from '@/types/spontaneous-demand.types';

const config: Record<
  DemandStatus,
  { label: string; variant: 'warning' | 'info' | 'success' | 'neutral' }
> = {
  waiting: { label: 'Aguardando', variant: 'warning' },
  in_progress: { label: 'Em atendimento', variant: 'info' },
  completed: { label: 'Concluído', variant: 'success' },
  cancelled: { label: 'Cancelado', variant: 'neutral' },
};

export function DemandStatusBadge({ status }: { status: DemandStatus }) {
  const { label, variant } = config[status];
  return <Badge variant={variant}>{label}</Badge>;
}
