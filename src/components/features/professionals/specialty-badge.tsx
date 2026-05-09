import { Badge } from '@/components/ui/badge';
import type { Specialty } from '@/types/health-professional.types';

const specialtyConfig: Record<
  Specialty,
  { label: string; variant: 'info' | 'accent' | 'neutral' }
> = {
  doctor: { label: 'Médico(a)', variant: 'info' },
  nurse: { label: 'Enfermeiro(a)', variant: 'accent' },
  dentist: { label: 'Dentista', variant: 'neutral' },
  pharmacist: { label: 'Farmacêutico(a)', variant: 'neutral' },
  psychologist: { label: 'Psicólogo(a)', variant: 'neutral' },
  physiotherapist: { label: 'Fisioterapeuta', variant: 'neutral' },
  nutritionist: { label: 'Nutricionista', variant: 'neutral' },
  social_worker: { label: 'Assistente Social', variant: 'neutral' },
  gynecologist: { label: 'Ginecologista', variant: 'info' },
  pediatrician: { label: 'Pediatra', variant: 'info' },
};

export function SpecialtyBadge({ specialty }: { specialty: Specialty }) {
  const { label, variant } = specialtyConfig[specialty];
  return <Badge variant={variant}>{label}</Badge>;
}
