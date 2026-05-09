import { User } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { MicroAreaType } from '@/types/territory.types';

interface MicroAreaCardProps {
  microArea: MicroAreaType;
}

export function MicroAreaCard({ microArea }: MicroAreaCardProps) {
  const visibleStreets = microArea.streets.slice(0, 3);
  const extraCount = microArea.streets.length - 3;

  return (
    <Card padding="sm">
      <div className="flex items-center gap-2 mb-3">
        <Badge variant="neutral">{microArea.code}</Badge>
        <span className="text-sm font-semibold text-neutral-800">{microArea.name}</span>
      </div>

      {microArea.streets.length > 0 && (
        <div className="mb-3">
          <p className="text-xs font-medium text-neutral-400 mb-1.5">Ruas</p>
          <div className="flex flex-wrap gap-1.5">
            {visibleStreets.map((street) => (
              <span
                key={street}
                className="text-xs bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-full"
              >
                {street}
              </span>
            ))}
            {extraCount > 0 && (
              <span className="text-xs text-neutral-400 self-center">+{extraCount} ruas</span>
            )}
          </div>
        </div>
      )}

      {microArea.acsAgents && microArea.acsAgents.length > 0 && (
        <div>
          <p className="text-xs font-medium text-neutral-400 mb-1.5">ACS</p>
          <ul className="space-y-1">
            {microArea.acsAgents.map((agent) => (
              <li key={agent.id} className="flex items-center gap-1.5 text-xs text-neutral-600">
                <User size={12} className="text-neutral-400 shrink-0" />
                {agent.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
}
