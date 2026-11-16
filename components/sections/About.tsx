"use client";

import Image from "next/image";
import Reveal, { ImageReveal } from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { content } from "@/data/content";
import { images } from "@/data/images";
import { useLang, mrDigits } from "@/lib/i18n";

/** Brand introduction: portrait photo with a fine offset gold frame, story, and three numbered pillars. */
export default function About() {
  const { lang } = useLang();
  const t = content[lang].about;
  return (
    <section id="about" aria-labelledby="about-title" className="section-y overflow-hidden bg-mist">
      <div className="container-lux grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
        <div className="relative mx-auto w-full max-w-sm sm:max-w-md lg:col-span-5 lg:max-w-none">
          <div aria-hidden className="absolute -top-4 -left-4 h-full w-full rounded-lg border border-gold/60 sm:-top-5 sm:-left-5" />
          <ImageReveal className="relative aspect-[4/5] overflow-hidden rounded-lg bg-white">
            <Image src={images.about.src} alt={images.about.alt[lang]} fill quality={85} sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" />
          </ImageReveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal>
            <p className="kicker">{t.eyebrow}</p>
            <h2 id="about-title" className="t-h2 mt-3 text-burgundy-ink">
              {t.title}
            </h2>
          </Reveal>
          {t.paragraphs.map((p, i) => (
            <Reveal key={i} delay={0.08 + i * 0.06}>
              <p className="t-body mt-5 max-w-2xl text-charcoal/85">{p}</p>
            </Reveal>
          ))}
          <Reveal delay={0.2}>
            <ol className="mt-10 grid gap-x-8 sm:grid-cols-3">
              {t.pillars.map((pl, i) => (
                <li key={pl.title} className="border-t border-gold/50 py-5">
                  <span className="text-shine-deep text-lg font-semibold">{mrDigits(`0${i + 1}`)}</span>
                  <h3 className="t-h4 mt-1 text-burgundy-ink">{pl.title}</h3>
                  <p className="t-caption mt-1.5 text-muted">{pl.text}</p>
                </li>
              ))}
            </ol>
            <div className="mt-8">
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
