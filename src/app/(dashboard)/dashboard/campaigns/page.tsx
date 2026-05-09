'use client';

import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { CampaignList } from '@/components/features/campaigns/campaign-list';
import { CampaignForm } from '@/components/features/campaigns/campaign-form';
import { Modal } from '@/components/ui/modal';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { SearchInput } from '@/components/ui/search-input';
import { Pagination } from '@/components/ui/pagination';
import { campaignService } from '@/lib/api/services/campaign.service';
import { useToastStore } from '@/stores/toast.store';
import { useDebounce } from '@/hooks/use-debounce';
import type { CampaignType } from '@/types/campaign.types';
import type { CreateCampaignValues } from '@/lib/validations/campaign.schema';

const LIMIT = 9;

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<CampaignType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const toast = useToastStore();
  const debouncedSearch = useDebounce(search, 300);

  async function load() {
    setIsLoading(true);
    try {
      const data = await campaignService.list();
      setCampaigns(data);
    } catch {
      toast.error('Erro ao carregar campanhas');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const filtered = campaigns.filter(
    (c) => !debouncedSearch || c.title.toLowerCase().includes(debouncedSearch.toLowerCase()),
  );
  const paginated = filtered.slice((page - 1) * LIMIT, page * LIMIT);
  const editingItem = campaigns.find((c) => c.id === editingId);

  async function handleSubmit(values: CreateCampaignValues): Promise<void> {
    setIsSubmitting(true);
    const payload = {
      title: values.title,
      description: values.description,
      startDate: values.startDate,
      endDate: values.endDate,
      targetAudience: values.targetAudience,
      isUrgent: values.isUrgent ?? false,
      isFeatured: values.isFeatured ?? false,
      showOnHomepage: values.showOnHomepage ?? false,
    };
    try {
      if (editingId) {
        await campaignService.update(editingId, payload);
      } else {
        await campaignService.create(payload);
      }
      toast.success(editingId ? 'Campanha atualizada com sucesso' : 'Campanha criada com sucesso');
      setIsModalOpen(false);
      setEditingId(null);
      load();
    } catch {
      toast.error('Erro ao salvar campanha');
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete() {
    if (!deletingId) return;
    setIsDeleting(true);
    try {
      await campaignService.remove(deletingId);
      toast.success('Campanha removida com sucesso');
      setDeletingId(null);
      load();
    } catch {
      toast.error('Erro ao remover campanha');
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="space-y-5">
      <PageHeader
        title="Campanhas"
        action={{
          label: 'Nova Campanha',
          onClick: () => {
            setEditingId(null);
            setIsModalOpen(true);
          },
        }}
      />

      <SearchInput
        value={search}
        onChange={(v) => {
          setSearch(v);
          setPage(1);
        }}
        placeholder="Buscar campanhas..."
      />

      <CampaignList
        campaigns={paginated}
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
        title={editingId ? 'Editar Campanha' : 'Nova Campanha'}
        size="lg"
      >
        <CampaignForm
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
        title="Remover campanha"
        description="Tem certeza que deseja remover esta campanha? Esta ação não pode ser desfeita."
        confirmLabel="Remover"
      />
    </div>
  );
}
