import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteShell from "@/components/layout/SiteShell";
import CategoryView from "@/components/pages/CategoryView";
import { categories, categoryHref, getCategory } from "@/data/categories";
import { business } from "@/data/business";

export function generateStaticParams() {
  return categories.filter((c) => c.id !== "all").map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const cat = getCategory(id);
  if (!cat) return {};
  const title = `${cat.label.mr} | ${business.name.mr}, ${business.city.mr}`;
  return {
    title,
    description: `${cat.blurb.mr} ${business.city.mr} येथील ${business.name.mr}मध्ये प्रत्यक्ष पाहा.`,
    alternates: { canonical: categoryHref(id) },
    openGraph: { title, description: cat.blurb.mr, images: [{ url: cat.images[0] }] },
  };
}

export default function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  // The header and footer are shared by every category, so they stay in the
  // App Shell; only the part that depends on the URL waits for `params`.
  return (
    <SiteShell>
      <Suspense fallback={<CategoryFallback />}>
        <CategoryContent params={params} />
      </Suspense>
    </SiteShell>
  );
}

async function CategoryContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!getCategory(id)) notFound();
  return <CategoryView id={id} />;
}

function CategoryFallback() {
  return <div aria-hidden className="bg-wine-glow h-[22rem] animate-pulse md:h-[26rem]" />;
}
