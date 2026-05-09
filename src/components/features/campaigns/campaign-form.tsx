'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createCampaignSchema, type CreateCampaignValues } from '@/lib/validations/campaign.schema';
import { FormField } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface CampaignFormProps {
  defaultValues?: Partial<CreateCampaignValues>;
  onSubmit: (values: CreateCampaignValues) => Promise<void>;
  isLoading?: boolean;
}

export function CampaignForm({ defaultValues, onSubmit, isLoading }: CampaignFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCampaignValues>({
    resolver: zodResolver(createCampaignSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-neutral-700">Informações Básicas</h3>
        <FormField label="Título" error={errors.title?.message} required>
          <Input {...register('title')} placeholder="Título da campanha" />
        </FormField>
        <FormField label="Subtítulo" error={errors.subtitle?.message}>
          <Input {...register('subtitle')} placeholder="Subtítulo" />
        </FormField>
        <FormField label="Descrição" error={errors.description?.message} required>
          <Textarea {...register('description')} rows={4} placeholder="Descrição da campanha..." />
        </FormField>
        <FormField label="Categoria" error={errors.category?.message} required>
          <Input {...register('category')} placeholder="Categoria" />
        </FormField>
        <FormField label="Público-alvo" error={errors.targetAudience?.message}>
          <Input {...register('targetAudience')} placeholder="Público-alvo" />
        </FormField>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-neutral-700">Detalhes e Configurações</h3>
        <FormField label="Local" error={errors.location?.message}>
          <Input {...register('location')} placeholder="Local da campanha" />
        </FormField>
        <FormField label="Contato" error={errors.contact?.message}>
          <Input {...register('contact')} placeholder="Contato" />
        </FormField>
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Data de início" error={errors.startDate?.message} required>
            <Input {...register('startDate')} type="date" />
          </FormField>
          <FormField label="Data de encerramento" error={errors.endDate?.message}>
            <Input {...register('endDate')} type="date" />
          </FormField>
        </div>
        <FormField label="Horário" error={errors.scheduleTime?.message}>
          <Input {...register('scheduleTime')} type="time" />
        </FormField>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-neutral-700">Opções</h3>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            {...register('isUrgent')}
            className="w-4 h-4 rounded border-neutral-300"
          />
          <span className="text-sm text-neutral-600">Urgente</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            {...register('isFeatured')}
            className="w-4 h-4 rounded border-neutral-300"
          />
          <span className="text-sm text-neutral-600">Em destaque</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            {...register('showOnHomepage')}
            className="w-4 h-4 rounded border-neutral-300"
          />
          <span className="text-sm text-neutral-600">Exibir na homepage</span>
        </label>
      </div>

      <Button type="submit" loading={isLoading} className="w-full">
        Salvar Campanha
      </Button>
    </form>
  );
}
