import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  AlertCircle,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Users,
  ChevronLeft,
  Star,
} from 'lucide-react';
import type { CampaignType } from '@/types/campaign.types';

const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api/v1';

async function getCampaign(id: string): Promise<CampaignType | null> {
  try {
    const res = await fetch(`${API}/campaigns/${id}`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

const CATEGORY_LABELS: Record<string, string> = {
  vaccination: 'Vacinação',
  prevention: 'Prevenção',
  screening: 'Rastreamento',
  awareness: 'Conscientização',
  nutrition: 'Nutrição',
  mental_health: 'Saúde Mental',
  other: 'Outros',
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const campaign = await getCampaign(id);
  if (!campaign) return { title: 'Campanha não encontrada' };
  return {
    title: `${campaign.title} | ESF Catalão`,
    description: campaign.subtitle ?? campaign.description.slice(0, 160),
  };
}

export default async function CampaignDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const campaign = await getCampaign(id);
  if (!campaign) notFound();

  const categoryLabel = CATEGORY_LABELS[campaign.category] ?? campaign.category;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <Link
        href="/campaigns"
        className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-primary-600 transition-colors mb-8"
      >
        <ChevronLeft size={16} />
        Voltar para campanhas
      </Link>

      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary-100 text-primary-700">
            {categoryLabel}
          </span>
          {campaign.isUrgent && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-danger-100 text-danger-700">
              <AlertCircle size={12} />
              Urgente
            </span>
          )}
          {campaign.isFeatured && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-warning-100 text-warning-700">
              <Star size={12} />
              Destaque
            </span>
          )}
        </div>

        <div>
          <h1 className="text-3xl font-black text-neutral-900 mb-2">{campaign.title}</h1>
          {campaign.subtitle && <p className="text-lg text-neutral-500">{campaign.subtitle}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-xl bg-neutral-50 border border-neutral-200">
          <div className="flex items-start gap-3">
            <Calendar size={18} className="text-primary-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-0.5">
                {campaign.endDate ? 'Período' : 'Data de início'}
              </p>
              <p className="text-sm font-medium text-neutral-900">
                {formatDate(campaign.startDate)}
                {campaign.endDate && ` — ${formatDate(campaign.endDate)}`}
              </p>
            </div>
          </div>

          {campaign.scheduleTime && (
            <div className="flex items-start gap-3">
              <Clock size={18} className="text-primary-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-0.5">
                  Horário
                </p>
                <p className="text-sm font-medium text-neutral-900">{campaign.scheduleTime}</p>
              </div>
            </div>
          )}

          {campaign.location && (
            <div className="flex items-start gap-3">
              <MapPin size={18} className="text-primary-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-0.5">
                  Local
                </p>
                <p className="text-sm font-medium text-neutral-900">{campaign.location}</p>
              </div>
            </div>
          )}

          {campaign.targetAudience && (
            <div className="flex items-start gap-3">
              <Users size={18} className="text-primary-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-0.5">
                  Público-alvo
                </p>
                <p className="text-sm font-medium text-neutral-900">{campaign.targetAudience}</p>
              </div>
            </div>
          )}

          {campaign.contact && (
            <div className="flex items-start gap-3">
              <Phone size={18} className="text-primary-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-0.5">
                  Contato
                </p>
                <p className="text-sm font-medium text-neutral-900">{campaign.contact}</p>
              </div>
            </div>
          )}
        </div>

        <div>
          <h2 className="text-base font-bold text-neutral-900 mb-3">Sobre a campanha</h2>
          <p className="text-sm text-neutral-600 leading-relaxed whitespace-pre-line">
            {campaign.description}
          </p>
        </div>
      </div>
    </div>
  );
}
