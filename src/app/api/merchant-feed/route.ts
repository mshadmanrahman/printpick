import { printers } from "@/data/printers";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  // 3DJake's Awin program terms prohibit promotion through Google Shopping / CSS,
  // so any printer whose primary brand link routes through our /go/3djake/ redirect
  // is excluded from the Merchant Center feed to avoid accidental violation.
  const activePrinters = printers.filter(
    (p) => !p.discontinued && !p.brandUrl?.startsWith("/go/3djake/"),
  );
  const items = activePrinters
    .map(
      (p) => `    <item>
      <g:id>${escapeXml(p.slug)}</g:id>
      <g:title>${escapeXml(p.name)} 3D Printer</g:title>
      <g:description>${escapeXml(p.summary)}</g:description>
      <g:link>https://printpick.dev/printers/${encodeURIComponent(p.slug)}</g:link>
      <g:image_link>https://printpick.dev${p.image}</g:image_link>
      <g:price>${p.price}.00 USD</g:price>
      <g:availability>in_stock</g:availability>
      <g:brand>${escapeXml(p.brand)}</g:brand>
      <g:condition>new</g:condition>
      <g:identifier_exists>false</g:identifier_exists>
      <g:product_type>Electronics &gt; Print, Copy, Scan &amp; Fax &gt; 3D Printers</g:product_type>
      <g:google_product_category>6996</g:google_product_category>
    </item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>PrintPick, 3D Printer Product Feed</title>
    <link>https://printpick.dev</link>
    <description>Data-driven 3D printer comparisons, interactive tools, and honest reviews.</description>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
