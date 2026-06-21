import type { MetadataRoute } from "next";

// Public splash is indexable; the gated draft (/preview) and API are not.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/preview", "/api/"],
    },
    sitemap: "https://unraveledapp.com/sitemap.xml",
    host: "https://unraveledapp.com",
  };
}
