"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Briefcase, FolderOpen, Code2, Newspaper, Mail } from "lucide-react";
import { BrandLogo } from "@/components/ui/BrandLogo";

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
      {/* Desktop Top Navigation Bar (Stitch 263256000900331205) */}
      <nav className="fixed top-0 w-full z-50 bg-[#0e1511]/90 backdrop-blur-md border-b border-[#3c4a42] hidden md:block">
        <div className="flex justify-between items-center px-8 py-3.5 max-w-5xl mx-auto">
          <BrandLogo size="md" />
          
          <div className="flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-[#4edea3] ${
                    isActive ? "text-[#4edea3] font-semibold" : "text-[#bbcabf]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-[#10b981] text-[#0e1511] font-bold text-xs rounded-lg px-4 py-2 hover:bg-[#4edea3] transition-colors active:scale-95 shadow-[0_0_15px_rgba(78,222,163,0.2)]"
          >
            Hire Me
          </Link>
        </div>
      </nav>

      {/* Mobile Bottom Tab Navigation Bar (Retained & Styled with Stitch Emerald Glass) */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#0e1511]/95 border-t border-[#3c4a42] backdrop-blur-md pb-safe">
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
                  isActive ? "text-[#4edea3] font-semibold" : "text-[#bbcabf] hover:text-[#dde4dd]"
                }`}
              >
                <item.icon
                  size={19}
                  className={isActive ? "text-[#4edea3] scale-110 transition-transform" : "text-[#bbcabf]"}
                />
                <span className="text-[10px] font-mono tracking-wider uppercase">
                  {item.label}
                </span>
                {isActive && (
                  <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-[#4edea3] shadow-[0_0_8px_rgba(78,222,163,0.8)]" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
