"use client";

import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import Ornament from "@/components/ui/Ornament";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { content } from "@/data/content";
import { images } from "@/data/images";
import { whatsappLink } from "@/data/business";
import { useLang } from "@/lib/i18n";

/** Full-bleed bridal banner: the one dark, cinematic moment in the middle of the page. */
export default function BridalCollection() {
  const { lang } = useLang();
  const t = content[lang];
  return (
    <section aria-labelledby="bridal-title" className="relative isolate overflow-hidden bg-burgundy-ink text-white">
      <div className="relative min-h-[38rem] lg:min-h-[42rem]">
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
          className="absolute inset-0 -z-10 bg-gradient-to-t from-burgundy-ink via-burgundy-ink/60 to-transparent lg:bg-gradient-to-r lg:from-burgundy-ink/95 lg:via-burgundy-ink/55 lg:to-transparent"
        />
        <div className="container-lux flex min-h-[38rem] items-end pb-14 lg:min-h-[42rem] lg:items-center lg:pb-0">
          <Reveal className="max-w-xl">
            <p className="kicker !text-gold-soft">{t.bridal.eyebrow}</p>
            <h2 id="bridal-title" className="t-display mt-4">
              {t.bridal.titleLead} <em className="text-shine">{t.bridal.titleAccent}</em>
            </h2>
            <Ornament tone="light" className="mt-6" />
            <p className="t-lead mt-6 text-white/85">{t.bridal.description}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href="/collections/wedding" variant="gold" arrow>
                {t.bridal.cta}
              </Button>
              <Button href={whatsappLink(t.wa.bridal)} variant="outline-light" icon={<WhatsAppIcon className="size-4" />}>
                {t.hero.whatsapp}
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
