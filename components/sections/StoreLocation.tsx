"use client";

import Image from "next/image";
import { MapPin, Clock, Navigation } from "lucide-react";
import Reveal, { ImageReveal } from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { content } from "@/data/content";
import { images } from "@/data/images";
import { business, locationLine, mapsLink, whatsappLink, TBC } from "@/data/business";
import { useLang } from "@/lib/i18n";

function Pending({ text }: { text: string }) {
  return <span className="ml-2 inline-block rounded-full border border-gold px-2.5 py-0.5 align-middle text-xs font-semibold text-gold-deep">{text}</span>;
}

export default function StoreLocation() {
  const { lang } = useLang();
  const t = content[lang];
  const s = t.store;
  return (
    <section id="store" aria-labelledby="store-title" className="section-y bg-ivory-glow">
      <div className="container-lux grid items-stretch gap-12 lg:grid-cols-12 lg:gap-0">
        <ImageReveal className="relative min-h-[22rem] overflow-hidden rounded-[2rem] bg-ivory-deep shadow-[0_40px_80px_-45px_rgba(122,28,44,0.6)] sm:min-h-[28rem] lg:col-span-7">
          <Image src={images.store.src} alt={images.store.alt[lang]} fill quality={85} sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover" />
        </ImageReveal>

        <Reveal className="relative lg:col-span-5 lg:-ml-16 lg:self-center">
          <div className="frame-shine rounded-[2rem] bg-surface p-7 shadow-[0_30px_70px_-30px_rgba(122,28,44,0.4)] sm:p-10 lg:p-12">
            <p className="eyebrow text-gold-deep">{s.eyebrow}</p>
            <h2 id="store-title" className="mt-3 text-[2.2rem] font-semibold text-balance text-burgundy sm:text-5xl">
              {s.title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">{s.intro}</p>

            <dl className="mt-8 space-y-5 border-t border-line pt-8">
              <div className="flex gap-4">
                <MapPin className="mt-1 size-5 shrink-0 text-gold-deep" strokeWidth={1.6} aria-hidden />
                <div>
                  <dt className="text-xl font-semibold text-burgundy">{business.name[lang]}</dt>
                  <dd className="mt-1 text-charcoal/85">{locationLine(lang)}</dd>
                  <dd className="mt-1 text-charcoal/85">
                    {business.streetAddress[lang] || (
                      <>
                        {s.address}
                        <Pending text={TBC[lang]} />
                      </>
                    )}
                  </dd>
                </div>
              </div>
              <div className="flex gap-4">
                <Clock className="mt-1 size-5 shrink-0 text-gold-deep" strokeWidth={1.6} aria-hidden />
                <div>
                  <dt className="text-xl font-semibold text-burgundy">{s.hoursTitle}</dt>
                  <dd className="mt-1 text-charcoal/85">
                    {business.openingHours[lang] || (
                      <>
                        {s.hours}
                        <Pending text={TBC[lang]} />
                      </>
                    )}
                  </dd>
                </div>
              </div>
            </dl>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href={mapsLink()} variant="burgundy" icon={<Navigation className="size-4" strokeWidth={1.75} aria-hidden />}>
                {s.directions}
              </Button>
              <Button href={whatsappLink(t.wa.general)} variant="outline-dark" icon={<WhatsAppIcon />}>
                {s.whatsapp}
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
