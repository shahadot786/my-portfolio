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
    { href: "/", label: "Home", mobileLabel: "Home", icon: Home },
    { href: "/work", label: "Work", mobileLabel: "Work", icon: Briefcase },
    { href: "/projects", label: "Projects", mobileLabel: "Projects", icon: FolderOpen },
    { href: "/skills", label: "Skills", mobileLabel: "Skills", icon: Code2 },
    { href: "/certifications", label: "Certifications", mobileLabel: "Certs", icon: Award },
    { href: "/articles", label: "Articles", mobileLabel: "Articles", icon: Newspaper },
    { href: "/contact", label: "Contact", mobileLabel: "Contact", icon: Mail },
  ];

  return (
    <>
      {/* Mobile Top Header */}
      <header className="fixed top-0 left-0 right-0 z-40 lg:hidden px-4 pt-3 pb-2.5 bg-card/90 dark:bg-[#0B0E14]/90 border-b border-border/60 backdrop-blur-xl transition-colors">
        <div className="flex items-center justify-between gap-4 max-w-lg mx-auto">
          <BrandLogo size="sm" name={profile?.name} tagline={profile?.title} />
          <ThemeToggle className="w-8 h-8 rounded-lg shrink-0" />
        </div>
      </header>

      {/* Desktop Floating Pill Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-40 hidden lg:block px-4 xl:px-6 pt-4">
        <nav className="max-w-6xl mx-auto px-4 xl:px-5 py-2.5 rounded-2xl bg-card/85 dark:bg-[#0B0E14]/85 border border-border/80 shadow-md backdrop-blur-xl flex items-center justify-between gap-3 xl:gap-4 transition-colors">
          <BrandLogo size="md" name={profile?.name} tagline={profile?.title} />

          {/* Nav Links with Framer Motion Sliding Pill Indicator */}
          <div className="flex items-center gap-0.5 xl:gap-1 p-1 bg-muted/50 dark:bg-card/40 rounded-xl border border-border/50 shrink-0">
            {navItems.map((item) => {
              const isActive = item.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-2.5 xl:px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors z-10 whitespace-nowrap shrink-0 ${
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
          <div className="flex items-center gap-2 xl:gap-2.5 shrink-0">
            <ThemeToggle className="shrink-0" />
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground font-bold text-xs rounded-xl px-3.5 xl:px-4 py-2 hover:opacity-90 transition-all active:scale-95 shadow-sm shadow-primary/20 shrink-0 whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span className="whitespace-nowrap">Hire Me</span>
            </Link>
          </div>
        </nav>
      </header>

      {/* Bottom Floating Navigation Dock (Mobile & Tablet) */}
      <nav className="fixed bottom-3 inset-x-2 sm:inset-x-3 z-40 lg:hidden">
        <div className="max-w-md mx-auto bg-card/90 dark:bg-[#0B0E14]/90 border border-border/80 backdrop-blur-2xl rounded-2xl shadow-xl p-1.5 flex items-center justify-around">
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
                className={`relative flex flex-col items-center justify-center py-1.5 px-2 sm:px-2.5 rounded-xl transition-all ${
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
                  size={19}
                  className={isActive ? "text-primary scale-110 transition-transform" : "text-muted-foreground"}
                />
                <span className="text-[9px] font-mono mt-0.5 tracking-tight whitespace-nowrap">
                  {item.mobileLabel || item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}

