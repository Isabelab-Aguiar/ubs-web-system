'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { FormField } from '@/components/ui/form-field';
import { Button } from '@/components/ui/button';

const schema = z.object({
  title: z.string().min(2, 'Título obrigatório'),
  description: z.string().optional(),
  eventDate: z.string().min(1, 'Data obrigatória'),
  startTime: z.string().min(1, 'Hora de início obrigatória'),
  endTime: z.string().min(1, 'Hora de fim obrigatória'),
  category: z.enum(['meeting', 'training', 'campaign', 'holiday', 'other']),
  location: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface EventFormProps {
  defaultValues?: Partial<FormData>;
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
}

const categoryOptions = [
  { value: 'meeting', label: 'Reunião' },
  { value: 'training', label: 'Treinamento' },
  { value: 'campaign', label: 'Campanha' },
  { value: 'holiday', label: 'Feriado' },
  { value: 'other', label: 'Outro' },
];

export function EventForm({ defaultValues, onSubmit, isLoading }: EventFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormField label="Título" error={errors.title?.message} required>
        <Input
          {...register('title')}
          placeholder="Título do evento"
          error={errors.title?.message}
        />
      </FormField>
      <FormField label="Descrição" error={errors.description?.message}>
        <Textarea {...register('description')} placeholder="Descrição opcional" rows={3} />
      </FormField>
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Data" error={errors.eventDate?.message} required>
          <Input {...register('eventDate')} type="date" error={errors.eventDate?.message} />
        </FormField>
        <FormField label="Categoria" error={errors.category?.message} required>
          <Select
            {...register('category')}
            options={categoryOptions}
            placeholder="Categoria"
            error={errors.category?.message}
          />
        </FormField>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Início" error={errors.startTime?.message} required>
          <Input {...register('startTime')} type="time" error={errors.startTime?.message} />
        </FormField>
        <FormField label="Fim" error={errors.endTime?.message} required>
          <Input {...register('endTime')} type="time" error={errors.endTime?.message} />
        </FormField>
      </div>
      <FormField label="Local" error={errors.location?.message}>
        <Input {...register('location')} placeholder="Local do evento (opcional)" />
      </FormField>
      <Button type="submit" variant="primary" loading={isLoading} className="w-full">
        Salvar Evento
      </Button>
    </form>
  );
}
