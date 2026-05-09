import Link from 'next/link';
import {
  Stethoscope,
  Syringe,
  Baby,
  Brain,
  MapPin,
  ThumbsUp,
  Lightbulb,
  AlertCircle,
} from 'lucide-react';
import { PublicHeader } from '@/components/layout/public-header';
import { Footer } from '@/components/layout/footer';
import { Card } from '@/components/ui/card';

const SERVICES = [
  {
    icon: Stethoscope,
    title: 'Consultas Médicas',
    description: 'Clínico geral, especialidades e acompanhamento',
  },
  {
    icon: Syringe,
    title: 'Vacinação',
    description: 'Calendário completo de vacinas para todas as idades',
  },
  {
    icon: Baby,
    title: 'Saúde Materno-Infantil',
    description: 'Pré-natal, puericultura e saúde da criança',
  },
  {
    icon: Brain,
    title: 'Saúde Mental',
    description: 'Psicologia, assistência social e apoio emocional',
  },
];

const FEEDBACK_OPTIONS = [
  { icon: ThumbsUp, label: 'Enviar Elogio' },
  { icon: Lightbulb, label: 'Dar Sugestão' },
  { icon: AlertCircle, label: 'Registrar Reclamação' },
];

export default function HomePage() {
  return (
    <>
      <PublicHeader />
      <main>
        <section
          className="relative min-h-[480px] md:min-h-[560px] flex items-center overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, #0C326F 0%, #041125 60%, #00695D 100%)',
          }}
        >
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-white/5 blur-3xl pointer-events-none" />
          <div className="relative max-w-6xl mx-auto px-6 py-20">
            <p className="text-primary-300 text-sm font-semibold uppercase tracking-widest mb-4">
              Estratégia de Saúde da Família
            </p>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-4">
              Cuidando de você
              <br />e da sua família
            </h1>
            <p className="text-neutral-300 text-lg mb-8 max-w-lg">
              Bairro Catalão, Divinópolis/MG — atendimento integral e humanizado para toda a
              comunidade.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#servicos"
                className="inline-flex items-center px-6 py-3 rounded-xl bg-primary-600 text-white font-semibold text-sm hover:bg-primary-700 transition-colors"
              >
                Nossos Serviços
              </a>
              <Link
                href="/acs"
                className="inline-flex items-center px-6 py-3 rounded-xl border border-white/50 text-white font-semibold text-sm hover:bg-white/10 transition-colors"
              >
                Encontrar meu ACS
              </Link>
            </div>
          </div>
        </section>

        <section id="servicos" className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-black text-neutral-900 mb-8 text-center">Nossos Serviços</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {SERVICES.map(({ icon: Icon, title, description }) => (
              <Card key={title} padding="md" hover>
                <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-primary-600" />
                </div>
                <h3 className="text-sm font-bold text-neutral-900 mb-1">{title}</h3>
                <p className="text-xs text-neutral-500 leading-relaxed">{description}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="bg-primary-600 py-16">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-2xl font-black text-white mb-3">
              Encontre seu Agente Comunitário de Saúde
            </h2>
            <p className="text-primary-200 mb-8 max-w-md mx-auto">
              Cada família tem um ACS responsável pela sua microárea. Encontre o seu agente.
            </p>
            <Link
              href="/acs"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-primary-600 font-semibold text-sm hover:bg-primary-50 transition-colors"
            >
              <MapPin size={16} />
              Buscar meu ACS
            </Link>
          </div>
        </section>

        <section className="bg-accent-500 py-16">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-2xl font-black text-white mb-3">
              Sua opinião transforma nossa unidade
            </h2>
            <p className="text-accent-100 mb-8">
              Compartilhe sua experiência e ajude-nos a melhorar o atendimento.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {FEEDBACK_OPTIONS.map(({ icon: Icon, label }) => (
                <Link
                  key={label}
                  href="/feedback"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/20 text-white font-semibold text-sm hover:bg-white/30 transition-colors border border-white/30"
                >
                  <Icon size={16} />
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
