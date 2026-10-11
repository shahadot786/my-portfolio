"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useTheme } from "@/components/providers/theme-provider";

interface MermaidDiagramProps {
  chart: string;
}

export function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const { resolvedTheme } = useTheme();
  const diagramId = `mermaid-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const hostRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    // Debounced so typing in the admin editor doesn't re-render the diagram on every keystroke
    const timer = setTimeout(async () => {
      try {
        const { default: mermaid } = await import("mermaid");
        // The admin area forces a dark container regardless of the site theme
        const dark = resolvedTheme === "dark" || !!hostRef.current?.closest(".dark");
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          theme: dark ? "dark" : "default",
          fontFamily: "var(--font-inter), Inter, system-ui, sans-serif",
        });
        const result = await mermaid.render(diagramId, chart.trim());
        if (cancelled) return;
        setSvg(result.svg);
        setError(null);
      } catch (err) {
        if (cancelled) return;
        setSvg("");
        setError(err instanceof Error ? err.message : "Invalid diagram");
        document.getElementById(`d${diagramId}`)?.remove();
      }
    }, 300);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [chart, resolvedTheme, diagramId]);

  if (error) {
    return (
      <div ref={hostRef} role="alert" className="my-4 rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-xs">
        <p className="font-semibold text-red-600 dark:text-red-400">Mermaid diagram error</p>
        <p className="mt-1 whitespace-pre-wrap font-mono text-muted-foreground">{error}</p>
      </div>
    );
  }

  if (!svg) {
    return <div ref={hostRef} className="my-4 h-24 animate-pulse rounded-xl border border-border bg-muted/50" aria-label="Loading diagram" />;
  }

  return (
    <div
      ref={hostRef}
      className="my-4 flex justify-center overflow-x-auto rounded-xl border border-border bg-card/60 p-4 [&_svg]:h-auto [&_svg]:max-w-full"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
