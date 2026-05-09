import { PencilLine, Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { CampaignType } from '@/types/campaign.types';

interface CampaignCardProps {
  campaign: CampaignType;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function CampaignCard({ campaign, onEdit, onDelete }: CampaignCardProps) {
  return (
    <Card hover className="flex flex-col gap-3 transition-shadow">
      {(campaign.isUrgent || campaign.isFeatured) && (
        <div className="flex flex-wrap gap-2">
          {campaign.isUrgent && <Badge variant="danger">Urgente</Badge>}
          {campaign.isFeatured && <Badge variant="accent">Em destaque</Badge>}
        </div>
      )}

      <div>
        <h3 className="font-bold text-neutral-900">{campaign.title}</h3>
        <p className="text-xs text-neutral-400 uppercase mt-0.5">{campaign.category}</p>
      </div>

      <p className="text-sm text-neutral-600 line-clamp-3">{campaign.description}</p>

      <div className="flex items-center justify-between mt-auto pt-2">
        <span className="text-xs text-neutral-400">
          {new Date(campaign.startDate).toLocaleDateString('pt-BR')}
        </span>
        {(onEdit || onDelete) && (
          <div className="flex gap-1">
            {onEdit && (
              <Button variant="ghost" size="sm" title="Editar" onClick={() => onEdit(campaign.id)}>
                <PencilLine size={16} />
              </Button>
            )}
            {onDelete && (
              <Button
                variant="ghost"
                size="sm"
                title="Excluir"
                onClick={() => onDelete(campaign.id)}
              >
                <Trash2 size={16} />
              </Button>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
