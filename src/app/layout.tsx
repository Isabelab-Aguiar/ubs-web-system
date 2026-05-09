import type { Metadata } from 'next';
import { ToastContainer } from '@/components/ui/toast';
import './globals.css';

export const metadata: Metadata = {
  title: 'ESF Catalão — Sistema de Gestão de Saúde',
  description:
    'Plataforma de gestão para a Estratégia de Saúde da Família do bairro Catalão, Divinópolis/MG.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
