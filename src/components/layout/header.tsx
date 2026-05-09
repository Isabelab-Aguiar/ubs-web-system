'use client';

import { usePathname } from 'next/navigation';
import { Bell, Menu } from 'lucide-react';
import { useAuthStore } from '@/stores/auth.store';
import { useUiStore } from '@/stores/ui.store';

interface PageMeta {
  title: string;
  subtitle: string;
}

const PAGE_META: Record<string, PageMeta> = {
  '/dashboard': { title: 'Visão Geral', subtitle: 'Painel de gestão da unidade' },
  '/dashboard/announcements': { title: 'Avisos', subtitle: 'Comunicados e informativos da UBS' },
  '/dashboard/campaigns': { title: 'Campanhas', subtitle: 'Campanhas de saúde pública' },
  '/dashboard/spontaneous-demand': {
    title: 'Demanda Espontânea',
    subtitle: 'Atendimentos registrados hoje',
  },
  '/dashboard/scheduling': { title: 'Agendamento', subtitle: 'Eventos e escalas de trabalho' },
  '/dashboard/vaccine-stock': {
    title: 'Estoque de Vacinas',
    subtitle: 'Controle de vacinas disponíveis',
  },
  '/dashboard/health-professionals': {
    title: 'Profissionais',
    subtitle: 'Equipe de saúde da unidade',
  },
  '/dashboard/territory': { title: 'Território', subtitle: 'Microáreas e agentes comunitários' },
  '/dashboard/feedbacks': { title: 'Ouvidoria', subtitle: 'Elogios, sugestões e reclamações' },
  '/dashboard/users': { title: 'Usuários', subtitle: 'Gestão de usuários do sistema' },
};

const ROLE_LABELS: Record<string, string> = {
  admin: 'Administrador',
  direction: 'Direção',
  professional: 'Profissional',
};

export function Header() {
  const pathname = usePathname();
  const { user } = useAuthStore();
  const { toggleSidebar } = useUiStore();
  const meta = PAGE_META[pathname] ?? { title: 'ESF Catalão', subtitle: '' };

  return (
    <header className="h-header flex items-center justify-between px-4 sm:px-8 bg-white border-b border-neutral-100 shrink-0">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 transition-colors"
        >
          <Menu size={18} />
        </button>
        <div>
          <h1 className="text-[15px] font-bold text-neutral-900 leading-none">{meta.title}</h1>
          {meta.subtitle && <p className="text-xs text-neutral-400 mt-1">{meta.subtitle}</p>}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="relative w-9 h-9 flex items-center justify-center rounded-xl text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 transition-colors">
          <Bell size={17} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-danger-500 rounded-full ring-2 ring-white" />
        </button>

        <div className="flex items-center gap-2.5 pl-3 ml-1 border-l border-neutral-100">
          <div className="w-8 h-8 rounded-full bg-primary-600/10 flex items-center justify-center shrink-0">
            <span className="text-primary-600 text-sm font-bold">
              {user?.name?.charAt(0).toUpperCase() ?? 'U'}
            </span>
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-semibold text-neutral-900 leading-none">
              {user?.name ?? 'Usuário'}
            </p>
            <p className="text-xs text-neutral-400 mt-0.5">
              {user?.role ? ROLE_LABELS[user.role] : ''}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
