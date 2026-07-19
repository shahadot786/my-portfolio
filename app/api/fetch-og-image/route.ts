import { NextRequest, NextResponse } from "next/server";
import { withErrorHandling } from "@/lib/api-utils";
import { withAdmin } from "@/lib/auth-utils";

export const dynamic = "force-dynamic";

export const POST = withErrorHandling(
  withAdmin(async (req: NextRequest) => {
    const { url } = await req.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "Valid URL is required" },
        { status: 400 }
      );
    }

    try {
      const response = await fetch(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        },
        signal: AbortSignal.timeout(8000), // 8 second timeout
      });

      if (!response.ok) {
        return NextResponse.json(
          { error: `Failed to fetch page (status ${response.status})` },
          { status: 400 }
        );
      }

      const html = await response.text();

      // Extract Open Graph image (og:image / og:image:secure_url)
      const ogMatch =
        html.match(/<meta[^>]+property=["']og:image:?s?e?c?u?r?e?_?u?r?l?["'][^>]+content=["']([^"']+)["']/i) ||
        html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image:?s?e?c?u?r?e?_?u?r?l?["']/i);

      // Extract Twitter image
      const twitterMatch =
        html.match(/<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i) ||
        html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image["']/i);

      // Extract Link image_src tag
      const linkSrcMatch = html.match(/<link[^>]+rel=["']image_src["'][^>]+href=["']([^"']+)["']/i);

      let foundImage =
        (ogMatch && ogMatch[1]) ||
        (twitterMatch && twitterMatch[1]) ||
        (linkSrcMatch && linkSrcMatch[1]) ||
        "";

      // If GitHub URL and no OG image found, fallback to GitHub social preview URL pattern
      if (!foundImage && url.includes("github.com")) {
        const githubUserRepoMatch = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
        if (githubUserRepoMatch) {
          foundImage = `https://opengraph.githubassets.com/1/${githubUserRepoMatch[1]}/${githubUserRepoMatch[2]}`;
        }
      }

      // Resolve relative URL to absolute
      if (foundImage && !foundImage.startsWith("http")) {
        try {
          foundImage = new URL(foundImage, url).toString();
        } catch {
          // Keep as is if URL parsing fails
        }
      }

      if (!foundImage) {
        return NextResponse.json({
          success: false,
          message: "No preview image found on the provided web page",
        });
      }

      return NextResponse.json({
        success: true,
        image: foundImage,
      });
    } catch (err) {
      console.error("OG Image Fetch Error:", err);
      return NextResponse.json(
        { error: "Could not fetch image from the provided URL" },
        { status: 500 }
      );
    }
  })
);
