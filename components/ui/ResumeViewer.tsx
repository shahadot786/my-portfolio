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
        className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a211d] border border-[#3c4a42] text-[#dde4dd] font-semibold text-sm rounded-xl hover:border-[#4edea3] hover:text-[#4edea3] transition-all"
      >
        <FileText size={16} />
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
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            <div className="relative w-full max-w-4xl h-[90vh] bg-[#0e1511] border border-[#3c4a42] rounded-2xl shadow-2xl shadow-black/50 flex flex-col overflow-hidden">
              {/* Toolbar */}
              <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3 border-b border-[#3c4a42] bg-[#0e1511]/95 shrink-0">
                <div className="flex items-center gap-2 text-[#dde4dd] font-semibold text-sm min-w-0">
                  <FileText size={16} className="text-[#4edea3] shrink-0" />
                  <span className="truncate">Resume</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                  <a
                    href={resumeUrl}
                    download
                    className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg border border-[#3c4a42] text-[#bbcabf] hover:border-[#4edea3] hover:text-[#4edea3] transition-all text-xs font-mono"
                    title="Download PDF"
                  >
                    <Download size={14} />
                    <span className="hidden sm:inline">Download</span>
                  </a>
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg border border-[#3c4a42] text-[#bbcabf] hover:border-[#4edea3] hover:text-[#4edea3] transition-all text-xs font-mono"
                    title="Open in new tab"
                  >
                    <ExternalLink size={14} />
                    <span className="hidden sm:inline">Open</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-[#3c4a42] text-[#bbcabf] hover:border-red-400/50 hover:text-red-400 transition-all"
                    aria-label="Close resume viewer"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* PDF Content */}
              <div className="flex-1 bg-[#09100c] overflow-hidden">
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
