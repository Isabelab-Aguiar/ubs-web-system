import React from 'react';

function Table({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full border-collapse">{children}</table>
    </div>
  );
}

function TableHeader({ children }: { children: React.ReactNode }) {
  return <thead>{children}</thead>;
}

function TableBody({ children }: { children: React.ReactNode }) {
  return <tbody>{children}</tbody>;
}

function TableRow({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <tr className={`hover:bg-neutral-50/60 transition-colors ${className}`}>{children}</tr>;
}

function TableHead({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <th
      className={`text-xs font-semibold text-neutral-400 uppercase tracking-wide px-4 py-3 text-left ${className}`}
    >
      {children}
    </th>
  );
}

function TableCell({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <td className={`text-sm text-neutral-700 px-4 py-3.5 border-b border-neutral-50 ${className}`}>
      {children}
    </td>
  );
}

interface TableEmptyProps {
  icon: React.ElementType;
  title: string;
  description?: string;
  cols?: number;
}

function TableEmpty({ icon: Icon, title, description, cols = 4 }: TableEmptyProps) {
  return (
    <tr>
      <td colSpan={cols} className="py-16 text-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center">
            <Icon size={22} className="text-neutral-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-neutral-700">{title}</p>
            {description && <p className="text-xs text-neutral-400 mt-0.5">{description}</p>}
          </div>
        </div>
      </td>
    </tr>
  );
}

interface TableSkeletonProps {
  rows?: number;
  cols?: number;
}

function TableSkeleton({ rows = 5, cols = 4 }: TableSkeletonProps) {
  return (
    <>
      {Array.from({ length: rows }).map((_, r) => (
        <tr key={r}>
          {Array.from({ length: cols }).map((_, c) => (
            <td key={c} className="px-4 py-3.5 border-b border-neutral-50">
              <div className="h-4 rounded bg-neutral-100 animate-pulse" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableEmpty, TableSkeleton };
