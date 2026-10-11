import connectDB from "@/lib/db";
import { Guide } from "@/lib/models";
import { serializeGuide, serializeGuideSummary } from "./serialize";
import type { Guide as GuideData, GuideSummary } from "./types";

// Direct database reads for server components and the sitemap; any failure degrades to "no guides"
export async function getPublishedGuides(): Promise<GuideSummary[]> {
  try {
    await connectDB();
    const guides = await Guide.find({ published: true }).select("-content").sort({ publishedAt: -1 }).lean();
    return guides.map(serializeGuideSummary);
  } catch {
    return [];
  }
}

export async function getPublishedGuide(slug: string): Promise<GuideData | null> {
  try {
    await connectDB();
    const guide = await Guide.findOne({ slug: slug.toLowerCase(), published: true }).lean();
    return guide ? serializeGuide(guide) : null;
  } catch {
    return null;
  }
}
