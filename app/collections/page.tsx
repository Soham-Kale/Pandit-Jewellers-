import type { Metadata } from "next";
import SiteShell from "@/components/layout/SiteShell";
import CategoryView from "@/components/pages/CategoryView";
import { business } from "@/data/business";

export const metadata: Metadata = {
  title: `सर्व दागिने | ${business.name.mr}, ${business.city.mr}`,
  description: `${business.city.mr} येथील ${business.name.mr}मधील सोन्याचे हार, कानातले, बांगड्या, अंगठ्या, मंगळसूत्र, चेन आणि वधूचे दागिने एकाच ठिकाणी पाहा.`,
  alternates: { canonical: "/collections" },
};

export default function AllCollectionsPage() {
  return (
    <SiteShell>
      <CategoryView id="all" />
    </SiteShell>
  );
}
