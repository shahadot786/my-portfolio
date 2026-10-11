import type { Guide, GuideSummary } from "./types";

interface GuideDoc {
  _id: { toString(): string };
  title: string;
  slug: string;
  summary?: string;
  content?: string;
  tags?: string[];
  coverImage?: string;
  published?: boolean;
  publishedAt?: Date;
  readingTime?: number;
  createdAt: Date;
  updatedAt: Date;
}

export function serializeGuide(doc: GuideDoc): Guide {
  return {
    _id: doc._id.toString(),
    title: doc.title,
    slug: doc.slug,
    summary: doc.summary ?? "",
    content: doc.content ?? "",
    tags: doc.tags ?? [],
    coverImage: doc.coverImage ?? "",
    published: !!doc.published,
    publishedAt: doc.publishedAt?.toISOString(),
    readingTime: doc.readingTime ?? 1,
    createdAt: doc.createdAt.toISOString(),
    updatedAt: doc.updatedAt.toISOString(),
  };
}

export function serializeGuideSummary(doc: GuideDoc): GuideSummary {
  const guide = serializeGuide(doc);
  return {
    _id: guide._id,
    title: guide.title,
    slug: guide.slug,
    summary: guide.summary,
    tags: guide.tags,
    coverImage: guide.coverImage,
    published: guide.published,
    publishedAt: guide.publishedAt,
    readingTime: guide.readingTime,
    createdAt: guide.createdAt,
    updatedAt: guide.updatedAt,
  };
}
