"use client";

import { Gem, Flower2, HeartHandshake, Scale, type LucideIcon } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { content } from "@/data/content";
import { home } from "@/data/home";
import { useLang } from "@/lib/i18n";

const icons: Record<string, LucideIcon> = { gem: Gem, flower: Flower2, heart: HeartHandshake, scale: Scale };

/** Large two-tone title on the left, the shop's values with gold icons on the right. */
export default function WhyChooseUs() {
  const { lang } = useLang();
  const t = content[lang].craft;
  return (
    <section id="craft" aria-labelledby="craft-title" className="section-y">
      <div className="container-lux grid items-center gap-10 lg:grid-cols-2 lg:gap-0">
        <Reveal className="text-center lg:pr-12">
          <h2 id="craft-title" className="text-[2.75rem] text-burgundy-ink sm:text-6xl lg:text-[4.5rem]">
            {home.promise.lead[lang]} <em className="text-burgundy">{home.promise.accent[lang]}</em>
          </h2>
          <p className="subhead mt-3 text-muted">{home.promise.sub[lang]}</p>
        </Reveal>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-10 lg:border-l lg:border-line lg:pl-12">
          {t.items.map((item, i) => {
            const Icon = icons[item.icon];
            return (
              <Reveal as="li" key={item.icon} delay={i * 0.08} className="text-center">
                <span className="icon-gold mx-auto grid size-16 place-items-center rounded-2xl text-white">
                  <Icon className="size-8" strokeWidth={1.3} aria-hidden />
                </span>
                <h3 className="mx-auto mt-4 max-w-[12rem] text-xl text-burgundy-ink">{item.title}</h3>
                <p className="mx-auto mt-2 max-w-[16rem] text-[0.95rem] leading-relaxed text-muted">{item.text}</p>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
