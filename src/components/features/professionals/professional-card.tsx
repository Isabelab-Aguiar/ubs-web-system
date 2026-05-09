import { PencilLine, Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusDot } from '@/components/ui/status-dot';
import { SpecialtyBadge } from './specialty-badge';
import type { HealthProfessionalType } from '@/types/health-professional.types';

interface ProfessionalCardProps {
  professional: HealthProfessionalType;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function ProfessionalCard({ professional, onEdit, onDelete }: ProfessionalCardProps) {
  const initial = professional.name.charAt(0).toUpperCase();

  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center shrink-0">
            <span className="text-primary-600 font-bold text-lg">{initial}</span>
          </div>
          <div>
            <p className="font-semibold text-neutral-900">{professional.name}</p>
            <SpecialtyBadge specialty={professional.specialty} />
          </div>
        </div>
        <StatusDot status={professional.isActive ? 'active' : 'inactive'} />
      </div>

      {(professional.councilType || professional.councilNumber) && (
        <p className="text-xs text-neutral-400">
          {professional.councilType} {professional.councilNumber}
        </p>
      )}

      {professional.bio && (
        <p className="text-sm text-neutral-600 line-clamp-2">{professional.bio}</p>
      )}

      {(onEdit || onDelete) && (
        <div className="flex gap-1 mt-auto pt-1">
          {onEdit && (
            <Button
              variant="ghost"
              size="sm"
              title="Editar"
              onClick={() => onEdit(professional.id)}
            >
              <PencilLine size={16} />
            </Button>
          )}
          {onDelete && (
            <Button
              variant="ghost"
              size="sm"
              title="Excluir"
              onClick={() => onDelete(professional.id)}
            >
              <Trash2 size={16} />
            </Button>
          )}
        </div>
      )}
    </Card>
  );
}
