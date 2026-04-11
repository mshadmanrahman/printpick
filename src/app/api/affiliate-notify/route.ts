import { NextResponse } from "next/server";
import { z } from "zod";

const BRRR_ENDPOINT = process.env.BRRR_ENDPOINT;
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
  if (!BRRR_ENDPOINT) {
    return NextResponse.json({ ok: false, reason: "no_endpoint" }, { status: 200 });
  }

  const parsed = bodySchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ ok: false, reason: "invalid_body" }, { status: 400 });
  }

  const message = formatMessage(parsed.data);

  const brrrRes = await fetch(BRRR_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: "PrintPick",
      message,
      sound: "cha_ching",
    }),
  });

  if (!brrrRes.ok) {
    console.error("brrr send failed:", await brrrRes.text());
    return NextResponse.json({ ok: false, reason: "brrr_failed" }, { status: 200 });
  }

  return NextResponse.json({ ok: true });
}
