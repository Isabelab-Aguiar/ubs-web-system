import { create } from 'zustand';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastState {
  toasts: Toast[];
  add: (message: string, type?: ToastType) => void;
  remove: (id: string) => void;
  success: (message: string) => void;
  error: (message: string) => void;
  warning: (message: string) => void;
  info: (message: string) => void;
}

const push = (message: string, type: ToastType) => ({
  id: crypto.randomUUID(),
  message,
  type,
});

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],

  add: (message, type = 'info') => set((s) => ({ toasts: [...s.toasts, push(message, type)] })),

  remove: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),

  success: (message) => set((s) => ({ toasts: [...s.toasts, push(message, 'success')] })),

  error: (message) => set((s) => ({ toasts: [...s.toasts, push(message, 'error')] })),

  warning: (message) => set((s) => ({ toasts: [...s.toasts, push(message, 'warning')] })),

  info: (message) => set((s) => ({ toasts: [...s.toasts, push(message, 'info')] })),
}));
