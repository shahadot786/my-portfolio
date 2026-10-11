import GithubSlugger from "github-slugger";

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

const plainHeadingText = (raw: string) =>
  raw
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[`*_~]/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+#+\s*$/, "")
    .trim();

// Ids must match rehype-slug (same slugger, same duplicate handling), and fenced code is skipped.
export function extractToc(markdown: string): TocItem[] {
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];
  let fence: string | null = null;

  for (const line of markdown.replace(/\r\n/g, "\n").split("\n")) {
    const fenceMatch = line.match(/^\s{0,3}(`{3,}|~{3,})/);
    if (fenceMatch) {
      if (!fence) fence = fenceMatch[1][0];
      else if (fenceMatch[1][0] === fence) fence = null;
      continue;
    }
    if (fence) continue;

    const heading = line.match(/^\s{0,3}(#{1,6})\s+(.+?)\s*$/);
    if (!heading) continue;

    const text = plainHeadingText(heading[2]);
    if (!text) continue;
    const id = slugger.slug(text);
    const level = heading[1].length;
    if (level === 2 || level === 3) items.push({ id, text, level });
  }

  return items;
}

export function estimateReadingTime(markdown: string): number {
  const words = markdown.replace(/```[\s\S]*?```/g, " ").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
