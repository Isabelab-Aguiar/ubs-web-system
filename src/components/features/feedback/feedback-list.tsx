'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FeedbackTypeBadge } from './feedback-type-badge';
import { FeedbackStatusBadge } from './feedback-status-badge';
import type { FeedbackType, FeedbackKind } from '@/types/feedback.types';

interface FeedbackListProps {
  feedbacks: FeedbackType[];
  isLoading: boolean;
  onUpdateStatus: (id: string, status: string) => void;
}

const tabs: { key: 'all' | FeedbackKind; label: string }[] = [
  { key: 'all', label: 'Todos' },
  { key: 'praise', label: 'Elogios' },
  { key: 'complaint', label: 'Reclamações' },
  { key: 'suggestion', label: 'Sugestões' },
];

export function FeedbackList({ feedbacks, isLoading, onUpdateStatus }: FeedbackListProps) {
  const [activeTab, setActiveTab] = useState<'all' | FeedbackKind>('all');

  const filtered = feedbacks.filter((f) => activeTab === 'all' || f.type === activeTab);

  return (
    <div className="space-y-4">
      <div className="flex gap-2 border-b border-neutral-200">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors -mb-px ${
              activeTab === tab.key
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-neutral-500 hover:text-neutral-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-24 rounded-2xl bg-neutral-100 animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-sm text-neutral-400 text-center py-10">Nenhum feedback encontrado</p>
      ) : (
        <div className="space-y-3">
          {filtered.map((feedback) => (
            <Card key={feedback.id} padding="sm">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <FeedbackTypeBadge type={feedback.type} />
                  <FeedbackStatusBadge status={feedback.status} />
                </div>
                <span className="text-xs text-neutral-400">
                  {new Date(feedback.createdAt).toLocaleDateString('pt-BR')}
                </span>
              </div>
              <p className="text-sm text-neutral-700 mt-2 line-clamp-3">{feedback.message}</p>
              <div className="flex items-center justify-between mt-2">
                {feedback.isAnonymous ? (
                  <span className="text-xs text-neutral-400">Anônimo</span>
                ) : (
                  <span className="text-xs text-neutral-500">
                    {feedback.authorName}
                    {feedback.authorEmail && ` · ${feedback.authorEmail}`}
                  </span>
                )}
                <div className="flex gap-2">
                  {feedback.status === 'pending' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onUpdateStatus(feedback.id, 'reviewed')}
                    >
                      Marcar como revisado
                    </Button>
                  )}
                  {feedback.status === 'reviewed' && (
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => onUpdateStatus(feedback.id, 'resolved')}
                    >
                      Resolver
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
