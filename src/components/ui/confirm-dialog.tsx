'use client';

import { AlertTriangle } from 'lucide-react';
import { Modal } from './modal';
import { Button } from './button';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  isLoading?: boolean;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = 'Confirmar',
  isLoading,
}: ConfirmDialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="w-12 h-12 rounded-full bg-warning-50 flex items-center justify-center">
          <AlertTriangle size={22} className="text-warning-500" />
        </div>
        <p className="text-sm text-neutral-500">{description}</p>
        <div className="flex gap-3 w-full justify-end pt-2">
          <Button variant="ghost" size="sm" onClick={onClose} disabled={isLoading}>
            Cancelar
          </Button>
          <Button variant="danger" size="sm" loading={isLoading} onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
