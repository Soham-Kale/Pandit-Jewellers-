import type { MetadataRoute } from "next";
import { business } from "@/data/business";
import { categories, categoryHref } from "@/data/categories";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: business.siteUrl, changeFrequency: "monthly", priority: 1 },
    ...categories.map((c) => ({ url: `${business.siteUrl}${categoryHref(c.id)}`, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
