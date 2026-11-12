/**
 * Single source of truth for all business details.
 *
 * ⚠️  PLACEHOLDERS: every value left as "" below has NOT been verified.
 *     Fill them in before going live. Empty values show "To be confirmed" /
 *     "निश्चित होणे बाकी" on the site and fall back gracefully.
 */
import type { Lang, L } from "@/lib/i18n";

export const TBC: L = { mr: "निश्चित होणे बाकी", en: "To be confirmed" };

export const business = {
  /** Brand name in both languages — change here to rename the site (e.g. "Pandit Jewellers"). */
  name: { mr: "पंडित ज्वेलर्स", en: "Pundit Jewellers" } as L,
  shortName: { mr: "पंडित", en: "Pundit" } as L,
  descriptor: { mr: "ज्वेलर्स", en: "Jewellers" } as L,
  city: { mr: "श्रीगोंदा", en: "Shrigonda" } as L,
  state: { mr: "महाराष्ट्र", en: "Maharashtra" } as L,
  countryCode: "IN",

  /** PLACEHOLDER — exact street address (both languages). */
  streetAddress: { mr: "", en: "" } as L,
  /** PLACEHOLDER — postal code. */
  postalCode: "",
  /** PLACEHOLDER — opening hours (both languages), e.g. { mr: "सकाळी १० ते रात्री ८", en: "10 am – 8 pm" }. */
  openingHours: { mr: "", en: "" } as L,

  /** PLACEHOLDER — phone in display format, e.g. "+91 98XXX XXXXX". */
  phone: "",
  /** PLACEHOLDER — WhatsApp number, digits only with country code, e.g. "9198XXXXXXXX". */
  whatsapp: "",
  /** PLACEHOLDER — e.g. "https://www.instagram.com/punditjewellers". */
  instagram: "",
  /** PLACEHOLDER — e.g. "https://www.facebook.com/punditjewellers". */
  facebook: "",
  /** PLACEHOLDER — the shop's exact Google Maps share link. Until set, a Maps search is used. */
  googleMapsUrl: "",

  /** PLACEHOLDER — production domain, used for canonical URL, sitemap and Open Graph. */
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.punditjewellers.example",
};

export const locationLine = (lang: Lang) => `${business.city[lang]}, ${business.state[lang]}`;

export function addressText(lang: Lang): string {
  const street = business.streetAddress[lang];
  return street ? `${street}, ${locationLine(lang)}${business.postalCode ? ` ${business.postalCode}` : ""}` : locationLine(lang);
}

export function mapsLink(): string {
  if (business.googleMapsUrl) return business.googleMapsUrl;
  const q = encodeURIComponent(`${business.name.en} ${business.city.en} ${business.state.en}`);
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

/** WhatsApp deep link; falls back to the Contact section while the number is a placeholder. */
export function whatsappLink(message?: string): string {
  if (!business.whatsapp) return "#contact";
  const text = message ?? `Hello ${business.name.en}, I would like to enquire about your jewellery.`;
  return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function phoneLink(): string {
  return business.phone ? `tel:${business.phone.replace(/[^+\d]/g, "")}` : "#contact";
}

export const isExternal = (href: string) => href.startsWith("http");
export const extProps = (href: string) => (isExternal(href) ? { target: "_blank", rel: "noopener noreferrer" } : {});
