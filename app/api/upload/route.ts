import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
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

      // Check file size (5MB limit)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        return NextResponse.json(
          { error: "File is too large. Max size is 5MB." },
          { status: 400 }
        );
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Create uploads directory path
      const uploadDir = join(process.cwd(), "public", "uploads");
      
      // Ensure the directory exists
      await mkdir(uploadDir, { recursive: true });

      // Generate unique safe filename
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const originalExtension = file.name.split(".").pop();
      const filename = `avatar-${uniqueSuffix}.${originalExtension}`;
      const filePath = join(uploadDir, filename);

      // Write file to filesystem
      await writeFile(filePath, buffer);

      return NextResponse.json({
        success: true,
        url: `/uploads/${filename}`,
      });
    } catch (err) {
      console.error("Upload Error:", err);
      return NextResponse.json(
        { error: "Failed to upload file to the server." },
        { status: 500 }
      );
    }
  })
);
