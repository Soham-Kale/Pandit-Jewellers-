import { business } from "@/data/business";
import { collections } from "@/data/collections";

/**
 * LocalBusiness (JewelryStore) structured data.
 * Only verified details are emitted; optional fields appear automatically
 * once they are filled in data/business.ts.
 */
export default function StructuredData() {
  const sameAs = [business.instagram, business.facebook].filter(Boolean);
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "JewelryStore",
    name: business.name.en,
    alternateName: business.name.mr,
    url: business.siteUrl,
    image: `${business.siteUrl}/assets/hero/hero.jpg`,
    description: `Traditional gold jewellery shop in ${business.city.en}, ${business.state.en}.`,
    availableLanguage: ["mr", "en"],
    address: {
      "@type": "PostalAddress",
      ...(business.streetAddress.en ? { streetAddress: business.streetAddress.en } : {}),
      addressLocality: business.city.en,
      addressRegion: business.state.en,
      ...(business.postalCode ? { postalCode: business.postalCode } : {}),
      addressCountry: business.countryCode,
    },
    areaServed: business.city.en,
    knowsAbout: collections.map((c) => c.name.en),
    ...(business.phone ? { telephone: business.phone } : {}),
    ...(business.googleMapsUrl ? { hasMap: business.googleMapsUrl } : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
