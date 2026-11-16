"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronsRight } from "lucide-react";
import Ornament from "@/components/ui/Ornament";
import { Vine, Diya } from "@/components/ui/BannerArt";
import SectionHeading from "@/components/ui/SectionHeading";
import { staggerParent, staggerChild } from "@/components/ui/Reveal";
import { categoryHref } from "@/data/categories";
import { images } from "@/data/images";
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
    {
      c: col("necklaces"),
      id: "necklaces",
      cls: "aspect-[4/5] md:aspect-auto md:row-span-2",
      big: true,
    },
    { c: col("bangles"), id: "bangles", cls: "aspect-[16/10]", big: false },
    {
      c: col("mangalsutra"),
      id: "mangalsutra",
      cls: "aspect-[16/10]",
      big: false,
    },
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
              <Link
                href={categoryHref(id)}
                className="group relative block h-full overflow-hidden rounded-lg bg-mist"
              >
                <Image
                  src={c.image}
                  alt={c.alt[lang]}
                  fill
                  quality={85}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="zoom-img object-cover"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent"
                />
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white sm:p-7">
                  <span>
                    <span
                      className={`block font-medium ${big ? "t-h2" : "t-h3"}`}
                    >
                      {c.name[lang]}
                    </span>
                    <span className="t-caption mt-1 block max-w-sm text-white/80">
                      {c.description[lang]}
                    </span>
                  </span>
                  <span className="grid size-11 shrink-0 place-items-center rounded-full border border-white/50 transition-colors duration-500 group-hover:border-white group-hover:bg-white group-hover:text-burgundy-ink">
                    <ArrowRight
                      className="size-4"
                      strokeWidth={1.75}
                      aria-hidden
                    />
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

/** Photo, tone and focal point for each promotional banner (copy lives in content.banners.promos). */
const promoArt: Record<
  string,
  { src: string; alt: { mr: string; en: string }; pos: string; dark?: boolean }
> = {
  bridal: { ...pick("bridal"), pos: "object-[50%_22%]" },
  traditional: { ...pick("earrings"), pos: "object-[72%_center]" },
  festival: {
    src: images.featured[1].src,
    alt: images.featured[1].alt,
    pos: "object-center",
    dark: true,
  },
  daily: { ...pick("mangalsutra"), pos: "object-[50%_62%]" },
};
function pick(slug: string) {
  const c = col(slug);
  return { src: c.image, alt: c.alt };
}

/**
 * Four promotional banners in the printed-banner style: photo on the left melting into
 * ivory silk (or purple velvet for the festival banner), with a centred two-line
 * Marathi headline, a gold ornament and a "view" link on the right.
 */
export function PromoBanners() {
  const { lang } = useLang();
  const b = content[lang].banners;
  return (
    <section aria-labelledby="promo-title" className="section-y">
      <div className="container-lux">
        <SectionHeading
          id="promo-title"
          eyebrow={b.promoEyebrow}
          title={b.promoTitle}
          intro={b.promoIntro}
        />
        <motion.ul
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          className="head-gap grid gap-4 md:grid-cols-2 lg:gap-6"
        >
          {b.promos.map((p) => {
            const a = promoArt[p.id];
            return (
              <motion.li key={p.id} variants={staggerChild}>
                <Link
                  href={p.href}
                  className={`group relative isolate flex aspect-[16/10] overflow-hidden rounded-lg ring-1 sm:aspect-[16/8] md:aspect-[16/10] xl:aspect-[16/8] ${
                    a.dark
                      ? "bg-velvet text-ivory ring-gold/30"
                      : "bg-silk ring-gold/25"
                  }`}
                >
                  <span className="fade-r absolute inset-y-0 left-0 w-[58%] overflow-hidden">
                    <Image
                      src={a.src}
                      alt={a.alt[lang]}
                      fill
                      quality={80}
                      sizes="(min-width: 768px) 30vw, 58vw"
                      className={`zoom-img object-cover ${a.pos}`}
                    />
                  </span>
                  <Vine
                    className={`absolute top-2 right-2 -scale-x-100 ${a.dark ? "w-24 opacity-50 sm:w-28" : "w-16 opacity-35 sm:w-20"}`}
                  />
                  <span className="relative ml-auto flex w-[52%] flex-col items-center justify-center px-3 text-center sm:px-6">
                    {p.id === "festival" && (
                      <Diya className="mb-1 size-10 sm:size-12" />
                    )}
                    <span
                      className={`t-promo block ${a.dark ? "text-ivory-gold" : "text-burgundy-ink"}`}
                    >
                      {p.title}
                    </span>
                    <span
                      className={`t-promo block ${a.dark ? "text-shine" : "text-shine-deep"}`}
                    >
                      {p.accent}
                    </span>
                    <Ornament
                      tone={a.dark ? "light" : "dark"}
                      className="mt-3 !w-28 sm:!w-32"
                    />
                    <span
                      className={`t-caption mt-2 hidden sm:block ${a.dark ? "text-ivory/80" : "text-muted"}`}
                    >
                      {p.text}
                    </span>
                    <span
                      className={`mt-3 inline-flex items-center gap-1 text-sm font-semibold sm:text-base ${a.dark ? "text-gold-soft" : "text-burgundy"}`}
                    >
                      {b.view}
                      <ChevronsRight
                        aria-hidden
                        className="size-4 transition-transform duration-500 ease-luxe group-hover:translate-x-1"
                        strokeWidth={2}
                      />
                    </span>
                  </span>
                </Link>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
