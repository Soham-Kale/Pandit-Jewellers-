"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { content } from "@/data/content";
import { home } from "@/data/home";
import { images } from "@/data/images";
import { useLang } from "@/lib/i18n";

/** Banner carousel: one rounded slide in view with the neighbours peeking in at the sides. */
export default function Hero() {
  const { lang } = useLang();
  const t = content[lang];
  const slides = [
    { img: images.hero, title: `${t.hero.titleLead} ${t.hero.titleAccent}`, text: t.hero.description, cta: t.hero.primary, href: "/collections", pos: "object-[58%_center]" },
    { img: images.bridalBanner, title: `${t.bridal.titleLead} ${t.bridal.titleAccent}`, text: t.bridal.description, cta: t.bridal.cta, href: "/collections/wedding", pos: "object-[72%_center]" },
    { img: images.store, title: t.store.title, text: t.store.intro, cta: t.hero.secondary, href: "/#store", pos: "object-center" },
  ];
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % 3), 6000);
    return () => window.clearInterval(id);
  }, [paused]);

  const go = (i: number) => setIndex((i + slides.length) % slides.length);

  return (
    <section
      id="home"
      aria-roledescription="carousel"
      aria-labelledby="hero-title"
      className="relative overflow-hidden pt-4 pb-3 [--gap:0.75rem] [--w:92vw] lg:pt-5 lg:[--gap:1.5rem] lg:[--w:min(82vw,73.75rem)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        className="flex gap-[var(--gap)] transition-transform duration-700 ease-luxe motion-reduce:transition-none"
        style={{ transform: `translateX(calc(50vw - var(--w) / 2 - ${index} * (var(--w) + var(--gap))))` }}
      >
        {slides.map((s, i) => {
          const active = i === index;
          return (
            <div
              key={s.href}
              aria-hidden={!active}
              className={`relative aspect-[4/5] w-[var(--w)] shrink-0 overflow-hidden rounded-[10px] bg-burgundy-ink text-white transition-opacity duration-700 sm:aspect-[5/2] ${active ? "" : "opacity-70"}`}
            >
              <Image src={s.img.src} alt={s.img.alt[lang]} fill quality={85} preload={i === 0} sizes="(min-width: 1280px) 1180px, 92vw" className={`object-cover ${s.pos}`} />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent sm:bg-gradient-to-r sm:from-black/70 sm:via-black/30 sm:to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 sm:justify-center sm:p-10 lg:p-16">
                <div className="max-w-md">
                  {i === 0 ? (
                    <h1 id="hero-title" className="text-[2rem] text-balance sm:text-4xl lg:text-[3.25rem]">
                      {s.title}
                    </h1>
                  ) : (
                    <h2 className="text-[2rem] text-balance sm:text-4xl lg:text-[3.25rem]">{s.title}</h2>
                  )}
                  <p className="mt-3 text-base leading-relaxed text-white/90 sm:text-lg">{s.text}</p>
                  <Link
                    href={s.href}
                    tabIndex={active ? 0 : -1}
                    className="mt-6 inline-flex min-h-11 items-center gap-3 rounded-full border border-white/80 bg-white/95 px-6 text-[0.95rem] font-medium text-burgundy-ink transition-colors hover:bg-white"
                  >
                    {s.cta}
                    <ChevronRight className="size-4" strokeWidth={2} aria-hidden />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-center gap-4">
        <button type="button" onClick={() => go(index - 1)} aria-label={home.slide.prev[lang]} className="grid size-9 place-items-center rounded-full border border-line text-burgundy-ink hover:border-burgundy hover:text-burgundy">
          <ChevronLeft className="size-4" strokeWidth={2} />
        </button>
        <div className="flex items-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.href}
              type="button"
              onClick={() => go(i)}
              aria-label={`${home.slide.go[lang]} ${i + 1}`}
              aria-current={i === index}
              className="grid size-6 place-items-center"
            >
              <span className={`block h-1.5 rounded-full transition-all duration-500 ${i === index ? "w-7 bg-burgundy" : "w-1.5 bg-burgundy/25"}`} />
            </button>
          ))}
        </div>
        <button type="button" onClick={() => go(index + 1)} aria-label={home.slide.next[lang]} className="grid size-9 place-items-center rounded-full border border-line text-burgundy-ink hover:border-burgundy hover:text-burgundy">
          <ChevronRight className="size-4" strokeWidth={2} />
        </button>
      </div>
    </section>
  );
}
