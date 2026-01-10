"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Check, Settings2 } from "lucide-react";
import {
  useTheme,
  themeColors,
  type ThemeColor,
} from "./providers/theme-provider";

export function ThemeSelector() {
  const { themeColor, setThemeColor, theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const colorOptions: {
    name: string;
    value: ThemeColor;
    description: string;
  }[] = [
      { name: "Emerald Green", value: "green", description: "Default Professional" },
      { name: "Ocean Blue", value: "blue", description: "Deep & Dependable" },
      { name: "Cerulean Cyan", value: "cyan", description: "Bright & Techy" },
      { name: "Royal Purple", value: "purple", description: "Creative & Bold" },
      { name: "Deep Teal", value: "teal", description: "Modern Minimal" },
      { name: "Sunset Orange", value: "orange", description: "Vibrant Energy" },
      { name: "Steel Silver", value: "silver", description: "Sleek Industrial" },
    ];

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 sm:p-2.5 rounded-xl bg-secondary hover:bg-muted border border-border transition-all flex items-center gap-2 group"
      >
        <div className="relative">
          <Palette size={18} className="text-primary group-hover:rotate-12 transition-transform" />
          <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-primary animate-pulse" />
        </div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40 cursor-default"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute top-full right-0 mt-3 w-72 bg-background/95 backdrop-blur-xl rounded-2xl border border-border shadow-2xl z-50 overflow-hidden"
            >
              <div className="p-5 border-b border-border bg-secondary/30">
                <div className="flex items-center gap-2 mb-1">
                  <Settings2 size={14} className="text-primary" />
                  <h3 className="text-xs font-black uppercase tracking-widest text-foreground">
                    Interface Customization
                  </h3>
                </div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">
                  Primary Accent Configuration
                </p>
              </div>

              <div className="p-3 space-y-1.5 max-h-[20rem] overflow-y-auto custom-scrollbar">
                {colorOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setThemeColor(option.value);
                      setIsOpen(false);
                    }}
                    className={`w-full p-3 rounded-xl border transition-all duration-200 group flex items-center gap-4 ${themeColor === option.value
                      ? "bg-primary/10 border-primary/30"
                      : "bg-transparent border-transparent hover:bg-secondary/50"
                      }`}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white shrink-0 shadow-lg relative overflow-hidden"
                      style={{ backgroundColor: `hsl(${themeColors[option.value].primary})` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                      {themeColor === option.value && <Check size={16} className="relative z-10" />}
                    </div>

                    <div className="text-left">
                      <div className={`text-sm font-black tracking-tight ${themeColor === option.value ? 'text-primary' : 'text-foreground'}`}>
                        {option.name}
                      </div>
                      <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none mt-1">
                        {option.description}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="p-4 border-t border-border bg-secondary/10">
                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                  <span>Persistent State</span>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>Active</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
