"use client";

import { useEffect, useState } from "react";
import { TrackerDashboard } from "@/app/tracker/TrackerDashboard";

type Trackers = React.ComponentProps<typeof TrackerDashboard>["trackers"];

export function TrackersPanel() {
  const [trackers, setTrackers] = useState<Trackers | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    fetch("/api/trackers")
      .then((res) => res.json())
      .then((data) => setTrackers(data.trackers || []))
      .catch(() => setFailed(true));
  }, []);

  if (failed) {
    return <p className="glass-card p-8 text-center text-sm text-muted-foreground">Couldn&apos;t load trackers right now.</p>;
  }

  if (!trackers) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return <TrackerDashboard trackers={trackers} showHeader={false} />;
}
