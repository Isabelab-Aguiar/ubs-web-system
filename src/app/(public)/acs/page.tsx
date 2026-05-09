import { HeartPulse } from 'lucide-react';
import { AcsSearch } from '@/components/features/territory/acs-search';
import { MicroAreaCard } from '@/components/features/territory/micro-area-card';
import type { MicroAreaType, AcsAgentType } from '@/types/territory.types';

const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api/v1';

async function getData(): Promise<{ microAreas: MicroAreaType[]; agents: AcsAgentType[] }> {
  try {
    const [mRes, aRes] = await Promise.all([
      fetch(`${API}/territory/micro-areas`, { next: { revalidate: 3600 } }),
      fetch(`${API}/territory/acs-agents`, { next: { revalidate: 3600 } }),
    ]);
    const microAreas: MicroAreaType[] = mRes.ok ? await mRes.json() : [];
    const agents: AcsAgentType[] = aRes.ok ? await aRes.json() : [];
    return { microAreas, agents };
  } catch {
    return { microAreas: [], agents: [] };
  }
}

export default async function AcsPage() {
  const { microAreas, agents } = await getData();

  const combined = microAreas.map((m) => ({
    ...m,
    acsAgents: agents.filter((a) => a.microAreaId === m.id),
  }));

  return (
    <div>
      <section className="bg-gradient-to-br from-primary-50 to-white py-14 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-black text-neutral-900 mb-3">
            Encontre seu ACS
          </h1>
          <p className="text-neutral-500 text-base max-w-xl mx-auto">
            Digite o nome da sua rua para encontrar o Agente Comunitário de Saúde responsável pela
            sua microárea.
          </p>
        </div>
        <div className="max-w-xl mx-auto mt-8">
          <AcsSearch microAreas={combined} />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-xl font-black text-neutral-900 mb-6">Todas as Microáreas</h2>
        {combined.length === 0 ? (
          <p className="text-sm text-neutral-400 text-center py-10">
            Nenhuma microárea disponível no momento.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {combined.map((area) => (
              <MicroAreaCard key={area.id} microArea={area} />
            ))}
          </div>
        )}
      </section>

      <section className="bg-primary-50 border-t border-primary-100 py-10 px-6">
        <div className="max-w-3xl mx-auto flex gap-4 items-start">
          <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center shrink-0 mt-0.5">
            <HeartPulse size={20} className="text-primary-600" />
          </div>
          <div>
            <h3 className="text-base font-bold text-neutral-900 mb-1">O que é um ACS?</h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              O Agente Comunitário de Saúde (ACS) é um profissional que mora na comunidade e
              trabalha como elo entre as famílias e a unidade de saúde. Ele realiza visitas
              domiciliares, orienta sobre prevenção de doenças, vacinas, pré-natal e outros
              serviços. Conhecer seu ACS é o primeiro passo para uma saúde melhor!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
