"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`w-9 h-9 rounded-xl border border-border bg-card/50 flex items-center justify-center ${className}`}>
        <span className="w-4 h-4 rounded-full bg-muted animate-pulse" />
      </div>
    );
  }

  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      className={`relative w-9 h-9 rounded-xl border border-border bg-card/60 hover:bg-card/90 hover:border-primary/40 text-foreground flex items-center justify-center backdrop-blur-md transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${className}`}
    >
      <motion.div
        initial={false}
        animate={{
          scale: isDark ? 0 : 1,
          rotate: isDark ? -90 : 0,
          opacity: isDark ? 0 : 1,
        }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="absolute"
      >
        <Sun className="w-4 h-4 text-amber-500" />
      </motion.div>

      <motion.div
        initial={false}
        animate={{
          scale: isDark ? 1 : 0,
          rotate: isDark ? 0 : 90,
          opacity: isDark ? 1 : 0,
        }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="absolute"
      >
        <Moon className="w-4 h-4 text-emerald-400" />
      </motion.div>
    </motion.button>
  );
}
