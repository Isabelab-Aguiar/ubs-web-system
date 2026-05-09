'use client';

import { useState, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import { PageHeader } from '@/components/layout/page-header';
import { VaccineStockTable } from '@/components/features/vaccine-stock/vaccine-stock-table';
import { VaccineForm } from '@/components/features/vaccine-stock/vaccine-form';
import { Modal } from '@/components/ui/modal';
import { vaccineStockService } from '@/lib/api/services/vaccine-stock.service';
import { useToastStore } from '@/stores/toast.store';
import { usePermissions } from '@/hooks/use-permissions';
import type { VaccineStockType } from '@/types/vaccine-stock.types';
import type { CreateVaccineStockValues } from '@/lib/validations/vaccine-stock.schema';

export default function VaccineStockPage() {
  const [vaccines, setVaccines] = useState<VaccineStockType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const toast = useToastStore();
  const { isAdmin } = usePermissions();

  async function load() {
    setIsLoading(true);
    try {
      const data = await vaccineStockService.list();
      setVaccines(data);
    } catch {
      toast.error('Erro ao carregar estoque de vacinas');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const lowStock = vaccines.filter((v) => v.currentQuantity < v.minimumQuantity);
  const editingItem = vaccines.find((v) => v.id === editingId);

  async function handleSubmit(values: CreateVaccineStockValues): Promise<void> {
    setIsSubmitting(true);
    try {
      if (editingId) {
        await vaccineStockService.update(editingId, values);
      } else {
        await vaccineStockService.create(values);
      }
      toast.success(editingId ? 'Vacina atualizada com sucesso' : 'Vacina adicionada com sucesso');
      setIsModalOpen(false);
      setEditingId(null);
      load();
    } catch {
      toast.error('Erro ao salvar vacina');
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleUpdateQuantity(id: string, qty: number) {
    try {
      await vaccineStockService.updateQuantity(id, { quantity: qty });
      toast.success('Quantidade atualizada');
      load();
    } catch {
      toast.error('Erro ao atualizar quantidade');
    }
  }

  return (
    <div className="space-y-5">
      {lowStock.length > 0 && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-warning-50 border border-warning-500">
          <AlertTriangle size={18} className="text-warning-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-warning-700">Atenção: estoque baixo</p>
            <p className="text-sm text-warning-600">
              {lowStock.length} {lowStock.length === 1 ? 'vacina precisa' : 'vacinas precisam'} de
              reposição.
            </p>
          </div>
        </div>
      )}

      <PageHeader
        title="Estoque de Vacinas"
        action={{
          label: 'Adicionar Vacina',
          show: isAdmin,
          onClick: () => {
            setEditingId(null);
            setIsModalOpen(true);
          },
        }}
      />

      <VaccineStockTable
        vaccines={vaccines}
        isLoading={isLoading}
        onEdit={(id) => {
          setEditingId(id);
          setIsModalOpen(true);
        }}
        onUpdateQuantity={handleUpdateQuantity}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingId(null);
        }}
        title={editingId ? 'Editar Vacina' : 'Adicionar Vacina'}
      >
        <VaccineForm defaultValues={editingItem} onSubmit={handleSubmit} isLoading={isSubmitting} />
      </Modal>
    </div>
  );
}
