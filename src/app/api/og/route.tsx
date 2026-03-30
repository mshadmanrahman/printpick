import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "Find Your Perfect 3D Printer";
  const subtitle =
    searchParams.get("subtitle") ?? "Data-driven comparisons, interactive tools, honest reviews";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px 80px",
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Brand mark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "24px",
              fontWeight: 800,
            }}
          >
            P
          </div>
          <span
            style={{
              fontSize: "28px",
              fontWeight: 700,
              color: "#e4e4e7",
              letterSpacing: "-0.5px",
            }}
          >
            Print
            <span style={{ color: "#06b6d4" }}>Pick</span>
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: "56px",
            fontWeight: 800,
            color: "#fafafa",
            lineHeight: 1.15,
            letterSpacing: "-1.5px",
            maxWidth: "900px",
          }}
        >
          {title}
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "24px",
            color: "#a1a1aa",
            marginTop: "20px",
            lineHeight: 1.4,
            maxWidth: "700px",
          }}
        >
          {subtitle}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            marginTop: "auto",
            paddingTop: "32px",
          }}
        >
          <span style={{ fontSize: "18px", color: "#71717a" }}>
            printpick.dev
          </span>
          <span style={{ fontSize: "18px", color: "#3f3f46" }}>|</span>
          <span style={{ fontSize: "18px", color: "#71717a" }}>
            Scored across 5 dimensions
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
