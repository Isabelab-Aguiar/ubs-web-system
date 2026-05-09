import { HeartPulse, MapPin, Clock, Phone } from 'lucide-react';
import Link from 'next/link';

const NAV_LINKS = [
  { label: 'Início', href: '/' },
  { label: 'ACS', href: '/acs' },
  { label: 'Campanhas', href: '/campaigns' },
  { label: 'Ouvidoria', href: '/feedback' },
];

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <HeartPulse size={22} className="text-primary-400" />
              <span className="font-bold text-lg">ESF Catalão</span>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Estratégia de Saúde da Família — Bairro Catalão. Cuidando da saúde da comunidade com
              dedicação e responsabilidade.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-neutral-300 uppercase tracking-wide">
              Links Rápidos
            </h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-neutral-300 uppercase tracking-wide">
              Contato
            </h4>
            <ul className="space-y-3 text-sm text-neutral-400">
              <li className="flex items-start gap-2">
                <MapPin size={15} className="shrink-0 mt-0.5 text-neutral-500" />
                <span>
                  Rua Deputado Mário Ribeiro, S/N — Bairro Catalão
                  <br />
                  Divinópolis — MG, 35500-000
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Clock size={15} className="shrink-0 text-neutral-500" />
                <span>Segunda a Sexta-feira, 07:00 às 17:00</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={15} className="shrink-0 text-neutral-500" />
                <span>(37) 3221-0000</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6">
          <p className="text-xs text-neutral-500 text-center">
            © 2026 Prefeitura Municipal de Divinópolis. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
