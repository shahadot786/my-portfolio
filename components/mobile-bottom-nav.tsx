"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  User,
  Briefcase,
  Cpu,
  Rocket,
  MessageSquare,
  LayoutGrid
} from "lucide-react";

const navItems = [
  { name: "Home", href: "#home", icon: Home },
  { name: "About", href: "#about", icon: User },
  { name: "Exp", href: "#experience", icon: Briefcase },
  { name: "Skills", href: "#skills", icon: Cpu },
  { name: "Projects", href: "#projects", icon: Rocket },
  { name: "Contact", href: "#contact", icon: MessageSquare },
];

export function MobileBottomNav() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -20% 0px",
      threshold: 0.3,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navItems.forEach((item) => {
      const element = document.querySelector(item.href);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] w-[90vw] md:hidden">
      <nav className="bg-background/40 backdrop-blur-xl border border-white/10 rounded-3xl p-2 shadow-2xl flex items-center justify-around overflow-hidden relative">
        {/* Active Indicator Background */}
        <AnimatePresence>
          <motion.div
            className="absolute bg-primary/20 rounded-2xl -z-10"
            layoutId="nav-bg"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            style={{
              width: `${100 / navItems.length}%`,
              left: `${(navItems.findIndex(i => i.href === `#${activeSection}`) * 100) / navItems.length}%`,
              height: "calc(100% - 16px)"
            }}
          />
        </AnimatePresence>

        {navItems.map((item) => {
          const isActive = activeSection === item.href.substring(1);
          return (
            <button
              key={item.href}
              onClick={() => scrollToSection(item.href)}
              className="flex flex-col items-center justify-center py-2 px-1 relative transition-colors duration-300 w-full"
            >
              <motion.div
                animate={{
                  scale: isActive ? 1.1 : 1,
                  y: isActive ? -2 : 0,
                  color: isActive ? "hsl(var(--primary))" : "rgba(120, 120, 120, 0.7)"
                }}
              >
                <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              </motion.div>
              <motion.span
                animate={{
                  opacity: isActive ? 1 : 0.7,
                  scale: isActive ? 0.9 : 0.8,
                  color: isActive ? "hsl(var(--primary))" : "rgba(120, 120, 120, 0.7)"
                }}
                className="text-[10px] font-bold mt-1 tracking-tight"
              >
                {item.name}
              </motion.span>

              {isActive && (
                <motion.div
                  layoutId="active-dot"
                  className="absolute bottom-0 w-1 h-1 bg-primary rounded-full"
                />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
