import React, { useState } from "react"
import { X, Check } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface ExportModalProps {
  isOpen: boolean
  onClose: () => void
  onExport: (format: "png" | "svg" | "jpeg", scale: number) => void
}

export function ExportModal({ isOpen, onClose, onExport }: ExportModalProps) {
  const [tab, setTab] = useState<"image" | "code">("image")
  const [format, setFormat] = useState<"png" | "svg" | "jpeg">("png")
  const [scale, setScale] = useState(1)
  const [activeTabOnly, setActiveTabOnly] = useState(false)

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="glass-panel relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-zinc-800/50 p-4">
              <h2 className="text-lg font-semibold text-zinc-100">
                Export image
              </h2>
              <button
                onClick={onClose}
                className="rounded-md p-1 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6">
              <div className="mb-6 flex rounded-xl bg-zinc-900/50 p-1">
                <button
                  onClick={() => setTab("image")}
                  className={cn(
                    "flex-1 rounded-lg py-2 text-sm font-medium transition-all",
                    tab === "image"
                      ? "bg-zinc-700 text-zinc-100 shadow-sm"
                      : "text-zinc-400 hover:text-zinc-200"
                  )}
                >
                  Export as image
                </button>
                <button
                  onClick={() => setTab("code")}
                  className={cn(
                    "flex-1 rounded-lg py-2 text-sm font-medium transition-all",
                    tab === "code"
                      ? "bg-zinc-700 text-zinc-100 shadow-sm"
                      : "text-zinc-400 hover:text-zinc-200"
                  )}
                >
                  Share your code
                </button>
              </div>

              {tab === "image" && (
                <div className="space-y-6">
                  <div>
                    <label className="mb-3 block text-sm font-medium text-zinc-300">
                      File extension
                    </label>
                    <div className="flex rounded-xl bg-zinc-900/50 p-1">
                      {(["png", "svg", "jpeg"] as const).map((f) => (
                        <button
                          key={f}
                          onClick={() => setFormat(f)}
                          className={cn(
                            "flex-1 rounded-lg py-2 text-sm font-medium uppercase transition-all",
                            format === f
                              ? "bg-zinc-700 text-zinc-100 shadow-sm"
                              : "text-zinc-400 hover:text-zinc-200"
                          )}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      <label className="text-sm font-medium text-zinc-300">
                        Scale
                      </label>
                      <span className="text-xs text-zinc-500">{scale}x</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      step="1"
                      value={scale}
                      onChange={(e) => setScale(Number(e.target.value))}
                      className="h-1 w-full cursor-pointer appearance-none rounded-lg bg-zinc-800 accent-indigo-500"
                    />
                  </div>

                  <label className="group flex cursor-pointer items-center gap-3">
                    <div
                      className={cn(
                        "flex h-5 w-5 items-center justify-center rounded border transition-colors",
                        activeTabOnly
                          ? "border-indigo-500 bg-indigo-500"
                          : "border-zinc-700 bg-zinc-900 group-hover:border-zinc-500"
                      )}
                    >
                      {activeTabOnly && (
                        <Check className="h-3 w-3 text-white" strokeWidth={3} />
                      )}
                    </div>
                    <span className="text-sm text-zinc-300 transition-colors group-hover:text-zinc-100">
                      Show only active tab
                    </span>
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={activeTabOnly}
                      onChange={(e) => setActiveTabOnly(e.target.checked)}
                    />
                  </label>
                </div>
              )}

              {tab === "code" && (
                <div className="py-8 text-center text-sm text-zinc-400">
                  Share link functionality coming soon.
                </div>
              )}
            </div>

            <div className="flex gap-3 border-t border-zinc-800/50 p-4">
              <Button
                variant="secondary"
                className="flex-1 py-2.5"
                onClick={onClose}
              >
                Close
              </Button>
              <Button
                variant="default"
                className="flex-1 bg-blue-600 py-2.5 text-white hover:bg-blue-700"
                onClick={() => onExport(format, scale)}
              >
                Confirm
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
