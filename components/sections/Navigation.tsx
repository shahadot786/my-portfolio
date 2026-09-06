"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Home, 
  Briefcase, 
  FolderOpen, 
  Code2, 
  Award, 
  Newspaper, 
  Mail,
  Sparkles
} from "lucide-react";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import type { Profile } from "@/lib/profile";

export function Navigation({ profile }: { profile?: Profile | null }) {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/work", label: "Work", icon: Briefcase },
    { href: "/projects", label: "Projects", icon: FolderOpen },
    { href: "/skills", label: "Skills", icon: Code2 },
    { href: "/certifications", label: "Certifications", icon: Award },
    { href: "/articles", label: "Articles", icon: Newspaper },
    { href: "/contact", label: "Contact", icon: Mail },
  ];

  return (
    <>
      {/* Desktop Floating Pill Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-40 hidden lg:block px-6 pt-4">
        <nav className="max-w-5xl mx-auto px-5 py-2.5 rounded-2xl bg-card/80 dark:bg-[#0B0E14]/80 border border-border/80 shadow-md backdrop-blur-xl flex items-center justify-between transition-colors">
          <BrandLogo size="md" name={profile?.name} tagline={profile?.title} />

          {/* Nav Links with Framer Motion Sliding Pill Indicator */}
          <div className="flex items-center gap-1 p-1 bg-muted/50 dark:bg-card/40 rounded-xl border border-border/50">
            {navItems.map((item) => {
              const isActive = item.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors z-10 ${
                    isActive
                      ? "text-primary font-bold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-desktop-nav-indicator"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      className="absolute inset-0 bg-background/90 dark:bg-[#161d19] border border-border rounded-lg shadow-sm -z-10"
                    />
                  )}
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Action CTAs: Theme Toggle & Contact Button */}
          <div className="flex items-center gap-2.5">
            <ThemeToggle />
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground font-bold text-xs rounded-xl px-4 py-2 hover:opacity-90 transition-all active:scale-95 shadow-sm shadow-primary/20"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Hire Me</span>
            </Link>
          </div>
        </nav>
      </header>

      {/* Bottom Floating Navigation Dock (Mobile & Tablet) */}
      <nav className="fixed bottom-3 inset-x-3 z-40 lg:hidden">
        <div className="max-w-md mx-auto bg-card/90 dark:bg-[#0B0E14]/90 border border-border/80 backdrop-blur-2xl rounded-2xl shadow-xl p-1.5 flex items-center justify-between">
          <div className="flex items-center justify-around flex-1">
            {navItems.map((item) => {
              const isActive = item.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-label={item.label}
                  title={item.label}
                  className={`relative flex flex-col items-center justify-center p-2 rounded-xl transition-all ${
                    isActive ? "text-primary font-semibold" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-mobile-nav-indicator"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      className="absolute inset-0 bg-primary/10 rounded-xl -z-10"
                    />
                  )}
                  <item.icon
                    size={20}
                    className={isActive ? "text-primary scale-110 transition-transform" : "text-muted-foreground"}
                  />
                  <span className="text-[9px] font-mono mt-0.5 tracking-tight">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Theme Toggle in Mobile Dock */}
          <div className="pl-1.5 border-l border-border/60">
            <ThemeToggle className="w-8 h-8 rounded-lg" />
          </div>
        </div>
      </nav>
    </>
  );
}
