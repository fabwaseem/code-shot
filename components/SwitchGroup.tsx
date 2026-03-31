import React from "react"

import { cn } from "@/lib/utils"

interface SwitchGroupProps {
  label: string
  options: { value: boolean; label: string }[]
  value: boolean
  onChange: (value: boolean) => void
  className?: string
}

export function SwitchGroup({ label, options, value, onChange, className }: SwitchGroupProps) {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <label className="text-xs text-muted-foreground">{label}</label>
      <div className="flex gap-1 rounded-lg border border-white/10 bg-white/[0.06] p-1">
        {options.map((opt) => {
          const isActive = value === opt.value
          return (
            <button
              key={String(opt.value)}
              type="button"
              onClick={() => onChange(opt.value)}
              className={cn(
                "rounded-md px-3 py-1 text-xs capitalize transition-colors",
                isActive
                  ? "bg-white/15 text-foreground shadow-inner"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {opt.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
