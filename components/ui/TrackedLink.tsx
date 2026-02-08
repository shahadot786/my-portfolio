"use client";

import { trackEvent } from "@/lib/analytics";

interface TrackedLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  path: string;
}

export function TrackedLink({ path, href, children, ...props }: TrackedLinkProps) {
  return (
    <a
      {...props}
      href={href}
      onClick={() => {
        if (href) trackEvent('click', path, href);
      }}
    >
      {children}
    </a>
  );
}
