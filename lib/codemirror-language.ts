import { cpp } from "@codemirror/lang-cpp"
import { css } from "@codemirror/lang-css"
import { go } from "@codemirror/lang-go"
import { html } from "@codemirror/lang-html"
import { java } from "@codemirror/lang-java"
import { javascript } from "@codemirror/lang-javascript"
import { json } from "@codemirror/lang-json"
import { markdown } from "@codemirror/lang-markdown"
import { php } from "@codemirror/lang-php"
import { python } from "@codemirror/lang-python"
import { rust } from "@codemirror/lang-rust"
import { sql } from "@codemirror/lang-sql"
import { yaml } from "@codemirror/lang-yaml"
import { LanguageSupport, StreamLanguage } from "@codemirror/language"
import { csharp, kotlin } from "@codemirror/legacy-modes/mode/clike"
import { ruby } from "@codemirror/legacy-modes/mode/ruby"
import { shell } from "@codemirror/legacy-modes/mode/shell"
import { swift } from "@codemirror/legacy-modes/mode/swift"
import type { Extension } from "@codemirror/state"

function asExt(lang: LanguageSupport): Extension {
  return lang
}

export function languageExtension(id: string): Extension {
  switch (id) {
    case "javascript":
      return asExt(javascript({ jsx: true, typescript: false }))
    case "typescript":
      return asExt(javascript({ jsx: true, typescript: true }))
    case "python":
      return asExt(python())
    case "java":
      return asExt(java())
    case "csharp":
      return StreamLanguage.define(csharp)
    case "cpp":
      return asExt(cpp())
    case "c":
      return asExt(cpp())
    case "go":
      return asExt(go())
    case "rust":
      return asExt(rust())
    case "swift":
      return StreamLanguage.define(swift)
    case "kotlin":
      return StreamLanguage.define(kotlin)
    case "ruby":
      return StreamLanguage.define(ruby)
    case "php":
      return asExt(php())
    case "html":
      return asExt(html())
    case "css":
      return asExt(css())
    case "json":
      return asExt(json())
    case "sql":
      return asExt(sql())
    case "bash":
      return StreamLanguage.define(shell)
    case "yaml":
      return asExt(yaml())
    case "markdown":
      return asExt(markdown())
    default:
      return asExt(javascript({ jsx: true, typescript: false }))
  }
}
