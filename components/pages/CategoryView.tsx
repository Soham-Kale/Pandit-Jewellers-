"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import Ornament from "@/components/ui/Ornament";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { Vine } from "@/components/ui/BannerArt";
import CategoryIconGlyph from "@/components/ui/CategoryIcons";
import Collections from "@/components/sections/Collections";
import { categories, categoryHref, getCategory } from "@/data/categories";
import { content } from "@/data/content";
import { whatsappLink, extProps } from "@/data/business";
import { useLang, mrDigits } from "@/lib/i18n";

export default function CategoryView({ id }: { id: string }) {
  const { lang } = useLang();
  const t = content[lang];
  const p = t.categoryPage;
  const cat = getCategory(id)!;
  const name = cat.label[lang];

  // The page content streams in after navigation, so jump to a style anchor once it exists.
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) document.getElementById(hash)?.scrollIntoView({ block: "start" });
  }, [id]);

  return (
    <>
      {/* Banner */}
      <section
        aria-labelledby="cat-title"
        className="bg-velvet relative isolate overflow-hidden text-ivory"
      >
        <div className="fade-b md:fade-l relative h-56 overflow-hidden sm:h-72 md:absolute md:inset-y-0 md:right-0 md:h-auto md:w-[56%]">
          <Image
            src={cat.images[0]}
            alt=""
            fill
            preload
            quality={85}
            sizes="(min-width: 768px) 56vw, 100vw"
            className="object-cover object-[50%_32%]"
          />
        </div>
        <Vine className="absolute bottom-3 left-3 hidden w-36 -scale-y-100 opacity-40 lg:block" />
        <div className="container-lux relative -mt-8 pb-14 md:mt-0 md:py-20 lg:py-24">
          <div className="max-w-xl md:w-[46%]">
            <span className="bg-shine grid size-14 place-items-center rounded-full text-burgundy-ink">
              <CategoryIconGlyph icon={cat.icon} className="size-7" />
            </span>
            <h1 id="cat-title" className="t-display text-ivory-gold mt-5">
              {name}
            </h1>
            <Ornament tone="light" className="mt-5" />
            <p className="t-lead mt-5 text-ivory/85">{cat.blurb[lang]}</p>
          </div>
        </div>
      </section>

      {/* Style chips + sections (anchors from the mega-menu) */}
      {cat.styles.length > 0 && (
        <section
          aria-labelledby="styles-title"
          className="section-y bg-mist !pb-12"
        >
          <div className="container-lux">
            <Reveal>
              <h2 id="styles-title" className="t-h2 text-burgundy-ink">
                {p.stylesTitle(name)}
              </h2>
              <p className="t-lead mt-3 max-w-2xl text-muted">
                {p.stylesIntro}
              </p>
            </Reveal>
            <ul className="head-gap grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
              {cat.styles.map((s, i) => {
                const wa = whatsappLink(p.enquireMsg(s.label[lang], name));
                return (
                  <Reveal
                    as="li"
                    key={s.id}
                    delay={i * 0.05}
                    className="scroll-mt-40"
                  >
                    <div
                      id={`style-${s.id}`}
                      className="flex h-full scroll-mt-10 flex-col rounded-lg bg-white p-6 ring-1 ring-line transition-shadow duration-500 hover:shadow-[0_22px_40px_-28px_rgba(74,36,117,0.5)] sm:p-7"
                    >
                      <p className="text-shine-deep text-base font-semibold">
                        {mrDigits(`0${i + 1}`)}
                      </p>
                      <h3 className="t-h3 mt-1 text-burgundy-ink">
                        {s.label[lang]}
                      </h3>
                      <p className="t-body mt-2 flex-1 text-muted">
                        {s.text[lang]}
                      </p>
                      <a
                        href={wa}
                        {...extProps(wa)}
                        className="mt-5 inline-flex items-center gap-2 font-semibold text-gold-deep hover:text-burgundy"
                      >
                        <WhatsAppIcon className="size-4" />
                        {p.enquire}
                      </a>
                    </div>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </section>
      )}

      {/* Matching collections (same filter chips + search as the homepage) */}
      <div className={cat.styles.length ? "[&_section]:!pt-6" : ""}>
        <Collections initialCategory={id} headingless />
      </div>

      {/* Other categories */}
      <section
        aria-labelledby="related-title"
        className="section-y border-t border-line"
      >
        <div className="container-lux">
          <h2 id="related-title" className="t-h2 text-center text-burgundy-ink">
            {p.related}
          </h2>
          <Ornament className="mx-auto mt-5" />
          <ul className="head-gap grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {categories
              .filter((c) => c.id !== id)
              .map((c) => (
                <li key={c.id}>
                  <Link
                    href={categoryHref(c.id)}
                    className="group flex h-full min-h-16 items-center gap-3 rounded-lg border border-line bg-white p-4 transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-0.5 hover:border-gold hover:shadow-[0_16px_30px_-22px_rgba(74,36,117,0.6)]"
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-mist text-burgundy group-hover:text-gold-deep">
                      <CategoryIconGlyph icon={c.icon} className="size-5" />
                    </span>
                    <span className="font-semibold text-burgundy-ink">
                      {c.label[lang]}
                    </span>
                    <ArrowUpRight
                      className="ml-auto size-4 text-gold-deep opacity-0 transition-opacity group-hover:opacity-100"
                      aria-hidden
                    />
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </section>

      {/* Visit / enquire */}
      <section className="bg-mist">
        <div className="container-lux section-tight flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="t-h2 text-burgundy-ink">{p.cta}</p>
            <p className="t-lead mt-2 text-muted">{p.ctaText}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              href={whatsappLink(t.wa.collection(name))}
              variant="burgundy"
              icon={<WhatsAppIcon className="size-4" />}
            >
              {t.contact.enquire}
            </Button>
            <Button
              href="/#store"
              variant="outline-dark"
              icon={
                <MapPin className="size-4" strokeWidth={1.75} aria-hidden />
              }
            >
              {t.header.visit}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
