"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ChevronsRight } from "lucide-react";
import { FloralMandala, Lotus } from "@/components/ui/BannerArt";
import { content } from "@/data/content";
import { home } from "@/data/home";
import { images } from "@/data/images";
import { useLang, mrDigits } from "@/lib/i18n";

const INTERVAL = 6500;
const CREAM = "#fbf5ea";
const PURPLE = "#4a2475";

/**
 * Photo and focal point for each slide (copy lives in content.banners.slides).
 * `pos` is for the square photo on phones; `lgPos` for the right-hand photo on desktop.
 */
const art = [
  { img: images.bridalBanner, pos: "object-[72%_25%]", lgPos: "lg:object-[72%_28%]" },
  { img: images.hero, pos: "object-[50%_62%]", lgPos: "lg:object-[50%_62%]" },
  { img: images.heroTraditional, pos: "object-[50%_14%]", lgPos: "lg:object-[50%_22%]" },
];

/** Curved top of the cream section on phones (100×12 box, stretched to fit), traced in gold. */
const PHONE_EDGE = "M0,9 C20,2 40,2 55,6 C72,10 86,9 100,3";
/** Curved right edge of the cream panel on desktop (100×100 box), traced in gold. */
const DESK_EDGE = "M78,0 C94,20 100,42 93,62 C87,80 89,92 97,100";

/**
 * Homepage carousel, "elegant cream & gold" design: a large photo, a cream content
 * section with a curved gold-lined edge, deep-purple typography, a lotus divider
 * and faint floral line-art.
 *
 * Phones: the photo sits on top, fully uncovered, and the cream section curves in
 * below it. Desktop: the photo is on the right and the cream panel on the left.
 * Every slide's copy is stacked in one grid cell, so the banner keeps the same
 * height on every slide and nothing below it jumps. Swipe works on touch screens.
 */
