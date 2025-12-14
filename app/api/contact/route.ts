import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Send email using Resend
    const data = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["shahadotrahat786@gmail.com"],
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Form Submission</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
          <table role="presentation" style="width: 100%; border-collapse: collapse;">
            <tr>
              <td align="center" style="padding: 40px 0;">
                <table role="presentation" style="width: 600px; max-width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                  
                  <!-- Header with Gradient -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #3b82f6 0%, #10b981 100%); padding: 40px 30px; text-align: center;">
                      <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
                        📬 New Contact Message
                      </h1>
                      <p style="margin: 10px 0 0; color: rgba(255, 255, 255, 0.9); font-size: 14px;">
                        Someone reached out through your portfolio
                      </p>
                    </td>
                  </tr>

                  <!-- Contact Information Card -->
                  <tr>
                    <td style="padding: 30px;">
                      <table role="presentation" style="width: 100%; border-collapse: collapse; background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); border-radius: 12px; padding: 20px;">
                        <tr>
                          <td style="padding: 10px 20px;">
                            <table role="presentation" style="width: 100%; border-collapse: collapse;">
                              <tr>
                                <td style="padding: 8px 0; border-bottom: 1px solid rgba(0, 0, 0, 0.1);">
                                  <span style="display: inline-block; font-weight: 600; color: #374151; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">👤 From:</span>
                                  <span style="display: block; margin-top: 4px; color: #1f2937; font-size: 16px; font-weight: 500;">${name}</span>
                                </td>
                              </tr>
                              <tr>
                                <td style="padding: 8px 0; border-bottom: 1px solid rgba(0, 0, 0, 0.1);">
                                  <span style="display: inline-block; font-weight: 600; color: #374151; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">📧 Email:</span>
                                  <a href="mailto:${email}" style="display: block; margin-top: 4px; color: #3b82f6; font-size: 16px; font-weight: 500; text-decoration: none;">${email}</a>
                                </td>
                              </tr>
                              <tr>
                                <td style="padding: 8px 0;">
                                  <span style="display: inline-block; font-weight: 600; color: #374151; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">📝 Subject:</span>
                                  <span style="display: block; margin-top: 4px; color: #1f2937; font-size: 16px; font-weight: 500;">${subject}</span>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Message Content -->
                  <tr>
                    <td style="padding: 0 30px 30px;">
                      <div style="background-color: #f9fafb; border-left: 4px solid #3b82f6; border-radius: 8px; padding: 20px;">
                        <h2 style="margin: 0 0 15px; color: #1f2937; font-size: 18px; font-weight: 600;">
                          💬 Message:
                        </h2>
                        <p style="margin: 0; color: #4b5563; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                      </div>
                    </td>
                  </tr>

                  <!-- Action Button -->
                  <tr>
                    <td style="padding: 0 30px 30px; text-align: center;">
                      <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" style="display: inline-block; background: linear-gradient(135deg, #3b82f6 0%, #10b981 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 15px; box-shadow: 0 4px 6px rgba(59, 130, 246, 0.4);">
                        Reply to ${name}
                      </a>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #f9fafb; padding: 20px 30px; border-top: 1px solid #e5e7eb;">
                      <table role="presentation" style="width: 100%; border-collapse: collapse;">
                        <tr>
                          <td style="text-align: center;">
                            <p style="margin: 0; color: #6b7280; font-size: 13px; line-height: 1.5;">
                              This email was sent from your portfolio contact form at<br>
                              <a href="https://shahadot-hossain.vercel.app" style="color: #3b82f6; text-decoration: none; font-weight: 500;">shahadot-hossain.vercel.app</a>
                            </p>
                            <p style="margin: 15px 0 0; color: #9ca3af; font-size: 12px;">
                              © ${new Date().getFullYear()} MD. Shahadot Hossain. All rights reserved.
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    return NextResponse.json(
      { success: true, message: "Email sent successfully", data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 }
    );
  }
}
