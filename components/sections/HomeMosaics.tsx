"use client";

import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { categoryHref, getCategory } from "@/data/categories";
import { collections } from "@/data/collections";
import { home } from "@/data/home";
import { useLang } from "@/lib/i18n";

const col = (slug: string) => collections.find((c) => c.slug === slug)!;

/** One tall tile beside two stacked tiles, each opening a category page. */
export function CollectionsMosaic() {
  const { lang } = useLang();
  const tiles = [
    { c: col("necklaces"), id: "necklaces", cls: "aspect-[4/5] sm:aspect-auto sm:row-span-2" },
    { c: col("bangles"), id: "bangles", cls: "aspect-[5/3]" },
    { c: col("mangalsutra"), id: "mangalsutra", cls: "aspect-[5/3]" },
  ];
  return (
    <section aria-labelledby="mosaic-title" className="section-y">
      <div className="container-lux">
        <SectionHeading id="mosaic-title" title={home.collections.title[lang]} intro={home.collections.sub[lang]} />
        <Reveal className="mt-8 grid gap-2 sm:grid-cols-2 lg:mt-10">
          {tiles.map(({ c, id, cls }) => (
            <Link key={id} href={categoryHref(id)} className={`group relative block overflow-hidden rounded-xl bg-ivory-deep ${cls}`}>
              <Image src={c.image} alt={c.alt[lang]} fill quality={85} sizes="(min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-[1.4s] ease-luxe group-hover:scale-105" />
              <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <span className="absolute inset-x-0 bottom-0 p-6 text-3xl text-white lg:p-8 lg:text-[2.5rem]">{c.name[lang]}</span>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/** Two-by-two tiles with a maroon wash and a centred label, one per occasion. */
export function WorldMosaic() {
  const { lang } = useLang();
  const tiles = [
    { id: "wedding", img: col("bridal") },
    { id: "traditional", img: col("maharashtrian") },
    { id: "all", img: col("earrings") },
    { id: "daily", img: col("chains") },
  ];
  return (
    <section aria-labelledby="world-title" className="section-y">
      <div className="container-lux">
        <SectionHeading id="world-title" title={home.world.title[lang]} intro={home.world.sub[lang]} />
        <Reveal className="mt-8 grid grid-cols-2 gap-2 lg:mt-10">
          {tiles.map(({ id, img }) => (
            <Link key={id} href={categoryHref(id)} className="group relative block aspect-[4/5] overflow-hidden rounded-xl bg-ivory-deep sm:aspect-[3/2]">
              <Image src={img.image} alt={img.alt[lang]} fill quality={85} sizes="50vw" className="object-cover object-top transition-transform duration-[1.4s] ease-luxe group-hover:scale-105" />
              <span aria-hidden className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-burgundy via-burgundy/60 to-transparent" />
              <span className="absolute inset-x-0 bottom-0 pb-4 text-center text-xl font-medium text-white sm:pb-5 sm:text-3xl">{getCategory(id)!.label[lang]}</span>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
