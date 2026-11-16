"use client";

import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { content } from "@/data/content";
import { home } from "@/data/home";
import { images } from "@/data/images";
import { useLang } from "@/lib/i18n";

/** Three photo cards with a centred caption under each. */
export default function FeaturedJewellery() {
  const { lang } = useLang();
  const t = content[lang].featured;
  return (
    <section aria-labelledby="featured-title" className="section-y">
      <div className="container-lux">
        <SectionHeading id="featured-title" title={home.featured.title[lang]} intro={home.featured.sub[lang]} />
        <ul className="mt-8 grid gap-x-4 gap-y-8 sm:grid-cols-3 lg:mt-10">
          {images.featured.slice(0, 3).map((img, i) => (
            <Reveal as="li" key={img.src} delay={i * 0.08} className="group">
              <div className="relative aspect-square overflow-hidden rounded-xl bg-ivory-deep">
                <Image src={img.src} alt={img.alt[lang]} fill quality={85} sizes="(min-width: 640px) 33vw, 100vw" className="object-cover object-top transition-transform duration-[1.4s] ease-luxe group-hover:scale-105" />
              </div>
              <h3 className="mt-4 text-center text-[1.4rem] text-muted">{t.captions[i].title}</h3>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
