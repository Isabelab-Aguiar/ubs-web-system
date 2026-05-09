'use client';

import { Trash2, Users } from 'lucide-react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableSkeleton,
  TableEmpty,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { UserRoleBadge } from './user-role-badge';
import type { UserType } from '@/types/user.types';

interface UserTableProps {
  users: UserType[];
  isLoading: boolean;
  currentUserId: string;
  onDelete: (id: string) => void;
}

export function UserTable({ users, isLoading, currentUserId, onDelete }: UserTableProps) {
  if (isLoading) return <TableSkeleton rows={5} cols={5} />;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Usuário</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Criado em</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.length === 0 ? (
          <TableEmpty icon={Users} title="Nenhum usuário encontrado" cols={5} />
        ) : (
          users.map((user) => {
            const isSelf = user.id === currentUserId;
            return (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-primary-600">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-neutral-800">{user.name}</p>
                      <p className="text-xs text-neutral-400">{user.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <UserRoleBadge role={user.role} />
                </TableCell>
                <TableCell>
                  <span
                    className={`text-xs font-medium ${user.isActive ? 'text-success-500' : 'text-neutral-400'}`}
                  >
                    {user.isActive ? 'Ativo' : 'Inativo'}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-neutral-500">
                    {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                  </span>
                </TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDelete(user.id)}
                    disabled={isSelf}
                    title={isSelf ? 'Você não pode remover sua própria conta' : 'Remover usuário'}
                    className="text-danger-500 hover:text-danger-600 disabled:opacity-40"
                  >
                    <Trash2 size={15} />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
}
