import type { Metadata } from "next";
import SiteShell from "@/components/layout/SiteShell";
import CategoryView from "@/components/pages/CategoryView";
import { business } from "@/data/business";

export const metadata: Metadata = {
  title: `सर्व दागिने · All Jewellery | ${business.name.mr} · ${business.name.en}`,
  description: `${business.name.en}, ${business.city.en}: necklaces, earrings, bangles, rings, mangalsutra, chains and bridal jewellery.`,
  alternates: { canonical: "/collections" },
};

export default function AllCollectionsPage() {
  return (
    <SiteShell>
      <CategoryView id="all" />
    </SiteShell>
  );
}
