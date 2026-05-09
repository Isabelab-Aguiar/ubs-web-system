'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, ThumbsUp, Lightbulb, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { feedbackService } from '@/lib/api/services/feedback.service';
import { submitFeedbackSchema, type SubmitFeedbackValues } from '@/lib/validations/feedback.schema';
import type { FeedbackKind } from '@/types/feedback.types';

const TABS: { kind: FeedbackKind; label: string; icon: React.ElementType }[] = [
  { kind: 'praise', label: 'Elogio', icon: ThumbsUp },
  { kind: 'suggestion', label: 'Sugestão', icon: Lightbulb },
  { kind: 'complaint', label: 'Reclamação', icon: AlertCircle },
];

const TAB_DESCRIPTIONS: Record<FeedbackKind, string> = {
  praise: 'Compartilhe uma experiência positiva ou reconheça um profissional.',
  suggestion: 'Sugira melhorias nos nossos serviços ou atendimento.',
  complaint: 'Relate um problema ou insatisfação para que possamos melhorar.',
};

export default function FeedbackPage() {
  const [activeTab, setActiveTab] = useState<FeedbackKind>('praise');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SubmitFeedbackValues>({
    resolver: zodResolver(submitFeedbackSchema),
    defaultValues: { type: 'praise', isAnonymous: false },
  });

  async function onSubmit(values: SubmitFeedbackValues): Promise<void> {
    setLoading(true);
    try {
      await feedbackService.submit({
        type: activeTab,
        message: values.message,
        authorName: isAnonymous ? undefined : values.name,
        authorEmail: isAnonymous ? undefined : values.email || undefined,
        isAnonymous,
      });
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  function handleTabChange(kind: FeedbackKind) {
    setActiveTab(kind);
    reset({ type: kind, isAnonymous, message: '', name: '', email: '', phone: '' });
  }

  function handleNewFeedback() {
    setSubmitted(false);
    setActiveTab('praise');
    setIsAnonymous(false);
    reset({ type: 'praise', isAnonymous: false });
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center gap-5">
        <div className="w-16 h-16 rounded-full bg-success-100 flex items-center justify-center">
          <CheckCircle2 size={32} className="text-success-600" />
        </div>
        <div>
          <h2 className="text-xl font-black text-neutral-900 mb-2">
            Feedback enviado com sucesso!
          </h2>
          <p className="text-sm text-neutral-500 max-w-sm">
            Agradecemos sua participação. Seu feedback é muito importante para melhorarmos nossos
            serviços.
          </p>
        </div>
        <Button variant="primary" onClick={handleNewFeedback}>
          Enviar outro feedback
        </Button>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-gradient-to-br from-primary-50 to-white py-14 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-black text-neutral-900 mb-3">
            Envie seu Feedback
          </h1>
          <p className="text-neutral-500 text-base max-w-xl mx-auto">
            Sua opinião nos ajuda a melhorar o atendimento e os serviços da nossa unidade de saúde.
          </p>
        </div>
      </section>

      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="flex gap-1 p-1 bg-neutral-100 rounded-xl mb-8">
          {TABS.map(({ kind, label, icon: Icon }) => (
            <button
              key={kind}
              onClick={() => handleTabChange(kind)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all ${
                activeTab === kind
                  ? 'bg-white text-neutral-900 shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-700'
              }`}
            >
              <Icon size={15} />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>

        <p className="text-sm text-neutral-500 mb-6">{TAB_DESCRIPTIONS[activeTab]}</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
              Mensagem <span className="text-danger-500">*</span>
            </label>
            <Textarea
              {...register('message')}
              placeholder="Descreva sua experiência com detalhes..."
              rows={5}
              error={errors.message?.message}
            />
          </div>

          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="w-4 h-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm text-neutral-700">Enviar anonimamente</span>
          </label>

          {!isAnonymous && (
            <div className="space-y-4 pt-1">
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
                  Nome <span className="text-danger-500">*</span>
                </label>
                <Input
                  {...register('name')}
                  placeholder="Seu nome completo"
                  error={errors.name?.message}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
                  E-mail <span className="text-neutral-400 font-normal">(opcional)</span>
                </label>
                <Input
                  {...register('email')}
                  type="email"
                  placeholder="seu@email.com"
                  error={errors.email?.message}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
                  Telefone <span className="text-neutral-400 font-normal">(opcional)</span>
                </label>
                <Input
                  {...register('phone')}
                  placeholder="(64) 99999-9999"
                  error={errors.phone?.message}
                />
              </div>
            </div>
          )}

          <Button type="submit" variant="primary" loading={loading} className="w-full">
            Enviar feedback
          </Button>
        </form>
      </div>
    </div>
  );
}
