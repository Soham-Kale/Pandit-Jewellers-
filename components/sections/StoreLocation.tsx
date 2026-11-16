"use client";

import { MapPin, Clock, Phone, Navigation } from "lucide-react";
import Reveal, { ImageReveal } from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { content } from "@/data/content";
import { business, locationLine, mapsLink, mapsEmbedUrl, whatsappLink, phoneLink, TBC } from "@/data/business";
import { useLang, mrDigits } from "@/lib/i18n";

function Pending({ text }: { text: string }) {
  return <span className="ml-2 inline-block rounded-full border border-gold px-2.5 py-0.5 align-middle text-xs font-semibold text-gold-deep">{text}</span>;
}

/** Visit the shop: address, hours and phone beside a live map, with directions and WhatsApp. */
export default function StoreLocation() {
  const { lang } = useLang();
  const t = content[lang];
  const s = t.store;
  const rows = [
    {
      Icon: MapPin,
      title: business.name[lang],
      lines: [
        business.streetAddress[lang] || null,
        `${locationLine(lang)}${business.postalCode ? ` ${mrDigits(business.postalCode)}` : ""}`,
      ],
      pending: !business.streetAddress[lang] ? s.address : null,
    },
    { Icon: Clock, title: s.hoursTitle, lines: [business.openingHours[lang] || null], pending: !business.openingHours[lang] ? s.hours : null },
    { Icon: Phone, title: t.footer.phone, lines: [business.phone, business.phoneAlt].filter(Boolean), pending: null, href: phoneLink() },
  ];
  return (
    <section id="store" aria-labelledby="store-title" className="section-y">
      <div className="container-lux grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <p className="kicker">{s.eyebrow}</p>
          <h2 id="store-title" className="t-h2 mt-3 text-burgundy-ink">
            {s.title}
          </h2>
          <p className="t-lead mt-3 text-muted">{s.intro}</p>

          <dl className="mt-8 divide-y divide-line border-y border-line">
            {rows.map(({ Icon, title, lines, pending, href }) => (
              <div key={title} className="flex gap-4 py-5">
                <Icon className="mt-1 size-5 shrink-0 text-gold-deep" strokeWidth={1.6} aria-hidden />
                <div>
                  <dt className="t-h4 text-burgundy-ink">{title}</dt>
                  {lines.filter(Boolean).map((l) => (
                    <dd key={l} className="t-body mt-0.5 text-charcoal/85">
                      {href ? (
                        <a href={`tel:${String(l).replace(/[^+\d]/g, "")}`} className="hover:text-burgundy">
                          {l}
                        </a>
                      ) : (
                        l
                      )}
                    </dd>
                  ))}
                  {pending && (
                    <dd className="mt-0.5 text-charcoal/85">
                      {pending}
                      <Pending text={TBC[lang]} />
                    </dd>
                  )}
                </div>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={mapsLink()} variant="burgundy" icon={<Navigation className="size-4" strokeWidth={1.75} aria-hidden />}>
              {s.directions}
            </Button>
            <Button href={whatsappLink(t.wa.general)} variant="outline-dark" icon={<WhatsAppIcon className="size-4" />}>
              {s.whatsapp}
            </Button>
          </div>
        </Reveal>

        <ImageReveal className="relative aspect-[4/5] overflow-hidden rounded-lg bg-mist sm:aspect-[4/3] lg:col-span-7 lg:aspect-[5/4]">
          <iframe
            title={t.ui.mapTitle}
            src={mapsEmbedUrl()}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 size-full border-0 grayscale-[25%]"
          />
        </ImageReveal>
      </div>
    </section>
  );
}
