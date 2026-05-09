'use client';

import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { ProfessionalGrid } from '@/components/features/professionals/professional-grid';
import { ProfessionalForm } from '@/components/features/professionals/professional-form';
import { Modal } from '@/components/ui/modal';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { healthProfessionalService } from '@/lib/api/services/health-professional.service';
import { useToastStore } from '@/stores/toast.store';
import { usePermissions } from '@/hooks/use-permissions';
import type { HealthProfessionalType, Specialty } from '@/types/health-professional.types';
import type { CreateProfessionalValues } from '@/lib/validations/professional.schema';

const specialtyLabels: Record<Specialty, string> = {
  doctor: 'Médico(a)',
  nurse: 'Enfermeiro(a)',
  dentist: 'Dentista',
  pharmacist: 'Farmacêutico(a)',
  psychologist: 'Psicólogo(a)',
  physiotherapist: 'Fisioterapeuta',
  nutritionist: 'Nutricionista',
  social_worker: 'Assistente Social',
  gynecologist: 'Ginecologista',
  pediatrician: 'Pediatra',
};

export default function HealthProfessionalsPage() {
  const [professionals, setProfessionals] = useState<HealthProfessionalType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | Specialty>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const toast = useToastStore();
  const { isAdmin } = usePermissions();

  async function load() {
    setIsLoading(true);
    try {
      const data = await healthProfessionalService.list();
      setProfessionals(data);
    } catch {
      toast.error('Erro ao carregar profissionais');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const specialties = Array.from(new Set(professionals.map((p) => p.specialty)));
  const tabs = [
    { key: 'all' as const, label: 'Todos' },
    ...specialties.map((s) => ({ key: s, label: specialtyLabels[s] })),
  ];
  const filtered =
    activeTab === 'all' ? professionals : professionals.filter((p) => p.specialty === activeTab);
  const editingItem = professionals.find((p) => p.id === editingId);

  async function handleSubmit(values: CreateProfessionalValues): Promise<void> {
    setIsSubmitting(true);
    try {
      if (editingId) {
        await healthProfessionalService.update(editingId, values);
      } else {
        await healthProfessionalService.create(values);
      }
      toast.success('Profissional salvo com sucesso');
      setIsModalOpen(false);
      setEditingId(null);
      load();
    } catch {
      toast.error('Erro ao salvar profissional');
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete() {
    if (!deletingId) return;
    setIsDeleting(true);
    try {
      await healthProfessionalService.remove(deletingId);
      toast.success('Profissional removido com sucesso');
      setDeletingId(null);
      load();
    } catch {
      toast.error('Erro ao remover profissional');
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="space-y-5">
      <PageHeader
        title="Profissionais de Saúde"
        action={{
          label: 'Adicionar',
          show: isAdmin,
          onClick: () => {
            setEditingId(null);
            setIsModalOpen(true);
          },
        }}
      />

      <div className="flex gap-2 border-b border-neutral-200 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors -mb-px whitespace-nowrap ${
              activeTab === tab.key
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-neutral-500 hover:text-neutral-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <ProfessionalGrid
        professionals={filtered}
        isLoading={isLoading}
        onEdit={(id) => {
          setEditingId(id);
          setIsModalOpen(true);
        }}
        onDelete={(id) => setDeletingId(id)}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingId(null);
        }}
        title={editingId ? 'Editar Profissional' : 'Adicionar Profissional'}
      >
        <ProfessionalForm
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
        title="Remover profissional"
        description="Tem certeza que deseja remover este profissional? Esta ação não pode ser desfeita."
        confirmLabel="Remover"
      />
    </div>
  );
}
