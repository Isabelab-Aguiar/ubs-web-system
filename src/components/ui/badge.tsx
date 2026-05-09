type Variant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'accent';

interface BadgeProps {
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}

const variants: Record<Variant, string> = {
  default: 'bg-primary-100 text-primary-700',
  success: 'bg-success-50 text-success-500',
  warning: 'bg-warning-50 text-warning-700',
  danger: 'bg-danger-50 text-danger-700',
  info: 'bg-info-50 text-info-700',
  accent: 'bg-accent-50 text-accent-700',
  neutral: 'bg-neutral-100 text-neutral-600',
};

const dotColors: Record<Variant, string> = {
  default: 'bg-primary-500',
  success: 'bg-success-500',
  warning: 'bg-warning-500',
  danger: 'bg-danger-500',
  info: 'bg-info-500',
  accent: 'bg-accent-500',
  neutral: 'bg-neutral-400',
};

export function Badge({ variant = 'default', children, className = '', dot }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold
        ${variants[variant]} ${className}
      `}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]}`} />}
      {children}
    </span>
  );
}

export type { BadgeProps };
