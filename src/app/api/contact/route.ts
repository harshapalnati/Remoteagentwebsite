import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body: {
      name?: string;
      email?: string;
      phone?: string;
      organization?: string;
      role?: string;
      useCase?: string;
    } = await req.json();
    const { name, email, phone, organization, role } = body || {};
    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    // Send notification email (if env is configured)
    try {
      const gmailUser = process.env.GMAIL_FROM;
      const gmailPass = process.env.GMAIL_APP_PASSWORD; // use App Password
      const to = process.env.GMAIL_TO || "harsha@closerlook.ai";
      if (gmailUser && gmailPass) {
        const transporter = nodemailer.createTransport({
          service: "Gmail",
          auth: { user: gmailUser, pass: gmailPass },
        });
        const html = `
          <h2>New Early Access Request</h2>
          <ul>
            <li><b>Name:</b> ${name}</li>
            <li><b>Email:</b> ${email}</li>
            <li><b>Phone:</b> ${phone || ""}</li>
            <li><b>Organization:</b> ${organization || ""}</li>
            <li><b>Role:</b> ${role || ""}</li>
            <li><b>Use case:</b> ${body.useCase || ""}</li>
          </ul>`;
        await transporter.sendMail({
          from: gmailUser,
          to,
          subject: `RemoteAgent Early Access — ${name}`,
          html,
        });
      }
    } catch (err) {
      console.warn("Email send failed:", (err as Error).message);
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Invalid request";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}


