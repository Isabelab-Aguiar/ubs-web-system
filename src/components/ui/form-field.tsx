import React from 'react';
import { AlertCircle } from 'lucide-react';

interface FormFieldProps {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function FormField({
  label,
  error,
  hint,
  required,
  children,
  className = '',
}: FormFieldProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="text-sm font-medium text-neutral-700">
        {label}
        {required && <span className="text-danger-500 ml-0.5">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-xs text-danger-500 mt-1 flex items-center gap-1">
          <AlertCircle size={12} />
          {error}
        </p>
      )}
      {!error && hint && <p className="text-xs text-neutral-400 mt-1">{hint}</p>}
    </div>
  );
}
