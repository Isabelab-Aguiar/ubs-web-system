import Link from 'next/link';
import { AlertOctagon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 px-6 text-center">
      <AlertOctagon size={64} className="text-neutral-300" />
      <div>
        <h1 className="text-2xl font-black text-neutral-900">404 — Página não encontrada</h1>
        <p className="text-sm text-neutral-500 mt-2 max-w-sm">
          A página que você está procurando não existe ou foi movida.
        </p>
      </div>
      <div className="flex gap-3">
        <Link href="/">
          <Button variant="primary">Voltar ao início</Button>
        </Link>
        <Link href="/login">
          <Button variant="outline">Ir para o sistema</Button>
        </Link>
      </div>
    </div>
  );
}
