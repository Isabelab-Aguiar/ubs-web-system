import { Badge } from '@/components/ui/badge';

interface VaccineStatusCellProps {
  current: number;
  minimum: number;
}

export function VaccineStatusCell({ current, minimum }: VaccineStatusCellProps) {
  if (current === 0) {
    return (
      <div className="flex items-center gap-2">
        <span className="font-bold">{current}</span>
        <Badge variant="danger">Esgotado</Badge>
      </div>
    );
  }
  if (current < minimum) {
    return (
      <div className="flex items-center gap-2">
        <span className="font-bold">{current}</span>
        <Badge variant="warning">Abaixo do mínimo</Badge>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2">
      <span className="font-bold">{current}</span>
      <Badge variant="success">OK</Badge>
    </div>
  );
}
