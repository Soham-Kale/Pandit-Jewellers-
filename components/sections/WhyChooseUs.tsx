"use client";

import { Gem, Flower2, HeartHandshake, Scale, type LucideIcon } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { content } from "@/data/content";
import { home } from "@/data/home";
import { useLang } from "@/lib/i18n";

const icons: Record<string, LucideIcon> = { gem: Gem, flower: Flower2, heart: HeartHandshake, scale: Scale };

/** Title and promise on the left; the four values as a quiet, hairline-ruled list on the right. */
export default function WhyChooseUs() {
  const { lang } = useLang();
  const t = content[lang].craft;
  return (
    <section id="craft" aria-labelledby="craft-title" className="section-y bg-mist">
      <div className="container-lux grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <p className="kicker">{t.eyebrow}</p>
          <h2 id="craft-title" className="t-display mt-4 text-burgundy-ink">
            {home.promise.lead[lang]} <em className="text-burgundy">{home.promise.accent[lang]}</em>
          </h2>
          <p className="t-lead mt-4 text-muted">{home.promise.sub[lang]}</p>
          <p className="t-body mt-6 max-w-md text-charcoal/80">{t.intro}</p>
        </Reveal>
        <ul className="grid gap-x-10 sm:grid-cols-2 lg:col-span-7">
          {t.items.map((item, i) => {
            const Icon = icons[item.icon];
            return (
              <Reveal as="li" key={item.icon} delay={i * 0.07} className="border-t border-line py-7 sm:py-8">
                <span className="grid size-12 place-items-center rounded-full border border-gold/60 text-gold-deep">
                  <Icon className="size-[1.35rem]" strokeWidth={1.4} aria-hidden />
                </span>
                <h3 className="t-h3 mt-5 text-burgundy-ink">{item.title}</h3>
                <p className="t-body mt-2 text-muted">{item.text}</p>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
