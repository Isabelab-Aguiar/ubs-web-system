'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/layout/page-header';
import { UserTable } from '@/components/features/users/user-table';
import { UserForm } from '@/components/features/users/user-form';
import { Modal } from '@/components/ui/modal';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { userService } from '@/lib/api/services/user.service';
import { useToastStore } from '@/stores/toast.store';
import { usePermissions } from '@/hooks/use-permissions';
import { useAuthStore } from '@/stores/auth.store';
import type { UserType } from '@/types/user.types';

export default function UsersPage() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const toast = useToastStore();
  const { isAdmin } = usePermissions();
  const currentUser = useAuthStore((s) => s.user);
  const currentUserId = currentUser?.id ?? '';
  const router = useRouter();

  useEffect(() => {
    if (currentUser && !isAdmin) {
      toast.error('Acesso negado. Apenas administradores podem acessar esta página.');
      router.replace('/dashboard');
    }
  }, [currentUser, isAdmin, router]); // eslint-disable-line react-hooks/exhaustive-deps

  async function load() {
    setIsLoading(true);
    try {
      const data = await userService.list();
      setUsers(data);
    } catch {
      toast.error('Erro ao carregar usuários');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function handleSubmit(data: {
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'professional' | 'direction';
  }) {
    setIsSubmitting(true);
    try {
      await userService.create(data);
      toast.success('Usuário criado com sucesso');
      setIsModalOpen(false);
      load();
    } catch {
      toast.error('Erro ao criar usuário');
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete() {
    if (!deletingId || deletingId === currentUserId) return;
    setIsDeleting(true);
    try {
      await userService.remove(deletingId);
      toast.success('Usuário removido com sucesso');
      setDeletingId(null);
      load();
    } catch {
      toast.error('Erro ao remover usuário');
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="space-y-5">
      <PageHeader
        title="Usuários do Sistema"
        action={{ label: 'Novo Usuário', onClick: () => setIsModalOpen(true) }}
      />

      <UserTable
        users={users}
        isLoading={isLoading}
        currentUserId={currentUserId}
        onDelete={(id) => setDeletingId(id)}
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Novo Usuário">
        <UserForm onSubmit={handleSubmit} isLoading={isSubmitting} />
      </Modal>

      <ConfirmDialog
        isOpen={!!deletingId}
        onClose={() => setDeletingId(null)}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        title="Remover usuário"
        description="Tem certeza que deseja remover este usuário? Esta ação não pode ser desfeita."
        confirmLabel="Remover"
      />
    </div>
  );
}
