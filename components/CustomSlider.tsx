import React from 'react';
import { cn } from '@/lib/utils';

interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  value: number;
  displayValue?: string | number;
}

export function CustomSlider({ label, value, displayValue, className, ...props }: SliderProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between">
        <label className="text-xs text-zinc-400">{label}</label>
        <span className="text-xs text-zinc-500">{displayValue ?? value}</span>
      </div>
      <input
        type="range"
        value={value}
        className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
        {...props}
      />
    </div>
  );
}
