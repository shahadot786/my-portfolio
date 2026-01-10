"use client";

import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../providers/theme-provider";

import { MobileBottomNav } from "@/components/mobile-bottom-nav";

export function Navigation() {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border py-2"
          : "bg-transparent py-4"
          }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl md:text-2xl font-bold"
            >
              <span className="gradient-text tracking-tighter">Shahadot.dev</span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => scrollToSection(item.href)}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:text-primary hover:bg-primary/5 text-foreground/70"
                >
                  {item.name}
                </motion.button>
              ))}

              {/* Theme Toggle */}
              <motion.button
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.1 }}
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-muted transition-colors ml-2"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun size={20} className="text-primary" />
                ) : (
                  <Moon size={20} className="text-slate-700" />
                )}
              </motion.button>

              <motion.a
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (navItems.length + 1) * 0.1 }}
                href="/MD_Shahadot_Hosssain.pdf"
                download
                className="ml-4 btn-primary text-sm px-6"
              >
                Download CV
              </motion.a>
            </div>

            {/* Mobile Actions (Minimal) */}
            <div className="flex items-center space-x-2 md:hidden">
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl bg-secondary border border-border/50 text-foreground transition-all active:scale-95"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun size={18} className="text-primary font-bold" />
                ) : (
                  <Moon size={18} className="text-slate-700 font-bold" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Tab Navigation */}
      <MobileBottomNav />
    </>
  );
}
