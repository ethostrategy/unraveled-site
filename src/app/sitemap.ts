import type { MetadataRoute } from "next";

// Only the public splash is listed; /preview is private + noindex.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://unraveleduniverse.com",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
