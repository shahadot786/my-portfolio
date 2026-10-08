import { redirect } from "next/navigation";

// Trackers now live in the Knowledge Hub (/articles → Trackers tab).
export default function TrackerPage() {
  redirect("/articles#trackers");
}
