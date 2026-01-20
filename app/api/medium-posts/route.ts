import { NextResponse } from "next/server";

export interface MediumPost {
  title: string;
  link: string;
  pubDate: string;
  creator: string;
  thumbnail: string;
  description: string;
  categories: string[];
  content: string;
  guid: string;
}

const MEDIUM_USERNAME =
  process.env.NEXT_PUBLIC_MEDIUM_USERNAME || "shrhossain786";
const MEDIUM_RSS_URL = `https://medium.com/feed/@${MEDIUM_USERNAME}`;

// Cache duration: 1 hour
const CACHE_DURATION = 60 * 60 * 1000;
let cachedPosts: MediumPost[] | null = null;
let cacheTimestamp: number = 0;

function extractThumbnail(content: string): string {
  // Try to extract the first image from the content
  const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
  if (imgMatch && imgMatch[1]) {
    return imgMatch[1];
  }

  // Try to extract from figure tag (using [\s\S] for compatibility)
  const figureMatch = content.match(
    /<figure[^>]*>[\s\S]*?<img[^>]+src="([^">]+)"/
  );
  if (figureMatch && figureMatch[1]) {
    return figureMatch[1];
  }

  // Default placeholder
  return "";
}

function extractDescription(content: string): string {
  // Remove HTML tags and get first 200 characters
  const textContent = content
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .trim();

  return textContent.length > 200
    ? textContent.substring(0, 200) + "..."
    : textContent;
}

function parseXMLToJSON(xmlString: string): MediumPost[] {
  const posts: MediumPost[] = [];

  // Extract items from the RSS feed
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;

  while ((match = itemRegex.exec(xmlString)) !== null) {
    const itemContent = match[1];

    // Extract title
    const titleMatch = itemContent.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/);
    const title = titleMatch ? titleMatch[1] : "";

    // Extract link
    const linkMatch = itemContent.match(/<link>(.*?)<\/link>/);
    const link = linkMatch ? linkMatch[1] : "";

    // Extract publication date
    const pubDateMatch = itemContent.match(/<pubDate>(.*?)<\/pubDate>/);
    const pubDate = pubDateMatch ? pubDateMatch[1] : "";

    // Extract creator
    const creatorMatch = itemContent.match(
      /<dc:creator><!\[CDATA\[(.*?)\]\]><\/dc:creator>/
    );
    const creator = creatorMatch ? creatorMatch[1] : "";

    // Extract content:encoded
    const contentMatch = itemContent.match(
      /<content:encoded><!\[CDATA\[([\s\S]*?)\]\]><\/content:encoded>/
    );
    const content = contentMatch ? contentMatch[1] : "";

    // Extract categories
    const categoryRegex = /<category><!\[CDATA\[(.*?)\]\]><\/category>/g;
    const categories: string[] = [];
    let categoryMatch;
    while ((categoryMatch = categoryRegex.exec(itemContent)) !== null) {
      categories.push(categoryMatch[1]);
    }

    // Extract guid
    const guidMatch = itemContent.match(/<guid[^>]*>(.*?)<\/guid>/);
    const guid = guidMatch ? guidMatch[1] : "";

    const thumbnail = extractThumbnail(content);
    const description = extractDescription(content);

    posts.push({
      title,
      link,
      pubDate,
      creator,
      thumbnail,
      description,
      categories,
      content,
      guid,
    });
  }

  return posts;
}

export async function GET() {
  try {
    // Check cache
    const now = Date.now();
    if (cachedPosts && now - cacheTimestamp < CACHE_DURATION) {
      return NextResponse.json({
        posts: cachedPosts,
        cached: true,
        lastUpdated: new Date(cacheTimestamp).toISOString(),
      });
    }

    // Fetch RSS feed
    const response = await fetch(MEDIUM_RSS_URL, {
      headers: {
        Accept: "application/rss+xml, application/xml, text/xml",
        "User-Agent": "Mozilla/5.0 (compatible; Portfolio/1.0)",
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Medium feed: ${response.status}`);
    }

    const xmlText = await response.text();

    // Parse XML to JSON
    const posts = parseXMLToJSON(xmlText);

    // Update cache
    cachedPosts = posts;
    cacheTimestamp = now;

    return NextResponse.json({
      posts,
      cached: false,
      lastUpdated: new Date(now).toISOString(),
    });
  } catch (error) {
    console.error("Error fetching Medium posts:", error);

    // Return cached data if available, even if stale
    if (cachedPosts) {
      return NextResponse.json({
        posts: cachedPosts,
        cached: true,
        stale: true,
        lastUpdated: new Date(cacheTimestamp).toISOString(),
        error: "Using cached data due to fetch error",
      });
    }

    return NextResponse.json(
      {
        error: "Failed to fetch Medium posts",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
