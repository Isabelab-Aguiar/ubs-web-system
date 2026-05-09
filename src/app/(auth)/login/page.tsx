'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, HeartPulse, Shield, Users, Activity, Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/stores/auth.store';
import { useToastStore } from '@/stores/toast.store';

const schema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Senha deve ter ao menos 6 caracteres'),
});

type LoginForm = z.infer<typeof schema>;

const FEATURES = [
  { icon: Shield, text: 'Acesso seguro com autenticação JWT' },
  { icon: Users, text: 'Gestão completa da equipe de saúde' },
  { icon: Activity, text: 'Monitoramento em tempo real da demanda' },
];

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuthStore();
  const { error: toastError } = useToastStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: LoginForm) => {
    try {
      await login(data);
    } catch {
      toastError('Credenciais inválidas. Verifique seu e-mail e senha.');
    }
  };

  return (
    <div className="min-h-screen flex">
      <div
        className="hidden lg:flex flex-col w-[52%] relative overflow-hidden"
        style={{ background: 'linear-gradient(145deg, #0C326F 0%, #041125 60%, #00695D 100%)' }}
      >
        <div className="absolute inset-0 opacity-[0.07]">
          {Array.from({ length: 14 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full border border-white"
              style={{
                width: `${(i + 1) * 80}px`,
                height: `${(i + 1) * 80}px`,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          ))}
        </div>

        <div className="relative z-10 flex flex-col justify-between h-full p-14">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
              <HeartPulse size={22} className="text-white" />
            </div>
            <div>
              <p className="text-white font-bold text-lg leading-none">ESF Catalão</p>
              <p className="text-white/50 text-xs mt-0.5">Divinópolis, MG</p>
            </div>
          </div>

          <div>
            <h1 className="text-[42px] font-black text-white leading-[1.1] mb-5">
              Saúde que
              <br />
              <span className="text-accent-400">transforma</span>
              <br />
              vidas.
            </h1>
            <p className="text-white/60 text-base leading-relaxed mb-10 max-w-xs">
              Sistema integrado de gestão da Estratégia de Saúde da Família — bairro Catalão.
            </p>

            <div className="space-y-3.5">
              {FEATURES.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                    <Icon size={15} className="text-white/80" />
                  </div>
                  <span className="text-sm text-white/65">{text}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-white/30 text-xs">
            © 2026 Prefeitura de Divinópolis. Todos os direitos reservados.
          </p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-[400px]">
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="w-9 h-9 rounded-xl bg-primary-600 flex items-center justify-center">
              <HeartPulse size={18} className="text-white" />
            </div>
            <p className="font-bold text-neutral-900">ESF Catalão</p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-black text-neutral-900">Faça seu login</h2>
            <p className="text-neutral-500 text-sm mt-1.5">
              Área restrita a profissionais da unidade.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="E-mail"
              type="email"
              placeholder="nome@esf.gov.br"
              error={errors.email?.message}
              leftIcon={<Mail size={16} />}
              {...register('email')}
            />

            <Input
              label="Senha"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              error={errors.password?.message}
              leftIcon={<Lock size={16} />}
              rightIcon={
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPassword((p) => !p)}
                  className="text-neutral-400 hover:text-neutral-700 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              }
              {...register('password')}
            />

            <Button type="submit" loading={isLoading} className="w-full !mt-6" size="lg">
              Entrar no sistema
            </Button>
          </form>

          <p className="text-center text-xs text-neutral-400 mt-8 leading-relaxed">
            Esqueceu sua senha?{' '}
            <span className="text-primary-600 font-medium">
              Entre em contato com o administrador.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
