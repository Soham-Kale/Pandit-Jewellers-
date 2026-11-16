"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { SearchX } from "lucide-react";
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
    <section id="collections" aria-labelledby="collections-title" className="section-y bg-surface">
      <div className="container-lux">
        {headingless ? (
          <h2 id="collections-title" className="sr-only">
            {t.collections.title}
          </h2>
        ) : (
          <SectionHeading id="collections-title" title={home.categories.title[lang]} intro={home.categories.sub[lang]} />
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
                      on ? "border-burgundy bg-burgundy text-white" : "border-line bg-white text-charcoal/85 hover:border-gold hover:text-burgundy"
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

        <motion.ul layout className="mt-10 grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 lg:grid-cols-4 lg:gap-x-4 lg:gap-y-10">
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
                    <div className="relative aspect-square overflow-hidden rounded-xl bg-ivory-deep">
                      <Image
                        src={c.image}
                        alt={c.alt[lang]}
                        fill
                        quality={80}
                        sizes="(min-width: 1024px) 24vw, 48vw"
                        className="object-cover transition-transform duration-[1.4s] ease-luxe group-hover:scale-[1.06]"
                      />
                    </div>
                    <h3 className="mt-3 text-center text-base tracking-wide text-burgundy-ink uppercase group-hover:text-burgundy sm:text-lg">{name}</h3>
                  </Link>
                </motion.li>
              );
            })}
            {showViewAll && (
              <motion.li key="view-all" layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Link href="/collections" className="group block">
                  <div className="grid aspect-square place-items-center rounded-xl border border-line bg-white p-4 text-center">
                    <span>
                      <span className="block text-4xl text-burgundy sm:text-5xl">{mrDigits(categories.length - 1)}+</span>
                      <span className="mt-2 block text-[0.95rem] text-charcoal">{home.categories.count[lang]}</span>
                    </span>
                  </div>
                  <span className="mt-3 block text-center text-base tracking-wide text-burgundy-ink uppercase group-hover:text-burgundy sm:text-lg">{home.categories.viewAll[lang]}</span>
                </Link>
              </motion.li>
            )}
          </AnimatePresence>
        </motion.ul>

        {visible.length === 0 && (
          <div className="mx-auto max-w-lg rounded-xl border border-line bg-ivory p-8 text-center">
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
