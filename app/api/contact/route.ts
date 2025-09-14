import { NextRequest, NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/contact";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    await sendContactEmail(data);
    return NextResponse.json({ message: "Email sent successfully" });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || "Failed to send email" },
      { status: 500 }
    );
  }
}
