"use client"

import { useMemo, useState } from "react"
import { Check, Search } from "lucide-react"

import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { CM_THEMES } from "@/lib/codemirror-themes"
import { useAppStore } from "@/store/useStore"

export function ThemeSidebar() {
  const { themeId, setThemeId } = useAppStore()
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return CM_THEMES
    return CM_THEMES.filter((t) => t.name.toLowerCase().includes(q))
  }, [query])

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="glass-header shrink-0 border-b border-white/10 p-4 md:p-5">
        <div className="relative">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search themes..."
            className="glass-input w-full rounded-xl py-2.5 pr-3 pl-10 text-sm"
            aria-label="Search themes"
          />
        </div>
      </div>
      <ScrollArea className="min-h-0 flex-1">
        <div className="space-y-3 p-4 md:p-5">
          {filtered.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setThemeId(t.id)}
              className={cn(
                "w-full rounded-xl border p-4 text-left transition-all",
                themeId === t.id
                  ? "border-primary/40 bg-primary/10 shadow-[0_0_24px_-8px_var(--color-primary)]"
                  : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]"
              )}
            >
              <div className="mb-3 flex items-center justify-between gap-2">
                <span className="text-sm font-medium">{t.name}</span>
                {themeId === t.id && (
                  <Check className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                )}
              </div>
              <div
                className="h-20 overflow-hidden rounded-lg border border-white/10 p-2 font-mono text-[8px] leading-relaxed"
                style={{ backgroundColor: t.background, color: t.foreground }}
              >
                <span className="opacity-90">function</span>{" "}
                <span className="text-sky-400">hello</span>() {"{"}
                <br />
                {"  "}
                <span className="text-amber-300/90">console</span>.
                <span className="text-sky-400">log</span>(
                <span className="text-emerald-400/90">&quot;Hello&quot;</span>);
                <br />
                {"}"}
              </div>
            </button>
          ))}
          {filtered.length === 0 && (
            <p className="text-center text-sm text-muted-foreground">No themes match.</p>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
