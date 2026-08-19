import type { MetadataRoute } from "next";

// Public, indexable pages. /preview and /village are private + noindex.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://unraveleduniverse.com",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://unraveleduniverse.com/resources",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
