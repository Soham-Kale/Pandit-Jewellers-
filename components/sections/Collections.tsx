"use client";

import { useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, SearchX } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import CategoryIconGlyph from "@/components/ui/CategoryIcons";
import { collections, type Collection } from "@/data/collections";
import { categories, searchAliases } from "@/data/categories";
import { content } from "@/data/content";
import { whatsappLink, extProps } from "@/data/business";
import { useLang } from "@/lib/i18n";
import { setFilter, useFilter } from "@/lib/filter";

const EASE = [0.22, 1, 0.36, 1] as const;

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

  return (
    <section id="collections" aria-labelledby="collections-title" className="section-y bg-surface">
      <div className="container-lux">
        {headingless ? (
          <h2 id="collections-title" className="sr-only">
            {t.collections.title}
          </h2>
        ) : (
          <SectionHeading id="collections-title" eyebrow={t.collections.eyebrow} title={t.collections.title} intro={t.collections.intro} />
        )}

        {/* Filter chips (mirrors the header category bar) */}
        <div className={headingless ? "" : "mt-12 lg:mt-14"}>
          <p className="sr-only">{t.collections.filterLabel}</p>
          <ul className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0">
            {categories.map((c) => {
              const on = c.id === active.id;
              return (
                <li key={c.id} className="shrink-0">
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => setFilter({ category: c.id, query: "" })}
                    className={`inline-flex min-h-10 items-center gap-2 rounded-full border px-4 text-[0.92rem] font-medium whitespace-nowrap transition-all duration-300 ${
                      on ? "bg-shine border-transparent text-burgundy-ink" : "border-line bg-ivory text-charcoal/85 hover:border-gold hover:text-burgundy"
                    }`}
                  >
                    <CategoryIconGlyph icon={c.icon} className="size-[1.1rem]" />
                    {c.label[lang]}
                  </button>
                </li>
              );
            })}
          </ul>
          {query.trim() && <p className="mt-5 text-center text-muted">{t.collections.resultsFor(query.trim())}</p>}
        </div>

        <motion.ul layout className="mt-10 grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-12">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((c, i) => {
              const name = c.name[lang];
              const href = whatsappLink(t.wa.collection(name));
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
                  <a href={href} {...extProps(href)} aria-label={t.collections.exploreAria(name)} className="group block">
                    <div className="frame-shine relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-ivory-deep shadow-[0_24px_50px_-30px_rgba(122,28,44,0.55)] transition-shadow duration-700 group-hover:shadow-[0_30px_60px_-28px_rgba(122,28,44,0.75)]">
                      <Image
                        src={c.image}
                        alt={c.alt[lang]}
                        fill
                        quality={80}
                        sizes="(min-width: 1024px) 24vw, 48vw"
                        className="object-cover transition-transform duration-[1.4s] ease-luxe group-hover:scale-[1.07]"
                      />
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-[1.2s] ease-luxe group-hover:translate-x-full"
                      />
                      <span className="bg-shine absolute right-3 bottom-3 grid size-10 place-items-center rounded-full text-burgundy-ink opacity-0 transition-all duration-500 ease-luxe group-hover:opacity-100 sm:right-4 sm:bottom-4">
                        <ArrowUpRight className="size-4" strokeWidth={1.8} aria-hidden />
                      </span>
                    </div>
                    <h3 className="mt-4 text-xl font-semibold text-burgundy sm:text-2xl">{name}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted sm:text-base">{c.description[lang]}</p>
                    <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-deep transition-colors group-hover:text-burgundy">
                      {t.collections.explore}
                      <ArrowUpRight className="size-3.5" strokeWidth={2} aria-hidden />
                    </span>
                  </a>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </motion.ul>

        {visible.length === 0 && (
          <div className="mx-auto max-w-lg rounded-[1.5rem] border border-line bg-ivory p-8 text-center">
            <SearchX className="mx-auto size-8 text-gold-deep" strokeWidth={1.5} aria-hidden />
            <p className="mt-4 text-lg text-charcoal/85">{t.collections.noResults}</p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href={whatsappLink(t.wa.general)} variant="burgundy" icon={<WhatsAppIcon />}>
                {t.collections.askUs}
              </Button>
              <button
                type="button"
                onClick={() => setFilter({ category: "all", query: "" })}
                className="min-h-12 rounded-full border border-gold px-6 text-[0.8rem] font-semibold tracking-[0.14em] text-burgundy uppercase hover:bg-burgundy hover:text-ivory"
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
