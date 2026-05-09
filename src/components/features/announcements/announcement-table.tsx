'use client';

import { PencilLine, Trash2, Megaphone } from 'lucide-react';
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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AnnouncementCategoryBadge } from './announcement-category-badge';
import { AnnouncementStatusBadge } from './announcement-status-badge';
import type { AnnouncementType } from '@/types/announcement.types';

interface AnnouncementTableProps {
  announcements: AnnouncementType[];
  isLoading: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function AnnouncementTable({
  announcements,
  isLoading,
  onEdit,
  onDelete,
}: AnnouncementTableProps) {
  if (isLoading) return <TableSkeleton rows={5} cols={6} />;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Título</TableHead>
          <TableHead>Categoria</TableHead>
          <TableHead>Página</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Criado em</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {announcements.length === 0 ? (
          <TableEmpty
            icon={Megaphone}
            title="Nenhum aviso encontrado"
            description="Crie um novo aviso para começar"
            cols={6}
          />
        ) : (
          announcements.map((announcement) => (
            <TableRow key={announcement.id}>
              <TableCell>
                <span className="text-sm font-semibold text-neutral-800 truncate max-w-[200px] block">
                  {announcement.title}
                </span>
              </TableCell>
              <TableCell>
                <AnnouncementCategoryBadge category={announcement.category} />
              </TableCell>
              <TableCell>
                <Badge variant="neutral">{announcement.targetPage}</Badge>
              </TableCell>
              <TableCell>
                <AnnouncementStatusBadge isActive={announcement.isActive} />
              </TableCell>
              <TableCell>{new Date(announcement.createdAt).toLocaleDateString('pt-BR')}</TableCell>
              <TableCell>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    title="Editar"
                    onClick={() => onEdit(announcement.id)}
                  >
                    <PencilLine size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    title="Excluir"
                    onClick={() => onDelete(announcement.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
