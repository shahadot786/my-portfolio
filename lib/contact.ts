import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendContactEmail({
  name,
  email,
  subject,
  message,
}: ContactFormData) {
  if (!name || !email || !subject || !message) {
    throw new Error("All fields are required");
  }

  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return await resend.emails.send({
    from: "Portfolio Contact <onboarding@resend.dev>",
    to: "shahadotrahat786@gmail.com",
    subject: `✉️ Portfolio Inquiry: ${subject}`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
      </head>
      <body style="margin:0;padding:20px;background-color:#f5f7fa;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
        <div style="max-width:650px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <div style="background:linear-gradient(135deg, #667eea 0%, #764ba2 100%);padding:40px 30px;text-align:center;position:relative;">
            <div style="background:rgba(255,255,255,0.1);border-radius:50%;width:80px;height:80px;margin:0 auto 20px;display:flex;align-items:center;justify-content:center;">
              <span style="font-size:36px;">💬</span>
            </div>
            <h1 style="color:#ffffff;margin:0;font-size:28px;font-weight:600;letter-spacing:-0.5px;">New Contact Inquiry</h1>
            <p style="color:rgba(255,255,255,0.9);margin:10px 0 0 0;font-size:16px;">Portfolio Contact Form Submission</p>
          </div>

          <!-- Content -->
          <div style="padding:40px 30px;">
            
            <!-- Contact Details Card -->
            <div style="background:#f8fafc;border-radius:12px;padding:24px;margin-bottom:30px;border-left:4px solid #667eea;">
              <h3 style="margin:0 0 20px 0;color:#2d3748;font-size:18px;font-weight:600;display:flex;align-items:center;">
                <span style="margin-right:8px;">👤</span> Contact Information
              </h3>
              
              <div style="display:grid;gap:16px;">
                <div style="display:flex;align-items:center;">
                  <div style="background:#667eea;color:white;border-radius:6px;padding:6px;margin-right:12px;min-width:32px;text-align:center;">
                    <span style="font-size:14px;">📧</span>
                  </div>
                  <div>
                    <p style="margin:0;color:#718096;font-size:13px;text-transform:uppercase;letter-spacing:0.5px;font-weight:500;">Email</p>
                    <p style="margin:0;color:#2d3748;font-size:16px;font-weight:500;">${email}</p>
                  </div>
                </div>
                
                <div style="display:flex;align-items:center; margin-top:10px;">
                  <div style="background:#667eea;color:white;border-radius:6px;padding:6px;margin-right:12px;min-width:32px;text-align:center;">
                    <span style="font-size:14px;">👨</span>
                  </div>
                  <div>
                    <p style="margin:0;color:#718096;font-size:13px;text-transform:uppercase;letter-spacing:0.5px;font-weight:500;">Name</p>
                    <p style="margin:0;color:#2d3748;font-size:16px;font-weight:500;">${name}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Subject -->
            <div style="margin-bottom:30px;">
              <h3 style="margin:0 0 12px 0;color:#2d3748;font-size:18px;font-weight:600;display:flex;align-items:center;">
                <span style="margin-right:8px;">📝</span> Subject
              </h3>
              <div style="background:#edf2f7;border-radius:8px;padding:16px;border-left:3px solid #4299e1;">
                <p style="margin:0;color:#2d3748;font-size:16px;font-weight:500;">${subject}</p>
              </div>
            </div>

            <!-- Message -->
            <div style="margin-bottom:30px;">
              <h3 style="margin:0 0 12px 0;color:#2d3748;font-size:18px;font-weight:600;display:flex;align-items:center;">
                <span style="margin-right:8px;">💬</span> Message
              </h3>
              <div style="background:#f7fafc;border-radius:8px;padding:20px;border:1px solid #e2e8f0;">
                <p style="margin:0;color:#4a5568;font-size:15px;line-height:1.6;white-space:pre-wrap;">${message}</p>
              </div>
            </div>

            <!-- Quick Action Button -->
            <div style="text-align:center;margin:30px 0;">
              <a href="mailto:${email}?subject=Re: ${subject}" style="display:inline-block;background:linear-gradient(135deg, #667eea 0%, #764ba2 100%);color:#ffffff;text-decoration:none;padding:14px 28px;border-radius:8px;font-weight:600;font-size:16px;transition:transform 0.2s;">
                📧 Reply to ${name}
              </a>
            </div>
          </div>

          <!-- Footer -->
          <div style="background:#f8fafc;padding:30px;text-align:center;border-top:1px solid #e2e8f0;">
            <div style="margin-bottom:16px;">
              <span style="display:inline-block;background:#e2e8f0;border-radius:20px;padding:6px 12px;margin:0 4px;font-size:12px;color:#718096;font-weight:500;">
                🗓️ ${currentDate}
              </span>
              <span style="display:inline-block;background:#e2e8f0;border-radius:20px;padding:6px 12px;margin:0 4px;font-size:12px;color:#718096;font-weight:500;">
                🌐 Portfolio Contact Form
              </span>
            </div>
            <p style="margin:0;color:#a0aec0;font-size:13px;line-height:1.4;">
              This email was automatically generated from your portfolio website contact form.<br>
              <strong style="color:#718096;">Please respond promptly to maintain professional relationships.</strong>
            </p>
          </div>
        </div>

        <!-- Mobile Responsive Styles -->
        <style>
          @media only screen and (max-width: 600px) {
            body {
              padding: 10px !important;
            }
            .container {
              padding: 20px !important;
            }
            .header {
              padding: 30px 20px !important;
            }
            .content {
              padding: 30px 20px !important;
            }
            .footer {
              padding: 20px !important;
            }
          }
        </style>
      </body>
      </html>
    `,
  });
}
