import { useAuthStore } from '@/stores/auth.store';

interface Permissions {
  isAdmin: boolean;
  isDirection: boolean;
  isProfessional: boolean;
  canManageUsers: boolean;
  canManageAcs: boolean;
  canViewFeedback: boolean;
  canManageProfessionals: boolean;
}

export function usePermissions(): Permissions {
  const user = useAuthStore((s) => s.user);
  const role = user?.role;

  const isAdmin = role === 'admin';
  const isDirection = role === 'direction';
  const isProfessional = role === 'professional';

  return {
    isAdmin,
    isDirection,
    isProfessional,
    canManageUsers: isAdmin,
    canManageAcs: isAdmin,
    canViewFeedback: isAdmin || isDirection,
    canManageProfessionals: isAdmin,
  };
}
