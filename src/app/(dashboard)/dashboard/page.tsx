'use client';

import { useState, useEffect } from 'react';
import {
  Activity,
  Users,
  FlaskConical,
  Megaphone,
  TrendingUp,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { announcementService } from '@/lib/api/services/announcement.service';
import { vaccineStockService } from '@/lib/api/services/vaccine-stock.service';
import { spontaneousDemandService } from '@/lib/api/services/spontaneous-demand.service';
import { healthProfessionalService } from '@/lib/api/services/health-professional.service';
import type { SpontaneousDemand } from '@/types/spontaneous-demand.types';

const PRIORITY_BADGE: Record<
  string,
  { label: string; variant: 'danger' | 'warning' | 'info' | 'neutral' }
> = {
  urgent: { label: 'Urgente', variant: 'danger' },
  high: { label: 'Alta', variant: 'warning' },
  medium: { label: 'Normal', variant: 'info' },
  low: { label: 'Baixa', variant: 'neutral' },
};

const STATUS_ITEMS = [
  { label: 'API Backend', status: 'Online', icon: CheckCircle2, color: 'text-success-500' },
  { label: 'Banco de Dados', status: 'Online', icon: CheckCircle2, color: 'text-success-500' },
  { label: 'Documentação API', status: 'Online', icon: CheckCircle2, color: 'text-success-500' },
];

interface Stats {
  atendimentos: string;
  profissionais: string;
  vacinas: string;
  avisos: string;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    atendimentos: '—',
    profissionais: '—',
    vacinas: '—',
    avisos: '—',
  });
  const [recentDemands, setRecentDemands] = useState<SpontaneousDemand[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      const today = new Date().toISOString().split('T')[0];

      const [announcementsResult, vaccineResult, demandsResult, professionalsResult] =
        await Promise.allSettled([
          announcementService.list(),
          vaccineStockService.list(),
          spontaneousDemandService.list(),
          healthProfessionalService.list(),
        ]);

      const newStats: Stats = {
        atendimentos: '—',
        profissionais: '—',
        vacinas: '—',
        avisos: '—',
      };

      if (announcementsResult.status === 'fulfilled') {
        const active = announcementsResult.value.filter((a) => a.isActive);
        newStats.avisos = String(active.length);
      }

      if (vaccineResult.status === 'fulfilled') {
        newStats.vacinas = String(vaccineResult.value.length);
      }

      if (demandsResult.status === 'fulfilled') {
        const todayDemands = demandsResult.value.filter((d) => d.createdAt.split('T')[0] === today);
        newStats.atendimentos = String(todayDemands.length);

        const sorted = [...demandsResult.value].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        setRecentDemands(sorted.slice(0, 4));
      }

      if (professionalsResult.status === 'fulfilled') {
        const active = professionalsResult.value.filter((p) => p.isActive);
        newStats.profissionais = String(active.length);
      }

      setStats(newStats);
      setIsLoading(false);
    }

    loadDashboard();
  }, []);

  const statCards = [
    {
      label: 'Atendimentos Hoje',
      value: stats.atendimentos,
      icon: Activity,
      iconBg: 'bg-primary-50',
      iconColor: 'text-primary-600',
    },
    {
      label: 'Profissionais Ativos',
      value: stats.profissionais,
      icon: Users,
      iconBg: 'bg-accent-50',
      iconColor: 'text-accent-600',
    },
    {
      label: 'Vacinas em Estoque',
      value: stats.vacinas,
      icon: FlaskConical,
      iconBg: 'bg-warning-50',
      iconColor: 'text-warning-700',
    },
    {
      label: 'Avisos Publicados',
      value: stats.avisos,
      icon: Megaphone,
      iconBg: 'bg-info-50',
      iconColor: 'text-info-700',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {statCards.map(({ label, value, icon: Icon, iconBg, iconColor }) => (
          <Card key={label} padding="md" hover>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold text-neutral-400 mb-3 uppercase tracking-wide">
                  {label}
                </p>
                {isLoading ? (
                  <div className="h-9 w-16 rounded-lg bg-neutral-100 animate-pulse" />
                ) : (
                  <p className="text-3xl font-black text-neutral-900">{value}</p>
                )}
              </div>
              <div
                className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${iconBg}`}
              >
                <Icon size={20} className={iconColor} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2" padding="none">
          <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-neutral-50">
            <div>
              <h3 className="text-base font-bold text-neutral-900">Demanda Espontânea</h3>
              <p className="text-xs text-neutral-400 mt-0.5">Últimos atendimentos registrados</p>
            </div>
            <Badge variant="info" dot>
              Hoje
            </Badge>
          </div>

          <div className="divide-y divide-neutral-50">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 px-6 py-4">
                  <div className="w-9 h-9 rounded-full bg-neutral-100 animate-pulse shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 w-32 rounded bg-neutral-100 animate-pulse" />
                    <div className="h-3 w-48 rounded bg-neutral-100 animate-pulse" />
                  </div>
                </div>
              ))
            ) : recentDemands.length === 0 ? (
              <div className="px-6 py-8 text-center text-sm text-neutral-400">
                Nenhum atendimento registrado.
              </div>
            ) : (
              recentDemands.map((item) => {
                const badge = PRIORITY_BADGE[item.priority] ?? PRIORITY_BADGE.low;
                const time = new Date(item.createdAt).toLocaleTimeString('pt-BR', {
                  hour: '2-digit',
                  minute: '2-digit',
                });
                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between px-6 py-4 hover:bg-neutral-50/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary-50 flex items-center justify-center shrink-0">
                        <span className="text-primary-600 text-sm font-bold">
                          {item.patientName.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-neutral-800">{item.patientName}</p>
                        <p className="text-xs text-neutral-400">{item.chiefComplaint}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={badge.variant}>{badge.label}</Badge>
                      <div className="flex items-center gap-1 text-neutral-400">
                        <Clock size={12} />
                        <span className="text-xs">{time}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </Card>

        <Card padding="md">
          <h3 className="text-base font-bold text-neutral-900 mb-5">Status do Sistema</h3>
          <div className="space-y-4">
            {STATUS_ITEMS.map(({ label, status, icon: Icon, color }) => (
              <div key={label} className="flex items-center justify-between">
                <span className="text-sm text-neutral-600">{label}</span>
                <div className="flex items-center gap-1.5">
                  <Icon size={14} className={color} />
                  <span className="text-xs font-medium text-neutral-500">{status}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-neutral-100">
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-3">
              Acesso Rápido
            </p>
            <div className="space-y-1.5">
              {[
                { label: 'Registrar atendimento', href: '/dashboard/spontaneous-demand' },
                { label: 'Gerenciar avisos', href: '/dashboard/announcements' },
                { label: 'Estoque de vacinas', href: '/dashboard/vaccine-stock' },
              ].map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-neutral-600 hover:bg-neutral-50 hover:text-primary-600 transition-colors group"
                >
                  <TrendingUp
                    size={14}
                    className="text-neutral-300 group-hover:text-primary-500 transition-colors"
                  />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
