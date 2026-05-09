'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createVaccineStockSchema,
  type CreateVaccineStockValues,
} from '@/lib/validations/vaccine-stock.schema';
import { FormField } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const ageGroupOptions = [
  { value: 'infantil', label: 'Infantil' },
  { value: 'adolescente', label: 'Adolescente' },
  { value: 'adulto', label: 'Adulto' },
  { value: 'idoso', label: 'Idoso' },
  { value: 'gestante', label: 'Gestante' },
  { value: 'universal', label: 'Universal' },
];

interface VaccineFormProps {
  defaultValues?: Partial<CreateVaccineStockValues>;
  onSubmit: (values: CreateVaccineStockValues) => Promise<void>;
  isLoading?: boolean;
}

export function VaccineForm({ defaultValues, onSubmit, isLoading }: VaccineFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateVaccineStockValues>({
    resolver: zodResolver(createVaccineStockSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormField label="Nome da vacina" error={errors.name?.message} required>
        <Input {...register('name')} placeholder="Nome da vacina" />
      </FormField>

      <FormField label="Faixa etária" error={errors.targetAgeGroup?.message} required>
        <Select
          {...register('targetAgeGroup')}
          options={ageGroupOptions}
          placeholder="Selecione a faixa etária"
        />
      </FormField>

      <div className="grid grid-cols-2 gap-4">
        <FormField label="Quantidade atual" error={errors.currentQuantity?.message} required>
          <Input {...register('currentQuantity')} type="number" min={0} placeholder="0" />
        </FormField>
        <FormField label="Quantidade mínima" error={errors.minimumQuantity?.message} required>
          <Input {...register('minimumQuantity')} type="number" min={1} placeholder="1" />
        </FormField>
      </div>

      <FormField label="Número do lote" error={errors.batchNumber?.message}>
        <Input {...register('batchNumber')} placeholder="Ex: LOT-2024-001" />
      </FormField>

      <FormField label="Data de validade" error={errors.expirationDate?.message}>
        <Input {...register('expirationDate')} type="date" />
      </FormField>

      <Button type="submit" loading={isLoading} className="w-full">
        Salvar Vacina
      </Button>
    </form>
  );
}
