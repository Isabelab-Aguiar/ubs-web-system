'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Megaphone,
  HeartPulse,
  Activity,
  CalendarDays,
  FlaskConical,
  Users,
  Map,
  MessageSquare,
  UserCog,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useAuthStore } from '@/stores/auth.store';
import { useUiStore } from '@/stores/ui.store';
import type { UserRole } from '@/types/auth.types';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  roles?: UserRole[];
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Visão Geral', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Avisos', href: '/dashboard/announcements', icon: Megaphone },
  { label: 'Campanhas', href: '/dashboard/campaigns', icon: HeartPulse },
  { label: 'Demanda Espontânea', href: '/dashboard/spontaneous-demand', icon: Activity },
  { label: 'Agendamento', href: '/dashboard/scheduling', icon: CalendarDays },
  { label: 'Estoque de Vacinas', href: '/dashboard/vaccine-stock', icon: FlaskConical },
  { label: 'Profissionais', href: '/dashboard/health-professionals', icon: Users },
  { label: 'Território', href: '/dashboard/territory', icon: Map, roles: ['admin', 'direction'] },
  {
    label: 'Ouvidoria',
    href: '/dashboard/feedbacks',
    icon: MessageSquare,
    roles: ['admin', 'direction'],
  },
  { label: 'Usuários', href: '/dashboard/users', icon: UserCog, roles: ['admin'] },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const { isSidebarOpen, isSidebarCollapsed, toggleCollapse, closeSidebar } = useUiStore();

  const visibleItems = NAV_ITEMS.filter(
    (item) => !item.roles || (user && item.roles.includes(user.role)),
  );

  const isActive = (href: string) =>
    href === '/dashboard' ? pathname === '/dashboard' : pathname.startsWith(href);

  return (
    <aside
      className={`
        flex flex-col h-screen fixed left-0 top-0 z-40 border-r border-white/10
        transition-all duration-300
        ${isSidebarCollapsed ? 'lg:w-16' : 'w-60'}
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}
      style={{ background: 'linear-gradient(160deg, #0C326F 0%, #041125 100%)' }}
    >
      <div
        className={`flex items-center gap-3 px-5 py-5 border-b border-white/10 ${
          isSidebarCollapsed ? 'lg:justify-center lg:px-0' : ''
        }`}
      >
        <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
          <HeartPulse size={16} className="text-white" />
        </div>
        {!isSidebarCollapsed && (
          <div>
            <p className="text-white text-sm font-bold leading-none">ESF Catalão</p>
            <p className="text-white/40 text-xs mt-0.5">Divinópolis, MG</p>
          </div>
        )}
      </div>

      <nav className="flex-1 px-3 py-3 overflow-y-auto scrollbar-light space-y-0.5">
        {visibleItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              title={isSidebarCollapsed ? item.label : undefined}
              onClick={closeSidebar}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                transition-all duration-150 group
                ${isSidebarCollapsed ? 'lg:justify-center lg:px-0' : ''}
                ${
                  active
                    ? 'bg-white/15 text-white'
                    : 'text-white/55 hover:bg-white/8 hover:text-white/90'
                }
              `}
            >
              <Icon
                size={17}
                className={`shrink-0 transition-all duration-150 ${
                  active
                    ? 'text-accent-400'
                    : 'text-white/40 group-hover:text-white/70 group-hover:scale-110'
                }`}
              />
              <span className={`truncate ${isSidebarCollapsed ? 'lg:hidden' : ''}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="px-3 pb-2 pt-3 border-t border-white/10 space-y-1">
        <div
          className={`flex items-center gap-3 px-3 py-2 ${
            isSidebarCollapsed ? 'lg:justify-center lg:px-0' : ''
          }`}
        >
          <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center shrink-0">
            <span className="text-white text-xs font-bold">
              {user?.name?.charAt(0).toUpperCase() ?? 'U'}
            </span>
          </div>
          {!isSidebarCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-semibold truncate">{user?.name ?? 'Usuário'}</p>
              <p className="text-white/40 text-xs capitalize truncate">{user?.role}</p>
            </div>
          )}
        </div>

        <button
          onClick={() => logout()}
          className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-white/50 hover:bg-white/8 hover:text-white/90 transition-all duration-150 group ${
            isSidebarCollapsed ? 'lg:justify-center lg:px-0' : ''
          }`}
          title={isSidebarCollapsed ? 'Sair do sistema' : undefined}
        >
          <LogOut
            size={17}
            className="shrink-0 text-white/30 group-hover:text-white/70 transition-colors"
          />
          <span className={isSidebarCollapsed ? 'lg:hidden' : ''}>Sair do sistema</span>
        </button>

        <button
          onClick={toggleCollapse}
          className="hidden lg:flex items-center justify-center w-full py-2 text-white/30 hover:text-white/70 transition-colors"
        >
          {isSidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
    </aside>
  );
}
