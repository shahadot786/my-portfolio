"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Briefcase, FolderOpen, Code2, Newspaper, Mail } from "lucide-react";

export function Navigation() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/work", label: "Work", icon: Briefcase },
    { href: "/projects", label: "Projects", icon: FolderOpen },
    { href: "/skills", label: "Skills", icon: Code2 },
    { href: "/articles", label: "Articles", icon: Newspaper },
    // { href: "/tracker", label: "Tracker", icon: Target },
    { href: "/contact", label: "Contact", icon: Mail },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:block">
        <div className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-zinc-950/80 border border-zinc-800/80 shadow-2xl backdrop-blur-xl glow-emerald">
          {navItems.map((item) => {
            const isActive = item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 text-xs font-semibold rounded-full transition-all duration-300 flex items-center gap-2 ${
                  isActive
                    ? "text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.2)]"
                    : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60"
                }`}
              >
                <item.icon size={15} className={isActive ? "text-emerald-400" : "text-zinc-500"} />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Mobile Bottom Tab Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-zinc-950/90 border-t border-zinc-800/80 backdrop-blur-xl pb-safe">
        <div className="flex items-center justify-around h-16 px-2">
          {navItems.map((item) => {
            const isActive = item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex flex-col items-center justify-center gap-1 w-full h-full transition-all ${
                  isActive ? "text-emerald-400 font-semibold" : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                <item.icon
                  size={19}
                  className={isActive ? "text-emerald-400 scale-110 transition-transform" : "text-zinc-500"}
                />
                <span className="text-[10px] tracking-wider uppercase">
                  {item.label}
                </span>
                {isActive && (
                  <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
