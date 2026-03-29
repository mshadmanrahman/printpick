import type { MetadataRoute } from "next";
import { printers, CATEGORIES } from "@/data/printers";
import { getAllBlogPosts } from "@/data/blog-posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://printpick.dev";

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/best`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/compare`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/tools`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/tools/cost-estimator`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/tools/fdm-vs-resin`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/tools/finder`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/tools/build-volume`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/tools/materials`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/tools/upgrade`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/tools/noise`, changeFrequency: "monthly", priority: 0.8 },
  ];

  const printerPages: MetadataRoute.Sitemap = printers.map((p) => ({
    url: `${base}/printers/${p.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const categoryPages: MetadataRoute.Sitemap = CATEGORIES.map((c) => ({
    url: `${base}/best/${c.tag}`,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const blogPages: MetadataRoute.Sitemap = [
    { url: `${base}/blog`, changeFrequency: "weekly" as const, priority: 0.8 },
    ...getAllBlogPosts().map((p) => ({
      url: `${base}/blog/${p.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
      lastModified: new Date(p.updatedAt),
    })),
  ];

  return [...staticPages, ...printerPages, ...categoryPages, ...blogPages];
}
