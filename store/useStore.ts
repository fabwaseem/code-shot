import { create } from "zustand"

import { CM_THEMES, getCMTheme, type CMThemeEntry } from "@/lib/codemirror-themes"

export type { CMThemeEntry }
export { CM_THEMES, getCMTheme }

export const LANGUAGES = [
  { id: "javascript", name: "JavaScript" },
  { id: "typescript", name: "TypeScript" },
  { id: "python", name: "Python" },
  { id: "java", name: "Java" },
  { id: "csharp", name: "C#" },
  { id: "cpp", name: "C++" },
  { id: "c", name: "C" },
  { id: "go", name: "Go" },
  { id: "rust", name: "Rust" },
  { id: "swift", name: "Swift" },
  { id: "kotlin", name: "Kotlin" },
  { id: "ruby", name: "Ruby" },
  { id: "php", name: "PHP" },
  { id: "html", name: "HTML" },
  { id: "css", name: "CSS" },
  { id: "json", name: "JSON" },
  { id: "sql", name: "SQL" },
  { id: "bash", name: "Bash" },
  { id: "yaml", name: "YAML" },
  { id: "markdown", name: "Markdown" },
]

export const BACKGROUNDS = [
  "linear-gradient(140deg, rgb(165, 142, 251), rgb(233, 191, 248))",
  "linear-gradient(140deg, rgb(255, 207, 115), rgb(255, 122, 47))",
  "linear-gradient(140deg, rgb(142, 199, 251), rgb(28, 85, 170))",
  "linear-gradient(140deg, rgb(255, 142, 165), rgb(204, 43, 94))",
  "linear-gradient(140deg, rgb(142, 251, 199), rgb(28, 170, 85))",
  "linear-gradient(140deg, rgb(251, 142, 251), rgb(170, 28, 170))",
  "linear-gradient(140deg, rgb(255, 255, 255), rgb(200, 200, 200))",
  "linear-gradient(140deg, rgb(30, 30, 30), rgb(10, 10, 10))",
  "transparent",
]

export const FONTS = [
  { id: "fira-code", name: "Fira Code", family: '"Fira Code", monospace' },
  { id: "jetbrains-mono", name: "JetBrains Mono", family: '"JetBrains Mono", monospace' },
  { id: "cascadia-code", name: "Cascadia Code", family: '"Cascadia Code", monospace' },
  { id: "source-code-pro", name: "Source Code Pro", family: '"Source Code Pro", monospace' },
  { id: "ibm-plex-mono", name: "IBM Plex Mono", family: '"IBM Plex Mono", monospace' },
  { id: "roboto-mono", name: "Roboto Mono", family: '"Roboto Mono", monospace' },
  { id: "ubuntu-mono", name: "Ubuntu Mono", family: '"Ubuntu Mono", monospace' },
  { id: "space-mono", name: "Space Mono", family: '"Space Mono", monospace' },
  { id: "inconsolata", name: "Inconsolata", family: '"Inconsolata", monospace' },
  { id: "hack", name: "Hack", family: '"Hack", monospace' },
]

interface AppState {
  code: string
  setCode: (code: string) => void
  language: string
  setLanguage: (lang: string) => void
  themeId: string
  setThemeId: (id: string) => void
  padding: number
  setPadding: (padding: number) => void
  radius: number
  setRadius: (radius: number) => void
  background: string
  setBackground: (bg: string) => void
  showBackground: boolean
  setShowBackground: (show: boolean) => void
  backgroundOpacity: number
  setBackgroundOpacity: (opacity: number) => void
  aspectRatio: string
  setAspectRatio: (ratio: string) => void
  showTitle: boolean
  setShowTitle: (show: boolean) => void
  windowStyle: "mac" | "windows" | "chrome" | "safari" | "none"
  setWindowStyle: (style: "mac" | "windows" | "chrome" | "safari" | "none") => void
  showReflection: boolean
  setShowReflection: (show: boolean) => void
  showWatermark: boolean
  setShowWatermark: (show: boolean) => void
  watermarkText: string
  setWatermarkText: (text: string) => void
  watermarkImage: string | null
  setWatermarkImage: (image: string | null) => void
  showShadow: boolean
  setShowShadow: (show: boolean) => void
  shadowX: number
  setShadowX: (x: number) => void
  shadowY: number
  setShadowY: (y: number) => void
  shadowBlur: number
  setShadowBlur: (blur: number) => void
  shadowSpread: number
  setShadowSpread: (spread: number) => void
  shadowColor: string
  setShadowColor: (color: string) => void
  shadowOpacity: number
  setShadowOpacity: (opacity: number) => void
  borderStyle: "none" | "solid" | "glass" | "stack"
  setBorderStyle: (style: "none" | "solid" | "glass" | "stack") => void
  showLineNumbers: boolean
  setShowLineNumbers: (show: boolean) => void
  fontFamily: string
  setFontFamily: (font: string) => void
  fontSize: number
  setFontSize: (size: number) => void
  fontWeight: number
  setFontWeight: (weight: number) => void
  fontLigatures: boolean
  setFontLigatures: (ligatures: boolean) => void
  highlightedLinesInput: string
  setHighlightedLinesInput: (input: string) => void
  randomize: () => void
}

