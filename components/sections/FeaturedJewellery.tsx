"use client";

import Image from "next/image";
import Reveal, { ImageReveal } from "@/components/ui/Reveal";
import { content } from "@/data/content";
import { images } from "@/data/images";
import { useLang } from "@/lib/i18n";

function Figure({ index, className, aspect, sizes }: { index: number; className?: string; aspect: string; sizes: string }) {
  const { lang } = useLang();
  const t = content[lang].featured;
  const img = images.featured[index];
  const cap = t.captions[index];
  return (
    <figure className={`group ${className ?? ""}`}>
      <ImageReveal delay={(index % 2) * 0.12} className={`frame-shine relative overflow-hidden rounded-[1.75rem] bg-ivory-deep shadow-[0_30px_60px_-35px_rgba(122,28,44,0.6)] ${aspect}`}>
        <Image
          src={img.src}
          alt={img.alt[lang]}
          fill
          quality={85}
          sizes={sizes}
          className="object-cover transition-transform duration-[1.6s] ease-luxe group-hover:scale-[1.05]"
        />
      </ImageReveal>
      <figcaption className="mt-4 flex items-baseline gap-4">
        <span className="text-shine-deep text-base font-bold whitespace-nowrap">
          {t.number} 0{index + 1}
        </span>
        <span>
          <span className="block text-xl font-semibold text-burgundy sm:text-2xl">{cap.title}</span>
          <span className="mt-0.5 block text-muted">{cap.text}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export default function FeaturedJewellery() {
  const { lang } = useLang();
  const t = content[lang].featured;
  return (
    <section aria-labelledby="featured-title" className="section-y bg-blush/60 overflow-hidden">
      <div className="container-lux">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow flex items-center gap-4 text-gold-deep">
              <span aria-hidden className="h-px w-10 bg-gold" />
              {t.eyebrow}
            </p>
            <h2 id="featured-title" className="mt-4 text-[2.5rem] font-semibold text-balance text-burgundy sm:text-6xl lg:text-[4.25rem]">
              {t.titleLead} <em className="text-shine-deep">{t.titleAccent}</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
            <p className="text-lg leading-relaxed text-muted">{t.intro}</p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-12 sm:grid-cols-2 sm:gap-x-6 lg:mt-20 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20">
          <Figure index={0} aspect="aspect-[4/5]" className="lg:col-span-5" sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw" />
          <div className="flex flex-col justify-end gap-12 lg:col-span-6 lg:col-start-7">
            <Reveal className="hidden border-l-2 border-gold pl-6 lg:block">
              <p className="text-3xl leading-snug font-medium text-burgundy xl:text-[2.4rem]">“{t.quote}”</p>
            </Reveal>
            <Figure index={1} aspect="aspect-[3/2]" sizes="(min-width: 1024px) 48vw, (min-width: 640px) 50vw, 100vw" />
          </div>
          <Figure index={2} aspect="aspect-[3/2]" className="lg:col-span-7 lg:self-end" sizes="(min-width: 1024px) 56vw, (min-width: 640px) 50vw, 100vw" />
          <Figure index={3} aspect="aspect-[4/5]" className="lg:col-span-4 lg:col-start-9 lg:mt-28" sizes="(min-width: 1024px) 32vw, (min-width: 640px) 50vw, 100vw" />
        </div>
      </div>
    </section>
  );
}
