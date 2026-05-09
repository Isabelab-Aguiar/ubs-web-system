'use client';

import { useState, useRef, useCallback } from 'react';

interface ConfirmOptions {
  title: string;
  description: string;
}

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
  onClose: () => void;
}

interface UseConfirmReturn {
  confirm: (opts: ConfirmOptions) => Promise<boolean>;
  ConfirmDialogProps: ConfirmDialogProps;
}

export function useConfirm(): UseConfirmReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const resolveRef = useRef<((value: boolean) => void) | null>(null);

  const confirm = useCallback((opts: ConfirmOptions): Promise<boolean> => {
    setTitle(opts.title);
    setDescription(opts.description);
    setIsOpen(true);
    return new Promise<boolean>((resolve) => {
      resolveRef.current = resolve;
    });
  }, []);

  const handleConfirm = useCallback(() => {
    setIsOpen(false);
    resolveRef.current?.(true);
    resolveRef.current = null;
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    resolveRef.current?.(false);
    resolveRef.current = null;
  }, []);

  return {
    confirm,
    ConfirmDialogProps: {
      isOpen,
      title,
      description,
      onConfirm: handleConfirm,
      onClose: handleClose,
    },
  };
}
