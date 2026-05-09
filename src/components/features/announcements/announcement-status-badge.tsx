import { Badge } from '@/components/ui/badge';

export function AnnouncementStatusBadge({ isActive }: { isActive: boolean }) {
  return <Badge variant={isActive ? 'success' : 'neutral'}>{isActive ? 'Ativo' : 'Inativo'}</Badge>;
}
