'use client';

import { useState } from 'react';
import { ClipboardList } from 'lucide-react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableSkeleton,
  TableEmpty,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { PriorityBadge } from './priority-badge';
import { DemandStatusBadge } from './demand-status-badge';
import type { SpontaneousDemandType, DemandStatus } from '@/types/spontaneous-demand.types';

const priorityOrder: Record<string, number> = { urgent: 0, high: 1, medium: 2, low: 3 };

const tabs: { key: string; label: string }[] = [
  { key: 'all', label: 'Todos' },
  { key: 'waiting', label: 'Aguardando' },
  { key: 'in_progress', label: 'Em atendimento' },
  { key: 'completed', label: 'Concluído' },
];

interface DemandTableProps {
  demands: SpontaneousDemandType[];
  isLoading: boolean;
  onUpdateStatus: (id: string, status: DemandStatus) => void;
}

export function DemandTable({ demands, isLoading, onUpdateStatus }: DemandTableProps) {
  const [activeTab, setActiveTab] = useState('all');

  const filtered = demands
    .filter((d) => activeTab === 'all' || d.status === activeTab)
    .sort((a, b) => (priorityOrder[a.priority] ?? 3) - (priorityOrder[b.priority] ?? 3));

  if (isLoading) return <TableSkeleton rows={5} cols={6} />;

  return (
    <div className="space-y-4">
      <div className="flex gap-2 border-b border-neutral-200">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors -mb-px ${
              activeTab === tab.key
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-neutral-500 hover:text-neutral-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Paciente</TableHead>
            <TableHead>Queixa</TableHead>
            <TableHead>Prioridade</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Hora</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.length === 0 ? (
            <TableEmpty icon={ClipboardList} title="Nenhuma demanda encontrada" cols={6} />
          ) : (
            filtered.map((demand) => (
              <TableRow key={demand.id}>
                <TableCell>
                  <span className="text-sm font-semibold text-neutral-800">
                    {demand.patientName}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-neutral-600 truncate max-w-[180px] block">
                    {demand.chiefComplaint}
                  </span>
                </TableCell>
                <TableCell>
                  <PriorityBadge priority={demand.priority} />
                </TableCell>
                <TableCell>
                  <DemandStatusBadge status={demand.status} />
                </TableCell>
                <TableCell>
                  <span className="text-sm text-neutral-500">
                    {new Date(demand.createdAt).toLocaleTimeString('pt-BR', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </TableCell>
                <TableCell>
                  {demand.status === 'waiting' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onUpdateStatus(demand.id, 'in_progress')}
                    >
                      Iniciar
                    </Button>
                  )}
                  {demand.status === 'in_progress' && (
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => onUpdateStatus(demand.id, 'completed')}
                    >
                      Concluir
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
