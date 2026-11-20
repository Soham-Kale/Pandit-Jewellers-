/**
 * Structured data (schema.org JSON-LD) shared by every page.
 *
 * Entities use stable `@id`s so Google's Knowledge Graph and AI answer engines
 * can link the store, its website, its founder and each page into one entity.
 * Optional facts (founder, founding year, socials, map link) are emitted only
 * once they are filled in data/business.ts — nothing unverified is published.
 */
import { business, hasFounder } from "@/data/business";
import { categories, categoryHref, type Category } from "@/data/categories";
import type { Faq } from "@/data/faq";

const site = business.siteUrl;
export const abs = (path: string) => (path.startsWith("http") ? path : `${site}${path.startsWith("/") ? "" : "/"}${path}`);

export const ids = {
  store: `${site}/#store`,
  website: `${site}/#website`,
  founder: `${site}/#founder`,
  logo: `${site}/#logo`,
};

type Node = Record<string, unknown>;

function founderNode(): Node | null {
  if (!hasFounder()) return null;
  const f = business.founder;
  return {
    "@type": "Person",
    "@id": ids.founder,
    name: f.name.en || f.name.mr,
    ...(f.name.mr && f.name.en ? { alternateName: f.name.mr } : {}),
    jobTitle: f.role.en,
    ...(f.bio.en ? { description: f.bio.en } : {}),
    worksFor: { "@id": ids.store },
  };
}

function storeNode(): Node {
  const b = business;
  const sameAs = [b.instagram, b.facebook, b.googleMapsUrl].filter(Boolean);
  const productCats = categories.filter((c) => !["all", "daily", "wedding", "traditional"].includes(c.id));
  return {
    "@type": "JewelryStore",
    "@id": ids.store,
    name: b.name.en,
    alternateName: [b.name.mr, `Shree ${b.name.en}`, `${b.name.en} ${b.city.en}`],
    url: `${site}/`,
    logo: { "@type": "ImageObject", "@id": ids.logo, url: abs(b.logo), width: 512, height: 512 },
    image: [abs("/assets/hero/hero.jpg"), abs("/assets/store/store.jpg"), abs("/assets/social/share.jpg")],
    description:
      `${b.name.en} is a traditional gold jewellery shop in ${b.city.en}, ${b.state.en}, India, ` +
      `offering gold necklaces, mangalsutra, bangles, earrings, rings, chains, bridal jewellery and ` +
      `traditional Maharashtrian pieces such as thushi, nath and bugadi.`,
    slogan: "विश्वासाचे सोने, परंपरेचा साज",
    knowsLanguage: ["mr", "en"],
    currenciesAccepted: "INR",
    address: {
      "@type": "PostalAddress",
      streetAddress: b.streetAddress.en,
      addressLocality: b.city.en,
      addressRegion: b.state.en,
      postalCode: b.postalCode,
      addressCountry: b.countryCode,
    },
    areaServed: [
      { "@type": "City", name: b.city.en },
      { "@type": "AdministrativeArea", name: "Ahilyanagar (Ahmednagar) district" },
      { "@type": "State", name: b.state.en },
    ],
    telephone: b.phone,
    ...(b.email ? { email: b.email } : {}),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: b.phone,
        ...(b.email ? { email: b.email } : {}),
        availableLanguage: ["Marathi", "English"],
        areaServed: "IN",
      },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: b.openingHoursSchema.days,
        opens: b.openingHoursSchema.opens,
        closes: b.openingHoursSchema.closes,
      },
    ],
    hasMap: b.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${b.name.en}, ${b.city.en}`)}`,
    knowsAbout: [
      "Gold jewellery",
      "Bridal jewellery",
      "Maharashtrian jewellery",
      "Mangalsutra",
      "Thushi",
      "Nath",
      "Bugadi",
      "Kolhapuri saaj",
      "Temple jewellery",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Gold jewellery",
      itemListElement: productCats.map((c) => ({
        "@type": "OfferCatalog",
        name: c.label.en,
        alternateName: c.label.mr,
        url: abs(categoryHref(c.id)),
      })),
    },
    ...(b.foundingYear ? { foundingDate: b.foundingYear } : {}),
    ...(hasFounder() ? { founder: { "@id": ids.founder } } : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };
}

function websiteNode(): Node {
  return {
    "@type": "WebSite",
    "@id": ids.website,
    url: `${site}/`,
    name: business.name.en,
    alternateName: business.name.mr,
    inLanguage: "mr-IN",
    publisher: { "@id": ids.store },
  };
}

/** Site-wide entities (store, website, founder). Rendered once on the homepage. */
export function siteGraph(): Node[] {
  return [storeNode(), websiteNode(), founderNode()].filter(Boolean) as Node[];
}

export function faqNode(faqs: Faq[]): Node {
  return {
    "@type": "FAQPage",
    "@id": `${site}/#faq`,
    inLanguage: "mr-IN",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q.mr,
      alternateName: f.q.en,
      acceptedAnswer: { "@type": "Answer", text: f.a.mr, alternateName: f.a.en },
    })),
  };
}

/** Breadcrumb + CollectionPage for a category (or the "all" listing). */
export function categoryGraph(cat: Category): Node[] {
  const url = abs(categoryHref(cat.id));
  const crumbs = [
    { name: business.name.mr, url: `${site}/` },
    ...(cat.id === "all" ? [] : [{ name: "सर्व दागिने", url: abs("/collections") }]),
    { name: cat.label.mr, url },
  ];
  return [
    {
      "@type": "CollectionPage",
      "@id": `${url}#page`,
      url,
      name: `${cat.label.mr} (${cat.label.en}) | ${business.name.en}, ${business.city.en}`,
      description: cat.blurb.en,
      inLanguage: "mr-IN",
      isPartOf: { "@id": ids.website },
      about: { "@id": ids.store },
      primaryImageOfPage: abs(cat.images[0]),
      breadcrumb: { "@id": `${url}#breadcrumb` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: c.url })),
    },
  ];
}

/** Serialises nodes as one @graph, escaping `<` to prevent script injection. */
export function jsonLd(nodes: Node[]): string {
  return JSON.stringify({ "@context": "https://schema.org", "@graph": nodes }).replace(/</g, "\\u003c");
}
