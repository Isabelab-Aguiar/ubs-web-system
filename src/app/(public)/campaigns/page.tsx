import { AlertCircle } from 'lucide-react';
import { CampaignCard } from '@/components/features/campaigns/campaign-card';
import type { CampaignType } from '@/types/campaign.types';

const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api/v1';

async function getCampaigns(): Promise<CampaignType[]> {
  try {
    const res = await fetch(`${API}/campaigns`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function CampaignsPage() {
  const all = await getCampaigns();
  const campaigns = [...all].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
  );
  const urgent = campaigns.filter((c) => c.isUrgent);

  return (
    <div>
      <section className="bg-gradient-to-br from-primary-50 to-white py-14 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-black text-neutral-900 mb-3">
            Campanhas de Saúde
          </h1>
          <p className="text-neutral-500 text-base">
            Fique por dentro das nossas ações e campanhas de promoção da saúde na comunidade.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
        {urgent.length > 0 && (
          <div className="flex items-start gap-3 p-4 rounded-xl bg-danger-50 border border-danger-200">
            <AlertCircle size={18} className="text-danger-500 shrink-0 mt-0.5" />
            <p className="text-sm font-medium text-danger-700">
              Atenção: há {urgent.length}{' '}
              {urgent.length === 1 ? 'campanha urgente' : 'campanhas urgentes'} em andamento.
            </p>
          </div>
        )}

        {campaigns.length === 0 ? (
          <p className="text-sm text-neutral-400 text-center py-16">
            Nenhuma campanha disponível no momento.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {campaigns.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
