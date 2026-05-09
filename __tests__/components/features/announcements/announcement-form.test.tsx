import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AnnouncementForm } from '@/components/features/announcements/announcement-form';

const validValues = {
  title: 'Aviso importante sobre vacinação',
  content: 'Conteúdo com pelo menos dez caracteres válidos.',
  category: 'vaccine' as const,
  targetPage: 'home' as const,
  showOnHomepage: false,
};

describe('AnnouncementForm', () => {
  it('deve renderizar todos os campos obrigatórios', () => {
    render(<AnnouncementForm onSubmit={jest.fn()} />);
    expect(screen.getByPlaceholderText('Título do aviso')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Escreva o conteúdo...')).toBeInTheDocument();
    expect(screen.getByText('Categoria')).toBeInTheDocument();
    expect(screen.getByText('Página de exibição')).toBeInTheDocument();
  });

  it('deve exibir erro de validação quando title está vazio e form é submetido', async () => {
    render(<AnnouncementForm onSubmit={jest.fn()} />);
    await userEvent.click(screen.getByRole('button', { name: /salvar aviso/i }));
    await waitFor(() => {
      expect(screen.getByText(/título/i, { selector: 'label' })).toBeInTheDocument();
    });
  });

  it('deve exibir erro quando content tem menos de 10 chars', async () => {
    render(<AnnouncementForm onSubmit={jest.fn()} />);
    await userEvent.type(screen.getByPlaceholderText('Título do aviso'), 'Titulo valido');
    await userEvent.type(screen.getByPlaceholderText('Escreva o conteúdo...'), 'Curto');
    await userEvent.click(screen.getByRole('button', { name: /salvar aviso/i }));
    await waitFor(() => {
      const errors = document.querySelectorAll('p.text-xs.text-danger-500');
      expect(errors.length).toBeGreaterThan(0);
    });
  });

  it('NÃO deve chamar onSubmit quando há erros de validação', async () => {
    const onSubmit = jest.fn();
    render(<AnnouncementForm onSubmit={onSubmit} />);
    await userEvent.click(screen.getByRole('button', { name: /salvar aviso/i }));
    await waitFor(() => {
      expect(onSubmit).not.toHaveBeenCalled();
    });
  });

  it('deve chamar onSubmit com os dados corretos quando válido', async () => {
    const onSubmit = jest.fn().mockResolvedValue(undefined);
    render(<AnnouncementForm onSubmit={onSubmit} defaultValues={validValues} />);
    await userEvent.click(screen.getByRole('button', { name: /salvar aviso/i }));
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          title: validValues.title,
          content: validValues.content,
          category: validValues.category,
        }),
        expect.anything(),
      );
    });
  });

  it('deve desabilitar o botão quando isLoading=true', () => {
    render(<AnnouncementForm onSubmit={jest.fn()} isLoading />);
    expect(screen.getByRole('button', { name: /salvar aviso/i })).toBeDisabled();
  });
});
