"use client";

import { Gem, Flower2, HeartHandshake, Scale, type LucideIcon } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { content } from "@/data/content";
import { useLang } from "@/lib/i18n";

const icons: Record<string, LucideIcon> = { gem: Gem, flower: Flower2, heart: HeartHandshake, scale: Scale };

export default function WhyChooseUs() {
  const { lang } = useLang();
  const t = content[lang].craft;
  return (
    <section id="craft" aria-labelledby="craft-title" className="section-y bg-wine-glow relative overflow-hidden text-ivory">
      <svg aria-hidden className="pointer-events-none absolute inset-0 size-full text-gold-soft opacity-[0.08]">
        <defs>
          <pattern id="jaali" width="56" height="56" patternUnits="userSpaceOnUse">
            <path d="M28 4 L52 28 L28 52 L4 28 Z" fill="none" stroke="currentColor" strokeWidth="0.8" />
            <circle cx="28" cy="28" r="4" fill="none" stroke="currentColor" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#jaali)" />
      </svg>

      <div className="container-lux relative">
        <SectionHeading id="craft-title" eyebrow={t.eyebrow} title={t.title} intro={t.intro} tone="light" />

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {t.items.map((item, i) => {
            const Icon = icons[item.icon];
            return (
              <Reveal
                as="li"
                key={item.icon}
                delay={i * 0.08}
                className="group frame-shine rounded-[1.5rem] bg-white/[0.06] px-6 py-10 text-center backdrop-blur-sm transition-colors duration-500 hover:bg-white/[0.1]"
              >
                <span className="bg-shine mx-auto grid size-16 place-items-center rounded-full text-burgundy-ink">
                  <Icon className="size-7" strokeWidth={1.4} aria-hidden />
                </span>
                <h3 className="mt-6 text-2xl font-semibold text-ivory">{item.title}</h3>
                <p className="mx-auto mt-3 max-w-xs leading-relaxed text-ivory/75">{item.text}</p>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