export default function Hero() {
  const { lang } = useLang();
  const slides = content[lang].banners.slides;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);
  const gid = useId();

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

  // Each SVG gets its own gradient id: a url(#id) pointing into an SVG hidden with
  // display:none does not render.
  const goldDef = (k: string) => (
    <defs>
      <linearGradient id={`${gid}-${k}`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#b97a22" />
        <stop offset="0.5" stopColor="#f0d47a" />
        <stop offset="1" stopColor="#b98a2e" />
      </linearGradient>
    </defs>
  );

  return (
    <section
      id="home"
      aria-roledescription="carousel"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden text-burgundy-ink"
      style={{ backgroundColor: CREAM }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX;
        setPaused(true);
      }}
      onTouchEnd={(e) => {
        const start = touchX.current;
        touchX.current = null;
        setPaused(false);
        if (start === null) return;
        const dx = e.changedTouches[0].clientX - start;
        if (Math.abs(dx) > 45) go(index + (dx < 0 ? 1 : -1));
      }}
    >
      <div className="relative lg:h-[max(32rem,38vw)] lg:max-h-[46rem]">
        {/* Photos: large and uncovered on top on phones, right-hand side on desktop */}
        <div className="relative aspect-square sm:aspect-[16/10] lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:h-full lg:w-[62%]">
          {art.map((a, i) => (
            <div
              key={a.img.src}
              aria-hidden={i !== index}
              className={`absolute inset-0 overflow-hidden transition-opacity duration-[1200ms] ease-luxe ${i === index ? "opacity-100" : "opacity-0"}`}
            >
              <Image
                src={a.img.src}
                alt={a.img.alt[lang]}
                fill
                quality={85}
                preload={i === 0}
                sizes="(min-width: 1024px) 62vw, 100vw"
                className={`object-cover ${a.pos} ${a.lgPos} ${i === index ? "hero-push" : ""}`}
              />
            </div>
          ))}
        </div>

        {/* Desktop: cream panel with a curved, gold-lined right edge */}
        <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-y-0 left-0 hidden h-full w-[46%] lg:block">
          {goldDef("d")}
          <path d={`M0,0 L${DESK_EDGE.slice(1)} L0,100 Z`} fill={CREAM} />
          <path d={DESK_EDGE} fill="none" stroke={`url(#${gid}-d)`} strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
        </svg>

        {/* Cream content section */}
        <div className="relative -mt-8 sm:-mt-10 lg:absolute lg:inset-y-0 lg:left-0 lg:mt-0 lg:w-[40%]">
          {/* Phones: wavy, gold-lined top edge over the very bottom of the photo */}
          <svg aria-hidden viewBox="0 0 100 12" preserveAspectRatio="none" className="absolute inset-x-0 -top-px h-10 w-full sm:h-12 lg:hidden">
            {goldDef("m")}
            <path d={`${PHONE_EDGE} L100,12 L0,12 Z`} fill={CREAM} />
            <path d={PHONE_EDGE} fill="none" stroke={`url(#${gid}-m)`} strokeWidth="2" vectorEffect="non-scaling-stroke" />
          </svg>

          {/* Faint floral line-art */}
          <FloralMandala className="pointer-events-none absolute -bottom-12 -left-12 w-36 opacity-20 lg:w-52" />
          <FloralMandala className="pointer-events-none absolute -right-12 -bottom-12 w-36 opacity-20 lg:hidden" />

          <div className="relative flex h-full flex-col items-center justify-center px-6 pt-10 text-center sm:pt-12 lg:px-10 lg:pt-0 lg:pb-14">
            {/* Keep exactly one h1 on the page while other slides are showing. */}
            {index !== 0 && (
              <h1 id="hero-title" className="sr-only">
                {slides[0].title} {slides[0].accent}
              </h1>
            )}
            <div className="grid w-full max-w-md">
              {slides.map((sl, i) => {
                const on = i === index;
                const isH1 = i === 0 && index === 0;
                const Heading = isH1 ? "h1" : "h2";
                return (
                  <div
                    key={sl.title}
                    aria-hidden={!on}
                    inert={!on}
                    className={`flex flex-col items-center [grid-area:1/1] transition-[opacity,translate] duration-700 ease-luxe ${on ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"}`}
                  >
                    <p className="hidden text-sm font-semibold tracking-wide text-gold-deep sm:block sm:text-base">{sl.eyebrow}</p>
                    <Heading
                      id={isH1 ? "hero-title" : undefined}
                      className="t-banner text-burgundy-ink max-sm:text-[1.8rem] sm:mt-2 lg:mt-3"
                    >
                      {sl.title} <br />
                      <span className="text-burgundy">{sl.accent}</span>
                    </Heading>
                    <div aria-hidden className="mt-3 flex w-52 items-center gap-2 lg:mt-5 lg:w-60">
                      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-burgundy/45" />
                      <Lotus color={PURPLE} className="h-4 w-6 shrink-0" />
                      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-burgundy/45" />
                    </div>
                    <p className="t-lead mt-3 text-charcoal/80 lg:mt-4">{sl.text}</p>
                    <Link
                      href={sl.href}
                      className="bg-shine group mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-8 text-base font-semibold text-burgundy-ink shadow-[0_14px_30px_-16px_rgba(154,108,28,0.75)] transition-transform duration-500 ease-luxe hover:-translate-y-0.5 lg:mt-7"
                    >
                      {sl.cta}
                      <ChevronsRight
                        aria-hidden
                        className="size-4 transition-transform duration-500 ease-luxe group-hover:translate-x-1"
                        strokeWidth={2}
                      />
                    </Link>
                  </div>
                );
              })}
            </div>

            {/* Slide controls: dots (swipe also works on phones); arrows on desktop */}
            <div className="mt-4 flex items-center gap-3 pb-3 lg:absolute lg:bottom-8 lg:mt-0 lg:pb-0">
              <button
                type="button"
                onClick={() => go(index - 1)}
                aria-label={home.slide.prev[lang]}
                className="hidden size-10 place-items-center rounded-full border border-burgundy/30 text-burgundy transition-colors hover:bg-burgundy hover:text-white lg:grid"
              >
                <ChevronLeft className="size-4" strokeWidth={1.8} />
              </button>
              <div className="flex items-center gap-1 lg:gap-2">
                {slides.map((sl, i) => (
                  <button
                    key={sl.title}
                    type="button"
                    onClick={() => go(i)}
                    aria-label={`${home.slide.go[lang]} ${mrDigits(i + 1)}`}
                    aria-current={i === index}
                    className="grid h-11 place-items-center px-1.5 lg:h-8 lg:px-0"
                  >
                    <span className={`relative block h-1 overflow-hidden rounded-full bg-burgundy/20 transition-[width] duration-500 ${i === index ? "w-10 sm:w-12" : "w-6 sm:w-8"}`}>
                      {i === index && (
                        <span
                          key={`${index}-${paused}`}
                          className={`absolute inset-0 bg-burgundy ${paused ? "" : "hero-progress"}`}
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
                className="hidden size-10 place-items-center rounded-full border border-burgundy/30 text-burgundy transition-colors hover:bg-burgundy hover:text-white lg:grid"
              >
                <ChevronRight className="size-4" strokeWidth={1.8} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
