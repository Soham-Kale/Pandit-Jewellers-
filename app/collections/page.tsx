import type { Metadata } from "next";
import SiteShell from "@/components/layout/SiteShell";
import CategoryView from "@/components/pages/CategoryView";
import StructuredData from "@/components/StructuredData";
import { business } from "@/data/business";
import { getCategory } from "@/data/categories";
import { categoryGraph } from "@/lib/seo";

const title = `सर्व दागिने | ${business.name.mr}, ${business.city.mr}`;
const description = `${business.city.mr} येथील ${business.name.mr}मधील सोन्याचे हार, कानातले, बांगड्या, अंगठ्या, मंगळसूत्र, चेन आणि वधूचे दागिने एकाच ठिकाणी पाहा. All gold jewellery at ${business.name.en}, ${business.city.en}.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/collections" },
  openGraph: {
    type: "website",
    locale: "mr_IN",
    siteName: business.name.mr,
    url: "/collections",
    title,
    description,
    images: [{ url: "/assets/social/share.jpg", width: 1200, height: 630, alt: `${business.name.mr}, ${business.city.mr}` }],
  },
};

export default function AllCollectionsPage() {
  return (
    <SiteShell>
      <CategoryView id="all" />
      <StructuredData nodes={categoryGraph(getCategory("all")!)} />
    </SiteShell>
  );
}
