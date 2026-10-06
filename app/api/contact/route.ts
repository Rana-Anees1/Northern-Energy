import { NextResponse } from "next/server";
import { Resend } from "resend";
import { siteConfig } from "@/lib/siteConfig";

export const runtime = "nodejs";

/** Resend's free tier allows 2 requests/second, so sends are spaced out. */
const SEND_GAP_MS = 550;

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

async function sendSequentially<T>(
  tasks: Array<() => Promise<T>>,
): Promise<PromiseSettledResult<T>[]> {
  const results: PromiseSettledResult<T>[] = [];
  for (let i = 0; i < tasks.length; i++) {
    try {
      results.push({ status: "fulfilled", value: await tasks[i]() });
    } catch (reason) {
      results.push({ status: "rejected", reason });
    }
    if (i < tasks.length - 1) await sleep(SEND_GAP_MS);
  }
  return results;
}

export type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  enquiryType: string;
  message: string;
  /** Optional: only the solar lead form sends these. */
  postcode?: string;
  source?: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Brand palette, mirroring tailwind.config.ts so the emails match the site.
const FONT_STACK = "'Helvetica Neue', Helvetica, Arial, sans-serif";
const NAVY = "#1f344f";
const GREEN = "#629c35";
const INK = "#2b3440";
const MUTED = "#6b7785";
const BORDER = "#dfe3e8";
const SOFT_BG = "#f8f8f8";

function formatTimestamp(date: Date): string {
  return date.toLocaleString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/London",
    timeZoneName: "short",
  });
}

