"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowUpRight, ChevronsRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import Ornament from "@/components/ui/Ornament";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { FloralMandala, Lotus } from "@/components/ui/BannerArt";
import CategoryIconGlyph from "@/components/ui/CategoryIcons";
import Collections from "@/components/sections/Collections";
import Gallery from "@/components/sections/Gallery";
import { categories, categoryHref, getCategory } from "@/data/categories";
import { content } from "@/data/content";
import { whatsappLink, extProps } from "@/data/business";
import { useLang, mrDigits } from "@/lib/i18n";

/**
 * Banner arch (phones), in a stretched 100×100 box: the frame's sides rise, curl
 * inward at the shoulders, then an onion dome climbs to a point at the centre.
 */
const ARCH =
  "M9,100 L9,84 C9,77 12,73 17,73 L20,73 C23,62 30,57 36,52 C40,46 44,14 50,10 C56,14 60,46 64,52 C70,57 77,62 80,73 L83,73 C88,73 91,77 91,84 L91,100";
const GOLD_LINE = "#d9b25a";

export default function CategoryView({ id }: { id: string }) {
  const { lang } = useLang();
  const t = content[lang];
  const p = t.categoryPage;
  const cat = getCategory(id)!;
  const name = cat.label[lang];
  // Phones: one-word titles sit inside the arch's dome (as in the design); two-word
  // titles are wider than the dome, so they start just below its shoulders.
  const longName = name.includes(" ");

  // The page content streams in after navigation, so jump to a style anchor once it exists.
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) document.getElementById(hash)?.scrollIntoView({ block: "start" });
  }, [id]);

  return (
    <>
      {/* Banner: "temple arch" design, shared by every category page.
          Phones: the photo melts into purple velvet; a thin gold mihrab arch (curled
          shoulders, onion dome, line-art lotus in the dome) frames the centred title,
          lotus divider, text and button.
          Tablets and up: photo on the right melting into velvet, copy centred on the left. */}
      <section
        aria-labelledby="cat-title"
        className="bg-velvet relative isolate overflow-hidden text-ivory"
      >
        <div className="cat-photo-fade md:fade-l relative aspect-square overflow-hidden sm:aspect-[16/9] md:absolute md:inset-y-0 md:right-0 md:aspect-auto md:w-[56%]">
          <Image
            src={cat.images[0]}
            alt=""
            fill
            preload
            quality={85}
            sizes="(min-width: 768px) 56vw, 100vw"
            className="object-cover object-[50%_35%]"
          />
        </div>
        <FloralMandala className="pointer-events-none absolute -bottom-8 -left-8 w-32 opacity-35 md:-bottom-14 md:-left-14 md:w-56 md:opacity-25" />

        <div className="relative -mt-16 sm:-mt-20 md:mt-0">
          {/* Phones: the gold mihrab arch; its sides continue down as the frame */}
          <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-x-0 top-0 h-28 w-full md:hidden">
            <path d={ARCH} fill="none" stroke={GOLD_LINE} strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
          </svg>
          <span aria-hidden className="absolute inset-x-[9%] top-[5.85rem] bottom-6 border-x-[1.4px] border-[#d9b25a] md:hidden" />
          <Lotus outline className="absolute top-[1.55rem] left-1/2 h-8 w-12 -translate-x-1/2 md:hidden" />

          <div className={`container-lux relative pb-12 md:py-20 lg:py-24 ${longName ? "pt-[5.6rem]" : "pt-[3.5rem]"}`}>
            <div className="mx-auto flex w-[80%] max-w-[19rem] flex-col items-center text-center sm:max-w-md md:mx-0 md:w-[44%] md:max-w-none">
              <span className="bg-shine hidden size-16 place-items-center rounded-full text-burgundy-ink shadow-[0_10px_24px_-12px_rgba(221,183,81,0.8)] md:grid lg:size-[4.5rem]">
                <CategoryIconGlyph icon={cat.icon} className="size-8 lg:size-9" />
              </span>
              <h1
                id="cat-title"
                className={`t-display text-shine font-bold md:mt-5 ${longName ? "max-md:text-[2.3rem]" : "max-md:text-[3rem] max-md:leading-[1.15]"}`}
              >
                {name}
              </h1>
              <div aria-hidden className="mt-2 flex w-36 items-center gap-2 md:mt-4 md:w-64">
                <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold-soft" />
                <Lotus outline className="h-4 w-6 shrink-0 md:h-6 md:w-9" />
                <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold-soft" />
              </div>
              <p className="t-lead mt-3 text-ivory/90 md:mt-5 md:text-xl md:font-medium">{cat.blurb[lang]}</p>
              <a
                href={whatsappLink(t.wa.collection(name))}
                {...extProps(whatsappLink(t.wa.collection(name)))}
                className="bg-shine group mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 text-base font-bold md:mt-8 md:min-h-14 md:px-9 md:text-lg text-burgundy-ink shadow-[0_14px_30px_-14px_rgba(221,183,81,0.7)] transition-transform duration-500 ease-luxe hover:-translate-y-0.5"
              >
                {t.contact.enquire}
                <ChevronsRight aria-hidden className="size-4 transition-transform duration-500 ease-luxe group-hover:translate-x-1" strokeWidth={2} />
              </a>
            </div>
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

      {/* Photo gallery, pre-filtered to this category */}
      <Gallery key={id} initialCategory={id} />

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
