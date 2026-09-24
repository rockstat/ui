"use client";
import { Component, type ReactNode } from "react";

interface State {
  error: Error | null;
}

/** Shows the error inline instead of taking the whole page down. */
export class ErrorBoundary extends Component<{ children: ReactNode; label?: string }, State> {
  state: State = { error: null };
  static getDerivedStateFromError(error: Error): State {
    return { error };
  }
  componentDidCatch(error: Error) {
    console.error(`[${this.props.label ?? "boundary"}]`, error);
  }
  render() {
    if (this.state.error) {
      return (
        <div className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive">
          {this.props.label ? `${this.props.label}: ` : ""}
          {this.state.error.message}
        </div>
      );
    }
    return this.props.children;
  }
}
