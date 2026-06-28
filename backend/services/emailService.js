/**
 * Email Service using Resend API with native fetch
 */

const sendEmail = async ({ to, subject, html }) => {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL || "Jaunt Solutions <onboarding@resend.dev>";

  if (!apiKey) {
    console.warn("RESEND_API_KEY is not defined. Email will be logged to console instead.");
    console.log(`[Mock Email] To: ${to}, Subject: ${subject}`);
    return { mock: true, success: true };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: Array.isArray(to) ? to : [to],
        subject: subject,
        html: html,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || `HTTP ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error("Resend API Send Error:", error);
    throw new Error(`Email sending failed: ${error.message}`);
  }
};

/**
 * Send contact form email notification to Admin
 */
const sendContactEmail = async ({ name, email, subject, message }) => {
  const adminEmail = process.env.ADMIN_EMAIL || "yourgmail@gmail.com";
  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; padding: 24px;">
      <h2 style="color: #0ea5e9; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px; margin-top: 0;">New Contact Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 4px; padding: 16px; white-space: pre-wrap; color: #1f2937;">${message}</div>
      <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
      <p style="color: #9ca3af; font-size: 12px; text-align: center;">Sent from your website contact form</p>
    </div>
  `;

  return sendEmail({
    to: adminEmail,
    subject: `📩 New Contact Message: ${subject}`,
    html,
  });
};

/**
 * Send admin reply to the contact submitter
 */
const sendReplyEmail = async ({ to, subject, message, originalMessage, recipientName }) => {
  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; padding: 24px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
      <div style="text-align: center; border-bottom: 1px solid #e5e7eb; padding-bottom: 16px; margin-bottom: 24px;">
        <h1 style="color: #0369a1; margin: 0; font-size: 24px;">Jaunt Solutions</h1>
      </div>
      
      <p style="font-size: 16px; margin-bottom: 16px;">Dear ${recipientName},</p>
      
      <div style="font-size: 16px; white-space: pre-wrap; margin-bottom: 24px; color: #1f2937;">
        ${message}
      </div>
      
      <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #e5e7eb; color: #71717a;">
        <p style="font-size: 14px; margin-bottom: 8px;">Best regards,</p>
        <p style="font-size: 14px; font-weight: bold; margin: 0;">Jaunt Solutions Team</p>
        <p style="font-size: 12px; color: #a1a1aa; margin-top: 4px;">${process.env.ADMIN_EMAIL || "somanamir43@gmail.com"}</p>
      </div>
      
      <blockquote style="margin: 24px 0 0 0; padding-left: 16px; border-left: 4px solid #e5e7eb; color: #71717a; font-style: italic; font-size: 14px;">
        <p style="font-weight: bold; margin: 0 0 8px 0; color: #4b5563;">Original Inquiry:</p>
        <p style="margin: 0; white-space: pre-wrap;">${originalMessage}</p>
      </blockquote>
    </div>
  `;

  return sendEmail({
    to,
    subject,
    html,
  });
};

module.exports = {
  sendContactEmail,
  sendReplyEmail,
};
