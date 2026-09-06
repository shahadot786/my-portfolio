"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FileText, X, Download, ExternalLink } from "lucide-react";

interface ResumeViewerProps {
  resumeUrl?: string;
}

export function ResumeViewer({ resumeUrl }: ResumeViewerProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  if (!resumeUrl) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 px-6 py-3 bg-muted/70 dark:bg-card/40 border border-border text-foreground font-semibold text-sm rounded-xl hover:border-primary hover:text-primary transition-all active:scale-95 shadow-sm"
      >
        <FileText size={16} className="text-primary" />
        Resume
      </button>

      {mounted &&
        open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Resume viewer"
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
          >
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
              onClick={() => setOpen(false)}
            />

            <div className="relative w-full max-w-4xl h-[90vh] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden text-foreground">
              {/* Toolbar */}
              <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3 border-b border-border bg-card/95 shrink-0">
                <div className="flex items-center gap-2 font-semibold text-sm min-w-0">
                  <FileText size={16} className="text-primary shrink-0" />
                  <span className="truncate">Resume Preview</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                  <a
                    href={resumeUrl}
                    download
                    className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg border border-border text-muted-foreground hover:border-primary hover:text-primary transition-all text-xs font-mono bg-muted/40"
                    title="Download PDF"
                  >
                    <Download size={14} />
                    <span className="hidden sm:inline">Download</span>
                  </a>
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg border border-border text-muted-foreground hover:border-primary hover:text-primary transition-all text-xs font-mono bg-muted/40"
                    title="Open in new tab"
                  >
                    <ExternalLink size={14} />
                    <span className="hidden sm:inline">Open</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-border text-muted-foreground hover:border-destructive hover:text-destructive transition-all"
                    aria-label="Close resume viewer"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* PDF Content */}
              <div className="flex-1 bg-muted/20 overflow-hidden">
                <iframe
                  src={`${resumeUrl}#toolbar=1&navpanes=0`}
                  title="Resume PDF"
                  className="w-full h-full border-0"
                />
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
