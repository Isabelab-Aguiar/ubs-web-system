import { forwardRef } from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className = '', id, ...props }, ref) => {
    const textareaId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={textareaId} className="text-sm font-semibold text-neutral-700">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={`
            w-full px-3 py-2.5 rounded-lg border text-sm text-neutral-900
            placeholder:text-neutral-400 bg-white resize-none
            transition-all duration-150
            focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500
            disabled:bg-neutral-50 disabled:cursor-not-allowed
            ${
              error
                ? 'border-danger-500 focus:ring-danger-500/20 focus:border-danger-500'
                : 'border-neutral-200 hover:border-neutral-300'
            }
            ${className}
          `}
          {...props}
        />
        {error && <p className="text-xs text-danger-500">{error}</p>}
        {hint && !error && <p className="text-xs text-neutral-400">{hint}</p>}
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';
export { Textarea };
export type { TextareaProps };
