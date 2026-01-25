import { Resend } from 'resend';
import { config } from '../config/index.js';

const resend = new Resend(config.resendApiKey);

interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}

export const sendEmail = async (options: EmailOptions): Promise<boolean> => {
  try {
    if (!config.resendApiKey) {
      console.warn('Resend API key not configured, skipping email');
      return false;
    }

    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: Array.isArray(options.to) ? options.to : [options.to],
      subject: options.subject,
      html: options.html,
      replyTo: options.replyTo,
    });

    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

export const sendContactNotification = async (data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<boolean> => {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f3f4f6;">
      <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
          <td align="center" style="padding: 40px 0;">
            <table role="presentation" style="width: 600px; max-width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              <tr>
                <td style="background: linear-gradient(135deg, #3b82f6 0%, #10b981 100%); padding: 40px 30px; text-align: center;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">📬 New Contact Message</h1>
                  <p style="margin: 10px 0 0; color: rgba(255, 255, 255, 0.9); font-size: 14px;">Someone reached out through your portfolio</p>
                </td>
              </tr>
              <tr>
                <td style="padding: 30px;">
                  <table role="presentation" style="width: 100%; border-collapse: collapse; background: #f9fafb; border-radius: 12px; padding: 20px;">
                    <tr>
                      <td style="padding: 15px 20px;">
                        <p style="margin: 0 0 5px; font-weight: 600; color: #374151; font-size: 13px;">👤 FROM:</p>
                        <p style="margin: 0; color: #1f2937; font-size: 16px;">${data.name}</p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 15px 20px; border-top: 1px solid #e5e7eb;">
                        <p style="margin: 0 0 5px; font-weight: 600; color: #374151; font-size: 13px;">📧 EMAIL:</p>
                        <a href="mailto:${data.email}" style="color: #3b82f6; text-decoration: none;">${data.email}</a>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 15px 20px; border-top: 1px solid #e5e7eb;">
                        <p style="margin: 0 0 5px; font-weight: 600; color: #374151; font-size: 13px;">📝 SUBJECT:</p>
                        <p style="margin: 0; color: #1f2937; font-size: 16px;">${data.subject}</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding: 0 30px 30px;">
                  <div style="background-color: #f9fafb; border-left: 4px solid #3b82f6; border-radius: 8px; padding: 20px;">
                    <h2 style="margin: 0 0 15px; color: #1f2937; font-size: 18px;">💬 Message:</h2>
                    <p style="margin: 0; color: #4b5563; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
                  </div>
                </td>
              </tr>
              <tr>
                <td style="padding: 0 30px 30px; text-align: center;">
                  <a href="mailto:${data.email}?subject=Re: ${encodeURIComponent(data.subject)}" style="display: inline-block; background: linear-gradient(135deg, #3b82f6 0%, #10b981 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600;">
                    Reply to ${data.name}
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  return sendEmail({
    to: 'shahadotrahat786@gmail.com',
    subject: `Portfolio Contact: ${data.subject}`,
    html,
    replyTo: data.email,
  });
};
