'use client';

import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
    icon?: React.ElementType;
    show?: boolean;
  };
}

export function PageHeader({ title, description, action }: PageHeaderProps) {
  const Icon = action?.icon ?? Plus;
  const showAction = action && action.show !== false;

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
      <div>
        <h1 className="text-xl font-black text-neutral-900">{title}</h1>
        {description && <p className="text-sm text-neutral-500 mt-0.5">{description}</p>}
      </div>
      {showAction &&
        (action.href ? (
          <a href={action.href}>
            <Button size="sm" leftIcon={<Icon size={15} />}>
              {action.label}
            </Button>
          </a>
        ) : (
          <Button size="sm" onClick={action.onClick} leftIcon={<Icon size={15} />}>
            {action.label}
          </Button>
        ))}
    </div>
  );
}
