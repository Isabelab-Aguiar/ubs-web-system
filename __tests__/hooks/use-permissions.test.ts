import { renderHook } from '@testing-library/react';
import { usePermissions } from '@/hooks/use-permissions';
import { useAuthStore } from '@/stores/auth.store';

jest.mock('@/stores/auth.store');

const mockUseAuthStore = useAuthStore as unknown as jest.MockedFunction<typeof useAuthStore>;

function mockRole(role: string | null) {
  mockUseAuthStore.mockImplementation(
    (selector: (s: { user: { role: string } | null }) => unknown) =>
      selector(role ? { user: { role } } : { user: null }),
  );
}

describe('usePermissions', () => {
  it('deve retornar isAdmin=true para role admin', () => {
    mockRole('admin');
    const { result } = renderHook(() => usePermissions());
    expect(result.current.isAdmin).toBe(true);
  });

  it('deve retornar isAdmin=false para role professional', () => {
    mockRole('professional');
    const { result } = renderHook(() => usePermissions());
    expect(result.current.isAdmin).toBe(false);
  });

  it('deve retornar canManageUsers=true apenas para admin', () => {
    mockRole('admin');
    const { result: adminResult } = renderHook(() => usePermissions());
    expect(adminResult.current.canManageUsers).toBe(true);

    mockRole('direction');
    const { result: dirResult } = renderHook(() => usePermissions());
    expect(dirResult.current.canManageUsers).toBe(false);
  });

  it('deve retornar canViewFeedback=true para admin e direction', () => {
    mockRole('admin');
    const { result: adminResult } = renderHook(() => usePermissions());
    expect(adminResult.current.canViewFeedback).toBe(true);

    mockRole('direction');
    const { result: dirResult } = renderHook(() => usePermissions());
    expect(dirResult.current.canViewFeedback).toBe(true);
  });

  it('deve retornar canViewFeedback=false para professional', () => {
    mockRole('professional');
    const { result } = renderHook(() => usePermissions());
    expect(result.current.canViewFeedback).toBe(false);
  });
});
