'use client';

import { Users } from 'lucide-react';
import { EmptyState } from '@/components/ui/empty-state';
import { ProfessionalCard } from './professional-card';
import type { HealthProfessionalType } from '@/types/health-professional.types';

interface ProfessionalGridProps {
  professionals: HealthProfessionalType[];
  isLoading: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ProfessionalGrid({
  professionals,
  isLoading,
  onEdit,
  onDelete,
}: ProfessionalGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-40 animate-pulse bg-neutral-100 rounded-2xl" />
        ))}
      </div>
    );
  }

  if (professionals.length === 0) {
    return (
      <EmptyState
        icon={Users}
        title="Nenhum profissional encontrado"
        description="Adicione profissionais de saúde para começar"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {professionals.map((professional) => (
        <ProfessionalCard
          key={professional.id}
          professional={professional}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
