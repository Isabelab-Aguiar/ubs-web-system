'use client';

import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { AcsSearch } from '@/components/features/territory/acs-search';
import { AcsAgentForm } from '@/components/features/territory/acs-agent-form';
import { MicroAreaCard } from '@/components/features/territory/micro-area-card';
import { Modal } from '@/components/ui/modal';
import { territoryService } from '@/lib/api/services/territory.service';
import { useToastStore } from '@/stores/toast.store';
import { usePermissions } from '@/hooks/use-permissions';
import type { MicroAreaType, AcsAgentType } from '@/types/territory.types';

type MicroAreaWithAgents = MicroAreaType & { acsAgents: AcsAgentType[] };

export default function TerritoryPage() {
  const [microAreas, setMicroAreas] = useState<MicroAreaType[]>([]);
  const [acsAgents, setAcsAgents] = useState<AcsAgentType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toast = useToastStore();
  const { canManageAcs } = usePermissions();

  async function load() {
    setIsLoading(true);
    try {
      const [areas, agents] = await Promise.all([
        territoryService.listMicroAreas(),
        territoryService.listAcsAgents(),
      ]);
      setMicroAreas(areas);
      setAcsAgents(agents);
    } catch {
      toast.error('Erro ao carregar dados do território');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const combined: MicroAreaWithAgents[] = microAreas.map((m) => ({
    ...m,
    acsAgents: acsAgents.filter((a) => a.microAreaId === m.id),
  }));

  async function handleSubmit(data: { name: string; phone: string; microAreaId?: string }) {
    setIsSubmitting(true);
    try {
      await territoryService.createAcsAgent(data);
      toast.success('ACS cadastrado com sucesso');
      setIsModalOpen(false);
      load();
    } catch {
      toast.error('Erro ao cadastrar ACS');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-5">
      <AcsSearch microAreas={combined} />

      <PageHeader
        title="Território"
        action={{
          label: 'Adicionar ACS',
          show: canManageAcs,
          onClick: () => setIsModalOpen(true),
        }}
      />

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-40 bg-neutral-100 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {combined.map((area) => (
            <MicroAreaCard key={area.id} microArea={area} />
          ))}
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Adicionar ACS">
        <AcsAgentForm microAreas={microAreas} onSubmit={handleSubmit} isLoading={isSubmitting} />
      </Modal>
    </div>
  );
}
