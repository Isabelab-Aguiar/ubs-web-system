'use client';

import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';
import { useUiStore } from '@/stores/ui.store';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isSidebarOpen, isSidebarCollapsed, closeSidebar } = useUiStore();

  return (
    <div className="flex h-screen overflow-hidden bg-surface-muted">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden animate-fade-in"
          onClick={closeSidebar}
        />
      )}
      <Sidebar />
      <div
        className={`flex flex-col flex-1 overflow-hidden transition-all duration-300 ${
          isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'
        }`}
      >
        <Header />
        <main className="flex-1 overflow-y-auto p-4 sm:p-5 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
