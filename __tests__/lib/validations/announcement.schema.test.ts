import { createAnnouncementSchema } from '@/lib/validations/announcement.schema';

const validData = {
  title: 'Aviso importante',
  content: 'Conteúdo com pelo menos dez caracteres.',
  category: 'vaccine' as const,
  targetPage: 'home' as const,
  showOnHomepage: true,
};

describe('createAnnouncementSchema', () => {
  it('deve validar um anúncio completo e válido', () => {
    const result = createAnnouncementSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('deve falhar com title com menos de 5 chars', () => {
    const result = createAnnouncementSchema.safeParse({ ...validData, title: 'Oi' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.title).toBeDefined();
    }
  });

  it('deve falhar com content com menos de 10 chars', () => {
    const result = createAnnouncementSchema.safeParse({ ...validData, content: 'Curto' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.content).toBeDefined();
    }
  });

  it('deve falhar com category inválida', () => {
    const result = createAnnouncementSchema.safeParse({ ...validData, category: 'invalida' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.category).toBeDefined();
    }
  });

  it('deve aceitar expiresAt como undefined (opcional)', () => {
    const result = createAnnouncementSchema.safeParse({ ...validData, expiresAt: undefined });
    expect(result.success).toBe(true);
  });

  it('deve usar showOnHomepage = false por padrão', () => {
    const { showOnHomepage: _, ...withoutFlag } = validData;
    const result = createAnnouncementSchema.safeParse(withoutFlag);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.showOnHomepage).toBe(false);
    }
  });
});
