"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";
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
    primary: "222.2 47.4% 11.2%",
    primaryHover: "222.2 47.4% 11.2%",
    accent: "215.4 16.3% 46.9%",
    gradient: "from-gray-900 to-gray-800",
  },
  gray: {
    primary: "215.4 16.3% 46.9%",
    primaryHover: "215.4 16.3% 36.9%",
    accent: "215.4 16.3% 56.9%",
    gradient: "from-gray-500 to-gray-600",
  },
  slate: {
    primary: "215.4 25% 27%",
    primaryHover: "215.4 25% 17%",
    accent: "215.4 25% 37%",
    gradient: "from-slate-600 to-slate-700",
  },
  navy: {
    primary: "224.3 76.3% 33.1%",
    primaryHover: "224.3 76.3% 23.1%",
    accent: "213.1 93.9% 67.8%",
    gradient: "from-blue-900 to-blue-800",
  },
  blue: {
    primary: "221.2 83.2% 53.3%",
    primaryHover: "221.2 83.2% 43.3%",
    accent: "213.1 91.1% 72.4%",
    gradient: "from-blue-500 to-blue-600",
  },
  cyan: {
    primary: "188.7 94.5% 42.7%",
    primaryHover: "188.7 94.5% 32.7%",
    accent: "187.9 92.4% 81.6%",
    gradient: "from-cyan-500 to-cyan-600",
  },
  teal: {
    primary: "173.4 80.4% 40%",
    primaryHover: "173.4 80.4% 30%",
    accent: "170.6 76.9% 78.4%",
    gradient: "from-teal-500 to-teal-600",
  },
  green: {
    primary: "161 66% 39%", // Soft Green (#10b981)
    primaryHover: "161 66% 29%",
    accent: "158.1 64.4% 71.6%",
    gradient: "from-emerald-500 to-teal-500",
  },
  olive: {
    primary: "84.4 81.1% 43.9%",
    primaryHover: "84.4 81.1% 33.9%",
    accent: "82.7 77.9% 72.5%",
    gradient: "from-lime-600 to-lime-700",
  },
  red: {
    primary: "0 72.2% 50.6%",
    primaryHover: "0 72.2% 40.6%",
    accent: "0 84.1% 81.8%",
    gradient: "from-red-500 to-red-600",
  },
  maroon: {
    primary: "0 71.1% 25.1%",
    primaryHover: "0 71.1% 15.1%",
    accent: "0 84.1% 61.8%",
    gradient: "from-red-900 to-red-800",
  },
  orange: {
    primary: "24.6 95% 53.1%",
    primaryHover: "24.6 95% 43.1%",
    accent: "32.1 94.6% 72.4%",
    gradient: "from-orange-500 to-orange-600",
  },
  amber: {
    primary: "37.7 92.1% 50.2%",
    primaryHover: "37.7 92.1% 40.2%",
    accent: "47.9 91.8% 76.5%",
    gradient: "from-amber-500 to-amber-600",
  },
  yellow: {
    primary: "45.4 93.3% 47.5%",
    primaryHover: "45.4 93.3% 37.5%",
    accent: "54.4 91.8% 76.9%",
    gradient: "from-yellow-500 to-yellow-600",
  },
  gold: {
    primary: "40.5 95.7% 40.4%",
    primaryHover: "40.5 95.7% 30.4%",
    accent: "50.4 92.5% 63.9%",
    gradient: "from-yellow-600 to-yellow-700",
  },
  purple: {
    primary: "271.5 81.3% 55.9%",
    primaryHover: "271.5 81.3% 45.9%",
    accent: "258 89.5% 78.4%",
    gradient: "from-purple-500 to-purple-600",
  },
  indigo: {
    primary: "238.7 82.8% 66.7%",
    primaryHover: "238.7 82.8% 56.7%",
    accent: "232.7 87% 73.9%",
    gradient: "from-indigo-500 to-indigo-600",
  },
  pink: {
    primary: "330.4 81.2% 60.4%",
    primaryHover: "330.4 81.2% 50.4%",
    accent: "336.5 78% 77.8%",
    gradient: "from-pink-500 to-pink-600",
  },
  silver: {
    primary: "217.5 19.1% 61.2%",
    primaryHover: "217.5 19.1% 51.2%",
    accent: "214.3 31.8% 91.4%",
    gradient: "from-gray-400 to-gray-500",
  },
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [themeColor, setThemeColor] = useState<ThemeColor>("green");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme;
    const savedThemeColor = localStorage.getItem("themeColor") as ThemeColor;
    if (savedTheme) {
      setTheme(savedTheme);
    }
    if (savedThemeColor && themeColors[savedThemeColor]) {
      setThemeColor(savedThemeColor);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("theme", theme);
      localStorage.setItem("themeColor", themeColor);

      const root = document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(theme);

      const colors = themeColors[themeColor];
      root.style.setProperty("--primary", colors.primary);
      root.style.setProperty("--ring", colors.primary);
    }
  }, [theme, themeColor, mounted]);

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
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
