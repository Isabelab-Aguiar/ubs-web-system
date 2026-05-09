'use client';

import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { AnnouncementTable } from '@/components/features/announcements/announcement-table';
import { AnnouncementForm } from '@/components/features/announcements/announcement-form';
import { Modal } from '@/components/ui/modal';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { SearchInput } from '@/components/ui/search-input';
import { Select } from '@/components/ui/select';
import { Pagination } from '@/components/ui/pagination';
import { announcementService } from '@/lib/api/services/announcement.service';
import { useToastStore } from '@/stores/toast.store';
import { useDebounce } from '@/hooks/use-debounce';
import type { AnnouncementType } from '@/types/announcement.types';
import type { CreateAnnouncementValues } from '@/lib/validations/announcement.schema';

const LIMIT = 10;

const categoryOptions = [
  { value: '', label: 'Todas as categorias' },
  { value: 'vaccine', label: 'Vacinação' },
  { value: 'campaign', label: 'Campanha' },
  { value: 'notice', label: 'Informativo' },
  { value: 'urgent', label: 'Urgente' },
];

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<AnnouncementType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const toast = useToastStore();
  const debouncedSearch = useDebounce(search, 300);

  async function load() {
    setIsLoading(true);
    try {
      const data = await announcementService.list();
      setAnnouncements(data);
    } catch {
      toast.error('Erro ao carregar avisos');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const filtered = announcements.filter((a) => {
    const matchSearch =
      !debouncedSearch || a.title.toLowerCase().includes(debouncedSearch.toLowerCase());
    const matchCategory = !category || a.category === category;
    return matchSearch && matchCategory;
  });
  const paginated = filtered.slice((page - 1) * LIMIT, page * LIMIT);
  const editingItem = announcements.find((a) => a.id === editingId);

  async function handleSubmit(values: CreateAnnouncementValues): Promise<void> {
    setIsSubmitting(true);
    try {
      if (editingId) {
        await announcementService.update(editingId, values);
      } else {
        await announcementService.create(values);
      }
      toast.success(editingId ? 'Aviso atualizado com sucesso' : 'Aviso criado com sucesso');
      setIsModalOpen(false);
      setEditingId(null);
      load();
    } catch {
      toast.error('Erro ao salvar aviso');
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete() {
    if (!deletingId) return;
    setIsDeleting(true);
    try {
      await announcementService.remove(deletingId);
      toast.success('Aviso removido com sucesso');
      setDeletingId(null);
      load();
    } catch {
      toast.error('Erro ao remover aviso');
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="space-y-5">
      <PageHeader
        title="Avisos"
        action={{
          label: 'Novo Aviso',
          onClick: () => {
            setEditingId(null);
            setIsModalOpen(true);
          },
        }}
      />

      <div className="flex gap-3 flex-col sm:flex-row">
        <SearchInput
          value={search}
          onChange={(v) => {
            setSearch(v);
            setPage(1);
          }}
          placeholder="Buscar por título..."
          className="flex-1"
        />
        <Select
          options={categoryOptions}
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
          className="sm:w-52"
        />
      </div>

      <AnnouncementTable
        announcements={paginated}
        isLoading={isLoading}
        onEdit={(id) => {
          setEditingId(id);
          setIsModalOpen(true);
        }}
        onDelete={(id) => setDeletingId(id)}
      />

      <Pagination total={filtered.length} page={page} limit={LIMIT} onPageChange={setPage} />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingId(null);
        }}
        title={editingId ? 'Editar Aviso' : 'Novo Aviso'}
      >
        <AnnouncementForm
          defaultValues={editingItem}
          onSubmit={handleSubmit}
          isLoading={isSubmitting}
        />
      </Modal>

      <ConfirmDialog
        isOpen={!!deletingId}
        onClose={() => setDeletingId(null)}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        title="Remover aviso"
        description="Tem certeza que deseja remover este aviso? Esta ação não pode ser desfeita."
        confirmLabel="Remover"
      />
    </div>
  );
}
