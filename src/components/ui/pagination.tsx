import { Button } from './button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  total: number;
  page: number;
  limit: number;
  onPageChange: (page: number) => void;
}

function getPageNumbers(page: number, totalPages: number): (number | '...')[] {
  if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
  if (page <= 3) return [1, 2, 3, 4, 5, '...', totalPages];
  if (page >= totalPages - 2)
    return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  return [1, '...', page - 1, page, page + 1, '...', totalPages];
}

export function Pagination({ total, page, limit, onPageChange }: PaginationProps) {
  if (total <= limit) return null;

  const totalPages = Math.ceil(total / limit);
  const from = (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);
  const pages = getPageNumbers(page, totalPages);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4">
      <p className="text-xs text-neutral-400">
        Mostrando {from}–{to} de {total} resultados
      </p>

      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="sm"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          leftIcon={<ChevronLeft size={14} />}
        >
          Anterior
        </Button>

        <div className="hidden md:flex items-center gap-1">
          {pages.map((p, i) =>
            p === '...' ? (
              <span key={`ellipsis-${i}`} className="px-2 text-xs text-neutral-400">
                …
              </span>
            ) : (
              <button
                key={p}
                onClick={() => onPageChange(p as number)}
                className={`h-8 w-8 rounded-lg text-xs font-semibold transition-colors ${
                  p === page ? 'bg-primary-600 text-white' : 'text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                {p}
              </button>
            ),
          )}
        </div>

        <span className="md:hidden text-xs text-neutral-500 px-2">
          Página {page} de {totalPages}
        </span>

        <Button
          variant="outline"
          size="sm"
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          rightIcon={<ChevronRight size={14} />}
        >
          Próximo
        </Button>
      </div>
    </div>
  );
}
