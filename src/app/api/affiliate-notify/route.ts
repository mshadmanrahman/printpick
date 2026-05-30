import { NextResponse } from "next/server";
import { z } from "zod";

const BRRR_ENDPOINT = process.env.BRRR_ENDPOINT;
const KV_REST_API_URL = process.env.KV_REST_API_URL;
const KV_REST_API_TOKEN = process.env.KV_REST_API_TOKEN;
const AMAZON_COMMISSION_RATE = 0.03;

const bodySchema = z.object({
  printer: z.string().min(1),
  price: z.number().positive().nullable(),
  asin: z.string().min(1).nullable(),
  resolvedAsin: z.string().min(1).nullable().optional(),
  linkType: z.enum(["direct", "search"]).nullable(),
  partner: z.enum(["amazon", "brand_direct"]).default("amazon"),
  brand: z.string().min(1).nullable().optional(),
  sourcePage: z.string().min(1).default("unknown"),
  ctaPosition: z.string().min(1).default("unknown"),
});

type AffiliateNotifyPayload = z.infer<typeof bodySchema>;

function formatMessage(data: AffiliateNotifyPayload): string {
  const lines: string[] = [];

  if (data.price) {
    const commission =
      data.partner === "amazon" ? (data.price * AMAZON_COMMISSION_RATE).toFixed(2) : null;
    lines.push(`\u{1F6D2} Someone clicked on the $${data.price.toLocaleString()} ${data.printer}`);
    if (commission) {
      lines.push(`\u{1F4B0} If they buy, you earn ~$${commission}`);
    } else {
      lines.push(`\u{1F4B0} Partner: ${data.brand ?? data.partner}`);
    }
  } else {
    lines.push(`\u{1F6D2} Someone clicked on ${data.printer}`);
    lines.push(`\u{1F4B0} Partner: ${data.brand ?? data.partner}`);
  }

  lines.push("");
  lines.push(`Partner: ${data.partner}`);
  if (data.brand) lines.push(`Brand: ${data.brand}`);
  if (data.asin) lines.push(`ASIN: ${data.asin}`);
  if (data.resolvedAsin) lines.push(`Resolved ASIN: ${data.resolvedAsin}`);
  if (data.linkType) lines.push(`Link type: ${data.linkType}`);
  lines.push(`Page: ${data.sourcePage}`);
  lines.push(`CTA: ${data.ctaPosition}`);
  lines.push("Source: printpick.dev");

  return lines.join("\n");
}

async function incrementKvCounters(data: AffiliateNotifyPayload): Promise<void> {
  if (!KV_REST_API_URL || !KV_REST_API_TOKEN) {
    return;
  }

  const today = new Date().toISOString().slice(0, 10);
  const safePartner = data.partner.replace(/[^a-z0-9_-]/gi, "_");
  const safeAsin = data.asin?.replace(/[^a-z0-9_-]/gi, "_");

  const keys = [
    `affiliate_clicks:${today}`,
    `affiliate_clicks:${today}:partner:${safePartner}`,
  ];

  if (safeAsin) {
    keys.push(`affiliate_clicks:${today}:asin:${safeAsin}`);
  }

  await Promise.allSettled(
    keys.map((key) =>
      fetch(`${KV_REST_API_URL}/incr/${encodeURIComponent(key)}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${KV_REST_API_TOKEN}` },
      }),
    ),
  );
}

async function sendBrrrNotification(data: AffiliateNotifyPayload): Promise<boolean> {
  if (!BRRR_ENDPOINT) {
    return false;
  }

  const brrrRes = await fetch(BRRR_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: "PrintPick",
      message: formatMessage(data),
      sound: "cha_ching",
    }),
  });

  if (!brrrRes.ok) {
    console.error("brrr send failed:", await brrrRes.text());
    return false;
  }

  return true;
}

export async function POST(request: Request): Promise<NextResponse> {
  const parsed = bodySchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ ok: false, reason: "invalid_body" }, { status: 400 });
  }

  await incrementKvCounters(parsed.data);
  const notified = await sendBrrrNotification(parsed.data);

  return NextResponse.json({ ok: true, notified });
}
