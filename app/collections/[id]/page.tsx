import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteShell from "@/components/layout/SiteShell";
import CategoryView from "@/components/pages/CategoryView";
import StructuredData from "@/components/StructuredData";
import { categories, categoryHref, getCategory } from "@/data/categories";
import { business } from "@/data/business";
import { categoryGraph } from "@/lib/seo";

export function generateStaticParams() {
  return categories.filter((c) => c.id !== "all").map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const cat = getCategory(id);
  if (!cat) return {};
  const title = `${cat.label.mr} | ${business.name.mr}, ${business.city.mr}`;
  const description = `${cat.blurb.mr} ${business.city.mr} येथील ${business.name.mr}मध्ये प्रत्यक्ष पाहा. Gold ${cat.label.en.toLowerCase()} at ${business.name.en}, ${business.city.en}.`;
  return {
    title,
    description,
    alternates: { canonical: categoryHref(id) },
    openGraph: {
      type: "website",
      locale: "mr_IN",
      siteName: business.name.mr,
      url: categoryHref(id),
      title,
      description: cat.blurb.mr,
      images: [{ url: cat.images[0], alt: `${cat.label.mr}, ${business.name.mr}` }],
    },
    twitter: { card: "summary_large_image", title, description: cat.blurb.mr, images: [cat.images[0]] },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  // Resolve the category before anything streams, so unknown ids get a real
  // HTTP 404 instead of a "soft 404" (a 200 page that says not found), which
  // search engines penalise. Every valid id is prerendered by generateStaticParams.
  const { id } = await params;
  const cat = getCategory(id);
  if (!cat) notFound();
  return (
    <SiteShell>
      <CategoryView id={id} />
      <StructuredData nodes={categoryGraph(cat)} />
    </SiteShell>
  );
}
