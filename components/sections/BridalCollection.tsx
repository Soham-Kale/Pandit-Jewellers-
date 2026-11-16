"use client";

import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import Ornament from "@/components/ui/Ornament";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { Vine } from "@/components/ui/BannerArt";
import { content } from "@/data/content";
import { images } from "@/data/images";
import { whatsappLink } from "@/data/business";
import { useLang } from "@/lib/i18n";

/**
 * Bridal banner: the one dark moment mid-page. Copy on purple velvet on the left,
 * the bride on the right melting into the velvet (on phones the photo sits on top).
 */
export default function BridalCollection() {
  const { lang } = useLang();
  const t = content[lang];
  return (
    <section
      aria-labelledby="bridal-title"
      className="bg-velvet relative isolate overflow-hidden text-ivory"
    >
      <div className="relative lg:min-h-[40rem]">
        <div className="fade-b lg:fade-l relative h-[26rem] overflow-hidden sm:h-[34rem] lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[56%]">
          <Image
            src={images.about.src}
            alt={images.about.alt[lang]}
            fill
            quality={85}
            sizes="(min-width: 768px) 56vw, 100vw"
            className="object-cover object-[50%_18%]"
          />
        </div>
        <Vine className="absolute top-4 left-4 hidden w-44 opacity-55 lg:block" />
        <Vine className="absolute bottom-4 left-4 hidden w-36 -scale-y-100 opacity-35 lg:block" />
        <div className="container-lux relative -mt-24 pb-16 lg:mt-0 lg:flex lg:min-h-[40rem] lg:items-center lg:py-20">
          <Reveal className="mx-auto flex max-w-lg flex-col items-center text-center lg:mx-0 lg:w-[44%] lg:max-w-none">
            <p className="text-sm font-semibold tracking-wide text-gold-soft sm:text-base">
              {t.bridal.eyebrow}
            </p>
            <h2 id="bridal-title" className="t-banner mt-3">
              <span className="text-ivory-gold">{t.bridal.titleLead}</span>{" "}
              <br />
              <span className="text-shine">{t.bridal.titleAccent}</span>
            </h2>
            <Ornament tone="light" className="mt-5" />
            <p className="t-lead mt-5 text-ivory/85">{t.bridal.description}</p>
            <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button href="/collections/wedding" variant="gold" arrow>
                {t.bridal.cta}
              </Button>
              <Button
                href={whatsappLink(t.wa.bridal)}
                variant="outline-light"
                icon={<WhatsAppIcon className="size-4" />}
              >
                {t.hero.whatsapp}
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
