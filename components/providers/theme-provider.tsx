"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark";
type ThemeColor =
  | "black"
  | "gray"
  | "slate"
  | "navy"
  | "blue"
  | "cyan"
  | "teal"
  | "green"
  | "olive"
  | "red"
  | "maroon"
  | "orange"
  | "amber"
  | "yellow"
  | "gold"
  | "purple"
  | "indigo"
  | "pink"
  | "white"
  | "silver";

interface ThemeContextType {
  theme: Theme;
  themeColor: ThemeColor;
  setTheme: (theme: Theme) => void;
  setThemeColor: (color: ThemeColor) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const themeColors: Record<
  ThemeColor,
  { primary: string; primaryHover: string; accent: string; gradient: string }
> = {
  black: {
    primary: "rgb(17 24 39)", // gray-900
    primaryHover: "rgb(31 41 55)",
    accent: "rgb(75 85 99)",
    gradient: "from-gray-900 to-gray-800",
  },
  gray: {
    primary: "rgb(107 114 128)", // gray-500
    primaryHover: "rgb(75 85 99)",
    accent: "rgb(209 213 219)",
    gradient: "from-gray-500 to-gray-600",
  },
  slate: {
    primary: "rgb(71 85 105)", // slate-600
    primaryHover: "rgb(51 65 85)",
    accent: "rgb(148 163 184)",
    gradient: "from-slate-600 to-slate-700",
  },
  navy: {
    primary: "rgb(30 58 138)", // blue-900
    primaryHover: "rgb(23 37 84)",
    accent: "rgb(96 165 250)",
    gradient: "from-blue-900 to-blue-800",
  },
  blue: {
    primary: "rgb(59 130 246)", // blue-500
    primaryHover: "rgb(37 99 235)",
    accent: "rgb(147 197 253)",
    gradient: "from-blue-500 to-blue-600",
  },
  cyan: {
    primary: "rgb(6 182 212)", // cyan-500
    primaryHover: "rgb(8 145 178)",
    accent: "rgb(165 243 252)",
    gradient: "from-cyan-500 to-cyan-600",
  },
  teal: {
    primary: "rgb(20 184 166)", // teal-500
    primaryHover: "rgb(13 148 136)",
    accent: "rgb(153 246 228)",
    gradient: "from-teal-500 to-teal-600",
  },
  green: {
    primary: "rgb(34 197 94)", // green-500
    primaryHover: "rgb(22 163 74)",
    accent: "rgb(134 239 172)",
    gradient: "from-green-500 to-green-600",
  },
  olive: {
    primary: "rgb(101 163 13)", // lime-600
    primaryHover: "rgb(77 124 15)",
    accent: "rgb(190 242 100)",
    gradient: "from-lime-600 to-lime-700",
  },
  red: {
    primary: "rgb(239 68 68)", // red-500
    primaryHover: "rgb(220 38 38)",
    accent: "rgb(252 165 165)",
    gradient: "from-red-500 to-red-600",
  },
  maroon: {
    primary: "rgb(127 29 29)", // red-900
    primaryHover: "rgb(91 20 20)",
    accent: "rgb(248 113 113)",
    gradient: "from-red-900 to-red-800",
  },
  orange: {
    primary: "rgb(249 115 22)", // orange-500
    primaryHover: "rgb(234 88 12)",
    accent: "rgb(253 186 116)",
    gradient: "from-orange-500 to-orange-600",
  },
  amber: {
    primary: "rgb(245 158 11)", // amber-500
    primaryHover: "rgb(217 119 6)",
    accent: "rgb(253 230 138)",
    gradient: "from-amber-500 to-amber-600",
  },
  yellow: {
    primary: "rgb(234 179 8)", // yellow-500
    primaryHover: "rgb(202 138 4)",
    accent: "rgb(254 240 138)",
    gradient: "from-yellow-500 to-yellow-600",
  },
  gold: {
    primary: "rgb(202 138 4)", // yellow-600
    primaryHover: "rgb(161 98 7)",
    accent: "rgb(253 224 71)",
    gradient: "from-yellow-600 to-yellow-700",
  },
  purple: {
    primary: "rgb(147 51 234)", // purple-500
    primaryHover: "rgb(126 34 206)",
    accent: "rgb(196 181 253)",
    gradient: "from-purple-500 to-purple-600",
  },
  indigo: {
    primary: "rgb(99 102 241)", // indigo-500
    primaryHover: "rgb(79 70 229)",
    accent: "rgb(165 180 252)",
    gradient: "from-indigo-500 to-indigo-600",
  },
  pink: {
    primary: "rgb(236 72 153)", // pink-500
    primaryHover: "rgb(219 39 119)",
    accent: "rgb(251 182 206)",
    gradient: "from-pink-500 to-pink-600",
  },
  white: {
    primary: "rgb(255 255 255)",
    primaryHover: "rgb(243 244 246)",
    accent: "rgb(229 231 235)",
    gradient: "from-white to-gray-100",
  },
  silver: {
    primary: "rgb(156 163 175)", // gray-400
    primaryHover: "rgb(107 114 128)",
    accent: "rgb(209 213 219)",
    gradient: "from-gray-400 to-gray-500",
  },
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [themeColor, setThemeColor] = useState<ThemeColor>("blue");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme;
    const savedThemeColor = localStorage.getItem("themeColor") as ThemeColor;
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      setTheme("dark");
    }
    if (savedThemeColor && themeColors[savedThemeColor]) {
      setThemeColor(savedThemeColor);
    } else {
      setThemeColor("blue");
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("theme", theme);
      localStorage.setItem("themeColor", themeColor);
      document.documentElement.className = "";
      document.documentElement.classList.add(`theme-${theme}`);

      document.documentElement.classList.add("dark");

      const colors = themeColors[themeColor];
      document.documentElement.style.setProperty(
        "--color-primary",
        colors.primary
      );
      document.documentElement.style.setProperty(
        "--color-primary-hover",
        colors.primaryHover
      );
      document.documentElement.style.setProperty(
        "--color-accent",
        colors.accent
      );
    }
  }, [theme, themeColor, mounted]);

  const toggleTheme = () => {
    setTheme("dark"); // only dark available
  };

  return (
    <ThemeContext.Provider
      value={{ theme, themeColor, setTheme, setThemeColor, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export { themeColors };
export type { ThemeColor };

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
