import { Badge } from '@/components/ui/badge';
import type { FeedbackStatus } from '@/types/feedback.types';

interface FeedbackStatusBadgeProps {
  status: FeedbackStatus;
}

const config: Record<FeedbackStatus, { label: string; variant: 'warning' | 'info' | 'success' }> = {
  pending: { label: 'Pendente', variant: 'warning' },
  reviewed: { label: 'Revisado', variant: 'info' },
  resolved: { label: 'Resolvido', variant: 'success' },
};

export function FeedbackStatusBadge({ status }: FeedbackStatusBadgeProps) {
  const { label, variant } = config[status];
  return <Badge variant={variant}>{label}</Badge>;
}
