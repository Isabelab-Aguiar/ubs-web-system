interface SpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}

const sizes = {
  xs: 'w-3 h-3 border-[1.5px]',
  sm: 'w-4 h-4 border-2',
  md: 'w-6 h-6 border-2',
  lg: 'w-8 h-8 border-[3px]',
};

export function Spinner({ size = 'md', className = '' }: SpinnerProps) {
  return (
    <div
      className={`
        rounded-full border-neutral-200 border-t-primary-600 animate-spin
        ${sizes[size]} ${className}
      `}
    />
  );
}

export function PageSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[360px]">
      <Spinner size="lg" />
    </div>
  );
}
