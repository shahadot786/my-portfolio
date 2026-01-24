"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Navigation } from "@/components/sections/Navigation";
import { API_BASE_URL } from "@/config/api";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  useEffect(() => {
    if (!isAdmin && pathname) {
      // Allow slight delay to avoid double counting on rapid changes
      const timer = setTimeout(() => {
        const payload = {
          path: pathname,
          type: 'view',
          language: navigator.language || 'en-US',
          screen: `${window.screen.width}x${window.screen.height}`
        };

        fetch(`${API_BASE_URL}/analytics/track`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }).catch(err => console.error('Analytics error:', err));
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [pathname, isAdmin]);

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-24 pb-24 md:pb-16">{children}</main>
    </>
  );
}
