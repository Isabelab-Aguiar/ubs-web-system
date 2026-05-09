'use client';

import { useState } from 'react';
import { PencilLine, Trash2 } from 'lucide-react';
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
import { VaccineStatusCell } from './vaccine-status-cell';
import type { VaccineStockType } from '@/types/vaccine-stock.types';
import { Syringe } from 'lucide-react';

interface VaccineStockTableProps {
  vaccines: VaccineStockType[];
  isLoading: boolean;
  onEdit: (id: string) => void;
  onUpdateQuantity: (id: string, qty: number) => void;
  onDelete?: (id: string) => void;
}

export function VaccineStockTable({
  vaccines,
  isLoading,
  onEdit,
  onUpdateQuantity,
  onDelete,
}: VaccineStockTableProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  function startEdit(id: string, current: number) {
    setEditingId(id);
    setEditValue(String(current));
  }

  function commitEdit(id: string) {
    const qty = Number(editValue);
    if (!isNaN(qty) && qty >= 0) onUpdateQuantity(id, qty);
    setEditingId(null);
  }

  function handleKeyDown(e: React.KeyboardEvent, id: string) {
    if (e.key === 'Enter') commitEdit(id);
    if (e.key === 'Escape') setEditingId(null);
  }

  if (isLoading) return <TableSkeleton rows={5} cols={8} />;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Grupo Etário</TableHead>
          <TableHead>Estoque</TableHead>
          <TableHead>Mín.</TableHead>
          <TableHead>Lote</TableHead>
          <TableHead>Validade</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {vaccines.length === 0 ? (
          <TableEmpty
            icon={Syringe}
            title="Nenhuma vacina encontrada"
            description="Adicione vacinas ao estoque para começar"
            cols={8}
          />
        ) : (
          vaccines.map((vaccine) => {
            const isExpired = vaccine.expirationDate
              ? new Date(vaccine.expirationDate) < new Date()
              : false;
            return (
              <TableRow key={vaccine.id}>
                <TableCell>
                  <span className="text-sm font-semibold text-neutral-800">{vaccine.name}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-neutral-600 capitalize">
                    {vaccine.targetAgeGroup}
                  </span>
                </TableCell>
                <TableCell>
                  {editingId === vaccine.id ? (
                    <input
                      autoFocus
                      type="number"
                      min={0}
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onBlur={() => commitEdit(vaccine.id)}
                      onKeyDown={(e) => handleKeyDown(e, vaccine.id)}
                      className="w-20 px-2 py-1 text-sm border border-primary-500 rounded focus:outline-none"
                    />
                  ) : (
                    <button
                      onClick={() => startEdit(vaccine.id, vaccine.currentQuantity)}
                      className="text-sm font-medium text-neutral-700 hover:text-primary-600 hover:underline cursor-pointer"
                    >
                      {vaccine.currentQuantity}
                    </button>
                  )}
                </TableCell>
                <TableCell>
                  <span className="text-sm text-neutral-600">{vaccine.minimumQuantity}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-neutral-500">{vaccine.batchNumber ?? '—'}</span>
                </TableCell>
                <TableCell>
                  {vaccine.expirationDate ? (
                    <span
                      className={`text-sm ${isExpired ? 'text-danger-500 font-medium' : 'text-neutral-600'}`}
                    >
                      {new Date(vaccine.expirationDate).toLocaleDateString('pt-BR')}
                    </span>
                  ) : (
                    <span className="text-sm text-neutral-400">—</span>
                  )}
                </TableCell>
                <TableCell>
                  <VaccineStatusCell
                    current={vaccine.currentQuantity}
                    minimum={vaccine.minimumQuantity}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      title="Editar"
                      onClick={() => onEdit(vaccine.id)}
                    >
                      <PencilLine size={16} />
                    </Button>
                    {onDelete && (
                      <Button
                        variant="ghost"
                        size="sm"
                        title="Excluir"
                        onClick={() => onDelete(vaccine.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
}
