'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HeartPulse, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NAV_LINKS = [
  { label: 'Início', href: '/' },
  { label: 'ACS', href: '/acs' },
  { label: 'Campanhas', href: '/campaigns' },
  { label: 'Ouvidoria', href: '/feedback' },
];

export function PublicHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  function isActive(href: string) {
    return href === '/' ? pathname === '/' : pathname.startsWith(href);
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <HeartPulse size={22} className="text-primary-600" />
          <div>
            <span className="font-bold text-neutral-900">ESF Catalão</span>
            <span className="block text-xs text-neutral-400 leading-none">Divinópolis, MG</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                isActive(link.href)
                  ? 'text-primary-600 font-semibold bg-primary-50'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/login">
            <Button variant="outline" size="sm">
              Área Restrita
            </Button>
          </Link>
        </div>

        <button
          className="md:hidden p-2 rounded-lg text-neutral-600 hover:bg-neutral-100 transition-colors"
          onClick={() => setIsMobileMenuOpen((v) => !v)}
          type="button"
          aria-label="Menu"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-neutral-100 shadow-md animate-fade-in">
          <div className="max-w-6xl mx-auto px-6 py-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive(link.href)
                    ? 'text-primary-600 font-semibold bg-primary-50'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-neutral-100">
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="outline" size="sm" className="w-full">
                  Área Restrita
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