export const useAppStore = create<AppState>((set) => ({
  code: 'function helloWorld() {\n  console.log("Hello, world!");\n}\n\nhelloWorld();',
  setCode: (code) => set({ code }),
  language: "javascript",
  setLanguage: (language) => set({ language }),
  themeId: CM_THEMES[0].id,
  setThemeId: (themeId) => set({ themeId }),
  padding: 64,
  setPadding: (padding) => set({ padding }),
  radius: 16,
  setRadius: (radius) => set({ radius }),
  background: BACKGROUNDS[0],
  setBackground: (background) => set({ background }),
  showBackground: true,
  setShowBackground: (showBackground) => set({ showBackground }),
  backgroundOpacity: 100,
  setBackgroundOpacity: (backgroundOpacity) => set({ backgroundOpacity }),
  aspectRatio: "auto",
  setAspectRatio: (aspectRatio) => set({ aspectRatio }),
  showTitle: true,
  setShowTitle: (showTitle) => set({ showTitle }),
  windowStyle: "mac",
  setWindowStyle: (windowStyle) => set({ windowStyle }),
  showReflection: true,
  setShowReflection: (showReflection) => set({ showReflection }),
  showWatermark: true,
  setShowWatermark: (showWatermark) => set({ showWatermark }),
  watermarkText: "CodeImage",
  setWatermarkText: (watermarkText) => set({ watermarkText }),
  watermarkImage: null,
  setWatermarkImage: (watermarkImage) => set({ watermarkImage }),
  showShadow: true,
  setShowShadow: (showShadow) => set({ showShadow }),
  shadowX: 0,
  setShadowX: (shadowX) => set({ shadowX }),
  shadowY: 20,
  setShadowY: (shadowY) => set({ shadowY }),
  shadowBlur: 40,
  setShadowBlur: (shadowBlur) => set({ shadowBlur }),
  shadowSpread: 0,
  setShadowSpread: (shadowSpread) => set({ shadowSpread }),
  shadowColor: "#000000",
  setShadowColor: (shadowColor) => set({ shadowColor }),
  shadowOpacity: 50,
  setShadowOpacity: (shadowOpacity) => set({ shadowOpacity }),
  borderStyle: "solid",
  setBorderStyle: (borderStyle) => set({ borderStyle }),
  showLineNumbers: true,
  setShowLineNumbers: (showLineNumbers) => set({ showLineNumbers }),
  fontFamily: FONTS[0].family,
  setFontFamily: (fontFamily) => set({ fontFamily }),
  fontSize: 14,
  setFontSize: (fontSize) => set({ fontSize }),
  fontWeight: 400,
  setFontWeight: (fontWeight) => set({ fontWeight }),
  fontLigatures: true,
  setFontLigatures: (fontLigatures) => set({ fontLigatures }),
  highlightedLinesInput: "",
  setHighlightedLinesInput: (highlightedLinesInput) => set({ highlightedLinesInput }),
  randomize: () => {
    set({
      themeId: CM_THEMES[Math.floor(Math.random() * CM_THEMES.length)].id,
      background: BACKGROUNDS[Math.floor(Math.random() * BACKGROUNDS.length)],
      fontFamily: FONTS[Math.floor(Math.random() * FONTS.length)].family,
      padding: [16, 32, 64, 128][Math.floor(Math.random() * 4)],
      windowStyle: (["mac", "windows", "chrome", "safari", "none"] as const)[
        Math.floor(Math.random() * 5)
      ],
    })
  },
}))