function layout(innerHtml: string, previewText: string): string {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="x-apple-disable-message-reformatting" />
    <title>${siteConfig.name}</title>
  </head>
  <body style="margin:0;padding:0;background:${SOFT_BG};font-family:${FONT_STACK};color:${INK};-webkit-font-smoothing:antialiased;">
    <span style="display:none!important;visibility:hidden;opacity:0;color:transparent;height:0;width:0;overflow:hidden;mso-hide:all;">${escapeHtml(previewText)}</span>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${SOFT_BG};">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background:#FFFFFF;border:1px solid ${BORDER};border-radius:14px;overflow:hidden;">
            <tr>
              <td style="background:${NAVY};padding:22px 32px;border-bottom:3px solid ${GREEN};">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="color:#FFFFFF;font-family:${FONT_STACK};font-size:16px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">
                      Northern Renewable <span style="font-weight:400;color:#9fd07a;">Centre</span>
                    </td>
                    <td align="right" style="color:#b9c4d2;font-family:${FONT_STACK};font-size:11px;letter-spacing:1px;text-transform:uppercase;">
                      ${escapeHtml(siteConfig.tagline)}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr><td style="padding:32px;">${innerHtml}</td></tr>
            <tr>
              <td style="background:${SOFT_BG};padding:20px 32px;border-top:1px solid ${BORDER};color:${MUTED};font-family:${FONT_STACK};font-size:12px;line-height:1.6;">
                ${escapeHtml(siteConfig.name)} &middot;
                <a href="${siteConfig.phoneHref}" style="color:${NAVY};text-decoration:none;">${escapeHtml(siteConfig.phone)}</a> &middot;
                <a href="${siteConfig.emailHref}" style="color:${NAVY};text-decoration:none;">${escapeHtml(siteConfig.email)}</a>
                <br />${escapeHtml(siteConfig.company.registration)}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function detailRow(label: string, value: string): string {
  return `<tr>
    <td style="padding:10px 0;border-bottom:1px solid ${BORDER};font-family:${FONT_STACK};font-size:12px;color:${MUTED};text-transform:uppercase;letter-spacing:0.6px;width:38%;vertical-align:top;">${escapeHtml(label)}</td>
    <td style="padding:10px 0;border-bottom:1px solid ${BORDER};font-family:${FONT_STACK};font-size:15px;color:${INK};font-weight:600;">${escapeHtml(value)}</td>
  </tr>`;
}

function renderTeamHtml(data: ContactPayload): string {
  const rows = [
    detailRow("Name", data.name),
    detailRow("Email", data.email),
    detailRow("Phone", data.phone),
    detailRow("Enquiry type", data.enquiryType),
    data.postcode ? detailRow("Postcode", data.postcode) : "",
    data.source ? detailRow("How they found us", data.source) : "",
    detailRow("Received", formatTimestamp(new Date())),
  ].join("");

  return layout(
    `<p style="margin:0 0 6px;font-family:${FONT_STACK};font-size:12px;letter-spacing:1px;text-transform:uppercase;color:${GREEN};font-weight:700;">New website enquiry</p>
     <h1 style="margin:0 0 22px;font-family:${FONT_STACK};font-size:22px;line-height:1.3;color:${NAVY};">${escapeHtml(data.name)}${data.postcode ? ` &middot; ${escapeHtml(data.postcode)}` : ""}</h1>
     <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${rows}</table>
     <p style="margin:24px 0 8px;font-family:${FONT_STACK};font-size:12px;letter-spacing:0.6px;text-transform:uppercase;color:${MUTED};">Message</p>
     <div style="padding:16px;background:${SOFT_BG};border-left:3px solid ${GREEN};font-family:${FONT_STACK};font-size:15px;line-height:1.65;color:${INK};white-space:pre-wrap;">${escapeHtml(data.message || "(no message)")}</div>
     <p style="margin:24px 0 0;font-family:${FONT_STACK};font-size:13px;color:${MUTED};">Reply directly to this email to reach ${escapeHtml(data.name)}.</p>`,
    `New enquiry from ${data.name}`,
  );
}

function renderConfirmationHtml(data: ContactPayload): string {
  return layout(
    `<p style="margin:0 0 6px;font-family:${FONT_STACK};font-size:12px;letter-spacing:1px;text-transform:uppercase;color:${GREEN};font-weight:700;">Thank you</p>
     <h1 style="margin:0 0 16px;font-family:${FONT_STACK};font-size:24px;line-height:1.3;color:${NAVY};">We have received your enquiry</h1>
     <p style="margin:0 0 16px;font-family:${FONT_STACK};font-size:15px;line-height:1.7;color:${INK};">Hi ${escapeHtml(data.name.split(" ")[0] || data.name)},</p>
     <p style="margin:0 0 16px;font-family:${FONT_STACK};font-size:15px;line-height:1.7;color:${INK};">Thanks for getting in touch with ${escapeHtml(siteConfig.name)}. One of our team will review your enquiry and come back to you within one working day.</p>
     <p style="margin:0 0 8px;font-family:${FONT_STACK};font-size:12px;letter-spacing:0.6px;text-transform:uppercase;color:${MUTED};">What you sent us</p>
     <div style="padding:16px;background:${SOFT_BG};border-left:3px solid ${GREEN};font-family:${FONT_STACK};font-size:15px;line-height:1.65;color:${INK};white-space:pre-wrap;">${escapeHtml(data.message || "(no message)")}</div>
     <p style="margin:24px 0 16px;font-family:${FONT_STACK};font-size:15px;line-height:1.7;color:${INK};">If it is urgent, call us on <a href="${siteConfig.phoneHref}" style="color:${NAVY};font-weight:600;text-decoration:none;">${escapeHtml(siteConfig.phone)}</a> (${escapeHtml(siteConfig.hours)}). You are also very welcome to visit our showroom.</p>
     <p style="margin:0;font-family:${FONT_STACK};font-size:15px;line-height:1.7;color:${INK};">Kind regards,<br /><strong>The ${escapeHtml(siteConfig.name)} team</strong></p>`,
    "We have received your enquiry",
  );
}

function renderTeamText(data: ContactPayload): string {
  return [
    "NEW WEBSITE ENQUIRY",
    "",
    `Name:        ${data.name}`,
    `Email:       ${data.email}`,
    `Phone:       ${data.phone}`,
    `Enquiry:     ${data.enquiryType}`,
    data.postcode ? `Postcode:    ${data.postcode}` : null,
    data.source ? `Found us:    ${data.source}` : null,
    `Received:    ${formatTimestamp(new Date())}`,
    "",
    "Message:",
    data.message || "(no message)",
  ]
    .filter((line) => line !== null)
    .join("\n");
}

function renderConfirmationText(data: ContactPayload): string {
  return [
    `Hi ${data.name.split(" ")[0] || data.name},`,
    "",
    `Thanks for getting in touch with ${siteConfig.name}. One of our team will review your enquiry and come back to you within one working day.`,
    "",
    "What you sent us:",
    data.message || "(no message)",
    "",
    `If it is urgent, call us on ${siteConfig.phone} (${siteConfig.hours}).`,
    "",
    `Kind regards,`,
    `The ${siteConfig.name} team`,
  ].join("\n");
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const recipientsRaw = process.env.CONTACT_RECIPIENTS;
  const fromEmail = process.env.CONFIRMATION_FROM_EMAIL;
  const fromName = process.env.CONFIRMATION_FROM_NAME || siteConfig.name;

  if (!apiKey || !recipientsRaw || !fromEmail) {
    console.error("Contact form is not configured: missing Resend env vars.");
    return NextResponse.json({ error: "Email service is not configured." }, { status: 500 });
  }

  const recipients = recipientsRaw
    .split(",")
    .map((r) => r.trim())
    .filter(Boolean);

  if (recipients.length === 0) {
    return NextResponse.json({ error: "No enquiry recipients configured." }, { status: 500 });
  }

  let body: Partial<ContactPayload>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid form submission." }, { status: 400 });
  }

  const payload: ContactPayload = {
    name: String(body.name ?? "").trim(),
    email: String(body.email ?? "").trim(),
    phone: String(body.phone ?? "").trim(),
    enquiryType: String(body.enquiryType ?? "").trim() || "General Enquiry",
    message: String(body.message ?? "").trim(),
    postcode: String(body.postcode ?? "").trim() || undefined,
    source: String(body.source ?? "").trim() || undefined,
  };

  if (!payload.name || !payload.email || !payload.phone) {
    return NextResponse.json({ error: "Please fill in all required fields." }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  const resend = new Resend(apiKey);
  const from = `${fromName} <${fromEmail}>`;

  try {
    const teamHtml = renderTeamHtml(payload);
    const teamText = renderTeamText(payload);

    // One message per recipient: better deliverability than a shared To:
    // header, and one bad address cannot take the others down with it.
    const teamResults = await sendSequentially(
      recipients.map(
        (recipient) => () =>
          resend.emails.send({
            from,
            to: recipient,
            replyTo: payload.email,
            subject: `New enquiry from ${payload.name}${payload.postcode ? ` (${payload.postcode})` : ""}`,
            html: teamHtml,
            text: teamText,
          }),
      ),
    );

    let anySuccess = false;
    teamResults.forEach((result, i) => {
      const recipient = recipients[i];
      if (result.status === "rejected") {
        console.error(`Resend send threw for ${recipient}:`, result.reason);
        return;
      }
      if (result.value.error) {
        console.error(`Resend error delivering to ${recipient}:`, result.value.error);
        return;
      }
      anySuccess = true;
    });

    // The team notification is the one that matters: if every recipient
    // failed, tell the visitor so they can call instead of assuming we have
    // their details.
    if (!anySuccess) {
      return NextResponse.json(
        { error: "Failed to send enquiry. Please try again or call us." },
        { status: 502 },
      );
    }

    await sleep(SEND_GAP_MS);

    // Customer confirmation is best effort; never fail the request for it.
    const confirmation = await resend.emails.send({
      from,
      to: payload.email,
      subject: `Thank you for your enquiry | ${siteConfig.name}`,
      html: renderConfirmationHtml(payload),
      text: renderConfirmationText(payload),
    });

    if (confirmation.error) {
      console.error("Resend confirmation email error:", confirmation.error);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Unexpected error sending your enquiry." }, { status: 500 });
  }
}
