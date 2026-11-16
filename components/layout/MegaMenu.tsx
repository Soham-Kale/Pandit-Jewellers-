"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import CategoryIconGlyph from "@/components/ui/CategoryIcons";
import { categories, categoryHref, collectionsFor, moreLinks, occasionIds, type Category } from "@/data/categories";
import { content } from "@/data/content";
import { useLang } from "@/lib/i18n";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Desktop mega-menu panel for one category (or "more"). Rendered under the category bar. */
export default function MegaMenu({ id, onNavigate }: { id: string; onNavigate: () => void }) {
  const { lang } = useLang();
  const t = content[lang];
  const cat = categories.find((c) => c.id === id);

  return (
    <motion.div
      key={id}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.28, ease: EASE }}
      className="absolute inset-x-0 top-full z-40 border-t border-line bg-ivory shadow-[0_40px_60px_-30px_rgba(74,36,117,0.45)]"
    >
      <span aria-hidden className="absolute inset-x-0 top-0 h-px" style={{ background: "var(--gold-shine)" }} />
      <div className="container-lux grid grid-cols-12 gap-8 py-8">{cat ? <CategoryPanel cat={cat} onNavigate={onNavigate} /> : <MorePanel onNavigate={onNavigate} />}</div>
      <p className="sr-only">{t.header.categories}</p>
    </motion.div>
  );
}

function CategoryPanel({ cat, onNavigate }: { cat: Category; onNavigate: () => void }) {
  const { lang } = useLang();
  const t = content[lang];
  const name = cat.label[lang];
  const href = categoryHref(cat.id);
  // Styles column: the category's own styles, or (for groups like Wedding / All) the matching collections.
  const styleLinks = cat.styles.length
    ? cat.styles.map((s) => ({ key: s.id, label: s.label[lang], href: `${href}#style-${s.id}` }))
    : collectionsFor(cat)
        .map((c) => categories.find((k) => k.id === c.slug))
        .filter((k): k is Category => Boolean(k))
        .map((k) => ({ key: k.id, label: k.label[lang], href: categoryHref(k.id) }));

  return (
    <>
      <div className="col-span-3 border-r border-line pr-6">
        <span className="bg-shine grid size-12 place-items-center rounded-full text-burgundy-ink">
          <CategoryIconGlyph icon={cat.icon} className="size-6" />
        </span>
        <p className="mt-4 text-2xl font-semibold text-burgundy">{name}</p>
        <p className="mt-2 leading-relaxed text-muted">{cat.blurb[lang]}</p>
        <Link
          href={href}
          onClick={onNavigate}
          className="group mt-5 inline-flex items-center gap-2 font-semibold text-gold-deep transition-colors hover:text-burgundy"
        >
          {t.menu.viewAll(name)}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" strokeWidth={1.8} aria-hidden />
        </Link>
      </div>

      <div className="col-span-2">
        <p className="eyebrow text-gold-deep">{cat.styles.length ? t.menu.styles : t.menu.collections}</p>
        <ul className="mt-4 space-y-2.5">
          {styleLinks.map((l) => (
            <li key={l.key}>
              <Link href={l.href} onClick={onNavigate} className="text-charcoal/85 transition-colors hover:text-burgundy">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="col-span-2">
        <p className="eyebrow text-gold-deep">{t.menu.occasion}</p>
        <ul className="mt-4 space-y-2.5">
          {occasionIds.map((oid) => {
            const o = categories.find((c) => c.id === oid)!;
            return (
              <li key={oid}>
                <Link
                  href={categoryHref(oid)}
                  onClick={onNavigate}
                  className={`inline-flex items-center gap-2 transition-colors hover:text-burgundy ${oid === cat.id ? "font-semibold text-burgundy" : "text-charcoal/85"}`}
                >
                  <CategoryIconGlyph icon={o.icon} className="size-4 text-gold-deep" />
                  {o.label[lang]}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="col-span-5 grid grid-cols-2 gap-4">
        {cat.images.map((src, i) => (
          <Link key={src} href={href} onClick={onNavigate} className="group relative block aspect-[4/3] overflow-hidden rounded-xl">
            <Image src={src} alt="" fill sizes="20vw" quality={70} className="object-cover transition-transform duration-[1.2s] ease-luxe group-hover:scale-105" />
            <span className="absolute inset-0 bg-gradient-to-t from-burgundy-ink/75 via-transparent to-transparent" />
            <span className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-ivory">
              <span className="font-semibold">{i === 0 ? name : `${name} ${t.menu.explore}`}</span>
              <ArrowRight className="size-4" strokeWidth={1.8} aria-hidden />
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}

function MorePanel({ onNavigate }: { onNavigate: () => void }) {
  const { lang } = useLang();
  const t = content[lang];
  return (
    <>
      <div className="col-span-4">
        <p className="eyebrow text-gold-deep">{t.header.more}</p>
        <ul className="mt-4 space-y-3">
          {moreLinks.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={onNavigate} className="text-lg text-charcoal/85 transition-colors hover:text-burgundy">
                {l.label[lang]}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="col-span-3">
        <p className="eyebrow text-gold-deep">{t.menu.collections}</p>
        <ul className="mt-4 grid gap-2.5">
          {categories
            .filter((c) => c.id !== "all")
            .map((c) => (
              <li key={c.id}>
                <Link href={categoryHref(c.id)} onClick={onNavigate} className="text-charcoal/85 transition-colors hover:text-burgundy">
                  {c.label[lang]}
                </Link>
              </li>
            ))}
        </ul>
      </div>
      <Link href="/#store" onClick={onNavigate} className="group bg-wine-glow col-span-5 flex flex-col justify-end rounded-xl p-7 text-ivory">
        <MapPin className="size-7 text-gold-soft" strokeWidth={1.5} aria-hidden />
        <p className="text-shine mt-4 text-2xl font-semibold">{t.menu.visit}</p>
        <p className="mt-2 text-ivory/80">{t.menu.visitText}</p>
      </Link>
    </>
  );
}
