"use client"

import React, { useEffect, useMemo, useState } from "react"
import { Code2 } from "lucide-react"
import { motion } from "motion/react"
import { Resizable } from "re-resizable"

import { cn } from "@/lib/utils"
import { getCMTheme } from "@/lib/codemirror-themes"
import { useAppStore } from "@/store/useStore"

import { CodeMirrorField } from "./CodeMirrorField"
import { PreviewErrorBoundary } from "./PreviewErrorBoundary"

export function PreviewStage({
  canvasRef,
  isExporting,
}: {
  canvasRef: React.RefObject<HTMLDivElement | null>
  isExporting: boolean
}) {
  const {
    code,
    setCode,
    language,
    themeId,
    padding,
    radius: borderRadius,
    background,
    aspectRatio,
    showTitle,
    windowStyle,
    showReflection,
    showWatermark,
    watermarkText,
    watermarkImage,
    showShadow,
    shadowX,
    shadowY,
    shadowBlur,
    shadowSpread,
    shadowColor,
    shadowOpacity,
    borderStyle,
    showLineNumbers,
    fontFamily,
    fontSize,
    fontWeight,
    fontLigatures,
    highlightedLinesInput,
    showBackground,
    backgroundOpacity,
  } = useAppStore()
  const [title, setTitle] = useState("fibonacci.ts")
  const [lineHeight] = useState(1.5)

  const [previewSize, setPreviewSize] = useState<{
    width: string | number
    height: string | number
  }>({ width: "auto", height: "auto" })
  const [actualWidth, setActualWidth] = useState(0)
  const [actualHeight, setActualHeight] = useState(0)

  const theme = getCMTheme(themeId)

  const highlightedLines = useMemo(() => {
    const lines = new Set<number>()
    if (!highlightedLinesInput) return lines
    highlightedLinesInput.split(",").forEach((part) => {
      const trimmed = part.trim()
      if (trimmed.includes("-")) {
        const [start, end] = trimmed.split("-").map(Number)
        if (!isNaN(start) && !isNaN(end)) {
          for (let i = start; i <= end; i++) lines.add(i)
        }
      } else {
        const num = Number(trimmed)
        if (!isNaN(num)) lines.add(num)
      }
    })
    return lines
  }, [highlightedLinesInput])

  useEffect(() => {
    if (!canvasRef.current) return
    const observer = new ResizeObserver((entries) => {
      setActualWidth(entries[0].contentRect.width)
      setActualHeight(entries[0].contentRect.height)
    })
    observer.observe(canvasRef.current)
    return () => observer.disconnect()
  }, [canvasRef])

  useEffect(() => {
    queueMicrotask(() => {
      setPreviewSize({ width: "auto", height: "auto" })
    })
  }, [aspectRatio])

  return (
    <div
      className="flex min-h-full min-w-full items-center justify-center p-6 md:p-8"
      style={{
        alignItems: "safe center",
        justifyContent: "safe center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="group relative m-auto"
      >
        <div
          ref={canvasRef}
          className="relative flex items-center justify-center"
        >
          <Resizable
            size={previewSize}
            onResizeStop={(_e, _dir, ref) => {
              setPreviewSize({
                width: ref.style.width,
                height: ref.style.height,
              })
            }}
            lockAspectRatio={
              aspectRatio === "auto"
                ? false
                : aspectRatio.split("/").map(Number).reduce((a, b) => a / b)
            }
            enable={{
              top: true,
              right: true,
              bottom: true,
              left: true,
              topRight: true,
              bottomRight: true,
              bottomLeft: true,
              topLeft: true,
            }}
            className="group/resizable relative flex items-center justify-center"
            handleClasses={{
              top: cn(
                "transition-opacity",
                isExporting
                  ? "opacity-0"
                  : "opacity-0 group-hover/resizable:opacity-100"
              ),
              right: cn(
                "transition-opacity",
                isExporting
                  ? "opacity-0"
                  : "opacity-0 group-hover/resizable:opacity-100"
              ),
              bottom: cn(
                "transition-opacity",
                isExporting
                  ? "opacity-0"
                  : "opacity-0 group-hover/resizable:opacity-100"
              ),
              left: cn(
                "transition-opacity",
                isExporting
                  ? "opacity-0"
                  : "opacity-0 group-hover/resizable:opacity-100"
              ),
              topRight: cn(
                "transition-opacity",
                isExporting
                  ? "opacity-0"
                  : "opacity-0 group-hover/resizable:opacity-100"
              ),
              bottomRight: cn(
                "transition-opacity",
                isExporting
                  ? "opacity-0"
                  : "opacity-0 group-hover/resizable:opacity-100"
              ),
              bottomLeft: cn(
                "transition-opacity",
                isExporting
                  ? "opacity-0"
                  : "opacity-0 group-hover/resizable:opacity-100"
              ),
              topLeft: cn(
                "transition-opacity",
                isExporting
                  ? "opacity-0"
                  : "opacity-0 group-hover/resizable:opacity-100"
              ),
            }}
            handleComponent={{
              right: (
                <div className="absolute top-1/2 -right-1.5 h-3 w-3 -translate-y-1/2 rounded-full border border-white/30 bg-white shadow" />
              ),
              left: (
                <div className="absolute top-1/2 -left-1.5 h-3 w-3 -translate-y-1/2 rounded-full border border-white/30 bg-white shadow" />
              ),
              top: (
                <div className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full border border-white/30 bg-white shadow" />
              ),
              bottom: (
                <div className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full border border-white/30 bg-white shadow" />
              ),
              topRight: (
                <div className="absolute -top-1.5 -right-1.5 h-3 w-3 rounded-full border border-white/30 bg-white shadow" />
              ),
              bottomRight: (
                <div className="absolute -right-1.5 -bottom-1.5 h-3 w-3 rounded-full border border-white/30 bg-white shadow" />
              ),
              bottomLeft: (
                <div className="absolute -bottom-1.5 -left-1.5 h-3 w-3 rounded-full border border-white/30 bg-white shadow" />
              ),
              topLeft: (
                <div className="absolute -top-1.5 -left-1.5 h-3 w-3 rounded-full border border-white/30 bg-white shadow" />
              ),
            }}
          >
            <div
              className="relative flex h-full w-full items-center justify-center transition-all duration-300 ease-in-out"
              style={{
                padding: `${padding}px`,
                aspectRatio: aspectRatio === "auto" ? "auto" : aspectRatio,
              }}
            >
              {showBackground && (
                <div
                  className="absolute inset-0 z-0"
                  style={{
                    background:
                      background === "transparent" ? "transparent" : background,
                    opacity: backgroundOpacity / 100,
                  }}
                />
              )}

              <div
                className={cn(
                  "relative z-10 w-full overflow-hidden transition-all duration-300",
                  windowStyle !== "none" &&
                    borderStyle === "solid" &&
                    "border border-white/10",
                  windowStyle !== "none" &&
                    borderStyle === "glass" &&
                    "border border-white/20 backdrop-blur-md",
                  windowStyle !== "none" &&
                    borderStyle === "stack" &&
                    "border border-white/10"
                )}
                style={{
                  backgroundColor: theme.background,
                  borderRadius: `${borderRadius}px`,
                  boxShadow:
                    [
                      showShadow
                        ? `${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowSpread}px ${shadowColor}${Math.round(
                            shadowOpacity * 2.55
                          )
                            .toString(16)
                            .padStart(2, "0")}`
                        : "none",
                      windowStyle !== "none" && borderStyle === "glass"
                        ? "inset 0 1px 0 0 rgba(255,255,255,0.1)"
                        : "none",
                      windowStyle !== "none" && borderStyle === "stack"
                        ? "0 0 0 1px rgba(255,255,255,0.1), 0 4px 0 0 rgba(255,255,255,0.1)"
                        : "none",
                    ]
                      .filter((s) => s !== "none")
                      .join(", ") || "none",
                  ...(showReflection
                    ? {
                        WebkitBoxReflect:
                          "below 0px linear-gradient(to bottom, transparent 50%, rgba(255,255,255,0.2))",
                      }
                    : {}),
                }}
              >
                {windowStyle !== "none" && (
                  <div
                    className={cn(
                      "relative flex items-center bg-black/10 px-4",
                      windowStyle === "chrome" ? "h-14" : "h-12"
                    )}
                  >
                    {(windowStyle === "mac" ||
                      windowStyle === "safari" ||
                      windowStyle === "chrome") && (
                      <div className="absolute left-4 flex gap-2">
                        <div className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                        <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                        <div className="h-3 w-3 rounded-full bg-[#27c93f]" />
                      </div>
                    )}

                    {showTitle &&
                      (windowStyle === "mac" || windowStyle === "windows") && (
                        <div className="flex-1 text-center font-sans text-xs font-medium text-zinc-400/80">
                          <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full border-none bg-transparent text-center placeholder:text-zinc-600 focus:outline-none"
                            placeholder="Filename..."
                          />
                        </div>
                      )}

                    {showTitle && windowStyle === "safari" && (
                      <div className="flex flex-1 justify-center">
                        <div className="flex w-1/2 items-center justify-center rounded-md bg-white/10 px-4 py-1 text-center font-sans text-xs font-medium text-zinc-400/80">
                          <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full border-none bg-transparent text-center placeholder:text-zinc-600 focus:outline-none"
                            placeholder="URL or Filename..."
                          />
                        </div>
                      </div>
                    )}

                    {showTitle && windowStyle === "chrome" && (
                      <div className="mr-4 ml-20 flex flex-1">
                        <div className="flex w-full items-center rounded-full bg-white/10 px-4 py-1.5 font-sans text-xs font-medium text-zinc-400/80">
                          <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full border-none bg-transparent placeholder:text-zinc-600 focus:outline-none"
                            placeholder="URL or Filename..."
                          />
                        </div>
                      </div>
                    )}

                    {windowStyle === "windows" && (
                      <div className="absolute right-4 flex gap-3 text-zinc-500">
                        <div className="h-px w-3 self-center bg-current" />
                        <div className="h-3 w-3 border border-current" />
                        <div className="relative h-3 w-3">
                          <div
                            className="absolute inset-0 bg-current"
                            style={{
                              clipPath:
                                "polygon(10% 0, 0 10%, 40% 50%, 0 90%, 10% 100%, 50% 60%, 90% 100%, 100% 90%, 60% 50%, 100% 10%, 90% 0, 50% 40%)",
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div
                  className={cn(
                    "editor-container group/editor relative",
                    windowStyle === "none" ? "p-6" : "p-4 pt-0"
                  )}
                  style={{ color: theme.foreground }}
                >
                  <PreviewErrorBoundary>
                    <CodeMirrorField
                      value={code}
                      onChange={setCode}
                      language={language}
                      themeId={themeId}
                      fontFamily={fontFamily}
                      fontSize={fontSize}
                      fontWeight={fontWeight}
                      lineHeight={lineHeight}
                      fontLigatures={fontLigatures}
                      showLineNumbers={showLineNumbers}
                      highlightedLines={highlightedLines}
                    />
                  </PreviewErrorBoundary>
                </div>
              </div>

              {showWatermark && (
                <div className="pointer-events-none absolute right-6 bottom-4 z-20 flex items-center gap-2 opacity-50 mix-blend-overlay">
                  {watermarkImage ? (
                    // User-supplied URL or data URL — next/image not applicable
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={watermarkImage}
                      alt=""
                      className="h-6 object-contain"
                    />
                  ) : (
                    <>
                      <Code2 className="h-4 w-4 text-white" />
                      <span className="text-sm font-semibold tracking-wider text-white">
                        {watermarkText || "CodeImage"}
                      </span>
                    </>
                  )}
                </div>
              )}
            </div>
          </Resizable>

          <div
            className={cn(
              "pointer-events-none absolute right-0 -bottom-8 left-0 flex items-center justify-center transition-opacity",
              isExporting ? "opacity-0" : "opacity-0 group-hover:opacity-100"
            )}
          >
            <div className="relative h-px w-full bg-white/20">
              <div className="absolute -top-1 left-0 h-3 w-px bg-white/20" />
              <div className="absolute -top-1 right-0 h-3 w-px bg-white/20" />
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-transparent px-2 font-mono text-xs text-white/50">
                {Math.round(actualWidth)}px
              </div>
            </div>
          </div>

          <div
            className={cn(
              "pointer-events-none absolute top-0 -right-8 bottom-0 flex items-center justify-center transition-opacity",
              isExporting ? "opacity-0" : "opacity-0 group-hover:opacity-100"
            )}
          >
            <div className="relative h-full w-px bg-white/20">
              <div className="absolute top-0 -left-1 h-px w-3 bg-white/20" />
              <div className="absolute bottom-0 -left-1 h-px w-3 bg-white/20" />
              <div className="absolute top-1/2 left-2 -translate-y-1/2 bg-transparent px-2 font-mono text-xs text-white/50">
                {Math.round(actualHeight)}px
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
