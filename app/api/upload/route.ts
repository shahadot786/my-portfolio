import { NextRequest, NextResponse } from "next/server";
import { withErrorHandling } from "@/lib/api-utils";
import { withAdmin } from "@/lib/auth-utils";

export const dynamic = "force-dynamic";

export const POST = withErrorHandling(
  withAdmin(async (req: NextRequest) => {
    try {
      const formData = await req.formData();
      const file = formData.get("file") as File | null;

      if (!file) {
        return NextResponse.json(
          { error: "No file uploaded" },
          { status: 400 }
        );
      }

      // Check file type
      const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
      if (!validTypes.includes(file.type)) {
        return NextResponse.json(
          { error: "Invalid file type. Only JPEG, PNG, WEBP, GIF, and SVG are allowed." },
          { status: 400 }
        );
      }

      // Check file size (4MB limit for serverless payloads)
      const maxSize = 4 * 1024 * 1024;
      if (file.size > maxSize) {
        return NextResponse.json(
          { error: "File is too large. Max size is 4MB for Vercel upload." },
          { status: 400 }
        );
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64Image = buffer.toString("base64");
      const mimeType = file.type || "image/png";
      const dataUrl = `data:${mimeType};base64,${base64Image}`;

      return NextResponse.json({
        success: true,
        url: dataUrl,
      });
    } catch (err) {
      console.error("Upload Error:", err);
      return NextResponse.json(
        { error: "Failed to process image upload." },
        { status: 500 }
      );
    }
  })
);
