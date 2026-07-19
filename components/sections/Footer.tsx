"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full py-8 bg-[#09100c] border-t border-[#3c4a42] mt-20">
      <div className="flex flex-col md:flex-row justify-between items-center px-6 max-w-5xl mx-auto gap-6">
        <div>
          <Link
            className="text-base font-extrabold text-[#dde4dd] hover:text-[#4edea3] transition-colors tracking-tight"
            href="/"
          >
            SHAHADOT HOSSAIN
          </Link>
          <p className="text-xs font-mono text-[#94A3B8] mt-1">
            © {new Date().getFullYear()} MD. Shahadot Hossain. All rights reserved. Built for enterprise stability.
          </p>
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
          <Link className="hover:text-[#4edea3] transition-colors" href="/contact">
            Email
          </Link>
        </div>
      </div>
    </footer>
  );
}
