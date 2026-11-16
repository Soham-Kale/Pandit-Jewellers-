"use client";

import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { extProps, phoneLink, whatsappLink } from "@/data/business";
import { content } from "@/data/content";
import { home } from "@/data/home";
import { images } from "@/data/images";
import { useLang } from "@/lib/i18n";

/** Bordered row of three photo tiles, each with an uppercase label: visit, WhatsApp, call. */
export default function Experience() {
  const { lang } = useLang();
  const t = home.experience;
  const tiles = [
    { label: t.visit[lang], href: "#store", img: images.store },
    { label: t.whatsapp[lang], href: whatsappLink(content[lang].wa.general), img: images.featured[2] },
    { label: t.call[lang], href: phoneLink(), img: images.about },
  ];
  return (
    <section aria-labelledby="experience-title" className="section-y">
      <div className="container-lux">
        <SectionHeading id="experience-title" title={t.title[lang]} intro={t.sub[lang]} />
        <Reveal className="mt-8 grid overflow-hidden rounded-xl border border-line sm:grid-cols-3 lg:mt-10">
          {tiles.map((tile) => (
            <a key={tile.label} href={tile.href} {...extProps(tile.href)} className="group block">
              <span className="relative block aspect-[3/2] overflow-hidden sm:aspect-square">
                <Image src={tile.img.src} alt={tile.img.alt[lang]} fill quality={80} sizes="(min-width: 640px) 33vw, 100vw" className="object-cover transition-transform duration-[1.4s] ease-luxe group-hover:scale-105" />
              </span>
              <span className="block py-5 text-center text-base tracking-wide text-burgundy-ink uppercase group-hover:text-burgundy">{tile.label}</span>
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
