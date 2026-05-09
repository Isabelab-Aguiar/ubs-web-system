'use client';

import { Search, X } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchInput({
  value,
  onChange,
  placeholder = 'Buscar...',
  className = '',
}: SearchInputProps) {
  return (
    <div className={`relative ${className}`}>
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
        <Search size={15} />
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full h-9 pl-9 pr-9 rounded-lg border border-neutral-200 text-sm text-neutral-900
          placeholder:text-neutral-400 bg-white
          transition-all duration-150
          focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500
          hover:border-neutral-300
        "
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
          type="button"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
