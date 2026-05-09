import { Badge } from '@/components/ui/badge';
import type { UserRole } from '@/types/auth.types';

interface UserRoleBadgeProps {
  role: UserRole;
}

const config: Record<UserRole, { label: string; variant: 'danger' | 'warning' | 'info' }> = {
  admin: { label: 'Administrador', variant: 'danger' },
  direction: { label: 'Direção', variant: 'warning' },
  professional: { label: 'Profissional', variant: 'info' },
};

export function UserRoleBadge({ role }: UserRoleBadgeProps) {
  const { label, variant } = config[role];
  return <Badge variant={variant}>{label}</Badge>;
}
