import { RangeSetBuilder } from "@codemirror/state"
import {
  Decoration,
  type DecorationSet,
  EditorView,
  ViewPlugin,
  type ViewUpdate,
} from "@codemirror/view"

export function highlightLinesExtension(lines: Set<number>) {
  return ViewPlugin.fromClass(
    class {
      decorations: DecorationSet
      constructor(readonly view: EditorView) {
        this.decorations = this.build(view)
      }
      update(update: ViewUpdate) {
        if (update.docChanged || update.viewportChanged) {
          this.decorations = this.build(update.view)
        }
      }
      build(view: EditorView): DecorationSet {
        const builder = new RangeSetBuilder<Decoration>()
        for (const n of lines) {
          if (n < 1 || n > view.state.doc.lines) continue
          const line = view.state.doc.line(n)
          builder.add(
            line.from,
            line.to,
            Decoration.line({ class: "cm-shot-highlight-line" })
          )
        }
        return builder.finish()
      }
    },
    { decorations: (v) => v.decorations }
  )
}
