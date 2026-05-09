'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { FormField } from '@/components/ui/form-field';
import { Button } from '@/components/ui/button';

const schema = z.object({
  name: z.string().min(2, 'Nome obrigatório'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
  role: z.enum(['admin', 'professional', 'direction']),
});

type FormData = z.infer<typeof schema>;

interface UserFormProps {
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
}

type StrengthLevel = 0 | 1 | 2 | 3;

function getStrength(password: string): {
  level: StrengthLevel;
  label: string;
  color: string;
  textColor: string;
} {
  if (!password || password.length < 6) return { level: 0, label: '', color: '', textColor: '' };
  if (password.length < 8)
    return { level: 1, label: 'Fraca', color: 'bg-danger-500', textColor: 'text-danger-500' };
  const hasCaps = /[A-Z]/.test(password);
  const hasNum = /[0-9]/.test(password);
  if (hasCaps && hasNum)
    return { level: 3, label: 'Forte', color: 'bg-success-500', textColor: 'text-success-500' };
  return { level: 2, label: 'Média', color: 'bg-warning-500', textColor: 'text-warning-600' };
}

const roleOptions = [
  { value: 'admin', label: 'Administrador' },
  { value: 'direction', label: 'Direção' },
  { value: 'professional', label: 'Profissional' },
];

export function UserForm({ onSubmit, isLoading }: UserFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValue, setPasswordValue] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const strength = getStrength(passwordValue);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormField label="Nome" error={errors.name?.message} required>
        <Input {...register('name')} placeholder="Nome completo" error={errors.name?.message} />
      </FormField>
      <FormField label="Email" error={errors.email?.message} required>
        <Input
          {...register('email')}
          type="email"
          placeholder="email@exemplo.com"
          error={errors.email?.message}
        />
      </FormField>
      <FormField label="Senha" error={errors.password?.message} required>
        <div className="relative">
          <Input
            {...register('password', {
              onChange: (e) => setPasswordValue(e.target.value),
            })}
            type={showPassword ? 'text' : 'password'}
            placeholder="Mínimo 6 caracteres"
            error={errors.password?.message}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute top-0 right-0 h-11 px-3 flex items-center text-neutral-400 hover:text-neutral-600 transition-colors z-10"
          >
            {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>
        {strength.level > 0 && (
          <div className="mt-1 space-y-1">
            <div className="h-1.5 rounded-full bg-neutral-100 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${strength.color}`}
                style={{ width: `${(strength.level / 3) * 100}%` }}
              />
            </div>
            <p className={`text-xs font-medium ${strength.textColor}`}>{strength.label}</p>
          </div>
        )}
      </FormField>
      <FormField label="Função" error={errors.role?.message} required>
        <Select
          {...register('role')}
          options={roleOptions}
          placeholder="Selecione uma função"
          error={errors.role?.message}
        />
      </FormField>
      <Button type="submit" variant="primary" loading={isLoading} className="w-full">
        Criar Usuário
      </Button>
    </form>
  );
}
