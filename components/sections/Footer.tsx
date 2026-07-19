"use client";

import Link from "next/link";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { LiveViewCounter } from "@/components/ui/LiveViewCounter";

export function Footer() {
  return (
    <footer className="w-full pt-10 pb-32 sm:pb-10 bg-[#09100c] border-t border-[#3c4a42] mt-20">
      <div className="flex flex-col md:flex-row justify-between items-center px-6 max-w-5xl mx-auto gap-6">
        <div className="space-y-3">
          <BrandLogo size="md" showTagline={true} />
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-xs font-mono text-[#94A3B8]">
              © {new Date().getFullYear()} MD. Shahadot Hossain. All rights reserved.
            </p>
            <LiveViewCounter variant="footer" />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-5 text-xs font-mono text-[#94A3B8]">
          <a
            className="hover:text-[#4edea3] transition-colors"
            href="https://www.linkedin.com/in/shahadot786"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            className="hover:text-[#4edea3] transition-colors"
            href="https://github.com/shahadot786"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            className="hover:text-[#4edea3] transition-colors"
            href="https://twitter.com/shahadot786"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
          <a
            className="hover:text-[#4edea3] transition-colors"
            href="https://www.youtube.com/@shahadot786"
            target="_blank"
            rel="noopener noreferrer"
          >
            YouTube
          </a>
          <Link className="hover:text-[#4edea3] transition-colors" href="/certifications">
            Certifications
          </Link>
          <Link className="hover:text-[#4edea3] transition-colors" href="/contact">
            Email
          </Link>
        </div>
      </div>
    </footer>
  );
}
