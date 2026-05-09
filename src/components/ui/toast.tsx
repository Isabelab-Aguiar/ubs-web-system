'use client';

import { useEffect } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import { useToastStore, type Toast } from '@/stores/toast.store';

const icons: Record<Toast['type'], React.ReactNode> = {
  success: <CheckCircle size={16} className="text-success-500 shrink-0" />,
  error: <XCircle size={16} className="text-danger-500 shrink-0" />,
  warning: <AlertTriangle size={16} className="text-warning-700 shrink-0" />,
  info: <Info size={16} className="text-info-500 shrink-0" />,
};

const borderColors: Record<Toast['type'], string> = {
  success: 'border-l-success-500',
  error: 'border-l-danger-500',
  warning: 'border-l-warning-500',
  info: 'border-l-info-500',
};

export function ToastContainer() {
  const { toasts, remove } = useToastStore();

  return (
    <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={remove} />
      ))}
    </div>
  );
}

interface ToastItemProps {
  toast: Toast;
  onDismiss: (id: string) => void;
}

function ToastItem({ toast, onDismiss }: ToastItemProps) {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(toast.id), 4500);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  return (
    <div
      className={`
        flex items-start gap-3 bg-white border border-neutral-200 border-l-4
        rounded-xl shadow-modal px-4 py-3 pointer-events-auto w-[320px] animate-slide-up
        ${borderColors[toast.type]}
      `}
    >
      {icons[toast.type]}
      <p className="flex-1 text-sm text-neutral-800 leading-snug">{toast.message}</p>
      <button
        onClick={() => onDismiss(toast.id)}
        className="text-neutral-300 hover:text-neutral-600 transition-colors mt-0.5"
      >
        <X size={14} />
      </button>
    </div>
  );
}
