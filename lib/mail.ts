import nodemailer from "nodemailer";
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

// Optional SMTP configuration (e.g. Gmail App Password)
const smtpHost = process.env.SMTP_HOST;
const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587;
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;

const transporter =
  smtpHost && smtpUser && smtpPass
    ? nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      })
    : null;

export async function sendContactEmail({
  name,
  email,
  subject,
  message,
}: {
  name: string;
  email: string;
  subject?: string;
  message: string;
}) {
  const targetEmail = process.env.ADMIN_EMAIL || "shahariyaschatheri10@gmail.com";
  const emailSubject = subject ? `[Portfolio Contact] ${subject} - from ${name}` : `[Portfolio Contact] New message from ${name}`;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0c0c14; color: #f1f5f9; padding: 24px; margin: 0; }
          .container { max-width: 600px; margin: 0 auto; background: #13131f; border: 1px solid #27273a; border-radius: 16px; overflow: hidden; }
          .header { background: linear-gradient(135deg, #06b6d4, #3b82f6); padding: 24px; color: #08080c; }
          .header h1 { margin: 0; font-size: 20px; font-weight: 800; }
          .header p { margin: 4px 0 0 0; font-size: 13px; opacity: 0.9; }
          .content { padding: 24px; }
          .field { margin-bottom: 16px; }
          .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #94a3b8; margin-bottom: 4px; }
          .value { font-size: 14px; color: #e2e8f0; font-weight: 500; }
          .message-box { background: #0c0c14; border: 1px solid #1e1e2f; border-radius: 10px; padding: 16px; margin-top: 8px; font-size: 14px; line-height: 1.6; color: #cbd5e1; white-space: pre-wrap; }
          .footer { padding: 16px 24px; background: #0e0e18; border-top: 1px solid #1e1e2f; font-size: 12px; color: #64748b; text-align: center; }
          .button { display: inline-block; background: #06b6d4; color: #08080c; text-decoration: none; padding: 10px 20px; border-radius: 8px; font-weight: 700; font-size: 13px; margin-top: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📬 New Portfolio Inquiry</h1>
            <p>A recruiter / visitor sent a message from your developer portfolio.</p>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Sender Name</div>
              <div class="value">${name}</div>
            </div>
            <div class="field">
              <div class="label">Sender Email</div>
              <div class="value"><a href="mailto:${email}" style="color: #38bdf8;">${email}</a></div>
            </div>
            ${
              subject
                ? `<div class="field">
                    <div class="label">Subject</div>
                    <div class="value">${subject}</div>
                  </div>`
                : ""
            }
            <div class="field">
              <div class="label">Message</div>
              <div class="message-box">${message}</div>
            </div>
            <div style="margin-top: 24px; text-align: center;">
              <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject || "Your message via Portfolio")}" class="button">
                Reply to ${name} (${email})
              </a>
            </div>
          </div>
          <div class="footer">
            Received via Shahariyas Portfolio Contact Form • ${new Date().toLocaleString()}
          </div>
        </div>
      </body>
    </html>
  `;

  // 1. Send via Resend if API key is provided
  if (resend) {
    try {
      const result = await resend.emails.send({
        from: "Shahariyas Portfolio <onboarding@resend.dev>",
        to: targetEmail,
        reply_to: email,
        subject: emailSubject,
        html: htmlContent,
      });
      return { success: true, provider: "resend", data: result };
    } catch (err) {
      console.error("Resend delivery failed:", err);
    }
  }

  // 2. Send via SMTP / Nodemailer if configured
  if (transporter) {
    try {
      const info = await transporter.sendMail({
        from: `"Portfolio Contact Form" <${smtpUser}>`,
        to: targetEmail,
        replyTo: email,
        subject: emailSubject,
        html: htmlContent,
      });
      return { success: true, provider: "smtp", data: info };
    } catch (err) {
      console.error("SMTP delivery failed:", err);
    }
  }

  // 3. Development / Local Fallback Mode
  console.log(`\n======================================================
📨 [EMAIL NOTIFICATION DISPATCHED TO: ${targetEmail}]
======================================================
From: ${name} <${email}>
Subject: ${emailSubject}
Timestamp: ${new Date().toLocaleString()}

Message:
${message}
======================================================\n`);

  return { success: true, provider: "local-log" };
}
