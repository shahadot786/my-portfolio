"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Navigation } from "@/components/sections/Navigation";
import { Footer } from "@/components/sections/Footer";
import { BackToTop } from "@/components/BackToTop";
import { PortfolioAssistant } from "@/components/ai/PortfolioAssistant";
import { API_BASE_URL } from "@/config/api";
import type { Profile } from "@/lib/profile";

interface ClientLayoutProps {
  children: React.ReactNode;
  profile?: Profile | null;
}

export function ClientLayout({ children, profile }: ClientLayoutProps) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  useEffect(() => {
    if (!isAdmin && pathname) {
      // Allow slight delay to avoid double counting on rapid changes
      const timer = setTimeout(() => {
        const payload = {
          path: pathname,
          type: 'view',
          language: typeof navigator !== 'undefined' ? (navigator.language || 'en-US') : 'en-US',
          screen: typeof window !== 'undefined' ? `${window.screen.width}x${window.screen.height}` : 'unknown'
        };

        fetch(`${API_BASE_URL}/analytics`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }).catch(err => console.error('Analytics error:', err));
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [pathname, isAdmin]);

  const isImanerBagan = pathname?.startsWith("/imaner-bagan");
  const hideNav = isAdmin || isImanerBagan;

  const showAI = profile?.isAiAssistantEnabled !== false;
  const starterPrompts = profile?.aiStarterPrompts?.length
    ? profile.aiStarterPrompts
    : undefined;
  const welcomeMessage = profile?.aiWelcomeMessage || undefined;

  if (hideNav) {
    return <>{children}</>;
  }

  return (
    <>
      <Navigation profile={profile} />
      <main className="min-h-screen pt-20 lg:pt-24 pb-24 lg:pb-16">{children}</main>
      <Footer profile={profile} />
      <BackToTop />
      {showAI && (
        <PortfolioAssistant
          starterPrompts={starterPrompts}
          welcomeMessage={welcomeMessage}
        />
      )}
    </>
  );
}

