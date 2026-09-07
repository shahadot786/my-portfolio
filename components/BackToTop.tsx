"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={scrollToTop}
          className="fixed bottom-20 sm:bottom-24 lg:bottom-6 left-4 sm:left-6 z-40 w-10 h-10 bg-card/80 hover:bg-card border border-border hover:border-primary/50 text-foreground rounded-xl shadow-lg backdrop-blur-xl flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Scroll back to top"
        >
          <ArrowUp size={18} className="text-primary" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
