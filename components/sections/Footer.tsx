"use client";

import Link from "next/link";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { Github, Linkedin, Twitter, Youtube, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full pt-14 pb-32 lg:pb-12 bg-card/40 dark:bg-[#09100c] border-t border-border mt-20 transition-colors">
      <div className="flex flex-col lg:flex-row justify-between items-center px-6 max-w-5xl mx-auto gap-8 text-center lg:text-left">
        <div className="flex flex-col items-center lg:items-start space-y-3">
          <BrandLogo size="md" showTagline={true} />
          <p className="text-xs font-mono text-muted-foreground">
            © {new Date().getFullYear()} MD. Shahadot Hossain. All rights reserved. Built with Next.js, TypeScript & Framer Motion.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex flex-wrap justify-center lg:justify-end items-center gap-3 text-xs font-mono text-muted-foreground">
          <a
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border/60 hover:border-primary/50 hover:text-primary bg-card/60 transition-all hover:scale-105"
            href="https://www.linkedin.com/in/shahadot786"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
          >
            <Linkedin size={14} />
            <span>LinkedIn</span>
          </a>
          <a
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border/60 hover:border-primary/50 hover:text-primary bg-card/60 transition-all hover:scale-105"
            href="https://github.com/shahadot786"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
          >
            <Github size={14} />
            <span>GitHub</span>
          </a>
          <a
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border/60 hover:border-primary/50 hover:text-primary bg-card/60 transition-all hover:scale-105"
            href="https://twitter.com/shahadot786"
            target="_blank"
            rel="noopener noreferrer"
            title="Twitter"
          >
            <Twitter size={14} />
            <span>Twitter</span>
          </a>
          <a
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border/60 hover:border-primary/50 hover:text-primary bg-card/60 transition-all hover:scale-105"
            href="https://www.youtube.com/@shahadot786"
            target="_blank"
            rel="noopener noreferrer"
            title="YouTube"
          >
            <Youtube size={14} />
            <span>YouTube</span>
          </a>
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
