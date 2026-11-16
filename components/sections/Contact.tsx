"use client";

import { MapPin, Phone, Mail, type LucideIcon } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import InstagramIcon from "@/components/ui/Instagram";
import { content } from "@/data/content";
import {
  business,
  addressText,
  mapsLink,
  whatsappLink,
  phoneLink,
  emailLink,
  TBC,
  extProps,
} from "@/data/business";
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
    {
      key: "call",
      label: c.call,
      value: business.phone || tbc,
      pending: !business.phone,
      note: business.phoneAlt || undefined,
      href: business.phone ? phoneLink() : undefined,
      Icon: Phone,
    },
    {
      key: "wa",
      label: c.whatsapp,
      value: business.whatsapp ? c.messageUs : tbc,
      pending: !business.whatsapp,
      href: business.whatsapp ? whatsappLink(t.wa.general) : undefined,
      Icon: WhatsAppIcon,
    },
    {
      key: "email",
      label: c.email,
      value: business.email || tbc,
      pending: !business.email,
      href: business.email ? emailLink() : undefined,
      Icon: Mail,
    },
    // Instagram appears once its profile link is filled in data/business.ts.
    ...(business.instagram
      ? [
          {
            key: "ig",
            label: c.instagram,
            value: c.followUs,
            pending: false,
            href: business.instagram,
            Icon: InstagramIcon,
          },
        ]
      : []),
  ];

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="section-y bg-mist"
    >
      <div className="container-lux">
        <SectionHeading
          id="contact-title"
          align="center"
          eyebrow={c.eyebrow}
          title={c.title}
          intro={c.intro}
        />

        <ul
          className={`head-gap mx-auto grid max-w-6xl grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:gap-4 ${cards.length > 4 ? "lg:grid-cols-5" : "lg:grid-cols-4"}`}
        >
          {cards.map(({ key, label, value, pending, note, href, Icon }, i) => {
            const inner = (
              <>
                <span className="grid size-12 shrink-0 place-items-center rounded-full border border-gold/60 text-gold-deep transition-colors duration-500 group-hover:border-burgundy group-hover:bg-burgundy group-hover:text-white">
                  <Icon className="size-5" strokeWidth={1.6} aria-hidden />
                </span>
                <span className="block min-w-0">
                  <span className="t-caption block font-semibold text-muted min-[420px]:mt-5">
                    {label}
                  </span>
                  <span
                    className={`mt-1 block leading-snug font-semibold break-words ${key === "email" ? "text-base sm:text-lg" : "text-lg"} ${pending ? "text-muted" : "text-burgundy-ink"}`}
                  >
                    {key === "email" && value.includes("@") ? (
                      <>
                        {value.split("@")[0]}
                        <wbr />@{value.split("@")[1]}
                      </>
                    ) : (
                      value
                    )}
                  </span>
                  {note && (
                    <span className="t-caption mt-0.5 block text-muted">
                      {note}
                    </span>
                  )}
                </span>
              </>
            );
            return (
              <Reveal
                as="li"
                key={key}
                delay={i * 0.06}
                className="rounded-lg bg-white ring-1 ring-line transition-shadow duration-500 hover:shadow-[0_18px_40px_-28px_rgba(74,36,117,0.55)]"
              >
                {href ? (
                  <a
                    href={href}
                    {...extProps(href)}
                    className="group flex h-full items-start gap-4 rounded-lg p-5 min-[420px]:block sm:p-7"
                  >
                    {inner}
                  </a>
                ) : (
                  <div className="flex h-full items-start gap-4 p-5 min-[420px]:block sm:p-7">
                    {inner}
                  </div>
                )}
              </Reveal>
            );
          })}
        </ul>

        <Reveal className="mt-10 flex justify-center">
          <Button
            href={whatsappLink(t.wa.general)}
            variant="burgundy"
            icon={<WhatsAppIcon className="size-4" />}
          >
            {c.enquire}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
