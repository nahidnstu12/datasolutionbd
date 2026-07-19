"use server";

import {
  getContactRecipient,
  getMailFrom,
  transporter,
} from "@/lib/nodemailer";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitizeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\n/g, "<br>");
}

/**
 * @param {{ success: boolean, error?: string, message?: string } | null} _prev
 * @param {FormData} formData
 */
export async function sendContactEmail(_prev, formData) {
  try {
    const name = formData.get("name")?.toString()?.trim() || "";
    const phone = formData.get("phone")?.toString()?.trim() || "";
    const email = formData.get("email")?.toString()?.trim().toLowerCase() || "";
    const service = formData.get("service")?.toString()?.trim() || "";
    const message = formData.get("message")?.toString()?.trim() || "";
    const honeypot = formData.get("company")?.toString()?.trim() || "";

    // Bot trap — silently succeed
    if (honeypot) {
      return { success: true, message: "Thank you! We will get back to you soon." };
    }

    if (name.length < 2) {
      return { success: false, error: "Name must be at least 2 characters." };
    }

    if (phone.length < 8) {
      return { success: false, error: "Please enter a valid phone number." };
    }

    if (email && !EMAIL_REGEX.test(email)) {
      return { success: false, error: "Please enter a valid email address." };
    }

    if (name.length > 100 || phone.length > 40 || email.length > 100) {
      return { success: false, error: "Input too long. Please shorten your details." };
    }

    if (message.length > 3000) {
      return { success: false, error: "Message is too long (max 3000 characters)." };
    }

    if (!process.env.MAIL_USERNAME || !process.env.MAIL_PASSWORD) {
      console.error("SMTP credentials missing");
      return {
        success: false,
        error: "Email service is not configured. Please call or WhatsApp us.",
      };
    }

    try {
      await transporter.verify();
    } catch (verifyError) {
      console.error("SMTP verification failed:", verifyError);
      return {
        success: false,
        error: "Email service is temporarily unavailable. Please try WhatsApp or phone.",
      };
    }

    const to = getContactRecipient();
    const subjectService = service ? ` — ${service}` : "";
    const mailOptions = {
      from: getMailFrom(),
      to,
      replyTo: email || undefined,
      subject: `DSBD Contact: ${name}${subjectService}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;background:#f8fafc;">
          <div style="background:#fff;padding:28px;border-radius:12px;border:1px solid #e2e8f0;">
            <h2 style="margin:0 0 16px;color:#0f172a;border-bottom:2px solid #295FEA;padding-bottom:10px;">
              New website enquiry
            </h2>
            <p style="margin:0 0 12px;"><strong>Name:</strong> ${sanitizeHtml(name)}</p>
            <p style="margin:0 0 12px;"><strong>Phone:</strong> ${sanitizeHtml(phone)}</p>
            <p style="margin:0 0 12px;"><strong>Email:</strong> ${
              email
                ? `<a href="mailto:${sanitizeHtml(email)}">${sanitizeHtml(email)}</a>`
                : "—"
            }</p>
            <p style="margin:0 0 12px;"><strong>Service:</strong> ${sanitizeHtml(service || "—")}</p>
            <div style="margin-top:16px;padding:14px;background:#f1f5f9;border-left:4px solid #295FEA;border-radius:6px;">
              <strong style="display:block;margin-bottom:8px;">Message</strong>
              ${message ? sanitizeHtml(message) : "<em>No message provided.</em>"}
            </div>
            <p style="margin-top:20px;font-size:12px;color:#64748b;">
              Sent from datasolutionbd.com contact form · ${new Date().toLocaleString("en-BD", { timeZone: "Asia/Dhaka" })}
            </p>
          </div>
        </div>
      `,
      text: [
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Email: ${email || "—"}`,
        `Service: ${service || "—"}`,
        "",
        message || "(no message)",
      ].join("\n"),
    };

    const result = await transporter.sendMail(mailOptions);

    if (result.rejected?.length) {
      console.error("SMTP rejected:", result.rejected);
      return {
        success: false,
        error: "Could not deliver your message. Please try WhatsApp or phone.",
      };
    }

    if (!result.accepted?.length || !result.messageId) {
      console.error("SMTP not accepted:", result);
      return {
        success: false,
        error: "Could not send your message. Please try again shortly.",
      };
    }

    return {
      success: true,
      message: "Thank you! We received your message and will reply soon.",
    };
  } catch (error) {
    console.error("Contact email error:", error);
    return {
      success: false,
      error: "Something went wrong. Please contact us by phone or WhatsApp.",
    };
  }
}
