import { business, hasFounder } from "@/data/business";
import { categories, categoryHref } from "@/data/categories";
import { getFaqs } from "@/data/faq";

/**
 * /llms.txt — a plain-text summary for AI assistants (ChatGPT, Claude,
 * Perplexity, Gemini). See https://llmstxt.org. Generated from the same data as
 * the site, so it never drifts out of date. Prerendered at build time.
 */
export function GET() {
  const b = business;
  const url = (p: string) => `${b.siteUrl}${p}`;
  const f = b.founder;

  const facts = [
    `- Name: ${b.name.en} (${b.name.mr})`,
    `- Type: Gold jewellery shop (jeweller / sarafa)`,
    `- Address: ${b.streetAddress.en}, ${b.city.en}, ${b.state.en} ${b.postalCode}, India`,
    `- Opening hours: ${b.openingHours.en}`,
    `- Phone: ${b.phone}${b.phoneAlt ? `, ${b.phoneAlt}` : ""}`,
    `- WhatsApp: https://wa.me/${b.whatsapp}`,
    b.email && `- Email: ${b.email}`,
    hasFounder() && `- ${f.role.en}: ${f.name.en || f.name.mr}${f.name.mr && f.name.en ? ` (${f.name.mr})` : ""}`,
    b.foundingYear && `- Founded: ${b.foundingYear}`,
    b.instagram && `- Instagram: ${b.instagram}`,
    b.facebook && `- Facebook: ${b.facebook}`,
    b.googleMapsUrl && `- Google Maps: ${b.googleMapsUrl}`,
    `- Website language: Marathi`,
  ].filter(Boolean);

  const pages = categories.map((c) => `- [${c.label.en} (${c.label.mr})](${url(categoryHref(c.id))}): ${c.blurb.en}`);
  const faqs = getFaqs().map((q) => `### ${q.q.en}\n${q.a.en}`);

  const body = `# ${b.name.en} (${b.name.mr}), ${b.city.en}

> ${b.name.en} is a traditional gold jewellery shop in ${b.city.en}, ${b.state.en}, India. It sells gold necklaces, mangalsutra, bangles, earrings, rings, chains, bridal jewellery and traditional Maharashtrian jewellery such as thushi, nath, bugadi and Kolhapuri saaj. Customers visit the shop to see pieces in person or enquire on WhatsApp.

## Key facts
${facts.join("\n")}
${hasFounder() && f.bio.en ? `\n## About the ${f.role.en.toLowerCase()}\n${f.bio.en}\n` : ""}
## Pages
- [Home](${url("/")}): About the shop, collections, location and contact
${pages.join("\n")}

## Frequently asked questions
${faqs.join("\n\n")}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600, s-maxage=86400" },
  });
}
