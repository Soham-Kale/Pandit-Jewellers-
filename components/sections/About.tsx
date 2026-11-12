"use client";

import Image from "next/image";
import Reveal, { ImageReveal } from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { content } from "@/data/content";
import { images } from "@/data/images";
import { useLang } from "@/lib/i18n";

export default function About() {
  const { lang } = useLang();
  const t = content[lang].about;
  return (
    <section id="about" aria-labelledby="about-title" className="section-y bg-ivory-glow overflow-hidden">
      <div className="container-lux grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
        <div className="relative mx-auto w-full max-w-md sm:max-w-lg lg:col-span-6 lg:max-w-none">
          <div aria-hidden className="frame-shine absolute -top-5 -left-5 hidden h-[88%] w-[78%] rounded-[2rem] sm:block" />
          <ImageReveal className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-ivory-deep shadow-[0_40px_80px_-40px_rgba(122,28,44,0.55)]">
            <Image src={images.about.src} alt={images.about.alt[lang]} fill quality={85} sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </ImageReveal>
          <Reveal delay={0.3} className="bg-wine-glow absolute -right-3 -bottom-8 w-56 rounded-2xl p-6 text-ivory shadow-xl sm:-right-6 sm:w-64 lg:-right-10">
            <p className="eyebrow text-gold-soft">{t.badgeEyebrow}</p>
            <p className="text-shine mt-2 text-2xl leading-snug font-semibold">{t.badge}</p>
          </Reveal>
        </div>

        <div className="pt-6 lg:col-span-6 lg:pt-0">
          <Reveal>
            <p className="eyebrow flex items-center gap-4 text-gold-deep">
              <span aria-hidden className="h-px w-10 bg-gold" />
              {t.eyebrow}
            </p>
            <h2 id="about-title" className="mt-4 text-[2.3rem] font-semibold text-balance text-burgundy sm:text-5xl lg:text-[3.3rem]">
              {t.title}
            </h2>
          </Reveal>
          {t.paragraphs.map((p, i) => (
            <Reveal key={i} delay={0.1 + i * 0.08}>
              <p className="mt-6 text-[1.05rem] leading-[1.85] text-charcoal/85 sm:text-lg">{p}</p>
            </Reveal>
          ))}
          <Reveal delay={0.25}>
            <ul className="mt-10 grid gap-4 sm:grid-cols-3">
              {t.pillars.map((pl, i) => (
                <li key={pl.title} className="rounded-2xl border border-line bg-surface/80 p-5 shadow-[0_12px_30px_-22px_rgba(122,28,44,0.4)]">
                  <span className="text-shine-deep text-lg font-bold">0{i + 1}</span>
                  <h3 className="mt-1 text-xl font-semibold text-burgundy">{pl.title}</h3>
                  <p className="mt-1.5 text-[0.95rem] leading-relaxed text-muted">{pl.text}</p>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <Button href="#craft" variant="outline-dark" arrow>
                {t.cta}
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
