export interface Guide {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  tags: string[];
  coverImage: string;
  published: boolean;
  publishedAt?: string;
  readingTime: number;
  createdAt: string;
  updatedAt: string;
}

export type GuideSummary = Omit<Guide, "content">;

export type GuideInput = Pick<Guide, "title" | "slug" | "summary" | "content" | "tags" | "coverImage" | "published">;

export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export class GuideConflictError extends Error {
  constructor(message = "A guide with this slug already exists") {
    super(message);
    this.name = "GuideConflictError";
  }
}

// Admin-side operations; swapped from the mock to the HTTP API in phase 3
export interface GuidesClient {
  listAll(): Promise<GuideSummary[]>;
  get(id: string): Promise<Guide | null>;
  create(input: GuideInput): Promise<Guide>;
  update(id: string, input: GuideInput): Promise<Guide>;
  remove(id: string): Promise<void>;
  listPublished(): Promise<GuideSummary[]>;
}
