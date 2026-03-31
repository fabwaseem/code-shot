import type { Metadata } from "next"
import { CodeShotApp } from "@/components/code-shot/CodeShotApp"

export const metadata: Metadata = {
  title: "CodeShot - Beautiful Code Screenshots in Seconds",
  description:
    "Create stunning code screenshots instantly. Paste your code, choose a theme, and export as PNG, SVG, or JPEG. Supports 20+ programming languages with beautiful syntax highlighting.",
  openGraph: {
    title: "CodeShot - Beautiful Code Screenshots in Seconds",
    description:
      "Create stunning code screenshots instantly. Paste your code, choose a theme, and export as PNG, SVG, or JPEG.",
    url: "/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeShot - Beautiful Code Screenshots in Seconds",
    description:
      "Create stunning code screenshots instantly. Paste your code, choose a theme, and export as PNG, SVG, or JPEG.",
  },
}

export default function Page() {
  return <CodeShotApp />
}
