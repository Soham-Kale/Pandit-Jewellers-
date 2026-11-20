/**
 * Single source of truth for all business details.
 *
 * ⚠️  PLACEHOLDERS: every value left as "" below has NOT been verified.
 *     Fill them in before going live. Empty values show "To be confirmed" /
 *     "निश्चित होणे बाकी" on the site and fall back gracefully.
 */
import { mrDigits, type Lang, type L } from "@/lib/lang";

export const TBC: L = { mr: "निश्चित होणे बाकी", en: "To be confirmed" };

export const business = {
  /** Brand name in both languages — change here to rename the site (e.g. "Pandit Jewellers"). */
  name: { mr: "पंडित ज्वेलर्स", en: "Pandit Jewellers" } as L,
  shortName: { mr: "पंडित", en: "Pandit" } as L,
  descriptor: { mr: "ज्वेलर्स", en: "Jewellers" } as L,
  city: { mr: "श्रीगोंदा", en: "Shrigonda" } as L,
  state: { mr: "महाराष्ट्र", en: "Maharashtra" } as L,
  countryCode: "IN",

  /** One-line description of the business. */
  description: {
    mr: "पंडित ज्वेलर्स हे श्रीगोंदा, महाराष्ट्र येथील दागिन्यांचे दुकान आहे.",
    en: "Pandit Jewellers is a jewellery showroom located in Shrigonda, Maharashtra.",
  } as L,

  /** Street address (both languages). */
  streetAddress: { mr: "श्री संत रोहिदास चौक, तांबोळी कॉर्नर", en: "Shri Sant Rohidas Chowk, Tamboli Corner" } as L,
  postalCode: "413701",
  /** Opening hours (both languages). */
  openingHours: {
    mr: "सकाळी १०:०० ते सायंकाळी ६:०० (मंगळवारी बंद)",
    en: "10:00 AM – 6:00 PM (Mon, Wed – Sun; closed on Tuesdays)",
  } as L,
  /** Machine-readable hours for search engines (schema.org). */
  openingHoursSchema: {
    days: ["Monday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "10:00",
    closes: "18:00",
  },

  /** Main phone in display format. */
  phone: "+91 98815 38938",
  /** Alternate phone (as listed with the Shree Pandit Jewellers Instagram). */
  phoneAlt: "+91 86051 36347",
  /** Email address. */
  email: "panditjewellers38@gmail.com",
  /** WhatsApp number, digits only with country code. Assumed to be the main shop number. */
  whatsapp: "919881538938",
  /** PLACEHOLDER — e.g. "https://www.instagram.com/panditjewellers". */
  instagram: "",
  /** PLACEHOLDER — e.g. "https://www.facebook.com/panditjewellers". */
  facebook: "",
  /** PLACEHOLDER — the shop's exact Google Maps share link. Until set, a Maps search is used. */
  googleMapsUrl: "",

  /**
   * PLACEHOLDER — founder / owner. Fill these in so Google and AI assistants
   * (ChatGPT, Gemini, Perplexity, Claude) can answer "who founded Pandit
   * Jewellers?". Nothing about the founder is shown or published while empty.
   */
  founder: {
    name: { mr: "", en: "" } as L,
    /** e.g. { mr: "संस्थापक", en: "Founder" } or "Proprietor". */
    role: { mr: "संस्थापक", en: "Founder" } as L,
    /** One or two factual sentences, e.g. family background in the gold trade. */
    bio: { mr: "", en: "" } as L,
  },
  /** PLACEHOLDER — year the shop opened, e.g. "1985". Used in search data and the FAQ. */
  foundingYear: "",
  /** Brand logo (square), used for search-engine and AI knowledge panels. */
  logo: "/assets/logo/logo.png",

  /** PLACEHOLDER — production domain, used for canonical URL, sitemap and Open Graph. */
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.panditjewellers.example").replace(/\/+$/, ""),
};

export const hasFounder = () => Boolean(business.founder.name.en || business.founder.name.mr);

export const locationLine = (lang: Lang) => `${business.city[lang]}, ${business.state[lang]}`;

export function addressText(lang: Lang): string {
  const street = business.streetAddress[lang];
  return street ? `${street}, ${locationLine(lang)}${business.postalCode ? ` ${mrDigits(business.postalCode)}` : ""}` : locationLine(lang);
}

/** Map shown on the page (no API key needed). Replace with the shop's own Google Maps "Embed a map" link for an exact pin. */
export function mapsEmbedUrl(): string {
  const q = encodeURIComponent(
    `${business.name.en}, ${business.streetAddress.en ? `${business.streetAddress.en}, ` : ""}${business.city.en}, ${business.state.en} ${business.postalCode}`.trim(),
  );
  return `https://www.google.com/maps?q=${q}&output=embed`;
}

export function mapsLink(): string {
  if (business.googleMapsUrl) return business.googleMapsUrl;
  const q = encodeURIComponent(
    `${business.name.en}, ${business.streetAddress.en ? `${business.streetAddress.en}, ` : ""}${business.city.en}, ${business.state.en} ${business.postalCode}`.trim(),
  );
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

/** WhatsApp deep link; falls back to the Contact section while the number is a placeholder. */
export function whatsappLink(message?: string): string {
  if (!business.whatsapp) return "#contact";
  const text = message ?? `Hello ${business.name.en}, I would like to enquire about your jewellery.`;
  return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function phoneLink(phone: string = business.phone): string {
  return phone ? `tel:${phone.replace(/[^+\d]/g, "")}` : "#contact";
}

export function emailLink(): string {
  return business.email ? `mailto:${business.email}` : "#contact";
}

export const isExternal = (href: string) => href.startsWith("http");
export const extProps = (href: string) => (isExternal(href) ? { target: "_blank", rel: "noopener noreferrer" } : {});
