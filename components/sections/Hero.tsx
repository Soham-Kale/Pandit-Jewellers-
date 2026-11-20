"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ChevronsRight } from "lucide-react";
import Ornament from "@/components/ui/Ornament";
import { Vine } from "@/components/ui/BannerArt";
import { content } from "@/data/content";
import { home } from "@/data/home";
import { images } from "@/data/images";
import { useLang, mrDigits } from "@/lib/i18n";

const EASE = [0.22, 1, 0.36, 1] as const;
const INTERVAL = 6500;

/** Photo, focal point and mirroring for each slide (copy lives in content.banners.slides). */
const art = [
  { img: images.bridalBanner, pos: "object-[38%_30%]", flip: true },
  { img: images.hero, pos: "object-[50%_60%]", flip: false },
  { img: images.heroTraditional, pos: "object-[50%_18%]", flip: false },
];

/**
 * Homepage banner in the style of a printed jewellery banner: the photo sits on one
 * side and melts into deep-purple velvet, with a centred Marathi headline, a gold
 * ornament and a gold call-to-action on the other side. On phones the photo sits on
 * top and fades down into the copy.
 */
export default function Hero() {
  const { lang } = useLang();
  const slides = content[lang].banners.slides;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    const id = window.setTimeout(
      () => setIndex((i) => (i + 1) % slides.length),
      INTERVAL,
    );
    return () => window.clearTimeout(id);
  }, [paused, index, slides.length]);

  const go = (i: number) => setIndex((i + slides.length) % slides.length);
  const s = slides[index];

  return (
    <section
      id="home"
      aria-roledescription="carousel"
      aria-labelledby="hero-title"
      className="bg-velvet relative isolate overflow-hidden text-ivory"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="relative h-[44rem] max-h-[calc(100svh-4rem)] min-h-[38rem] lg:h-[max(30rem,37.5vw)] lg:max-h-[46rem] lg:min-h-0">
        {/* Photos: top on phones, left on larger screens, feathered into the velvet */}
        <div className="absolute inset-x-0 top-0 h-[56%] lg:inset-y-0 lg:right-auto lg:h-full lg:w-[62%]">
          {art.map((a, i) => (
            <div
              key={a.img.src}
              aria-hidden={i !== index}
              className={`fade-b lg:fade-r absolute inset-0 overflow-hidden transition-opacity duration-[1200ms] ease-luxe ${i === index ? "opacity-100" : "opacity-0"}`}
            >
              <Image
                src={a.img.src}
                alt={a.img.alt[lang]}
                fill
                quality={85}
                preload={i === 0}
                sizes="(min-width: 768px) 62vw, 100vw"
                className={`object-cover ${a.pos} ${a.flip ? "-scale-x-100" : ""} ${i === index ? "hero-push" : ""}`}
              />
            </div>
          ))}
        </div>

        {/* Gold vines framing the copy */}
        <Vine className="absolute top-3 right-3 hidden w-28 -scale-x-100 opacity-60 lg:block xl:w-52" />
        <Vine className="absolute right-3 bottom-3 hidden w-40 -scale-100 opacity-40 xl:block" />

        {/* Copy */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center px-5 pb-20 text-center lg:inset-y-0 lg:right-0 lg:left-auto lg:w-[46%] lg:justify-center lg:px-6 lg:pb-14 xl:w-[44%] xl:px-12">
          {/* Keep exactly one h1 on the page while other slides are showing. */}
          {index !== 0 && (
            <h1 id="hero-title" className="sr-only">
              {slides[0].title} {slides[0].accent}
            </h1>
          )}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="flex flex-col items-center"
            >
              <p className="text-sm font-semibold tracking-wide text-gold-soft sm:text-base">
                {s.eyebrow}
              </p>
              {(() => {
                const inner = (
                  <>
                    <span className="text-ivory-gold">{s.title}</span> <br />
                    <span className="text-shine">{s.accent}</span>
                  </>
                );
                const cls = "t-banner mt-3";
                return index === 0 ? (
                  <h1 id="hero-title" className={cls}>
                    {inner}
                  </h1>
                ) : (
                  <h2 className={cls}>{inner}</h2>
                );
              })()}
              <Ornament tone="light" className="mt-5" />
              <p className="t-lead mt-4 max-w-md text-ivory/85">{s.text}</p>
              <Link
                href={s.href}
                className="bg-shine group mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-8 text-base font-semibold text-burgundy-ink shadow-[0_14px_30px_-14px_rgba(221,183,81,0.7)] transition-transform duration-500 ease-luxe hover:-translate-y-0.5"
              >
                {s.cta}
                <ChevronsRight
                  aria-hidden
                  className="size-4 transition-transform duration-500 ease-luxe group-hover:translate-x-1"
                  strokeWidth={2}
                />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slide controls */}
        <div className="absolute inset-x-0 bottom-5 flex items-center justify-center gap-3 lg:right-0 lg:left-auto lg:w-[46%] lg:bottom-8 xl:w-[44%]">
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label={home.slide.prev[lang]}
            className="grid size-10 place-items-center rounded-full border border-gold-soft/40 text-gold-soft transition-colors hover:border-gold-soft hover:bg-gold-soft hover:text-burgundy-ink"
          >
            <ChevronLeft className="size-4" strokeWidth={1.8} />
          </button>
          <div className="flex items-center gap-2">
            {slides.map((sl, i) => (
              <button
                key={sl.title}
                type="button"
                onClick={() => go(i)}
                aria-label={`${home.slide.go[lang]} ${mrDigits(i + 1)}`}
                aria-current={i === index}
                className="grid h-8 place-items-center"
              >
                <span className="relative block h-0.5 w-9 overflow-hidden rounded-full bg-ivory/25 sm:w-12">
                  {i === index && (
                    <span
                      key={`${index}-${paused}`}
                      className={`absolute inset-0 bg-gold-soft ${paused ? "" : "hero-progress"}`}
                    />
                  )}
                </span>
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label={home.slide.next[lang]}
            className="grid size-10 place-items-center rounded-full border border-gold-soft/40 text-gold-soft transition-colors hover:border-gold-soft hover:bg-gold-soft hover:text-burgundy-ink"
          >
            <ChevronRight className="size-4" strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </section>
  );
}
