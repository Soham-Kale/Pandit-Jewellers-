"use client";

import { MapPin, Phone, Navigation, type LucideIcon } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import InstagramIcon from "@/components/ui/Instagram";
import { content } from "@/data/content";
import { business, addressText, mapsLink, whatsappLink, phoneLink, TBC, extProps } from "@/data/business";
import { useLang } from "@/lib/i18n";

type Card = {
  key: string;
  label: string;
  value: string;
  pending: boolean;
  note?: string;
  href?: string;
  Icon: LucideIcon | ((p: { className?: string }) => React.ReactElement);
};

export default function Contact() {
  const { lang } = useLang();
  const t = content[lang];
  const c = t.contact;
  const tbc = TBC[lang];

  const cards: Card[] = [
    {
      key: "visit",
      label: c.visit,
      value: addressText(lang),
      pending: false,
      note: business.streetAddress[lang] ? undefined : `${c.street}: ${tbc}`,
      href: mapsLink(),
      Icon: MapPin,
    },
    { key: "call", label: c.call, value: business.phone || tbc, pending: !business.phone, href: business.phone ? phoneLink() : undefined, Icon: Phone },
    {
      key: "wa",
      label: c.whatsapp,
      value: business.whatsapp ? c.messageUs : tbc,
      pending: !business.whatsapp,
      href: business.whatsapp ? whatsappLink(t.wa.general) : undefined,
      Icon: WhatsAppIcon,
    },
    {
      key: "ig",
      label: c.instagram,
      value: business.instagram ? c.followUs : tbc,
      pending: !business.instagram,
      href: business.instagram || undefined,
      Icon: InstagramIcon,
    },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="section-y bg-surface">
      <div className="container-lux">
        <SectionHeading id="contact-title" eyebrow={c.eyebrow} title={c.title} intro={c.intro} />

        <ul className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-3 sm:gap-5 lg:mt-16 lg:grid-cols-4">
          {cards.map(({ key, label, value, pending, note, href, Icon }, i) => {
            const inner = (
              <>
                <span className="bg-shine grid size-12 place-items-center rounded-full text-burgundy-ink">
                  <Icon className="size-5" strokeWidth={1.6} aria-hidden />
                </span>
                <span className="mt-4 block text-sm font-semibold tracking-[0.14em] text-muted uppercase">{label}</span>
                <span className={`mt-1 block text-lg leading-snug font-semibold sm:text-xl ${pending ? "text-muted" : "text-burgundy"}`}>{value}</span>
                {note && <span className="mt-1 block text-sm text-muted">{note}</span>}
              </>
            );
            return (
              <Reveal as="li" key={key} delay={i * 0.06} className="frame-shine rounded-[1.5rem] bg-ivory shadow-[0_20px_45px_-30px_rgba(122,28,44,0.45)]">
                {href ? (
                  <a href={href} {...extProps(href)} className="block h-full rounded-[1.5rem] p-5 transition-colors duration-500 hover:bg-blush/60 sm:p-7">
                    {inner}
                  </a>
                ) : (
                  <div className="h-full p-5 sm:p-7">{inner}</div>
                )}
              </Reveal>
            );
          })}
        </ul>

        <Reveal className="mt-12 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <Button href={whatsappLink(t.wa.general)} variant="burgundy" icon={<WhatsAppIcon />}>
            {c.enquire}
          </Button>
          <Button href={mapsLink()} variant="outline-dark" icon={<Navigation className="size-4" strokeWidth={1.75} aria-hidden />}>
            {c.maps}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
