"use client";

import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import Ornament from "@/components/ui/Ornament";
import { content } from "@/data/content";
import { images } from "@/data/images";
import { whatsappLink } from "@/data/business";
import { useLang } from "@/lib/i18n";

export default function BridalCollection() {
  const { lang } = useLang();
  const t = content[lang];
  return (
    <section aria-labelledby="bridal-title" className="relative isolate overflow-hidden bg-burgundy-ink text-ivory">
      <div className="relative min-h-[36rem] lg:min-h-[44rem]">
        <Image
          src={images.bridalBanner.src}
          alt={images.bridalBanner.alt[lang]}
          fill
          quality={85}
          sizes="100vw"
          className="-z-10 object-cover object-[72%_center] lg:object-right"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-t from-burgundy-ink/95 via-burgundy/50 to-transparent lg:bg-gradient-to-r lg:from-burgundy/95 lg:via-burgundy/45 lg:to-transparent"
        />
        <div className="container-lux flex min-h-[36rem] items-end pb-16 lg:min-h-[44rem] lg:items-center lg:pb-0">
          <Reveal className="max-w-xl">
            <p className="eyebrow text-gold-soft">{t.bridal.eyebrow}</p>
            <h2 id="bridal-title" className="mt-4 text-[2.5rem] font-semibold text-balance sm:text-6xl lg:text-[4rem]">
              {t.bridal.titleLead} <em className="text-shine">{t.bridal.titleAccent}</em>
            </h2>
            <Ornament tone="light" className="mt-6" />
            <p className="mt-6 text-lg leading-relaxed text-ivory/90">{t.bridal.description}</p>
            <div className="mt-9">
              <Button href={whatsappLink(t.wa.bridal)} variant="gold" arrow>
                {t.bridal.cta}
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
