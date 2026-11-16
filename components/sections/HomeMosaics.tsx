"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { staggerParent, staggerChild } from "@/components/ui/Reveal";
import { categoryHref, getCategory } from "@/data/categories";
import { collections } from "@/data/collections";
import { content } from "@/data/content";
import { home } from "@/data/home";
import { useLang } from "@/lib/i18n";

const col = (slug: string) => collections.find((c) => c.slug === slug)!;

/** Editorial layout: one tall feature beside two stacked tiles, each with its name and a one-line description. */
export function CollectionsMosaic() {
  const { lang } = useLang();
  const t = content[lang];
  const tiles = [
    { c: col("necklaces"), id: "necklaces", cls: "aspect-[4/5] md:aspect-auto md:row-span-2", big: true },
    { c: col("bangles"), id: "bangles", cls: "aspect-[16/10]", big: false },
    { c: col("mangalsutra"), id: "mangalsutra", cls: "aspect-[16/10]", big: false },
  ];
  return (
    <section aria-labelledby="mosaic-title" className="section-y">
      <div className="container-lux">
        <SectionHeading
          id="mosaic-title"
          eyebrow={t.collections.eyebrow}
          title={home.collections.title[lang]}
          intro={home.collections.sub[lang]}
          action={{ href: "/collections", label: t.ui.viewAllJewellery }}
        />
        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          className="head-gap grid gap-4 md:grid-cols-2 lg:gap-6"
        >
          {tiles.map(({ c, id, cls, big }) => (
            <motion.div key={id} variants={staggerChild} className={cls}>
              <Link href={categoryHref(id)} className="group relative block h-full overflow-hidden rounded-lg bg-mist">
                <Image
                  src={c.image}
                  alt={c.alt[lang]}
                  fill
                  quality={85}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="zoom-img object-cover"
                />
                <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white sm:p-7">
                  <span>
                    <span className={`block font-medium ${big ? "t-h2" : "t-h3"}`}>{c.name[lang]}</span>
                    <span className="t-caption mt-1 block max-w-sm text-white/80">{c.description[lang]}</span>
                  </span>
                  <span className="grid size-11 shrink-0 place-items-center rounded-full border border-white/50 transition-colors duration-500 group-hover:border-white group-hover:bg-white group-hover:text-burgundy-ink">
                    <ArrowRight className="size-4" strokeWidth={1.75} aria-hidden />
                  </span>
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/** Four tall occasion cards (two-by-two on phones) with the occasion name and its short description. */
export function WorldMosaic() {
  const { lang } = useLang();
  const t = content[lang];
  const tiles = [
    { id: "wedding", img: col("bridal") },
    { id: "traditional", img: col("maharashtrian") },
    { id: "daily", img: col("chains") },
    { id: "all", img: col("rings") },
  ];
  return (
    <section aria-labelledby="world-title" className="section-y">
      <div className="container-lux">
        <SectionHeading id="world-title" eyebrow={t.menu.occasion} title={home.world.title[lang]} intro={home.world.sub[lang]} />
        <motion.ul
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          className="head-gap grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-6"
        >
          {tiles.map(({ id, img }) => {
            const cat = getCategory(id)!;
            return (
              <motion.li key={id} variants={staggerChild}>
                <Link href={categoryHref(id)} className="group block">
                  <span className="relative block aspect-[3/4] overflow-hidden rounded-lg bg-white">
                    <Image src={img.image} alt={img.alt[lang]} fill quality={80} sizes="(min-width: 1024px) 25vw, 50vw" className="zoom-img object-cover object-top" />
                  </span>
                  <span className="mt-4 flex items-center justify-between gap-2">
                    <span className="t-h3 text-burgundy-ink transition-colors group-hover:text-burgundy">{cat.label[lang]}</span>
                    <ArrowRight
                      className="size-4 shrink-0 text-gold-deep transition-transform duration-500 ease-luxe group-hover:translate-x-1"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                  </span>
                  <span className="t-caption mt-1 line-clamp-2 block text-muted">{cat.blurb[lang]}</span>
                </Link>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
