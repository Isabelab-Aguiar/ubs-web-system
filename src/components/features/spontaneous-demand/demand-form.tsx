'use client';

import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createDemandSchema, type CreateDemandValues } from '@/lib/validations/demand.schema';
import { FormField } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const priorityOptions = [
  { value: 'low', label: 'Baixa' },
  { value: 'medium', label: 'Média' },
  { value: 'high', label: 'Alta' },
  { value: 'urgent', label: 'Urgente' },
];

interface DemandFormProps {
  onSubmit: (values: CreateDemandValues) => Promise<void>;
  isLoading?: boolean;
}

export function DemandForm({ onSubmit, isLoading }: DemandFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateDemandValues>({
    resolver: zodResolver(createDemandSchema),
    defaultValues: { priority: 'medium' },
  });

  const priority = useWatch({ control, name: 'priority' });
  const isUrgent = priority === 'urgent';

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        className={`space-y-4 p-4 rounded-lg transition-colors ${isUrgent ? 'border-2 border-danger-500' : 'border border-transparent'}`}
      >
        <FormField label="Nome do paciente" error={errors.patientName?.message} required>
          <Input {...register('patientName')} placeholder="Nome completo do paciente" />
        </FormField>

        <FormField label="Data de nascimento" error={errors.patientBirthDate?.message}>
          <Input {...register('patientBirthDate')} type="date" />
        </FormField>

        <FormField label="Queixa principal" error={errors.chiefComplaint?.message} required>
          <Textarea
            {...register('chiefComplaint')}
            rows={3}
            placeholder="Descreva a queixa principal..."
          />
        </FormField>

        <FormField label="Prioridade" error={errors.priority?.message} required>
          <Select {...register('priority')} options={priorityOptions} />
        </FormField>

        <FormField label="Observações" error={errors.notes?.message}>
          <Textarea {...register('notes')} rows={2} placeholder="Observações adicionais..." />
        </FormField>

        <Button type="submit" loading={isLoading} className="w-full">
          Registrar Demanda
        </Button>
      </div>
    </form>
  );
}
