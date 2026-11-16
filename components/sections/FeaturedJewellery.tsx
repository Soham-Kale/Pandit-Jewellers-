"use client";

import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { content } from "@/data/content";
import { home } from "@/data/home";
import { images } from "@/data/images";
import { whatsappLink, extProps } from "@/data/business";
import { useLang } from "@/lib/i18n";

/**
 * Product-style cards: same 4:5 photo, name, one line, and a WhatsApp enquiry.
 * Phones get a swipeable row (with the next card peeking) instead of a long stack.
 */
export default function FeaturedJewellery() {
  const { lang } = useLang();
  const t = content[lang];
  const f = t.featured;
  return (
    <section aria-labelledby="featured-title" className="section-y">
      <div className="container-lux">
        <SectionHeading
          id="featured-title"
          eyebrow={f.eyebrow}
          title={home.featured.title[lang]}
          intro={home.featured.sub[lang]}
          action={{ href: "/collections", label: t.ui.viewAllJewellery }}
        />
      </div>
      <ul className="no-scrollbar head-gap container-lux flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto pb-2 sm:scroll-px-8 lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible">
        {images.featured.map((img, i) => {
          const cap = f.captions[i];
          const wa = whatsappLink(t.wa.collection(cap.title));
          return (
            <Reveal as="li" key={img.src} delay={i * 0.07} className="w-[78%] shrink-0 snap-start sm:w-[44%] lg:w-auto">
              <article className="group flex h-full flex-col">
                <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-mist">
                  <Image src={img.src} alt={img.alt[lang]} fill quality={80} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 44vw, 78vw" className="zoom-img object-cover object-top" />
                </div>
                <h3 className="t-h3 mt-4 text-burgundy-ink">{cap.title}</h3>
                <p className="t-caption mt-1 flex-1 text-muted">{cap.text}</p>
                <a
                  href={wa}
                  {...extProps(wa)}
                  className="mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-burgundy/30 px-5 font-semibold text-burgundy transition-colors duration-500 hover:border-burgundy hover:bg-burgundy hover:text-white"
                >
                  <WhatsAppIcon className="size-4" />
                  {t.ui.enquireWhatsapp}
                </a>
              </article>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
