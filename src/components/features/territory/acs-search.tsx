'use client';

import { useState } from 'react';
import { User } from 'lucide-react';
import { SearchInput } from '@/components/ui/search-input';
import { Card } from '@/components/ui/card';
import { useDebounce } from '@/hooks/use-debounce';
import type { MicroAreaType, AcsAgentType } from '@/types/territory.types';

interface AcsSearchProps {
  microAreas: Array<MicroAreaType & { acsAgents: AcsAgentType[] }>;
}

export function AcsSearch({ microAreas }: AcsSearchProps) {
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearch = useDebounce(searchValue, 300);

  const trimmed = debouncedSearch.trim();
  const results = trimmed
    ? microAreas.filter((m) =>
        m.streets.some((s) => s.toLowerCase().includes(trimmed.toLowerCase())),
      )
    : [];

  return (
    <div className="space-y-4">
      <SearchInput value={searchValue} onChange={setSearchValue} placeholder="Buscar por rua..." />

      {!trimmed && (
        <p className="text-sm text-neutral-400 text-center py-6">
          Digite o nome de uma rua para encontrar seu ACS
        </p>
      )}

      {trimmed && results.length === 0 && (
        <p className="text-sm text-neutral-400 text-center py-6">
          Nenhuma microárea encontrada para esta rua
        </p>
      )}

      {results.map((microArea) => (
        <Card key={microArea.id} padding="sm">
          <p className="text-sm font-semibold text-neutral-800">{microArea.name}</p>
          <p className="text-xs text-neutral-400 mb-2">{microArea.code}</p>
          {microArea.acsAgents.map((agent) => (
            <div key={agent.id} className="flex items-center gap-1.5 text-xs text-neutral-600">
              <User size={12} className="text-neutral-400 shrink-0" />
              {agent.name} · {agent.phone}
            </div>
          ))}
        </Card>
      ))}
    </div>
  );
}
