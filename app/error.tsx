"use client";

import { useEffect } from "react";
import { ErrorView } from "@/components/ui/ErrorView";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorView
      code="500"
      title="Something went wrong"
      description="An unexpected error occurred while loading this page. You can try again or head back home."
      detail={error.digest ? `digest: ${error.digest}` : undefined}
      onRetry={reset}
    />
  );
}
