"use client"

import { useCallback, useRef, useState } from "react"

import { Navbar } from "@/components/layout/Navbar"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { exportElementAsImage } from "@/lib/export-image"
import { useAppStore } from "@/store/useStore"

import { FloatingActionBar } from "./FloatingActionBar"
import { PreviewStage } from "./PreviewStage"
import { SettingsSidebar } from "./SettingsSidebar"
import { ThemeSidebar } from "./ThemeSidebar"

export function CodeShotApp() {
  const { setCode, setLanguage } = useAppStore()
  const canvasRef = useRef<HTMLDivElement>(null)
  const [isExporting, setIsExporting] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopyCode = useCallback(() => {
    const code = useAppStore.getState().code
    void navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [])

  const handleExport = useCallback(
    async (format: "png" | "svg" | "jpeg", scale: number) => {
      if (!canvasRef.current) return
      setIsExporting(true)
      try {
        await exportElementAsImage(canvasRef.current, format, scale)
      } catch (e) {
        console.error(e)
      } finally {
        setIsExporting(false)
      }
    },
    []
  )

  const handleOpenFile = useCallback(() => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept =
      ".js,.ts,.jsx,.tsx,.py,.java,.c,.cpp,.go,.rs,.swift,.kt,.rb,.php,.html,.css,.json,.sql,.sh,.yaml,.md"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (ev) => {
          const text = ev.target?.result as string
          setCode(text)
          const ext = file.name.split(".").pop()
          const langMap: Record<string, string> = {
            js: "javascript",
            ts: "typescript",
            py: "python",
            java: "java",
            cs: "csharp",
            cpp: "cpp",
            c: "c",
            go: "go",
            rs: "rust",
            swift: "swift",
            kt: "kotlin",
            rb: "ruby",
            php: "php",
            html: "html",
            css: "css",
            json: "json",
            sql: "sql",
            sh: "bash",
            yaml: "yaml",
            yml: "yaml",
            md: "markdown",
          }
          if (ext && langMap[ext]) {
            setLanguage(langMap[ext])
          }
        }
        reader.readAsText(file)
      }
    }
    input.click()
  }, [setCode, setLanguage])

  const previewArea = (
    <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
      <ScrollArea className="h-full min-h-0 w-full flex-1">
        <PreviewStage canvasRef={canvasRef} isExporting={isExporting} />
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <FloatingActionBar
        copied={copied}
        onCopyCode={handleCopyCode}
        onOpenFile={handleOpenFile}
      />
    </div>
  )

  return (
    <div className="mesh-bg flex h-dvh flex-col overflow-hidden font-sans text-foreground selection:bg-primary/25">
      <Navbar onExport={handleExport} isExporting={isExporting} />

      <div className="flex min-h-0 flex-1 flex-col lg:hidden">
        <Tabs defaultValue="preview" className="flex min-h-0 flex-1 flex-col gap-0">
          <TabsList
            variant="line"
            className="glass-nav w-full shrink-0 justify-center rounded-none px-2 py-2"
          >
            <TabsTrigger value="settings" className="flex-1">
              Settings
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex-1">
              Preview
            </TabsTrigger>
            <TabsTrigger value="themes" className="flex-1">
              Themes
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="settings"
            className="data-[hidden]:hidden flex min-h-0 flex-1 flex-col overflow-hidden"
          >
            <ScrollArea className="max-h-[calc(100dvh-7.5rem)] min-h-0 flex-1">
              <SettingsSidebar />
            </ScrollArea>
          </TabsContent>
          <TabsContent
            value="preview"
            className="data-[hidden]:hidden relative flex min-h-0 flex-1 flex-col overflow-hidden"
          >
            {previewArea}
          </TabsContent>
          <TabsContent
            value="themes"
            className="data-[hidden]:hidden flex min-h-0 flex-1 flex-col overflow-hidden"
          >
            <ThemeSidebar />
          </TabsContent>
        </Tabs>
      </div>

      <div className="hidden min-h-0 flex-1 lg:flex lg:flex-row">
        <aside className="glass-rail flex min-h-0 w-full min-w-0 shrink-0 flex-col overflow-hidden lg:w-80">
          <ScrollArea className="relative z-10 h-full min-h-0">
            <SettingsSidebar />
          </ScrollArea>
        </aside>

        <main className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-black/15">
          {previewArea}
        </main>

        <aside className="glass-rail glass-rail-right flex min-h-0 w-full min-w-0 shrink-0 flex-col overflow-hidden lg:w-80">
          <ThemeSidebar />
        </aside>
      </div>
    </div>
  )
}
