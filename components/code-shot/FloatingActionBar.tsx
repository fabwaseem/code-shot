"use client"

import { Check, Copy, FolderOpen, Shuffle, Wand2 } from "lucide-react"

import { useAppStore } from "@/store/useStore"

export function FloatingActionBar({
  copied,
  onCopyCode,
  onOpenFile,
}: {
  copied: boolean
  onCopyCode: () => void
  onOpenFile: () => void
}) {
  const randomize = useAppStore((s) => s.randomize)

  return (
    <div className="glass-fab pointer-events-auto absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1 rounded-2xl p-1.5 sm:bottom-6 sm:gap-2">
      <button
        type="button"
        onClick={onCopyCode}
        className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-foreground/90 transition-colors hover:bg-white/10 sm:px-4"
      >
        {copied ? (
          <Check className="h-4 w-4 text-emerald-400" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
        <span className="hidden sm:inline">Copy</span>
      </button>
      <div className="hidden h-4 w-px bg-white/10 sm:block" />
      <button
        type="button"
        onClick={() => randomize()}
        className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-foreground/90 transition-colors hover:bg-white/10 sm:px-4"
      >
        <Shuffle className="h-4 w-4" />
        <span className="hidden sm:inline">Randomize</span>
      </button>
      <div className="hidden h-4 w-px bg-white/10 sm:block" />
      <button
        type="button"
        disabled
        className="flex cursor-not-allowed items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-foreground/40 opacity-50 sm:px-4"
      >
        <Wand2 className="h-4 w-4" />
        <span className="hidden sm:inline">Format</span>
      </button>
      <div className="hidden h-4 w-px bg-white/10 sm:block" />
      <button
        type="button"
        onClick={onOpenFile}
        className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-foreground/90 transition-colors hover:bg-white/10 sm:px-4"
      >
        <FolderOpen className="h-4 w-4" />
        <span className="hidden sm:inline">Open</span>
      </button>
    </div>
  )
}
