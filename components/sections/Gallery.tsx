"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Expand } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import CategoryIconGlyph from "@/components/ui/CategoryIcons";
import { categories } from "@/data/categories";
import { galleryFor } from "@/data/gallery";
import { content } from "@/data/content";
import { whatsappLink } from "@/data/business";
import { useLang, mrDigits } from "@/lib/i18n";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Only categories that have photos get a filter chip. */
const chips = categories.filter((c) => galleryFor(c.id).length > 0);

/** Photos shown per step: keeps the first render light, "show more" reveals the rest. */
const PAGE = 12;

/**
 * Filterable jewellery photo gallery with a lightbox. On the homepage it opens
 * on "all"; on a category page it opens pre-filtered to that category, and the
 * visitor can still switch to any other category. Render with `key={category}`
 * so navigating between category pages resets the filter.
 */
export default function Gallery({ initialCategory = "all" }: { initialCategory?: string }) {
  const { lang } = useLang();
  const t = content[lang];
  const [category, setCategory] = useState(initialCategory);
  const [open, setOpen] = useState<number | null>(null);
  const [limit, setLimit] = useState(PAGE);
  const dialog = useRef<HTMLDialogElement>(null);

  const photos = galleryFor(category);
  const shown = photos.slice(0, limit);
  const choose = (id: string) => {
    setCategory(id);
    setLimit(PAGE);
  };
  const current = open === null ? null : photos[open];
  const step = (d: number) => setOpen((i) => (i === null ? i : (i + d + photos.length) % photos.length));

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    if (open !== null && !el.open) el.showModal();
    if (open === null && el.open) el.close();
  }, [open]);

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="section-y border-t border-line bg-white">
      <div className="container-lux">
        <SectionHeading
          id="gallery-title"
          eyebrow="दागिन्यांची झलक"
          title="आमच्या दागिन्यांचे दालन"
          intro="प्रकारानुसार निवडा आणि आवडलेल्या दागिन्याबद्दल थेट व्हॉट्सॲपवर विचारा."
        />

        {/* Category filter */}
        <div className="head-gap">
          <p id="gallery-filter-label" className="sr-only">
            {t.collections.filterLabel}
          </p>
          <ul aria-labelledby="gallery-filter-label" className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
            {chips.map((c) => {
              const on = c.id === category;
              return (
                <li key={c.id} className="shrink-0">
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => choose(c.id)}
                    className={`inline-flex min-h-10 items-center gap-2 rounded-full border px-4 text-[0.92rem] font-medium whitespace-nowrap transition-all duration-300 ${
                      on ? "border-burgundy bg-burgundy text-white shadow-[0_8px_18px_-12px_rgba(74,36,117,0.9)]" : "border-line bg-white text-charcoal/85 hover:border-gold hover:text-burgundy"
                    }`}
                  >
                    <CategoryIconGlyph icon={c.icon} className="size-[1.1rem]" />
                    {c.label[lang]}
                    <span className={`text-[0.8rem] ${on ? "text-white/75" : "text-muted"}`}>{mrDigits(galleryFor(c.id).length)}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <motion.ul layout className="mt-8 grid grid-flow-dense grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:mt-10 lg:grid-cols-4 lg:gap-5">
          <AnimatePresence mode="popLayout" initial={false}>
            {shown.map((p, i) => (
              <motion.li
                key={p.src}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, ease: EASE }}
                className={p.wide ? "col-span-2" : ""}
              >
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  aria-label={`${p.title[lang]}: मोठा फोटो पाहा`}
                  className="group relative block w-full overflow-hidden rounded-lg bg-mist text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                >
                  <div className={`relative ${p.wide ? "aspect-[2/1]" : "aspect-square"}`}>
                    <Image
                      src={p.src}
                      alt={p.alt[lang]}
                      fill
                      quality={80}
                      sizes={p.wide ? "(min-width: 1024px) 50vw, (min-width: 768px) 66vw, 100vw" : "(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"}
                      className="zoom-img object-cover"
                    />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-burgundy-ink/85 via-burgundy-ink/30 to-transparent p-3 pt-10 sm:p-4 sm:pt-12">
                    <span className="text-[0.95rem] leading-snug font-semibold text-white sm:text-base">{p.title[lang]}</span>
                    <Expand aria-hidden strokeWidth={1.75} className="size-4 shrink-0 text-gold-soft opacity-80 transition-opacity group-hover:opacity-100" />
                  </div>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        {photos.length > shown.length && (
          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => setLimit((n) => n + PAGE)}
              className="min-h-12 rounded-full border border-burgundy/35 px-8 text-base font-semibold text-burgundy transition-colors hover:bg-burgundy hover:text-white"
            >
              आणखी दागिने पाहा ({mrDigits(photos.length - shown.length)})
            </button>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <dialog
        ref={dialog}
        aria-label={current?.title[lang]}
        onClose={() => setOpen(null)}
        onClick={(e) => e.target === e.currentTarget && setOpen(null)}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        className="m-auto max-h-[94dvh] w-[min(64rem,94vw)] overflow-visible bg-transparent p-0 backdrop:bg-burgundy-ink/85 backdrop:backdrop-blur-sm"
      >
        {current && (
          <figure className="relative overflow-hidden rounded-lg bg-white">
            <div className={`relative w-full ${current.wide ? "aspect-[7/3]" : "aspect-square max-h-[72dvh]"}`}>
              <Image src={current.src} alt={current.alt[lang]} fill quality={85} sizes="94vw" className="object-contain" />
            </div>
            <figcaption className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
              <div>
                <p className="t-h4 text-burgundy-ink">{current.title[lang]}</p>
                <p className="t-caption mt-0.5 text-muted">
                  {mrDigits(open! + 1)} / {mrDigits(photos.length)}
                </p>
              </div>
              <Button href={whatsappLink(t.wa.collection(current.title[lang]))} variant="burgundy" icon={<WhatsAppIcon />}>
                {t.collections.askUs}
              </Button>
            </figcaption>
            <button
              type="button"
              onClick={() => setOpen(null)}
              aria-label="बंद करा"
              className="absolute top-3 right-3 grid size-10 place-items-center rounded-full bg-white/90 text-burgundy-ink shadow-md transition-colors hover:bg-burgundy hover:text-white"
            >
              <X className="size-5" strokeWidth={1.75} />
            </button>
            {photos.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="मागील फोटो"
                  className="absolute top-[38%] left-3 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-burgundy-ink shadow-md transition-colors hover:bg-burgundy hover:text-white"
                >
                  <ChevronLeft className="size-5" strokeWidth={1.75} />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="पुढील फोटो"
                  className="absolute top-[38%] right-3 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-burgundy-ink shadow-md transition-colors hover:bg-burgundy hover:text-white"
                >
                  <ChevronRight className="size-5" strokeWidth={1.75} />
                </button>
              </>
            )}
          </figure>
        )}
      </dialog>
    </section>
  );
}
