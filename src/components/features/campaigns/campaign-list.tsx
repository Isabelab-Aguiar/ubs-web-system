'use client';

import { HeartPulse } from 'lucide-react';
import { EmptyState } from '@/components/ui/empty-state';
import { CampaignCard } from './campaign-card';
import type { CampaignType } from '@/types/campaign.types';

interface CampaignListProps {
  campaigns: CampaignType[];
  isLoading: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function CampaignList({ campaigns, isLoading, onEdit, onDelete }: CampaignListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-48 animate-pulse bg-neutral-100 rounded-2xl" />
        ))}
      </div>
    );
  }

  if (campaigns.length === 0) {
    return <EmptyState icon={HeartPulse} title="Nenhuma campanha encontrada" />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
      {campaigns.map((campaign) => (
        <CampaignCard key={campaign.id} campaign={campaign} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}
