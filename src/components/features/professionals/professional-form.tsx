'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createProfessionalSchema,
  type CreateProfessionalValues,
} from '@/lib/validations/professional.schema';
import { FormField } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const specialtyOptions = [
  { value: 'doctor', label: 'Médico(a)' },
  { value: 'nurse', label: 'Enfermeiro(a)' },
  { value: 'dentist', label: 'Dentista' },
  { value: 'pharmacist', label: 'Farmacêutico(a)' },
  { value: 'psychologist', label: 'Psicólogo(a)' },
  { value: 'physiotherapist', label: 'Fisioterapeuta' },
  { value: 'nutritionist', label: 'Nutricionista' },
  { value: 'social_worker', label: 'Assistente Social' },
  { value: 'gynecologist', label: 'Ginecologista' },
  { value: 'pediatrician', label: 'Pediatra' },
];

const councilTypeOptions = [
  { value: 'CRM', label: 'CRM' },
  { value: 'COREN', label: 'COREN' },
  { value: 'CRO', label: 'CRO' },
  { value: 'CRF', label: 'CRF' },
  { value: 'CRP', label: 'CRP' },
  { value: 'CREFITO', label: 'CREFITO' },
  { value: 'CRN', label: 'CRN' },
  { value: 'CRESS', label: 'CRESS' },
];

interface ProfessionalFormProps {
  defaultValues?: Partial<CreateProfessionalValues>;
  onSubmit: (values: CreateProfessionalValues) => Promise<void>;
  isLoading?: boolean;
}

export function ProfessionalForm({ defaultValues, onSubmit, isLoading }: ProfessionalFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProfessionalValues>({
    resolver: zodResolver(createProfessionalSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormField label="Nome completo" error={errors.name?.message} required>
        <Input {...register('name')} placeholder="Nome do profissional" />
      </FormField>

      <FormField label="Especialidade" error={errors.specialty?.message} required>
        <Select
          {...register('specialty')}
          options={specialtyOptions}
          placeholder="Selecione a especialidade"
        />
      </FormField>

      <div className="grid grid-cols-2 gap-4">
        <FormField label="Conselho" error={errors.councilType?.message}>
          <Select {...register('councilType')} options={councilTypeOptions} placeholder="Tipo" />
        </FormField>
        <FormField label="Número do conselho" error={errors.councilNumber?.message}>
          <Input {...register('councilNumber')} placeholder="Ex: 123456" />
        </FormField>
      </div>

      <FormField label="Bio" error={errors.bio?.message}>
        <Textarea {...register('bio')} rows={4} placeholder="Breve descrição do profissional..." />
      </FormField>

      <Button type="submit" loading={isLoading} className="w-full">
        Salvar Profissional
      </Button>
    </form>
  );
}
