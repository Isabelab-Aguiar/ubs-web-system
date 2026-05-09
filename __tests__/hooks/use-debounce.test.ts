import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '@/hooks/use-debounce';

describe('useDebounce', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('deve retornar o valor inicial imediatamente', () => {
    const { result } = renderHook(() => useDebounce('inicial', 500));
    expect(result.current).toBe('inicial');
  });

  it('deve manter o valor antigo antes do delay', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 500), {
      initialProps: { value: 'antes' },
    });
    rerender({ value: 'depois' });
    expect(result.current).toBe('antes');
  });

  it('deve atualizar o valor após o delay', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 500), {
      initialProps: { value: 'antes' },
    });
    rerender({ value: 'depois' });
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(result.current).toBe('depois');
  });

  it('deve reiniciar o timer se o valor mudar antes do delay', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 500), {
      initialProps: { value: 'a' },
    });
    rerender({ value: 'b' });
    act(() => {
      jest.advanceTimersByTime(300);
    });
    rerender({ value: 'c' });
    act(() => {
      jest.advanceTimersByTime(300);
    });
    expect(result.current).toBe('a');
    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(result.current).toBe('c');
  });
});
