/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#0e1511",
        foreground: "#dde4dd",
        surface: {
          DEFAULT: "#0e1511",
          charcoal: "#0B0E14",
          container: "#1a211d",
          high: "#242c27",
          highest: "#2f3632",
          low: "#161d19",
          lowest: "#09100c",
          bright: "#343b36",
        },
        primary: {
          DEFAULT: "#4edea3",
          fixed: "#6ffbbe",
          container: "#10b981",
          foreground: "#003824",
        },
        secondary: {
          DEFAULT: "#4cd7f6",
          container: "#03b5d3",
          foreground: "#003640",
        },
        tertiary: {
          DEFAULT: "#bec6e0",
          container: "#9ba2bb",
        },
        "on-surface": "#dde4dd",
        "on-surface-variant": "#bbcabf",
        "text-muted": "#94A3B8",
        "outline-variant": "#3c4a42",
        "border-glass": "rgba(255, 255, 255, 0.08)",
        muted: {
          DEFAULT: "#1a211d",
          foreground: "#94A3B8",
        },
        accent: {
          DEFAULT: "#4edea3",
          foreground: "#0e1511",
        },
        card: {
          DEFAULT: "#0B0E14",
          foreground: "#dde4dd",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
        xl: "0.75rem",
        "2xl": "1rem",
      },
    },
  },
  plugins: [],
};