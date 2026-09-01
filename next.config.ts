import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // HQ routes renamed to match their tab labels; keep old links working.
      { source: "/hq-a3f9k2x7/kpis", destination: "/hq-a3f9k2x7/metrics", permanent: true },
      { source: "/hq-a3f9k2x7/gantt", destination: "/hq-a3f9k2x7/milestones", permanent: true },
    ];
  },
};

export default nextConfig;
