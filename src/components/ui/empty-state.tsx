import React from 'react';
import { Button } from './button';

interface EmptyStateProps {
  icon: React.ElementType;
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
      <div className="w-14 h-14 rounded-full bg-neutral-100 flex items-center justify-center">
        <Icon size={24} className="text-neutral-400" />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-base font-semibold text-neutral-700">{title}</p>
        {description && <p className="text-sm text-neutral-400">{description}</p>}
      </div>
      {action && (
        <Button variant="outline" size="sm" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}
