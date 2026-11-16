/**
 * Every photograph used on the site, in one place.
 * Swap `src` for the client's own photography as it becomes available
 * (keep files inside /public/assets/<section>/). Sources: see CREDITS.md.
 */
import type { L } from "@/lib/i18n";

export type SiteImage = { src: string; alt: L };

export const images = {
  hero: {
    src: "/assets/hero/hero.jpg",
    alt: { mr: "रेशमी साडीवर परिधान केलेला पारंपरिक सोन्याचा पेंडंट हार", en: "Traditional gold pendant necklace worn with a silk sari" },
  },
  about: {
    src: "/assets/about/about.jpg",
    alt: { mr: "लाल पेहरावात पारंपरिक सोन्याचे दागिने परिधान केलेली वधू", en: "Bride in red wearing full traditional gold jewellery" },
  },
  bridalBanner: {
    src: "/assets/bridal/bridal-banner.jpg",
    alt: { mr: "लाल-सोनेरी पेहरावात पारंपरिक दागिने परिधान केलेली वधू", en: "Indian bride in red and gold wearing traditional bridal jewellery" },
  },
  store: {
    src: "/assets/store/store.jpg",
    alt: { mr: "दुकानात मांडलेली सोन्याची कडी आणि कानातले", en: "Gold bracelets and earrings on a display counter" },
  },
  featured: [
    { src: "/assets/featured/featured-2.jpg", alt: { mr: "कुंदन दागिने आणि नथ परिधान केलेली स्त्री", en: "Woman wearing traditional kundan jewellery with a nath and layered necklace" } },
    { src: "/assets/featured/featured-1.jpg", alt: { mr: "रेशमी साडीवर परिधान केलेले सोन्याचे थरदार हार", en: "Close-up of layered gold necklaces worn with a silk saree" } },
    { src: "/assets/featured/featured-3.jpg", alt: { mr: "बांगड्या आणि कानातल्यांसह सोन्याच्या हाराचा सेट", en: "Gold necklace set with bangles and earrings" } },
    { src: "/assets/featured/featured-4.jpg", alt: { mr: "नथ आणि पोल्की चोकर परिधान केलेली वधू", en: "Bride wearing a traditional nath and a polki choker" } },
  ],
} satisfies Record<string, SiteImage | SiteImage[]>;
