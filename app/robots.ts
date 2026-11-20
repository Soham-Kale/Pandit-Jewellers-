import type { MetadataRoute } from "next";
import { business } from "@/data/business";

/**
 * Search engines and AI assistants are explicitly welcome: being readable by
 * ChatGPT, Gemini, Perplexity, Claude and Copilot is how the shop appears in
 * AI answers ("best jeweller in Shrigonda?").
 */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: AI_CRAWLERS, allow: "/" },
    ],
    sitemap: `${business.siteUrl}/sitemap.xml`,
    host: business.siteUrl,
  };
}
