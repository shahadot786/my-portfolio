"use client";

import Link from "next/link";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { Github, Linkedin, Twitter, Youtube, Mail, Globe, ExternalLink } from "lucide-react";
import type { Profile } from "@/lib/profile";

const SOCIAL_ICON_MAP: Record<string, React.ElementType> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  youtube: Youtube,
  mail: Mail,
  email: Mail,
  website: Globe,
};

function getSocialIcon(platform: string): React.ElementType {
  const key = platform.toLowerCase().replace(/\s+/g, '');
  return SOCIAL_ICON_MAP[key] || ExternalLink;
}

interface FooterProps {
  profile?: Profile | null;
}

export function Footer({ profile }: FooterProps) {
  const name = profile?.name || "MD. Shahadot Hossain";
  const tagline = profile?.title;

  const socialLinks = profile?.socialLinks?.length
    ? profile.socialLinks
    : [
        { platform: "LinkedIn", url: "https://www.linkedin.com/in/shahadot786", icon: "Linkedin" },
        { platform: "GitHub", url: "https://github.com/shahadot786", icon: "Github" },
        { platform: "Twitter", url: "https://twitter.com/shahadot786", icon: "Twitter" },
        { platform: "YouTube", url: "https://youtube.com/@shahadot786", icon: "Youtube" },
      ];

  return (
    <footer className="w-full pt-14 pb-32 lg:pb-12 bg-card/40 dark:bg-[#09100c] border-t border-border mt-20 transition-colors">
      <div className="flex flex-col lg:flex-row justify-between items-center px-6 max-w-5xl mx-auto gap-8 text-center lg:text-left">
        <div className="flex flex-col items-center lg:items-start space-y-3">
          <BrandLogo size="md" showTagline={true} name={name} tagline={tagline} />
          <p className="text-xs font-mono text-muted-foreground">
            © {new Date().getFullYear()} {name}. All rights reserved. Built with Next.js, TypeScript &amp; Framer Motion.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex flex-wrap justify-center lg:justify-end items-center gap-3 text-xs font-mono text-muted-foreground">
          {socialLinks.map((link) => {
            const IconComponent = getSocialIcon(link.icon || link.platform);
            return (
              <a
                key={link.platform}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border/60 hover:border-primary/50 hover:text-primary bg-card/60 transition-all hover:scale-105"
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                title={link.platform}
              >
                <IconComponent size={14} />
                <span>{link.platform}</span>
              </a>
            );
          })}
          <Link
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border/60 hover:border-primary/50 hover:text-primary bg-card/60 transition-all hover:scale-105"
            href="/contact"
          >
            <Mail size={14} />
            <span>Contact</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}

