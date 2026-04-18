/**
 * 3DJake affiliate redirect with edge geo routing.
 *
 * Visitors from the UK are sent to the 3DJake UK store (merchant ID 21809) so
 * the click is attributed to that Awin program. Everyone else is sent to
 * 3DJake FR (merchant ID 44479), which ships across the EU and is the broader
 * default. Keeping the host and merchant ID in sync matters — a UK merchant
 * ID paired with a FR destination URL is a common attribution-failure mode.
 *
 * The route is kept deliberately small: slug maps are inline so a typo in a
 * printer's brandUrl becomes a 404 rather than a silent redirect to a
 * wildcard landing page. When a new Bambu product goes live on 3DJake, add
 * a slug here and wire it in the printer data.
 *
 * Geo signal: Vercel sets `x-vercel-ip-country` on inbound requests from
 * the Vercel edge. Locally (and on non-Vercel hosts) this header is absent,
 * so we fall back to FR, which is the safer default.
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getJake3dDeepLink, type Jake3dRegion } from "@/lib/awin-affiliate";

/**
 * Map of internal slug → path on the 3DJake store. Paths are shared across
 * the .uk and .fr storefronts (verified 2026-04-18).
 *
 * H2D currently redirects to a site search on both domains because 3DJake
 * has not created a dedicated product page yet, so we point to the Bambu Lab
 * brand landing page instead to avoid sending clicks into an empty search.
 */
const JAKE_PRODUCT_PATHS: Record<string, string> = {
  "bambu-p1s": "/bambu-lab/p1s",
  "bambu-p2s": "/bambu-lab/p2s",
  "bambu-x2d": "/bambu-lab/x2d",
  "bambu-h2d": "/bambu-lab",
};

function pickRegion(country: string | null): Jake3dRegion {
  return country === "GB" ? "uk" : "fr";
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
): Promise<Response> {
  const { slug } = await params;
  const path = JAKE_PRODUCT_PATHS[slug];

  if (!path) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const country = request.headers.get("x-vercel-ip-country");
  const region = pickRegion(country);
  const target = getJake3dDeepLink(region, path);

  return NextResponse.redirect(target, 302);
}
