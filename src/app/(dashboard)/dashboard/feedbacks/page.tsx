'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/layout/page-header';
import { FeedbackList } from '@/components/features/feedback/feedback-list';
import { Card } from '@/components/ui/card';
import { feedbackService } from '@/lib/api/services/feedback.service';
import { useToastStore } from '@/stores/toast.store';
import { usePermissions } from '@/hooks/use-permissions';
import { useAuthStore } from '@/stores/auth.store';
import type { FeedbackType } from '@/types/feedback.types';

export default function FeedbacksPage() {
  const [feedbacks, setFeedbacks] = useState<FeedbackType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToastStore();
  const { canViewFeedback } = usePermissions();
  const user = useAuthStore((s) => s.user);
  const router = useRouter();

  useEffect(() => {
    if (user && !canViewFeedback) {
      router.replace('/dashboard');
    }
  }, [user, canViewFeedback, router]);

  async function load() {
    setIsLoading(true);
    try {
      const data = await feedbackService.list();
      setFeedbacks(data);
    } catch {
      toast.error('Erro ao carregar feedbacks');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const stats = [
    { label: 'Total', value: feedbacks.length },
    { label: 'Pendentes', value: feedbacks.filter((f) => f.status === 'pending').length },
    { label: 'Revisados', value: feedbacks.filter((f) => f.status === 'reviewed').length },
    { label: 'Resolvidos', value: feedbacks.filter((f) => f.status === 'resolved').length },
  ];

  async function handleUpdateStatus(id: string, status: string) {
    try {
      await feedbackService.updateStatus(id, {
        status: status as 'pending' | 'reviewed' | 'resolved',
      });
      toast.success('Status atualizado com sucesso');
      load();
    } catch {
      toast.error('Erro ao atualizar status');
    }
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} padding="sm">
            <div className="text-2xl font-black text-neutral-900">{stat.value}</div>
            <div className="text-xs text-neutral-500 mt-0.5">{stat.label}</div>
          </Card>
        ))}
      </div>

      <PageHeader title="Ouvidoria" />

      <FeedbackList
        feedbacks={feedbacks}
        isLoading={isLoading}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
}
