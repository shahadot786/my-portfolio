"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Briefcase, FolderOpen, Code2, Newspaper, Mail } from "lucide-react";

export function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/work", label: "Work", icon: Briefcase },
    { href: "/projects", label: "Projects", icon: FolderOpen },
    { href: "/skills", label: "Skills", icon: Code2 },
    { href: "/posts", label: "Posts", icon: Newspaper },
    { href: "/contact", label: "Contact", icon: Mail },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:block">
        <div className="nav-pill">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link ${isActive ? "active" : ""}`}
              >
                <item.icon size={16} />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Mobile Bottom Tab Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-zinc-900/80 border-t border-zinc-800 backdrop-blur-lg pb-safe">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center gap-1 w-full h-full transition-colors ${isActive ? "text-white" : "text-zinc-500 hover:text-zinc-300"
                  }`}
              >
                <item.icon
                  size={20}
                  className={isActive ? "text-white" : "text-zinc-500"}
                />
                <span className="text-[10px] font-medium uppercase tracking-wider">
                  {item.label}
                </span>
                {isActive && (
                  <span className="absolute bottom-2 w-1 h-1 rounded-full bg-white" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
