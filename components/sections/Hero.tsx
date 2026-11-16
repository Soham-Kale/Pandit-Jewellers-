"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { content } from "@/data/content";
import { home } from "@/data/home";
import { images } from "@/data/images";
import { collections } from "@/data/collections";
import { business, whatsappLink, extProps } from "@/data/business";
import { useLang, mrDigits } from "@/lib/i18n";

const EASE = [0.22, 1, 0.36, 1] as const;
const earrings = collections.find((c) => c.slug === "earrings")!;
const INTERVAL = 6500;

/**
 * Full-bleed banner: three slides that cross-fade, with the copy on a deep-purple
 * wash on the left (bottom on phones) so it always stays readable over the photo.
 */
export default function Hero() {
  const { lang } = useLang();
  const t = content[lang];
  const slides = [
    {
      img: images.hero,
      eyebrow: `${business.name[lang]} · ${business.city[lang]}`,
      title: `${t.hero.titleLead} ${t.hero.titleAccent}`,
      text: t.hero.description,
      cta: t.hero.primary,
      href: "/collections",
      pos: "object-[62%_center] lg:object-center",
    },
    {
      img: { src: earrings.image, alt: earrings.alt },
      eyebrow: t.hero.traditional.eyebrow,
      title: t.hero.traditional.title,
      text: t.hero.traditional.text,
      cta: t.hero.traditional.cta,
      href: "/collections/traditional",
      pos: "object-[70%_center]",
    },
    {
      img: images.store,
      eyebrow: t.hero.visit.eyebrow,
      title: t.hero.visit.title,
      text: t.hero.visit.text,
      cta: t.hero.visit.cta,
      href: "/#store",
      pos: "object-[60%_center]",
    },
  ];
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % slides.length), INTERVAL);
    return () => window.clearTimeout(id);
  }, [paused, index, slides.length]);

  const go = (i: number) => setIndex((i + slides.length) % slides.length);
  const wa = whatsappLink(t.wa.general);
  const s = slides[index];

  return (
    <section
      id="home"
      aria-roledescription="carousel"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-burgundy-ink text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* Photos */}
      <div className="relative h-[min(86svh,44rem)] min-h-[34rem] lg:h-[min(80vh,46rem)]">
        {slides.map((sl, i) => (
          <div
            key={sl.href}
            aria-hidden={i !== index}
            className={`absolute inset-0 transition-opacity duration-[1200ms] ease-luxe ${i === index ? "opacity-100" : "opacity-0"}`}
          >
            <Image
              src={sl.img.src}
              alt={sl.img.alt[lang]}
              fill
              quality={85}
              preload={i === 0}
              sizes="100vw"
              className={`object-cover ${sl.pos} ${i === index ? "hero-push" : ""}`}
            />
          </div>
        ))}
        {/* Legibility wash: bottom on phones, left on larger screens */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-burgundy-ink via-burgundy-ink/55 to-transparent md:bg-gradient-to-r md:from-burgundy-ink/90 md:via-burgundy-ink/45 md:to-transparent"
        />

        {/* Copy */}
        <div className="container-lux relative flex h-full flex-col justify-end pb-24 md:justify-center md:pb-0">
          {/* Keep exactly one h1 on the page while other slides are showing. */}
          {index !== 0 && (
            <h1 id="hero-title" className="sr-only">
              {slides[0].title}
            </h1>
          )}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="max-w-xl"
            >
              <p className="kicker !text-gold-soft">{s.eyebrow}</p>
              {index === 0 ? (
                <h1 id="hero-title" className="t-display mt-4">
                  {s.title}
                </h1>
              ) : (
                <h2 className="t-display mt-4">{s.title}</h2>
              )}
              <p className="t-lead mt-4 max-w-md text-white/85">{s.text}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={s.href}
                  className="bg-shine group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-7 text-base font-semibold text-burgundy-ink transition-transform duration-500 ease-luxe hover:-translate-y-0.5"
                >
                  {s.cta}
                  <ArrowRight aria-hidden className="size-4 transition-transform duration-500 ease-luxe group-hover:translate-x-1" strokeWidth={1.75} />
                </Link>
                <a
                  href={wa}
                  {...extProps(wa)}
                  className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full border border-white/50 px-7 text-base font-semibold text-white transition-colors duration-500 hover:border-white hover:bg-white hover:text-burgundy-ink"
                >
                  <WhatsAppIcon className="size-4" />
                  {t.hero.whatsapp}
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slide controls: progress lines + arrows */}
        <div className="container-lux absolute inset-x-0 bottom-6 flex items-center justify-between gap-6 lg:bottom-10">
          <div className="flex items-center gap-4">
            <span className="t-caption tabular-nums text-white/80" aria-hidden>
              {mrDigits(`0${index + 1}`)} / {mrDigits(`0${slides.length}`)}
            </span>
            <div className="flex items-center gap-2">
              {slides.map((sl, i) => (
                <button
                  key={sl.href}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`${home.slide.go[lang]} ${mrDigits(i + 1)}`}
                  aria-current={i === index}
                  className="group grid h-8 place-items-center"
                >
                  <span className="relative block h-0.5 w-10 overflow-hidden rounded-full bg-white/30 sm:w-14">
                    {i === index && (
                      <span key={`${index}-${paused}`} className={`absolute inset-0 bg-gold-soft ${paused ? "" : "hero-progress"}`} />
                    )}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label={home.slide.prev[lang]}
              className="grid size-11 place-items-center rounded-full border border-white/40 text-white transition-colors hover:border-white hover:bg-white hover:text-burgundy-ink"
            >
              <ChevronLeft className="size-5" strokeWidth={1.6} />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label={home.slide.next[lang]}
              className="grid size-11 place-items-center rounded-full border border-white/40 text-white transition-colors hover:border-white hover:bg-white hover:text-burgundy-ink"
            >
              <ChevronRight className="size-5" strokeWidth={1.6} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
