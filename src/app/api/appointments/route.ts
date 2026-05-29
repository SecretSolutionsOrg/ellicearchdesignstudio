import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { studio } from "@/data/studio";

const bodySchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().max(40).optional(),
  service: z.string().min(1).max(120),
  preferredDate: z.string().max(40).optional(),
  message: z.string().min(10).max(2000),
});

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: Request) {
  let parsed: z.infer<typeof bodySchema>;
  try {
    const raw = await req.json();
    parsed = bodySchema.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid submission." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.APPOINTMENTS_TO ?? studio.contact.email;
  const from = process.env.APPOINTMENTS_FROM ?? "appointments@ellicedesign.studio";

  // If no API key is configured, accept the submission and log it so the form
  // remains functional during local development without leaking errors to the client.
  if (!apiKey) {
    console.info("[appointments] (no RESEND_API_KEY set — would have sent)", parsed);
    return NextResponse.json({ ok: true, delivered: false });
  }

  const html = `
    <div style="font-family:Georgia,serif;line-height:1.6;color:#111">
      <h2 style="margin:0 0 12px">New appointment request</h2>
      <p><strong>Name:</strong> ${escapeHtml(parsed.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(parsed.email)}</p>
      ${parsed.phone ? `<p><strong>Phone:</strong> ${escapeHtml(parsed.phone)}</p>` : ""}
      <p><strong>Service:</strong> ${escapeHtml(parsed.service)}</p>
      ${parsed.preferredDate ? `<p><strong>Preferred date:</strong> ${escapeHtml(parsed.preferredDate)}</p>` : ""}
      <hr/>
      <p style="white-space:pre-wrap">${escapeHtml(parsed.message)}</p>
    </div>
  `;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: parsed.email,
      subject: `Appointment request — ${parsed.name} (${parsed.service})`,
      html,
    });
    if (error) {
      console.error("[appointments] resend error", error);
      return NextResponse.json({ ok: false, error: "Email send failed." }, { status: 502 });
    }
    return NextResponse.json({ ok: true, delivered: true });
  } catch (e) {
    console.error("[appointments] exception", e);
    return NextResponse.json({ ok: false, error: "Unexpected error." }, { status: 500 });
  }
}
