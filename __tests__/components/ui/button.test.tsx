import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

describe('Button', () => {
  it('deve renderizar com o texto correto', () => {
    render(<Button>Clique aqui</Button>);
    expect(screen.getByRole('button', { name: /clique aqui/i })).toBeInTheDocument();
  });

  it('deve exibir spinner quando loading=true', () => {
    render(<Button loading>Salvar</Button>);
    const svg = document.querySelector('svg.animate-spin');
    expect(svg).toBeInTheDocument();
  });

  it('deve estar desabilitado quando loading=true', () => {
    render(<Button loading>Salvar</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('deve estar desabilitado quando disabled=true', () => {
    render(<Button disabled>Salvar</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('deve chamar onClick ao ser clicado', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Clique</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('NÃO deve chamar onClick quando disabled', () => {
    const onClick = jest.fn();
    render(
      <Button disabled onClick={onClick}>
        Clique
      </Button>,
    );
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('deve aplicar classes da variant primary por padrão', () => {
    render(<Button>Primário</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toMatch(/bg-primary-600/);
  });

  it('deve aplicar classes da variant danger', () => {
    render(<Button variant="danger">Deletar</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toMatch(/bg-danger-500/);
  });

  it('deve renderizar leftIcon quando fornecido', () => {
    render(<Button leftIcon={<Plus data-testid="icon-plus" />}>Novo</Button>);
    expect(screen.getByTestId('icon-plus')).toBeInTheDocument();
  });
});
