interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

const paddings = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export function Card({ children, className = '', padding = 'md', hover }: CardProps) {
  return (
    <div
      className={`
        bg-white rounded-2xl border border-neutral-100 shadow-card
        ${hover ? 'transition-shadow duration-200 hover:shadow-card-hover' : ''}
        ${paddings[padding]} ${className}
      `}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function CardHeader({ title, description, action, className = '' }: CardHeaderProps) {
  return (
    <div className={`flex items-start justify-between gap-4 mb-6 ${className}`}>
      <div>
        <h2 className="text-base font-bold text-neutral-900">{title}</h2>
        {description && <p className="text-sm text-neutral-500 mt-0.5">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export type { CardProps };
