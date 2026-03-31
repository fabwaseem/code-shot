import React from 'react';
import { cn } from '@/lib/utils';
import {
  Select as ShadcnSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface SelectProps {
  label: string;
  options: { value: string | number; label: string }[];
  value: string | number;
  onChange: (e: { target: { value: string } }) => void;
  className?: string;
  disabled?: boolean;
}

export function CustomSelect({ label, options, value, onChange, className, disabled }: SelectProps) {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <label className="text-xs text-zinc-400">{label}</label>
      <ShadcnSelect
        value={value == null ? "" : String(value)}
        onValueChange={(val) => {
          if (val == null) return
          onChange({ target: { value: val } })
        }}
        disabled={disabled}
      >
        <SelectTrigger className="w-[120px] h-7 text-xs bg-zinc-950/50 border-zinc-800 focus:ring-1 focus:ring-indigo-500">
          <SelectValue placeholder="Select..." />
        </SelectTrigger>
        <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-300">
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value.toString()} className="text-xs focus:bg-zinc-800 focus:text-zinc-100">
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </ShadcnSelect>
    </div>
  );
}
