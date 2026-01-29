import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const gmailUser = process.env.GMAIL_USER;
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
    const notifyTo = process.env.NOTIFY_TO;

    if (!gmailUser || !gmailAppPassword) {
      return NextResponse.json(
        {
          error:
            'Email is not configured. Set GMAIL_USER and GMAIL_APP_PASSWORD (Gmail App Password) in env to send notifications.',
        },
        { status: 501 }
      );
    }

    const safe = (v: unknown) => (typeof v === 'string' ? v : v == null ? '' : String(v));
    const fullName = safe(body?.fullName);
    const email = safe(body?.email);
    const phone = safe(body?.phone);
    const message = safe(body?.message);
    const consent = Boolean(body?.consent);
    const source = safe(body?.source);

    const emailHtml = `
      <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial; line-height: 1.5;">
        <h2>New Request Information Submission</h2>
        <p><b>Full Name:</b> ${fullName || '-'} </p>
        <p><b>Email:</b> ${email || '-'} </p>
        <p><b>Phone:</b> ${phone || '-'} </p>
        <p><b>Consent:</b> ${consent ? 'Yes' : 'No'} </p>
        <p><b>Source:</b> ${source || '-'} </p>
        <p><b>Message:</b></p>
        <pre style="white-space: pre-wrap; background: #f6f6f6; padding: 12px; border-radius: 8px;">${message || '-'}</pre>
      </div>
    `;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    });

    try {
      await transporter.sendMail({
        from: gmailUser,
        to: notifyTo,
        subject: `New lead: ${fullName || phone || email || 'Request Information'}`,
        html: emailHtml,
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to send email notification';
      return NextResponse.json({ error: msg }, { status: 502 });
    }

    const endpoint = process.env.RCS_PROVIDER_ENDPOINT;
    const apiKey = process.env.RCS_PROVIDER_API_KEY;

    if (!endpoint || !apiKey) {
      return NextResponse.json({
        message: 'Email sent successfully (RCS provider not configured)',
      });
    }

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return NextResponse.json(
        { error: data?.error || 'Failed to send via RCS provider' },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: 'Sent successfully', data });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to send';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
