'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createAnnouncementSchema,
  type CreateAnnouncementValues,
} from '@/lib/validations/announcement.schema';
import { FormField } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const categoryOptions = [
  { value: 'vaccine', label: 'Vacinação' },
  { value: 'campaign', label: 'Campanha' },
  { value: 'notice', label: 'Informativo' },
  { value: 'urgent', label: 'Urgente' },
];

const targetPageOptions = [
  { value: 'home', label: 'Início' },
  { value: 'vaccines', label: 'Vacinas' },
  { value: 'services', label: 'Serviços' },
  { value: 'all', label: 'Todas as páginas' },
];

interface AnnouncementFormProps {
  defaultValues?: Partial<CreateAnnouncementValues>;
  onSubmit: (values: CreateAnnouncementValues) => Promise<void>;
  isLoading?: boolean;
}

export function AnnouncementForm({ defaultValues, onSubmit, isLoading }: AnnouncementFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateAnnouncementValues>({
    resolver: zodResolver(createAnnouncementSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormField label="Título" error={errors.title?.message} required>
        <Input {...register('title')} placeholder="Título do aviso" />
      </FormField>

      <FormField label="Conteúdo" error={errors.content?.message} required>
        <Textarea {...register('content')} rows={4} placeholder="Escreva o conteúdo..." />
      </FormField>

      <FormField label="Categoria" error={errors.category?.message} required>
        <Select
          {...register('category')}
          options={categoryOptions}
          placeholder="Selecione a categoria"
        />
      </FormField>

      <FormField label="Página de exibição" error={errors.targetPage?.message} required>
        <Select
          {...register('targetPage')}
          options={targetPageOptions}
          placeholder="Selecione a página"
        />
      </FormField>

      <FormField label="Exibir na homepage" error={errors.showOnHomepage?.message}>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            {...register('showOnHomepage')}
            className="w-4 h-4 rounded border-neutral-300"
          />
          <span className="text-sm text-neutral-600">Exibir na homepage</span>
        </label>
      </FormField>

      <FormField label="Data de expiração" error={errors.expiresAt?.message}>
        <Input {...register('expiresAt')} type="date" />
      </FormField>

      <Button type="submit" loading={isLoading} className="w-full">
        Salvar Aviso
      </Button>
    </form>
  );
}
