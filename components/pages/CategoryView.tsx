"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, MapPin, ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import Ornament from "@/components/ui/Ornament";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import CategoryIconGlyph from "@/components/ui/CategoryIcons";
import Collections from "@/components/sections/Collections";
import { categories, categoryHref, getCategory } from "@/data/categories";
import { content } from "@/data/content";
import { whatsappLink, extProps } from "@/data/business";
import { useLang } from "@/lib/i18n";

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
      <section aria-labelledby="cat-title" className="relative isolate overflow-hidden bg-burgundy-ink text-ivory">
        <Image src={cat.images[0]} alt="" fill preload quality={85} sizes="100vw" className="-z-10 object-cover" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-burgundy-ink/90 via-burgundy/60 to-burgundy/10" />
        <div className="container-lux py-14 lg:py-20">
          <nav aria-label="मार्गदर्शक दुवे">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ivory/75">
              <li>
                <Link href="/" className="hover:text-gold-soft">
                  {p.home}
                </Link>
              </li>
              <ChevronRight className="size-3.5" aria-hidden />
              {id !== "all" && (
                <>
                  <li>
                    <Link href="/collections" className="hover:text-gold-soft">
                      {p.all}
                    </Link>
                  </li>
                  <ChevronRight className="size-3.5" aria-hidden />
                </>
              )}
              <li aria-current="page" className="text-gold-soft">
                {name}
              </li>
            </ol>
          </nav>
          <div className="mt-8 max-w-2xl">
            <span className="bg-shine grid size-14 place-items-center rounded-full text-burgundy-ink">
              <CategoryIconGlyph icon={cat.icon} className="size-7" />
            </span>
            <h1 id="cat-title" className="mt-5 text-5xl font-semibold sm:text-6xl">
              {name}
            </h1>
            <Ornament tone="light" className="mt-5" />
            <p className="mt-5 text-lg leading-relaxed text-ivory/90 sm:text-xl">{cat.blurb[lang]}</p>
          </div>
        </div>
      </section>

      {/* Style chips + sections (anchors from the mega-menu) */}
      {cat.styles.length > 0 && (
        <section aria-labelledby="styles-title" className="section-y bg-ivory-glow !pb-10">
          <div className="container-lux">
            <Reveal>
              <h2 id="styles-title" className="text-3xl font-semibold text-burgundy sm:text-4xl">
                {p.stylesTitle(name)}
              </h2>
              <p className="mt-3 max-w-2xl text-lg text-muted">{p.stylesIntro}</p>
            </Reveal>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {cat.styles.map((s, i) => {
                const wa = whatsappLink(p.enquireMsg(s.label[lang], name));
                return (
                  <Reveal as="li" key={s.id} delay={i * 0.05} className="scroll-mt-40">
                    <div id={`style-${s.id}`} className="scroll-mt-10 frame-shine flex h-full flex-col rounded-xl bg-surface p-6 shadow-[0_20px_45px_-30px_rgba(74,36,117,0.45)]">
                      <p className="text-shine-deep text-sm font-bold">0{i + 1}</p>
                      <h3 className="mt-1 text-2xl font-semibold text-burgundy">{s.label[lang]}</h3>
                      <p className="mt-2 flex-1 text-muted">{s.text[lang]}</p>
                      <a href={wa} {...extProps(wa)} className="mt-5 inline-flex items-center gap-2 font-semibold text-gold-deep hover:text-burgundy">
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
      <section aria-labelledby="related-title" className="section-y bg-blush/60">
        <div className="container-lux">
          <h2 id="related-title" className="text-center text-3xl font-semibold text-burgundy sm:text-4xl">
            {p.related}
          </h2>
          <Ornament className="mx-auto mt-5" />
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {categories
              .filter((c) => c.id !== id)
              .map((c) => (
                <li key={c.id}>
                  <Link
                    href={categoryHref(c.id)}
                    className="group flex h-full items-center gap-3 rounded-xl border border-line bg-surface p-4 transition-all hover:-translate-y-0.5 hover:border-gold hover:shadow-[0_16px_30px_-22px_rgba(74,36,117,0.6)]"
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-ivory-deep text-burgundy group-hover:text-gold-deep">
                      <CategoryIconGlyph icon={c.icon} className="size-5" />
                    </span>
                    <span className="font-semibold text-burgundy">{c.label[lang]}</span>
                    <ArrowUpRight className="ml-auto size-4 text-gold-deep opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </section>

      {/* Visit / enquire */}
      <section className="bg-wine-glow text-ivory">
        <div className="container-lux flex flex-col items-start gap-6 py-14 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-shine text-3xl font-semibold sm:text-4xl">{p.cta}</p>
            <p className="mt-2 text-lg text-ivory/85">{p.ctaText}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href={whatsappLink(t.wa.collection(name))} variant="gold" icon={<WhatsAppIcon />}>
              {t.contact.enquire}
            </Button>
            <Button href="/#store" variant="outline-light" icon={<MapPin className="size-4" strokeWidth={1.75} aria-hidden />}>
              {t.header.visit}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
