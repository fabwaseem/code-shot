import { toJpeg, toPng, toSvg } from "html-to-image"

function collectProblematicStylesheetLinks(): HTMLLinkElement[] {
  const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
  const problematicLinks: HTMLLinkElement[] = []
  Array.from(document.styleSheets).forEach((sheet) => {
    try {
      void sheet.cssRules
    } catch {
      if (sheet.href) {
        const link = links.find((l) => (l as HTMLLinkElement).href === sheet.href)
        if (link) problematicLinks.push(link as HTMLLinkElement)
      }
    }
  })
  return problematicLinks
}

function withStylesheetsRemoved<T>(fn: () => Promise<T>): Promise<T> {
  const problematicLinks = collectProblematicStylesheetLinks()
  problematicLinks.forEach((link) => link.parentNode?.removeChild(link))
  return fn().finally(() => {
    problematicLinks.forEach((link) => document.head.appendChild(link))
  })
}

export async function copyElementAsPng(element: HTMLElement): Promise<void> {
  return withStylesheetsRemoved(async () => {
    const options = {
      pixelRatio: 2,
      style: {
        transform: "scale(1)",
        transformOrigin: "top left",
      },
    }
    const blob = await toPng(element, options).then((res) =>
      fetch(res).then((r) => r.blob())
    )
    await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })])
  })
}

export async function exportElementAsImage(
  element: HTMLElement,
  format: "png" | "svg" | "jpeg",
  scale: number
): Promise<void> {
  return withStylesheetsRemoved(async () => {
    const options = {
      pixelRatio: scale,
      style: {
        transform: "scale(1)",
        transformOrigin: "top left",
      },
    }
    let dataUrl: string
    if (format === "png") {
      dataUrl = await toPng(element, options)
    } else if (format === "jpeg") {
      dataUrl = await toJpeg(element, options)
    } else {
      dataUrl = await toSvg(element, options)
    }
    const a = document.createElement("a")
    a.download = `codesnap-${Date.now()}.${format}`
    a.href = dataUrl
    a.click()
  })
}
