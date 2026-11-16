"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { SearchX, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import CategoryIconGlyph from "@/components/ui/CategoryIcons";
import { collections, type Collection } from "@/data/collections";
import { categories, categoryHref, searchAliases } from "@/data/categories";
import { home } from "@/data/home";
import { content } from "@/data/content";
import { whatsappLink, extProps } from "@/data/business";
import { useLang, mrDigits } from "@/lib/i18n";
import { setFilter, useFilter } from "@/lib/filter";

const EASE = [0.22, 1, 0.36, 1] as const;
// Collections without a category page of their own open the closest one.
const cardCategory: Record<string, string> = { bridal: "wedding", maharashtrian: "traditional" };

function matchesQuery(c: Collection, q: string) {
  const needle = q.trim().toLowerCase();
  if (!needle) return true;
  const hay = [c.name.mr, c.name.en, c.description.mr, c.description.en, ...(searchAliases[c.slug] ?? [])].join(" ").toLowerCase();
  return needle.split(/\s+/).every((w) => hay.includes(w));
}

export default function Collections({ initialCategory = "all", headingless = false }: { initialCategory?: string; headingless?: boolean }) {
  const { lang } = useLang();
  // Each page starts with its own category selected.
  useEffect(() => setFilter({ category: initialCategory, query: "" }), [initialCategory]);
  const t = content[lang];
  const { category, query } = useFilter();
  const active = categories.find((c) => c.id === category) ?? categories[0];
  const visible = collections.filter((c) => active.matches(c) && matchesQuery(c, query));
  const showViewAll = !headingless && active.id === "all" && !query.trim();

  return (
    <section id="collections" aria-labelledby="collections-title" className={`section-y ${headingless ? "bg-white" : "bg-mist"}`}>
      <div className="container-lux">
        {headingless ? (
          <h2 id="collections-title" className="sr-only">
            {t.collections.title}
          </h2>
        ) : (
          <SectionHeading id="collections-title" eyebrow={t.header.categories} title={home.categories.title[lang]} intro={home.categories.sub[lang]} />
        )}

        {/* Filter chips (mirrors the header category bar) */}
        <div className={headingless ? "" : "head-gap"}>
          <p className="sr-only">{t.collections.filterLabel}</p>
          <ul className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
            {categories.map((c) => {
              const on = c.id === active.id;
              return (
                <li key={c.id} className="shrink-0">
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => setFilter({ category: c.id, query: "" })}
                    className={`inline-flex min-h-10 items-center gap-2 rounded-full border px-4 text-[0.92rem] font-medium whitespace-nowrap transition-all duration-300 ${
                      on ? "border-burgundy bg-burgundy text-white shadow-[0_8px_18px_-12px_rgba(74,36,117,0.9)]" : "border-line bg-white text-charcoal/85 hover:border-gold hover:text-burgundy"
                    }`}
                  >
                    <CategoryIconGlyph icon={c.icon} className="size-[1.1rem]" />
                    {c.label[lang]}
                  </button>
                </li>
              );
            })}
          </ul>
          {query.trim() && <p className="t-lead mt-5 text-muted">{t.collections.resultsFor(query.trim())}</p>}
        </div>

        <motion.ul layout className="mt-8 grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 lg:mt-10 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-12">
          <AnimatePresence mode="popLayout" initial={false}>
            {(showViewAll ? visible.slice(0, 7) : visible).map((c, i) => {
              const name = c.name[lang];
              // On the homepage a card opens its category page; on a category page it starts a WhatsApp enquiry.
              const href = headingless ? whatsappLink(t.wa.collection(name)) : categoryHref(cardCategory[c.slug] ?? c.slug);
              return (
                <motion.li
                  key={c.slug}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.7, ease: EASE, delay: (i % 4) * 0.06 }}
                >
                  <Link href={href} {...extProps(href)} aria-label={t.collections.exploreAria(name)} className="group block">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-mist">
                      <Image src={c.image} alt={c.alt[lang]} fill quality={80} sizes="(min-width: 1024px) 24vw, 48vw" className="zoom-img object-cover" />
                    </div>
                    <div className="mt-3 flex items-start justify-between gap-2">
                      <h3 className="t-h4 text-burgundy-ink transition-colors group-hover:text-burgundy sm:text-xl">{name}</h3>
                      <ArrowRight
                        aria-hidden
                        className="mt-1.5 size-4 shrink-0 text-gold-deep transition-transform duration-500 ease-luxe group-hover:translate-x-1"
                        strokeWidth={1.75}
                      />
                    </div>
                    <p className="t-caption mt-0.5 line-clamp-2 text-muted">{c.description[lang]}</p>
                  </Link>
                </motion.li>
              );
            })}
            {showViewAll && (
              <motion.li key="view-all" layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Link href="/collections" className="group block">
                  <div className="grid aspect-[4/5] place-items-center rounded-lg bg-burgundy-ink p-4 text-center text-white transition-colors duration-500 group-hover:bg-burgundy">
                    <span>
                      <span className="text-shine block text-5xl font-medium sm:text-6xl">{mrDigits(categories.length - 1)}+</span>
                      <span className="t-caption mt-2 block text-white/80">{home.categories.count[lang]}</span>
                      <span className="mx-auto mt-5 grid size-11 place-items-center rounded-full border border-white/40 transition-colors duration-500 group-hover:bg-white group-hover:text-burgundy-ink">
                        <ArrowRight className="size-4" strokeWidth={1.75} aria-hidden />
                      </span>
                    </span>
                  </div>
                  <span className="t-h4 mt-3 block text-burgundy-ink group-hover:text-burgundy sm:text-xl">{home.categories.viewAll[lang]}</span>
                </Link>
              </motion.li>
            )}
          </AnimatePresence>
        </motion.ul>

        {visible.length === 0 && (
          <div className="mx-auto max-w-lg rounded-lg bg-mist p-8 text-center">
            <SearchX className="mx-auto size-8 text-gold-deep" strokeWidth={1.5} aria-hidden />
            <p className="mt-4 text-lg text-charcoal/85">{t.collections.noResults}</p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href={whatsappLink(t.wa.general)} variant="burgundy" icon={<WhatsAppIcon />}>
                {t.collections.askUs}
              </Button>
              <button
                type="button"
                onClick={() => setFilter({ category: "all", query: "" })}
                className="min-h-12 rounded-full border border-burgundy/35 px-7 text-base font-semibold text-burgundy transition-colors hover:bg-burgundy hover:text-white"
              >
                {t.collections.showAll}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
