"use client"

import CodeMirror from "@uiw/react-codemirror"
import { EditorView } from "@codemirror/view"
import { useMemo } from "react"

import { highlightLinesExtension } from "@/lib/codemirror-highlight-lines"
import { languageExtension } from "@/lib/codemirror-language"
import { getCMTheme } from "@/lib/codemirror-themes"

type CodeMirrorFieldProps = {
  value: string
  onChange: (v: string) => void
  language: string
  themeId: string
  fontFamily: string
  fontSize: number
  fontWeight: number
  lineHeight: number
  fontLigatures: boolean
  showLineNumbers: boolean
  highlightedLines: Set<number>
}

export function CodeMirrorField({
  value,
  onChange,
  language,
  themeId,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  fontLigatures,
  showLineNumbers,
  highlightedLines,
}: CodeMirrorFieldProps) {
  const themeEntry = getCMTheme(themeId)

  const extensions = useMemo(
    () => [
      languageExtension(language),
      highlightLinesExtension(new Set(highlightedLines)),
      EditorView.lineWrapping,
      EditorView.theme({
        "&": {
          fontSize: `${fontSize}px`,
          lineHeight: `${lineHeight}`,
          fontWeight: String(fontWeight),
          fontFamily,
        },
        "& .cm-scroller": {
          overflow: "visible",
          fontVariantLigatures: fontLigatures ? "normal" : "none",
        },
        "& .cm-content, & .cm-gutter": {
          fontFamily: "inherit",
          minHeight: "unset",
        },
        "& .cm-gutters": {
          borderRight: "none",
          backgroundColor: "transparent",
        },
      }),
    ],
    [
      language,
      highlightedLines,
      fontFamily,
      fontSize,
      fontWeight,
      lineHeight,
      fontLigatures,
    ]
  )

  return (
    <CodeMirror
      value={value}
      height="auto"
      theme={themeEntry.extension}
      onChange={onChange}
      basicSetup={{
        lineNumbers: showLineNumbers,
        foldGutter: false,
        highlightActiveLine: false,
        highlightActiveLineGutter: false,
        highlightSelectionMatches: false,
        autocompletion: false,
        closeBrackets: true,
        bracketMatching: true,
        dropCursor: true,
        indentOnInput: true,
        searchKeymap: false,
        lintKeymap: false,
      }}
      extensions={extensions}
      className="text-left [&_.cm-editor]:!overflow-visible [&_.cm-editor]:!bg-transparent [&_.cm-focused]:!outline-none"
    />
  )
}
