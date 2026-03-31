import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
}

export function CustomInput({ label, icon, className, ...props }: InputProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {label && <label className="text-xs text-zinc-400">{label}</label>}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
            {icon}
          </div>
        )}
        <input
          className={cn(
            "w-full bg-zinc-950/50 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-300 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-indigo-500",
            icon && "pl-9"
          )}
          {...props}
        />
      </div>
    </div>
  );
}
