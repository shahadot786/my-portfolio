/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border) / <alpha-value>)",
        input: "hsl(var(--input) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        surface: {
          DEFAULT: "hsl(var(--card) / <alpha-value>)",
          charcoal: "hsl(var(--card) / <alpha-value>)",
          container: "hsl(var(--muted) / <alpha-value>)",
          high: "hsl(var(--card-hover) / <alpha-value>)",
          highest: "hsl(var(--muted) / <alpha-value>)",
          low: "hsl(var(--background) / <alpha-value>)",
          lowest: "hsl(var(--background) / <alpha-value>)",
          bright: "hsl(var(--card-hover) / <alpha-value>)",
        },
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          fixed: "hsl(var(--primary-fixed) / <alpha-value>)",
          container: "hsl(var(--primary-container) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
          container: "hsl(var(--secondary) / <alpha-value>)",
          foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
        },
        tertiary: {
          DEFAULT: "hsl(var(--tertiary) / <alpha-value>)",
          container: "hsl(var(--tertiary) / <alpha-value>)",
        },
        "on-surface": "hsl(var(--foreground) / <alpha-value>)",
        "on-surface-variant": "hsl(var(--muted-foreground) / <alpha-value>)",
        "text-muted": "hsl(var(--muted-foreground) / <alpha-value>)",
        "outline-variant": "hsl(var(--border) / <alpha-value>)",
        "border-glass": "var(--border-glass)",
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
        },
        card: {
          DEFAULT: "hsl(var(--card) / <alpha-value>)",
          foreground: "hsl(var(--card-foreground) / <alpha-value>)",
          hover: "hsl(var(--card-hover) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
        signature: ["var(--font-signature)", "Great Vibes", "cursive"],
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