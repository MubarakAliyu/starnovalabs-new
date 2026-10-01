import { NextResponse, type NextRequest } from 'next/server';

import { HONEYPOT_FIELD, TIMESTAMP_FIELD, topicLabel } from '@/content/contact';
import { site } from '@/content/site';
import {
  hasErrors,
  looksAutomated,
  validateContact,
  type ContactInput,
} from '@/lib/contact-validation';

export const runtime = 'nodejs';

/**
 * Best-effort rate limit. This lives in the memory of one serverless instance,
 * so it slows a naive flood rather than stopping a determined one; a durable
 * limiter (Upstash, Vercel KV) can replace it without touching the rest.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((at) => now - at < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);

  // Keep the map from growing without bound on a long-lived instance.
  if (hits.size > 500) {
    for (const [key, times] of hits) {
      if (times.every((at) => now - at >= WINDOW_MS)) hits.delete(key);
    }
  }
  return false;
}

function clientIp(request: NextRequest) {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0]!.trim();
  return request.headers.get('x-real-ip') ?? 'unknown';
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** A header value must never carry a newline into the message. */
function headerSafe(value: string) {
  return value.replace(/[\r\n]+/g, ' ').trim();
}

interface ParsedBody {
  input: ContactInput;
  honeypot: unknown;
  renderedAt: unknown;
  /** A form post wants a redirect; fetch wants JSON. */
  wantsRedirect: boolean;
}

async function parseBody(request: NextRequest): Promise<ParsedBody | null> {
  const type = request.headers.get('content-type') ?? '';
  const read = (source: Record<string, unknown> | FormData, key: string) => {
    const value = source instanceof FormData ? source.get(key) : source[key];
    return typeof value === 'string' ? value : '';
  };

  let source: Record<string, unknown> | FormData;
  let wantsRedirect = false;

  if (type.includes('application/json')) {
    const body: unknown = await request.json().catch(() => null);
    if (!body || typeof body !== 'object') return null;
    source = body as Record<string, unknown>;
  } else if (
    type.includes('application/x-www-form-urlencoded') ||
    type.includes('multipart/form-data')
  ) {
    source = await request.formData();
    // Only a browser submitting the form itself needs somewhere to land.
    wantsRedirect = !request.headers.get('x-requested-with');
  } else {
    return null;
  }

  return {
    input: {
      name: read(source, 'name'),
      email: read(source, 'email'),
      organisation: read(source, 'organisation'),
      topic: read(source, 'topic'),
      message: read(source, 'message'),
    },
    honeypot: source instanceof FormData ? source.get(HONEYPOT_FIELD) : source[HONEYPOT_FIELD],
    renderedAt:
      source instanceof FormData ? source.get(TIMESTAMP_FIELD) : source[TIMESTAMP_FIELD],
    wantsRedirect,
  };
}

function redirectTo(request: NextRequest, query: string) {
  return NextResponse.redirect(new URL(`/contact?${query}`, request.url), 303);
}

export async function POST(request: NextRequest) {
  const parsed = await parseBody(request);

  if (!parsed) {
    return NextResponse.json({ error: 'bad_request' }, { status: 400 });
  }

  const { input, wantsRedirect } = parsed;

  // Spam is accepted and dropped, so a bot learns nothing from the response.
  if (looksAutomated({ honeypot: parsed.honeypot, renderedAt: parsed.renderedAt })) {
    return wantsRedirect
      ? redirectTo(request, 'sent=1')
      : NextResponse.json({ ok: true }, { status: 200 });
  }

  if (rateLimited(clientIp(request))) {
    return wantsRedirect
      ? redirectTo(request, 'error=rate')
      : NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  }

  const errors = validateContact(input);
  if (hasErrors(errors)) {
    return wantsRedirect
      ? redirectTo(request, 'error=invalid')
      : NextResponse.json({ error: 'invalid', errors }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? site.email;
  const from = process.env.CONTACT_FROM_EMAIL ?? 'StarNova Labs Website <website@starnovalabs.com>';

  if (!apiKey) {
    // The form falls back to a mailto link rather than losing the message.
    return wantsRedirect
      ? redirectTo(request, 'error=unavailable')
      : NextResponse.json({ error: 'email_unavailable' }, { status: 503 });
  }

  const label = topicLabel(input.topic);
  const subject = headerSafe(`[Website] ${label} — ${input.name}`);

  const lines = [
    `Topic: ${label}`,
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    input.organisation ? `Organisation: ${input.organisation}` : null,
    '',
    input.message,
  ].filter((line): line is string => line !== null);

  const html = `<table cellpadding="0" cellspacing="0" border="0"><tbody>
<tr><td><strong>Topic</strong></td><td>${escapeHtml(label)}</td></tr>
<tr><td><strong>Name</strong></td><td>${escapeHtml(input.name)}</td></tr>
<tr><td><strong>Email</strong></td><td>${escapeHtml(input.email)}</td></tr>
${input.organisation ? `<tr><td><strong>Organisation</strong></td><td>${escapeHtml(input.organisation)}</td></tr>` : ''}
</tbody></table>
<hr />
<p style="white-space:pre-wrap">${escapeHtml(input.message)}</p>`;

  try {
    // Imported here so the module never loads on a cold start that does not send.
    const { Resend } = await import('resend');
    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: headerSafe(input.email),
      subject,
      text: lines.join('\n'),
      html,
    });

    if (error) {
      // Never the message body — only what is needed to trace a failure.
      console.error('[contact] send failed', { topic: input.topic, reason: error.name });
      return wantsRedirect
        ? redirectTo(request, 'error=1')
        : NextResponse.json({ error: 'send_failed' }, { status: 502 });
    }

    console.info('[contact] sent', { id: data?.id, topic: input.topic });

    return wantsRedirect
      ? redirectTo(request, 'sent=1')
      : NextResponse.json({ ok: true, id: data?.id }, { status: 200 });
  } catch {
    console.error('[contact] send threw', { topic: input.topic });
    return wantsRedirect
      ? redirectTo(request, 'error=1')
      : NextResponse.json({ error: 'send_failed' }, { status: 502 });
  }
}
