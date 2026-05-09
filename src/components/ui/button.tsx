import { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variants: Record<Variant, string> = {
  primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 shadow-soft',
  secondary: 'bg-accent-500 text-white hover:bg-accent-600 focus:ring-accent-500 shadow-soft',
  ghost: 'bg-transparent text-neutral-600 hover:bg-neutral-100 focus:ring-neutral-200',
  danger: 'bg-danger-500 text-white hover:bg-danger-700 focus:ring-danger-500 shadow-soft',
  outline:
    'border border-neutral-200 text-neutral-700 bg-white hover:bg-neutral-50 focus:ring-neutral-200',
};

const sizes: Record<Size, string> = {
  sm: 'h-8 px-3 text-xs rounded-lg gap-1.5',
  md: 'h-9 px-4 text-sm rounded-lg gap-2',
  lg: 'h-11 px-6 text-sm rounded-xl gap-2',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading,
      leftIcon,
      rightIcon,
      disabled,
      className = '',
      children,
      ...props
    },
    ref,
  ) => (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center font-semibold transition-all duration-150
        focus:outline-none focus:ring-2 focus:ring-offset-1
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]} ${className}
      `}
      {...props}
    >
      {loading ? <Loader2 size={15} className="animate-spin" /> : leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  ),
);

Button.displayName = 'Button';
export { Button };
export type { ButtonProps };
