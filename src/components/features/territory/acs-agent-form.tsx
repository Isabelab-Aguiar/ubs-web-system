'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { FormField } from '@/components/ui/form-field';
import { Button } from '@/components/ui/button';
import type { MicroAreaType } from '@/types/territory.types';

const schema = z.object({
  name: z.string().min(2, 'Nome obrigatório'),
  phone: z.string().min(10, 'Telefone inválido'),
  microAreaId: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface AcsAgentFormProps {
  microAreas: MicroAreaType[];
  defaultValues?: Partial<FormData>;
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
}

export function AcsAgentForm({
  microAreas,
  defaultValues,
  onSubmit,
  isLoading,
}: AcsAgentFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const microAreaOptions = microAreas.map((m) => ({
    value: m.id,
    label: `${m.code} — ${m.name}`,
  }));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormField label="Nome" error={errors.name?.message} required>
        <Input {...register('name')} placeholder="Nome do ACS" error={errors.name?.message} />
      </FormField>
      <FormField label="Telefone" error={errors.phone?.message} required>
        <Input {...register('phone')} placeholder="(37) 99999-9999" error={errors.phone?.message} />
      </FormField>
      <FormField label="Microárea" error={errors.microAreaId?.message}>
        <Select
          {...register('microAreaId')}
          options={microAreaOptions}
          placeholder="Selecione uma microárea"
          error={errors.microAreaId?.message}
        />
      </FormField>
      <Button type="submit" variant="primary" loading={isLoading} className="w-full">
        Salvar ACS
      </Button>
    </form>
  );
}
