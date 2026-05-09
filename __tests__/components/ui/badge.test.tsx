import { render, screen } from '@testing-library/react';
import { Badge } from '@/components/ui/badge';

describe('Badge', () => {
  it('deve renderizar o texto dos filhos', () => {
    render(<Badge>Urgente</Badge>);
    expect(screen.getByText('Urgente')).toBeInTheDocument();
  });

  it('deve exibir ponto quando dot=true', () => {
    const { container } = render(<Badge dot>Ativo</Badge>);
    const dot = container.querySelector('.rounded-full.w-1\\.5');
    expect(dot).toBeInTheDocument();
  });

  it('NÃO deve exibir ponto quando dot=false ou ausente', () => {
    const { container } = render(<Badge>Sem dot</Badge>);
    const dot = container.querySelector('.w-1\\.5.h-1\\.5');
    expect(dot).not.toBeInTheDocument();
  });

  it('deve aplicar variant success', () => {
    const { container } = render(<Badge variant="success">Resolvido</Badge>);
    expect(container.firstChild).toHaveClass('bg-success-50', 'text-success-500');
  });

  it('deve aplicar variant danger', () => {
    const { container } = render(<Badge variant="danger">Crítico</Badge>);
    expect(container.firstChild).toHaveClass('bg-danger-50', 'text-danger-700');
  });
});
