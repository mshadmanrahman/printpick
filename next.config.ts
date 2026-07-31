import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      /**
       * Two posts covered the same P1S vs X-Plus 3 matchup, both published
       * 2026-03-30, competing for the same queries. Neither ever earned a GSC
       * impression, so the duplicate was removed rather than merged. Kept the
       * slug whose printer ordering matches getCanonicalSlug, so it lines up
       * with /compare/bambu-lab-p1s-vs-qidi-x-plus-3.
       */
      {
        source: "/blog/qidi-x-plus-3-vs-bambu-lab-p1s",
        destination: "/blog/bambu-lab-p1s-vs-qidi-x-plus-3",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
