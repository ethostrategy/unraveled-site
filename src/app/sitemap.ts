import type { MetadataRoute } from "next";

// Only the public splash is listed; /preview is private + noindex.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://unraveledapp.com",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
