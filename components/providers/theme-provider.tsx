'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark';
type ThemeColor = 'blue' | 'purple' | 'green' | 'red' | 'yellow' | 'pink' | 'indigo' | 'teal' | 'orange' | 'cyan';

interface ThemeContextType {
  theme: Theme;
  themeColor: ThemeColor;
  setTheme: (theme: Theme) => void;
  setThemeColor: (color: ThemeColor) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const themeColors = {
  blue: {
    primary: 'rgb(59 130 246)',
    primaryHover: 'rgb(37 99 235)',
    accent: 'rgb(147 197 253)',
    gradient: 'from-blue-500 to-blue-600'
  },
  purple: {
    primary: 'rgb(147 51 234)',
    primaryHover: 'rgb(126 34 206)',
    accent: 'rgb(196 181 253)',
    gradient: 'from-purple-500 to-purple-600'
  },
  green: {
    primary: 'rgb(34 197 94)',
    primaryHover: 'rgb(22 163 74)',
    accent: 'rgb(134 239 172)',
    gradient: 'from-green-500 to-green-600'
  },
  red: {
    primary: 'rgb(239 68 68)',
    primaryHover: 'rgb(220 38 38)',
    accent: 'rgb(252 165 165)',
    gradient: 'from-red-500 to-red-600'
  },
  yellow: {
    primary: 'rgb(234 179 8)',
    primaryHover: 'rgb(202 138 4)',
    accent: 'rgb(254 240 138)',
    gradient: 'from-yellow-500 to-yellow-600'
  },
  pink: {
    primary: 'rgb(236 72 153)',
    primaryHover: 'rgb(219 39 119)',
    accent: 'rgb(251 182 206)',
    gradient: 'from-pink-500 to-pink-600'
  },
  indigo: {
    primary: 'rgb(99 102 241)',
    primaryHover: 'rgb(79 70 229)',
    accent: 'rgb(165 180 252)',
    gradient: 'from-indigo-500 to-indigo-600'
  },
  teal: {
    primary: 'rgb(20 184 166)',
    primaryHover: 'rgb(13 148 136)',
    accent: 'rgb(153 246 228)',
    gradient: 'from-teal-500 to-teal-600'
  },
  orange: {
    primary: 'rgb(249 115 22)',
    primaryHover: 'rgb(234 88 12)',
    accent: 'rgb(253 186 116)',
    gradient: 'from-orange-500 to-orange-600'
  },
  cyan: {
    primary: 'rgb(6 182 212)',
    primaryHover: 'rgb(8 145 178)',
    accent: 'rgb(165 243 252)',
    gradient: 'from-cyan-500 to-cyan-600'
  }
};
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [themeColor, setThemeColor] = useState<ThemeColor>('blue');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    const savedThemeColor = localStorage.getItem('themeColor') as ThemeColor;
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      setTheme('dark');
    }
    if (savedThemeColor && themeColors[savedThemeColor]) {
      setThemeColor(savedThemeColor);
    } else {
      setThemeColor('blue');
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('theme', theme);
      localStorage.setItem('themeColor', themeColor);
      document.documentElement.className = '';
      document.documentElement.classList.add(`theme-${theme}`);
      
      document.documentElement.classList.add('dark');
      
      // Apply theme color CSS variables
      const colors = themeColors[themeColor];
      document.documentElement.style.setProperty('--color-primary', colors.primary);
      document.documentElement.style.setProperty('--color-primary-hover', colors.primaryHover);
      document.documentElement.style.setProperty('--color-accent', colors.accent);
    }
  }, [theme, themeColor, mounted]);

  const toggleTheme = () => {
    // Only dark theme available
    setTheme('dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, themeColor, setTheme, setThemeColor, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export { themeColors };
export type { ThemeColor };

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}