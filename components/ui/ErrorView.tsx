"use client";

import Link from "next/link";
import { ArrowLeft, Home, RefreshCw } from "lucide-react";

interface ErrorViewProps {
  code: string;
  title: string;
  description: string;
  detail?: string;
  onRetry?: () => void;
}

export function ErrorView({ code, title, description, detail, onRetry }: ErrorViewProps) {
  return (
    <section className="container-custom min-h-[60vh] flex items-center justify-center py-12">
      <div className="relative w-full max-w-xl text-center">
        <div
          aria-hidden
          className="absolute inset-x-0 -top-10 mx-auto h-48 w-48 rounded-full bg-primary/10 blur-3xl"
        />

        <div className="relative glass-card p-8 sm:p-10 space-y-6">
          <span className="badge-primary">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            error.{code}
          </span>

          <p className="font-mono font-bold text-7xl sm:text-8xl leading-none bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {code}
          </p>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{title}</h1>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">{description}</p>
          </div>

          {detail && (
            <p className="mx-auto max-w-md rounded-xl border border-border bg-muted/50 px-3 py-2 text-left font-mono text-xs text-muted-foreground break-words">
              <span className="text-primary">$ </span>
              {detail}
            </p>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            {onRetry && (
              <button type="button" onClick={onRetry} className="btn-primary gap-2">
                <RefreshCw className="w-4 h-4" /> Try again
              </button>
            )}
            <Link href="/" className={onRetry ? "btn-secondary" : "btn-primary gap-2"}>
              <Home className="w-4 h-4" /> Back to home
            </Link>
            {!onRetry && (
              <Link href="/contact" className="btn-secondary">
                <ArrowLeft className="w-4 h-4" /> Report a broken link
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
