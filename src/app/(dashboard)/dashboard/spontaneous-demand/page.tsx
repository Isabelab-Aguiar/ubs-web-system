'use client';

import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { DemandTable } from '@/components/features/spontaneous-demand/demand-table';
import { DemandForm } from '@/components/features/spontaneous-demand/demand-form';
import { Modal } from '@/components/ui/modal';
import { Card } from '@/components/ui/card';
import { spontaneousDemandService } from '@/lib/api/services/spontaneous-demand.service';
import { useToastStore } from '@/stores/toast.store';
import type { SpontaneousDemandType, DemandStatus } from '@/types/spontaneous-demand.types';
import type { CreateDemandValues } from '@/lib/validations/demand.schema';

export default function SpontaneousDemandPage() {
  const [demands, setDemands] = useState<SpontaneousDemandType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toast = useToastStore();

  async function load() {
    setIsLoading(true);
    try {
      const data = await spontaneousDemandService.list();
      setDemands(data);
    } catch {
      toast.error('Erro ao carregar atendimentos');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const today = new Date().toISOString().split('T')[0];
  const waitingCount = demands.filter((d) => d.status === 'waiting').length;
  const inProgressCount = demands.filter((d) => d.status === 'in_progress').length;
  const completedToday = demands.filter(
    (d) => d.status === 'completed' && d.createdAt.startsWith(today),
  ).length;

  const stats = [
    { label: 'Aguardando', value: waitingCount, color: 'text-warning-600', bg: 'bg-warning-50' },
    { label: 'Em atendimento', value: inProgressCount, color: 'text-info-600', bg: 'bg-info-50' },
    {
      label: 'Concluídos hoje',
      value: completedToday,
      color: 'text-success-600',
      bg: 'bg-success-50',
    },
  ];

  async function handleSubmit(values: CreateDemandValues): Promise<void> {
    setIsSubmitting(true);
    try {
      await spontaneousDemandService.create(values);
      toast.success('Atendimento registrado com sucesso');
      setIsModalOpen(false);
      load();
    } catch {
      toast.error('Erro ao registrar atendimento');
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleUpdateStatus(id: string, status: DemandStatus) {
    try {
      await spontaneousDemandService.updateStatus(id, { status });
      toast.success('Status atualizado com sucesso');
      load();
    } catch {
      toast.error('Erro ao atualizar status');
    }
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} padding="sm">
            <div className={`text-2xl font-black ${stat.color}`}>{stat.value}</div>
            <div className="text-xs text-neutral-500 mt-0.5">{stat.label}</div>
          </Card>
        ))}
      </div>

      <PageHeader
        title="Demanda Espontânea"
        action={{ label: 'Registrar Atendimento', onClick: () => setIsModalOpen(true) }}
      />

      <DemandTable demands={demands} isLoading={isLoading} onUpdateStatus={handleUpdateStatus} />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Registrar Atendimento"
      >
        <DemandForm onSubmit={handleSubmit} isLoading={isSubmitting} />
      </Modal>
    </div>
  );
}
