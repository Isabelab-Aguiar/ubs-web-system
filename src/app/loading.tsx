import { Spinner } from '@/components/ui/spinner';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Spinner size="lg" />
      <p className="text-sm text-neutral-400 mt-3">Carregando...</p>
    </div>
  );
}
