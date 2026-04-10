import { NextResponse } from "next/server";
import { z } from "zod";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID ?? "160135380";
const AMAZON_COMMISSION_RATE = 0.03;

const bodySchema = z.object({
  printer: z.string().min(1),
  price: z.number().positive().nullable(),
  asin: z.string().min(1),
  linkType: z.enum(["direct", "search"]),
});

function formatMessage(data: z.infer<typeof bodySchema>): string {
  const lines: string[] = [];

  if (data.price) {
    const commission = (data.price * AMAZON_COMMISSION_RATE).toFixed(2);
    lines.push(`\u{1F6D2} Someone clicked on the $${data.price.toLocaleString()} ${data.printer}`);
    lines.push(`\u{1F4B0} If they buy, you earn ~$${commission}`);
  } else {
    lines.push(`\u{1F6D2} Someone clicked on ${data.printer}`);
    lines.push(`\u{1F4B0} Commission: ~3% of purchase`);
  }

  lines.push("");
  lines.push(`ASIN: ${data.asin}`);
  lines.push(`Link type: ${data.linkType}`);
  lines.push(`Source: printpick.dev`);

  return lines.join("\n");
}

export async function POST(request: Request): Promise<NextResponse> {
  if (!TELEGRAM_BOT_TOKEN) {
    return NextResponse.json({ ok: false, reason: "no_token" }, { status: 200 });
  }

  const parsed = bodySchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ ok: false, reason: "invalid_body" }, { status: 400 });
  }

  const message = formatMessage(parsed.data);

  const telegramRes = await fetch(
    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "HTML",
        disable_notification: false,
      }),
    },
  );

  if (!telegramRes.ok) {
    console.error("Telegram send failed:", await telegramRes.text());
    return NextResponse.json({ ok: false, reason: "telegram_failed" }, { status: 200 });
  }

  return NextResponse.json({ ok: true });
}
