import { ThumbsUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { FeedbackKind } from '@/types/feedback.types';

interface FeedbackTypeBadgeProps {
  type: FeedbackKind;
}

const config: Record<FeedbackKind, { label: string; variant: 'success' | 'danger' | 'info' }> = {
  praise: { label: 'Elogio', variant: 'success' },
  complaint: { label: 'Reclamação', variant: 'danger' },
  suggestion: { label: 'Sugestão', variant: 'info' },
};

export function FeedbackTypeBadge({ type }: FeedbackTypeBadgeProps) {
  const { label, variant } = config[type];
  return (
    <Badge variant={variant}>
      {type === 'praise' && <ThumbsUp size={11} />}
      {label}
    </Badge>
  );
}
