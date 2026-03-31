"use client"

import React, { useState } from "react"
import { Code2, Download, Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ExportModal } from "@/components/ExportModal"

interface NavbarProps {
  onExport: (format: "png" | "svg" | "jpeg", scale: number) => void
  isExporting: boolean
}

export function Navbar({ onExport, isExporting }: NavbarProps) {
  const [isExportModalOpen, setIsExportModalOpen] = useState(false)

  return (
    <>
      <header className="glass-nav z-20 flex h-14 w-full shrink-0 items-center justify-between px-4 sm:h-16 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl border border-white/15 bg-white/10 shadow-inner shadow-white/10">
            <Code2 className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h1 className="text-sm font-semibold tracking-tight sm:text-base">CodeSnap</h1>
            <p className="hidden text-[11px] text-muted-foreground sm:block">
              Screenshot-ready code
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="glass-button hidden items-center gap-2 sm:flex"
          >
            <Share2 className="h-4 w-4" />
            Share
          </Button>

          <div className="mx-0.5 hidden h-4 w-px bg-white/10 sm:block" />

          <Button
            size="sm"
            onClick={() => setIsExportModalOpen(true)}
            disabled={isExporting}
            className="flex items-center gap-2 rounded-xl bg-primary px-3 text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90 sm:px-4"
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </header>

      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onExport={(format, scale) => {
          setIsExportModalOpen(false)
          onExport(format, scale)
        }}
      />
    </>
  )
}
