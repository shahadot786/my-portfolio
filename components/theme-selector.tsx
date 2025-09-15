"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Check } from "lucide-react";
import {
  useTheme,
  themeColors,
  type ThemeColor,
} from "./providers/theme-provider";

export function ThemeSelector() {
  const { themeColor, setThemeColor } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const colorOptions: {
    name: string;
    value: ThemeColor;
    description: string;
  }[] = [
    {
      name: "Midnight Black",
      value: "black",
      description: "Strong and authoritative",
    },
    {
      name: "Charcoal Gray",
      value: "gray",
      description: "Modern and balanced",
    },
    {
      name: "Slate Blue",
      value: "slate",
      description: "Calm and professional",
    },
    {
      name: "Royal Navy",
      value: "navy",
      description: "Trustworthy and stable",
    },
    {
      name: "Ocean Blue",
      value: "blue",
      description: "Classic and dependable",
    },
    {
      name: "Cerulean Cyan",
      value: "cyan",
      description: "Fresh and futuristic",
    },
    { name: "Deep Teal", value: "teal", description: "Modern and refreshing" },
    {
      name: "Emerald Green",
      value: "green",
      description: "Natural and successful",
    },
    { name: "Olive Drab", value: "olive", description: "Grounded and earthy" },
    { name: "Crimson Red", value: "red", description: "Energetic and bold" },
    {
      name: "Maroon Wine",
      value: "maroon",
      description: "Sophisticated and strong",
    },
    {
      name: "Sunset Orange",
      value: "orange",
      description: "Vibrant and creative",
    },
    {
      name: "Burnt Amber",
      value: "amber",
      description: "Warm and professional",
    },
    {
      name: "Golden Yellow",
      value: "yellow",
      description: "Bright and optimistic",
    },
    {
      name: "Champagne Gold",
      value: "gold",
      description: "Luxurious and elegant",
    },
    {
      name: "Royal Purple",
      value: "purple",
      description: "Creative and ambitious",
    },
    {
      name: "Deep Indigo",
      value: "indigo",
      description: "Elegant and mysterious",
    },
    { name: "Magenta Pink", value: "pink", description: "Playful yet bold" },
    {
      name: "Steel Silver",
      value: "silver",
      description: "Sleek and futuristic",
    },
  ];

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 sm:p-3 rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-600 transition-colors"
        style={{
          borderColor: `var(--color-primary)`,
          boxShadow: isOpen ? `0 0 0 2px var(--color-primary)` : "none",
        }}
      >
        <Palette size={16} className="text-white" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Theme Selector Panel */}
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute top-full right-0 mt-2 w-72 sm:w-80 bg-gray-800 rounded-xl border border-gray-700 shadow-2xl z-50 overflow-hidden"
            >
              <div className="p-4 border-b border-gray-700">
                <h3 className="text-base sm:text-lg font-semibold text-white mb-1">
                  Choose Theme Color
                </h3>
                <p className="text-sm text-gray-400">
                  Customize your experience
                </p>
              </div>

              <div className="p-3 sm:p-4 space-y-2 max-h-80 overflow-y-auto">
                {colorOptions.map((option) => (
                  <motion.button
                    key={option.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setThemeColor(option.value);
                      setIsOpen(false);
                    }}
                    className={`w-full p-2 sm:p-3 rounded-lg border transition-all duration-200 ${
                      themeColor === option.value
                        ? "bg-gray-700 border-gray-500"
                        : "bg-gray-900 border-gray-700 hover:bg-gray-700"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-6 h-6 rounded-full border-2 border-white/20"
                        style={{
                          backgroundColor: themeColors[option.value].primary,
                        }}
                      />
                      <div className="flex-1 text-left">
                        <div className="text-white font-medium">
                          {option.name}
                        </div>
                        <div className="text-xs text-gray-400 hidden sm:block">
                          {option.description}
                        </div>
                      </div>
                      {themeColor === option.value && (
                        <Check size={16} className="text-white" />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>

              <div className="p-3 sm:p-4 border-t border-gray-700 bg-gray-900">
                <p className="text-xs text-gray-500 text-center">
                  Theme colors are saved automatically
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
