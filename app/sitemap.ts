import type { MetadataRoute } from "next";
import { business } from "@/data/business";
import { categories, categoryHref } from "@/data/categories";

/** Bump when page content changes meaningfully, so crawlers revisit. */
const LAST_UPDATED = new Date("2026-11-18");

const abs = (p: string) => `${business.siteUrl}${p}`;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${business.siteUrl}/`,
      lastModified: LAST_UPDATED,
      changeFrequency: "monthly",
      priority: 1,
      images: [abs("/assets/hero/hero.jpg"), abs("/assets/store/store.jpg"), abs("/assets/bridal/bridal-banner.jpg")],
    },
    ...categories.map((c) => ({
      url: abs(categoryHref(c.id)),
      lastModified: LAST_UPDATED,
      changeFrequency: "monthly" as const,
      priority: c.id === "all" ? 0.9 : 0.8,
      images: c.images.map(abs),
    })),
  ];
}
