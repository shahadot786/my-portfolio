import { API_BASE_URL } from "@/config/api";
import { TrackerDashboard } from "./TrackerDashboard";

export const metadata = {
  title: "Learning Tracker",
  description: "Track my journey to mastering full-stack development with daily progress, goals, and milestones.",
};

interface TrackerSummary {
  _id: string;
  title: string;
  slug: string;
  description: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  dailyHours: number;
  status: string;
  tags: string[];
  featured: boolean;
  color: string;
  milestones: { title: string; dayNumber: number; completed: boolean }[];
}

async function getTrackers(): Promise<TrackerSummary[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/trackers`, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return data.trackers || [];
  } catch {
    return [];
  }
}

export default async function TrackerPage() {
  const trackers = await getTrackers();

  return (
    <div className="container-custom">
      <TrackerDashboard trackers={trackers} />
    </div>
  );
}
