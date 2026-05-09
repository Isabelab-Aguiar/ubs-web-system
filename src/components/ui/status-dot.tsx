type Status = 'active' | 'inactive' | 'pending' | 'urgent';

interface StatusDotProps {
  status: Status;
  label?: string;
  pulse?: boolean;
}

const statusColors: Record<Status, string> = {
  active: 'bg-success-500',
  inactive: 'bg-neutral-300',
  pending: 'bg-warning-500',
  urgent: 'bg-danger-500',
};

export function StatusDot({ status, label, pulse }: StatusDotProps) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className={`w-2 h-2 rounded-full ${statusColors[status]} ${pulse ? 'animate-pulse' : ''}`}
      />
      {label && <span className="text-xs text-neutral-500">{label}</span>}
    </span>
  );
}
