import type { Metadata } from "next";
import { ErrorView } from "@/components/ui/ErrorView";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <ErrorView
      code="404"
      title="Page not found"
      description="The page you're looking for doesn't exist, was moved, or the link is out of date."
    />
  );
}
