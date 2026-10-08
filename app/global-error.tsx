"use client";

import { useEffect } from "react";

// Replaces the root layout, so it can't rely on globals.css or the theme provider.
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1.5rem",
          background: "#0e1511",
          color: "#dde4dd",
          fontFamily: "Inter, system-ui, -apple-system, sans-serif",
          textAlign: "center",
        }}
      >
        <div
          style={{
            maxWidth: "32rem",
            width: "100%",
            padding: "2.5rem 2rem",
            borderRadius: "1rem",
            border: "1px solid #3c4a42",
            background: "#0b0e14",
          }}
        >
          <p style={{ margin: 0, fontFamily: "monospace", fontSize: "4.5rem", fontWeight: 700, color: "#4edea3", lineHeight: 1 }}>
            500
          </p>
          <h1 style={{ margin: "1.25rem 0 0.5rem", fontSize: "1.75rem" }}>Something went wrong</h1>
          <p style={{ margin: 0, fontSize: "0.875rem", color: "#9aa8a0" }}>
            A critical error occurred. Please try again or return to the home page.
          </p>
          {error.digest && (
            <p style={{ margin: "1rem 0 0", fontFamily: "monospace", fontSize: "0.75rem", color: "#9aa8a0" }}>
              digest: {error.digest}
            </p>
          )}
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", marginTop: "1.5rem" }}>
            <button
              type="button"
              onClick={reset}
              style={{ padding: "0.75rem 1.5rem", border: 0, borderRadius: "0.75rem", background: "#4edea3", color: "#00391f", fontWeight: 700, cursor: "pointer" }}
            >
              Try again
            </button>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/"
              style={{ padding: "0.75rem 1.5rem", borderRadius: "0.75rem", border: "1px solid #3c4a42", color: "#dde4dd", textDecoration: "none", fontWeight: 500 }}
            >
              Back to home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
