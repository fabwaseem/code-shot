"use client"

import React from "react"

type State = { hasError: boolean }

export class PreviewErrorBoundary extends React.Component<
  React.PropsWithChildren<{ fallback?: React.ReactNode }>,
  State
> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-muted-foreground backdrop-blur-sm">
            Something went wrong loading the editor. Refresh the page and try again.
          </div>
        )
      )
    }
    return this.props.children
  }
}
